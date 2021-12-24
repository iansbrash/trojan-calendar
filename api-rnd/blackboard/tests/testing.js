const { getMyUscCookies } = require("../../usc/getMyUscCookies");
const { username, password } = require('../../private/usclogin');
const { getBlackboardRouter } = require('../getBlackboardRouter');
const { getCourseAssignments } = require('../getCourseAssignments');

(async () => {
    let allCookies = await getMyUscCookies(username, password);
    allCookies = await getBlackboardRouter(allCookies);

    console.log(allCookies)

    const res = await getCourseAssignments(allCookies);

    console.log(res.map(r => {
        return {
            title: r.title,
            end: r.end,
        }
    }));
})();