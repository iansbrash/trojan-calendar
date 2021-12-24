const axios = require("axios");
const { 
    getValueByDelimiters, 
    accumulateCookies, 
    returnParsedCookies, 
    joinCookies, 
    convertCookieArrayToObject, 
    VS 
} = require("../functions/requestFunctions");
const { tryCatchWrapper } = require('../functions/tryCatchWrapper');
const { genHeaders } = require('../usc/genHeaders');
const he = require('he');
const qs = require('qs');
const fs = require('fs');


const getGSAssignmentsAndGrades = async (gsCookies, courseLink) => {
    let allCookies = gsCookies;


    const GetCoursePageResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: courseLink,
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "GetGSCoursePageResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(GetCoursePageResponse.headers['set-cookie']));

    const AssignmentsStudentTable = getValueByDelimiters(GetCoursePageResponse.data, '<section>', '</section>')

    // Skip the head which contains <tr> which we don't want
    let peelingData = AssignmentsStudentTable.substring(AssignmentsStudentTable.indexOf('<tbody>'));


    // While we still have assignments to parse
    while (peelingData.indexOf('<tr role="row">') !== -1) {
        let tr = peelingData.substring(
            peelingData.indexOf('<tr role="row">'),
            peelingData.indexOf('</tr>')
        );

        // Isolates where the homework's title is
        let homeworkParsed = getValueByDelimiters(tr, '<th class="table--primaryLink" role="rowheader" scope="row">', '</th>')

        // If it is something that contains a link (like viewing a homework submission, as opposed to a quiz which you can't see)
        if (homeworkParsed.includes('<a aria-label="')) {
            homeworkParsed = getValueByDelimiters(homeworkParsed, '>', '</a>')
        }

        // Cut off what we don't need
        tr = tr.substring(tr.indexOf('</th>') + '</th>'.length);

        // Now parse a score or submission status
        let submissionScore = getValueByDelimiters(tr, '<td', '</td>')
        let submissionStatus;

        if (submissionScore.includes('<div class="submissionStatus--score">')) {
            submissionScore = getValueByDelimiters(submissionScore, '<div class="submissionStatus--score">', '</div>')
        }
        else if (submissionScore.includes('<div class="submissionStatus--text">')) {
            submissionStatus = getValueByDelimiters(submissionScore, '<div class="submissionStatus--text">', '</div>')
        }
        else {
            console.log("Unable to correctly parse submissionScore/Status")
        }

        // Cut off what we don't need
        tr = tr.substring(tr.indexOf('</td>') + '</td>'.length)

        // Then cut off submissionTimeChart (we aren't using this at all yet);
        tr = tr.substring(tr.indexOf('</td>') + '</td>'.length)

        // When the assignment was first able to be submitted
        let releaseDate = getValueByDelimiters(tr, '<td class="hidden-column">', '</td>')
        releaseDate = gradescopeTimestampToISO(releaseDate)
        tr = tr.substring(tr.indexOf('</td>') + '</td>'.length)

        // When the assignment is last able to be submitted
        let dueDate = getValueByDelimiters(tr, '<td class="hidden-column">', '</td>')
        dueDate = gradescopeTimestampToISO(dueDate)

        console.log(`${homeworkParsed}: ${submissionStatus ? submissionStatus : submissionScore} (Due on ${dueDate})`);


        // Finally cut off the entire <tr> we just parsed from our big string of data
        peelingData = peelingData.substring(
            peelingData.indexOf('</tr>') + '</tr>'.length
        )

    }

    return;
}

const gradescopeTimestampToISO = (gsTS) => {
    return gsTS.split(' ').slice(0, 2).join('T') + '.000Z'
}

module.exports.getGSAssignmentsAndGrades = getGSAssignmentsAndGrades;