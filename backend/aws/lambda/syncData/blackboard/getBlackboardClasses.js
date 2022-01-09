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


const getBlackboardClasses = async (bbCookies) => {
    let allCookies = bbCookies;

    const data = 'action=refreshAjaxModule&modId=_27_1&tabId=_1_1&tab_tab_group_id=_1_1';

    const TabActionResponse = await tryCatchWrapper(() => axios({
        method: 'post',
        url: 'https://blackboard.usc.edu/webapps/portal/execute/tabs/tabAction',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: data
    }), "WebappLoginResponse");

    let clipData = TabActionResponse.data;

    let returnData = {
        //Term: []
        //          {courseName, prettyName, course_id, courseInstructor}
    }

    while (clipData.indexOf('<li>') !== -1) {
        let individualLi = getValueByDelimiters(clipData, '<li>', '</li>');

        let nameAndUrl = getValueByDelimiters(individualLi, '<a', '</a>')
        let url = getValueByDelimiters(nameAndUrl, 'href="', '"');
        let name = nameAndUrl.substring(nameAndUrl.indexOf('target="_top">') + 'target="_top">'.length);


        let courseInformation;
        let courseInstructor;

        if (individualLi.indexOf(`<div class='courseInformation'>`) !== -1) {
            courseInformation = getValueByDelimiters(individualLi, `<div class='courseInformation'>`, '</div>')
            courseInstructor = getValueByDelimiters( individualLi, "<span class='name'>", ';&nbsp;&nbsp;</span>' );
        }

        // console.log(`${name}: ${url} ${courseInstructor ? `(${courseInstructor})` : ''}`)

        let nameBlock = name.split(':')[0]; //20221_csci_356_30234
        let term = name.split('_')[0]; //20221
        let prettyName = name.split('_').slice(1, 3).join(' ').toUpperCase();

        let courseId = getValueByDelimiters(individualLi, '/webapps/blackboard/execute/launcher?type=Course&id=', '&url=')

        // console.log(`Term ${term}: ${prettyName}, courseId: ${courseId}`)

        clipData = clipData.substring(clipData.indexOf('</li>') + '</li>'.length);

        if (!returnData[term]) {
            returnData[term] = [];
        }

        returnData[term].push({
            courseName: name,
            course_id: courseId,
            courseInstructor: courseInstructor
        })
    }

    return returnData;
}

module.exports.getBlackboardClasses = getBlackboardClasses;