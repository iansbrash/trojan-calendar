//<div id="grades_wrapper" role="rowgroup">

const axios = require("axios");
const { 
    VS, getValueByDelimiters 
} = require("../functions/requestFunctions");
const { tryCatchWrapper } = require('../functions/tryCatchWrapper');
const { genHeaders } = require('../my.usc.edu/genHeaders');

const getBlackboardGrades = async (
    bbCookies,
    course_id
) => {

    // const course_id = '_275718_1'; //'_251705_1'

    const base = 'https://blackboard.usc.edu/webapps/bb-mygrades-BB5fd94affdac6c/myGrades';

    const getMyGradesResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: `${base}?stream_name=mygrades&course_id=${course_id}`, //`${start + (dayInMilli * 21)}`,// `&course_id=${course_id}&mode=${mode}`, //
        headers: genHeaders(bbCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "getMyGradesResponse");

    let peelingData = getMyGradesResponse.data.substring(getMyGradesResponse.data.indexOf('<div id="grades_wrapper" role="rowgroup">'))
    let courseName = getValueByDelimiters(getMyGradesResponse.data, '<span class="context">', '</span>')
    courseName = courseName.split(':')[0]

    let returnData = {
        [courseName]: []
    }

    while (peelingData.indexOf('<!-- Calculated Rows -->') !== -1) {
        let gradeDiv = getValueByDelimiters(peelingData, '<!-- Calculated Rows -->', '<!--  Status Column -->')

        let gradeTitle = getValueByDelimiters(gradeDiv, '<div class="cell gradable" role="cell">', '<div').trim()

        // in case we are left with something that looks like
        // <a ...> Quiz 1 </a>
        if (gradeTitle.includes('>')) {
            gradeTitle = getValueByDelimiters(gradeTitle, '>', '<')
        }

        // We skip these cuz they aren't conventional grades
        if (gradeTitle === 'Total' || gradeTitle === 'Weighted Total' || gradeTitle === 'Grade') {
            peelingData = peelingData.substring(peelingData.indexOf('<!-- Calculated Rows -->') + '<!-- Calculated Rows -->'.length)
            continue;
        }

        // Graded Upcoming
        let gradeStatus = getValueByDelimiters(gradeDiv, '<span class="activityType">', '</span>')

        if (gradeStatus === "Upcoming") {
            // To fit our schema
            gradeStatus = "Needs Grading"
        }

        let gradeNumerator = gradeDiv.substring(gradeDiv.indexOf('<span class="grade"') + '<span class="grade"'.length)
        gradeNumerator = getValueByDelimiters(gradeNumerator, '>', '</span>')
        gradeNumerator === '-' ? gradeNumerator = 0 : null;

        let gradeDenominator = getValueByDelimiters(gradeDiv, '<span class="pointsPossible clearfloats">/', '</span>')
        // Title, Status, Grade

        returnData[courseName].push({
            assignmentTitle: gradeTitle,
            status: gradeStatus,
            grade: `${gradeNumerator} ${gradeDenominator}`
        })

        peelingData = peelingData.substring(peelingData.indexOf('<!-- Calculated Rows -->') + '<!-- Calculated Rows -->'.length)
    }

    return returnData;
}

module.exports.getBlackboardGrades = getBlackboardGrades;