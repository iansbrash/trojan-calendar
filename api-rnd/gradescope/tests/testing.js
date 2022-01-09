const { getMyUscCookies } = require("../../my.usc.edu/getMyUscCookies");
const { username, password } = require('../../private/usclogin');
const { getBlackboardRouter } = require('../../blackboard/getBlackboardRouter');
const { getGradescopeCookies } = require('../getGradescopeCookies');
const { getGSAssignmentsAndGrades } = require('../getGSAssignmentsAndGrades');
const { getGradescopeClasses } = require('../getGradescopeClasses');

(async () => {
    let allCookies = await getMyUscCookies(username, password);
    allCookies = await getBlackboardRouter(allCookies);

    const course_id = `_275718_1`; 
    let gsResponse = await getGradescopeCookies(allCookies, course_id)


    let gradescopeCookies = gsResponse.cookies;
    let gsLink = gsResponse.link;


    // let term = 'Spring 2021' 
    // let term = 'Fall 2021' 
    let term = 'Fall 2020'

    // [{courseId: ____}, ...]
    let courseIds = await getGradescopeClasses(gradescopeCookies, term)


    console.log(gradescopeCookies)
    console.log(gsLink);

    let res = await getGSAssignmentsAndGrades(gradescopeCookies, gsLink);

    console.log(res);

})();