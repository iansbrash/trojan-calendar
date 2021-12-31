const axios = require("axios");
const { VS, getValueByDelimiters } = require("../functions/requestFunctions");
const { tryCatchWrapper } = require("../functions/tryCatchWrapper");
const { genHeaders } = require("./genHeaders");


const getMyUscCalendar = async (allCookies) => {
    
    // https://my.usc.edu/courses/
    const AdminAjaxRes = await tryCatchWrapper(() => axios({
        method: 'post',
        url: 'https://my.usc.edu/wp-admin/admin-ajax.php', //'https://my.usc.edu/portal/Shibboleth.sso/SAML2/POST',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus:  VS,
        data: 'action=update_setting&setting=clear+courses&cterm=20211'
    }), "CoursesRes");

    console.log(AdminAjaxRes.data)

    // https://my.usc.edu/courses/
    const CoursesRes = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://my.usc.edu/courses/', //'https://my.usc.edu/portal/Shibboleth.sso/SAML2/POST',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus:  VS,
    }), "CoursesRes");

    term = 20221;
    let calendarData = CoursesRes.data;
    calendarData = getValueByDelimiters(calendarData, `<div id="term-${term}"`, '</ul>')

    if (!calendarData.includes(`data-term="${term}"`)) {
        throw "Error: Calendar not fetched correctly."
    }

    // Start parsing calendar items
    while (calendarData.includes('<li>')) {
        let liBlock = getValueByDelimiters(calendarData, '<li>', '</li>')

        const courseName = getValueByDelimiters(liBlock, '<h3 data-course="', '"')
        const courseTitle = getValueByDelimiters(liBlock, '<span class="course-title">', '</span>');

        console.log(`${courseName}: ${courseTitle}`)

        liBlock = liBlock.substring(liBlock.indexOf('</tr>') + '</tr>'.length);

        // Start parsing individual parts of the class (i.e. Lecture, Discussion, and Quiz sections)
        while (liBlock.includes('<tr')) {
            let trBlock = getValueByDelimiters(liBlock, '<tr', '</tr>')

            const sectionId = getValueByDelimiters(trBlock, '<td class="section-id">', '</td>')
            const sectionType = getValueByDelimiters(trBlock, '<td class="section-type">', '</td>')

            // Tue, Thu: 11:00&#8200;am&#8200;-&#8200;12:20&#8200;pm
            // This is what it looks like when it spans AM and PM
            let sectionSchedule = getValueByDelimiters(trBlock, '<td class="section-schedule">', '</td>')
            sectionSchedule = sectionSchedule.split('&#8200;').join(' ')

            
            // <td class="section-location">Online</td>
            let sectionLocation = getValueByDelimiters(trBlock, '<td class="section-location">', '</td>')
            if (sectionLocation.includes('>')) {
                sectionLocation = sectionLocation.substring(sectionLocation.indexOf('>') + 1)
                sectionLocation = sectionLocation.split('</a>&#8200;').join(' ')
                // sectionLocation = getValueByDelimiters(sectionLocation, '>', '</')
            }

            let sectionInstructor = getValueByDelimiters(trBlock, '<td class="section-instructor">', '</td>')
            if (sectionInstructor.includes('>')) {
                sectionInstructor = getValueByDelimiters(sectionInstructor, '">', '</')
            }
            let sectionGradeInfo = getValueByDelimiters(trBlock, '<td class="section-grade-option">', '</td>')
            const sectionInfo = getValueByDelimiters(trBlock, '<td class="section-info"', '</td>')
            let it = [sectionId, sectionType, sectionSchedule, sectionLocation, sectionInstructor, sectionGradeInfo]


            it = it.map(v => v.trim() === '' ? 'N/A' : v);

            it.forEach(v => console.log(`--- ${v}`))


            liBlock = liBlock.substring(liBlock.indexOf('</tr>') + '</tr>'.length)
        }

        calendarData = calendarData.substring(calendarData.indexOf('</li>') + '</li>'.length);
    }

    console.log(calendarData)
}

module.exports.getMyUscCalendar = getMyUscCalendar;