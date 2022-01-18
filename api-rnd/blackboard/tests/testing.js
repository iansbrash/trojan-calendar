const { getMyUscCookies } = require("../../my.usc.edu/getMyUscCookies");
const { username, password } = require('../../private/usclogin');
const { getBlackboardRouter } = require('../getBlackboardRouter');
const { getBlackboardAssignments } = require('../getBlackboardAssignments');
const { getBlackboardGrades } = require("../getBlackboardGrades");
const { getBlackboardClasses } = require("../getBlackboardClasses");

(async () => {
    let allCookies = await getMyUscCookies(username, password);
    allCookies = await getBlackboardRouter(allCookies);

    console.log(allCookies)

    const bbClasses = await getBlackboardClasses(allCookies)
    console.log(bbClasses)

    // bbClasses['20213'].forEach(async (v) => {
    //     console.log(await getBlackboardGrades(allCookies, v.course_id))
    // })

})();