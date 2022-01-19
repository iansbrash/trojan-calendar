const axios = require("axios");
const { 
    VS 
} = require("../functions/requestFunctions");
const { tryCatchWrapper } = require('../functions/tryCatchWrapper');
const { genHeaders } = require('../my.usc.edu/genHeaders');
const { parseBlackboardAnnouncements } = require('./parseBlackboardAnnouncements');

const getBlackboardAnnouncements = async (
    bbCookies,
) => {

    const getAnnouncementsResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: `https://blackboard.usc.edu/webapps/blackboard/execute/announcement?method=search`, 
        headers: genHeaders(bbCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "getAnnouncementsResponse");

    let parsedAnnouncements = parseBlackboardAnnouncements(getAnnouncementsResponse.data);

    return parsedAnnouncements;
}

module.exports.getBlackboardAnnouncements = getBlackboardAnnouncements;