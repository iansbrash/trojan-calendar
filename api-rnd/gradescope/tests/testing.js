const { getMyUscCookies } = require("../../usc/getMyUscCookies");
const { username, password } = require('../../private/usclogin');
const { getBlackboardRouter } = require('../../blackboard/getBlackboardRouter');
const { getGradescopeCookies } = require('../getGradescopeCookies');
const { getGSAssignmentsAndGrades } = require('../getGSAssignmentsAndGrades');

(async () => {
    let allCookies = await getMyUscCookies(username, password);
    allCookies = await getBlackboardRouter(allCookies);


    let gsResponse = await getGradescopeCookies(allCookies)

    let gradescopeCookies = gsResponse.cookies;
    let gsLink = gsResponse.link;

    console.log(gradescopeCookies)
    console.log(gsLink);

    let res = await getGSAssignmentsAndGrades(gradescopeCookies, gsLink);

})();