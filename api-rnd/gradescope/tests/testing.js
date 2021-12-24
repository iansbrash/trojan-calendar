const { getMyUscCookies } = require("../../usc/getMyUscCookies");
const { username, password } = require('../../private/usclogin');
const { getBlackboardRouter } = require('../../blackboard/getBlackboardRouter');
const { getGradescopeCookies } = require('../getGradescopeCookies');

(async () => {
    let allCookies = await getMyUscCookies(username, password);
    allCookies = await getBlackboardRouter(allCookies);


    let gradescopeCookies = await getGradescopeCookies(allCookies)

    console.log(gradescopeCookies)

})();