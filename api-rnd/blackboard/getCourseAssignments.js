const axios = require("axios");
const { 
    VS 
} = require("../functions/requestFunctions");
const { tryCatchWrapper } = require('../functions/tryCatchWrapper');
const { genHeaders } = require('../usc/genHeaders');

const getCourseAssignments = async (
    bbCookies,
) => {

    const start = 1622632400000;
    const end = 1646261200000;
    const course_id = '_275718_1'; //'_251705_1'
    const mode = 'course';

    const dayInMilli = 86400000

    
    const base = 'https://blackboard.usc.edu/webapps/calendar/calendarData/selectedCalendarEvents';

    const getCalendarEventsResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: `${base}?start=${start}&end=${end}`, //`${start + (dayInMilli * 21)}`,// `&course_id=${course_id}&mode=${mode}`, //
        headers: genHeaders(bbCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "getCalendarEventsResponse");

    return getCalendarEventsResponse.data;
}

module.exports.getCourseAssignments = getCourseAssignments;