const axios = require("axios");
const { 
    VS 
} = require("../functions/requestFunctions");
const { tryCatchWrapper } = require('../functions/tryCatchWrapper');
const { genHeaders } = require('../my.usc.edu/genHeaders');

const getBlackboardAssignments = async (
    bbCookies,
) => {

    const start = Date.now() //1622632400000;
    const end = start + (86400000 * 21) // 1646261200000;
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

    return getCalendarEventsResponse.data.map(r => {
        return {
            assignmentTitle: r.title,
            dueDate: (new Date(r.end)).getTime(),
            // eventType: r.eventType, // Test or Assignment.. some other weird shit too
            className: r.calendarName
        }
    });
}

module.exports.getBlackboardAssignments = getBlackboardAssignments;