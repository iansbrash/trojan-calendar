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

    console.log(TabActionResponse.data)

    let clipData = TabActionResponse.data;

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

        console.log(`${name}: ${url} ${courseInstructor ? `(${courseInstructor})` : ''}`)

        clipData = clipData.substring(clipData.indexOf('</li>') + '</li>'.length);
    }

    return 
}

module.exports.getBlackboardClasses = getBlackboardClasses;