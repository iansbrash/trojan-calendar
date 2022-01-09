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
const { genHeaders } = require('../my.usc.edu/genHeaders');
const he = require('he');
const qs = require('qs');
const fs = require('fs');


const getGradescopeClasses = async (gsCookies, term) => {
    let allCookies = gsCookies;


    const GradescopeHomeResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: `https://www.gradescope.com/`,
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "GradescopeHomeResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(GradescopeHomeResponse.headers['set-cookie']));

    let coursesBegin = GradescopeHomeResponse.data;
    coursesBegin = coursesBegin.substring(coursesBegin.indexOf('<div class="courseList">'))

    let termDelimiter = `<h2 class="courseList--term pageSubheading">${term}</h2>`

    coursesBegin = coursesBegin.substring(coursesBegin.indexOf(termDelimiter))

    let coursesSnippet = coursesBegin.substring(coursesBegin.indexOf('<div class="courseList--coursesForTerm">'))
    
    console.log(`Beginning parsing for term ${term}`)

    let returnObject = {

    }

    while (coursesSnippet.includes('<a')) {
        let individualCourse = getValueByDelimiters(coursesSnippet, '<a', '</a>')
        let courseId = getValueByDelimiters(individualCourse, 'href="', '"');

        // So stupid.
        courseId = courseId.substring(courseId.indexOf('/courses/') + '/courses/'.length)
        let shortName = getValueByDelimiters(individualCourse, '<h3 class="courseBox--shortname">', '</h3>')

        // console.log(`${shortName} courseId: ${courseId}`)

        coursesSnippet = coursesSnippet.substring(coursesSnippet.indexOf('</a>') + '</a>'.length).trim()

        returnObject[shortName] = {courseId: courseId}

        if (coursesSnippet.indexOf('<button') === 0 || coursesSnippet.indexOf('</div') === 0) {
            break;
        }
    }

    return returnObject;
}

module.exports.getGradescopeClasses = getGradescopeClasses;