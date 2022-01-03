const { getMyUscCookies } = require("../../usc/getMyUscCookies");
const { username, password } = require('../../private/usclogin');
const { getBlackboardRouter } = require('../getBlackboardRouter');
const { getBlackboardAssignments } = require('../getBlackboardAssignments');
const { getBlackboardGrades } = require("../getBlackboardGrades");

(async () => {
    let allCookies = await getMyUscCookies(username, password);
    allCookies = await getBlackboardRouter(allCookies);

    console.log(allCookies)

    const res = await getBlackboardAssignments(allCookies);

    console.log(res);

    // const getBBGradesRes = await getBlackboardGrades(allCookies);

    // console.log(getBBGradesRes)
})();