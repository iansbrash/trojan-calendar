const axios = require("axios");
const { VS, getValueByDelimiters } = require("../functions/requestFunctions");
const { tryCatchWrapper } = require("../functions/tryCatchWrapper");
const { genHeaders } = require("./genHeaders");


// Returns a calendar object to be used by the db
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


    let calendar = {
        "monday": [],
        "tuesday": [],
        "wednesday": [],
        "thursday": [],
        "friday": []
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

            // Efficient storing of data in database
            // Shouldn't store a copy of each entire object for each time in the schedule

            // courseName
            // courseTitle
            // ----
            // sectionId
            // sectionType
            // sectionSchedule
            // sectionLocation
            // sectionInstructor
            // sectionInfo (NOT NEEDED PROLLY)

            // Tue, Thu: 11:00&#8200;am&#8200;-&#8200;12:20&#8200;pm
            // Tue, Thu: 11:00 am - 12:20 pm
            // This is what it looks like when it spans AM and PM
            let sectionSchedule = getValueByDelimiters(trBlock, '<td class="section-schedule">', '</td>')
            sectionSchedule = sectionSchedule.split('&#8200;').join(' ')

            console.log(sectionSchedule.split(': '))

            // \|/ Parsing Schedule Begins \|/

            let days;

            // If the section spans multiple days---i.e. Tue, Thu: 9:30 - 10:50 am
            if (sectionSchedule.includes('TBA')) {
                console.log("Found a TBA: " + sectionSchedule)
                liBlock = liBlock.substring(liBlock.indexOf('</tr>') + '</tr>'.length)
                continue;
            }
            else if (sectionSchedule.includes(',')) {
                // Should be abbreviated days i.e. Mon, Tue, Wed, Thu, Fri
                days = sectionSchedule.split(': ')[0].split(', ')
                days = days.map(d => {
                    switch (d) {
                        case "Mon":
                            return "monday";
                        case "Tue":
                            return "tuesday";
                        case "Wed":
                            return "wednesday";
                        case "Thu":
                            return "thursday";
                        case "Fri":
                            return "friday";
                        default:
                            return "";
                    }
                })
            }
            else {
                // Since it is Friday: or Monday: etc
                days = [sectionSchedule.split(': ')[0].toLowerCase()];
            }

            // Parse time
            let time = sectionSchedule.split(': ')[1].toLowerCase();
            let end;
            let start;

            if (time.includes('am') && time.includes('pm')) {
                 start = time.split(' - ')[0]
                 end = time.split(' - ')[1];

                // we're done here
                start = start.split(' ')[0];

                end = end.split(' ')[0];
                let endBeginningDigit =  parseInt(end.split(':')[0])
                if (endBeginningDigit === 12) {
                    // Chill
                }
                else {
                    endBeginningDigit += 12;
                }

                end = `${endBeginningDigit}:${end.split(':')[1]}`

                time = `${time} // ${start} ${end}`
            }
            else if (time.includes('am')) {
                 start = time.split(' - ')[0];
                 end = time.split(' - ')[1].split(' ')[0];

                time = `${time} // ${start} ${end}`
            }
            // pm
            else {
                 start = time.split(' - ')[0];

                let startBeginningDigit =  parseInt(start.split(':')[0])
                if (startBeginningDigit === 12) {
                    // Chill
                }
                else {
                    startBeginningDigit += 12;
                }
                start = `${startBeginningDigit}:${start.split(':')[1]}`

                 end = time.split(' - ')[1].split(' ')[0];
                let endBeginningDigit =  parseInt(end.split(':')[0])
                if (endBeginningDigit === 12) {
                    // Chill
                }
                else {
                    endBeginningDigit += 12;
                }
                end = `${endBeginningDigit}:${end.split(':')[1]}`

                time = `${time} // ${start} ${end}`
            }


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

            // it.forEach(v => console.log(`--- ${v}`))


            days.forEach(d => {
                calendar[d].push({
                    className: courseName,
                    startTime: start, // '8:00',
                    endTime: end, //'8:50',
                    classType: sectionType,
                    classLocation: sectionLocation // Not yet implemented
                })
            })
            //  /|\ Parsing Schedule Ends /|\



            liBlock = liBlock.substring(liBlock.indexOf('</tr>') + '</tr>'.length)
        }


        calendarData = calendarData.substring(calendarData.indexOf('</li>') + '</li>'.length);
    }

    return calendar;
}

module.exports.getMyUscCalendar = getMyUscCalendar;