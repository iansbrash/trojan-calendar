const { getMyUscCookies } = require("../../usc/getMyUscCookies");
const { username, password } = require('../../private/usclogin');
const { getBlackboardRouter } = require('../getBlackboardRouter');
const { getCourseAssignments } = require('../getCourseAssignments');
const { getBBGrades } = require("../getBBGrades");

(async () => {
    let allCookies = await getMyUscCookies(username, password);
    allCookies = await getBlackboardRouter(allCookies);

    console.log(allCookies)

    const res = await getCourseAssignments(allCookies);

    console.log(res[0])

    console.log(res.map(r => {
        return {
            title: r.title,
            end: r.end,
            eventType: r.eventType, // Test or Assignment.. some other weird shit too
            className: r.calendarName
        }
    }));

    const getBBGradesRes = await getBBGrades(allCookies);

    console.log(getBBGradesRes)
})();