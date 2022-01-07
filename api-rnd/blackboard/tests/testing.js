const { getMyUscCookies } = require("../../usc/getMyUscCookies");
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

    // const res = await getBlackboardAssignments(allCookies);

    // console.log(res);

    // const getBBGradesRes = await getBlackboardGrades(allCookies);

    // console.log(getBBGradesRes)
})();