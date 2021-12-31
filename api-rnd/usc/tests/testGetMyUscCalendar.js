const { getMyUscCalendar } = require("../getMyUscCalendar");
const { getMyUscCookies } = require("../getMyUscCookies");
const { username, password } = require('../../private/usclogin');

(async () => {
    let allCookies = await getMyUscCookies(username, password)

    let res = await getMyUscCalendar(allCookies)


    

})();