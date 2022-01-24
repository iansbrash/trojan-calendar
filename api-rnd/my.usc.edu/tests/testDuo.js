const { getMyUscCookiesDuo1 } = require("../getMyUscCookiesDuo1");
const { username, password } = require('../../private/usclogin');
const qs = require('qs');
const he = require('he');
const { getMyUscCookiesDuo2 } = require("../getMyUscCookiesDuo2");

(async () => {
    try {
        let res1 = await getMyUscCookiesDuo1(username, password);

        let {
            allCookies,
            sid,
            txid,
            TXP2,
            callback_object,
            saml2Request,
            secondVisitUrl
        } = res1;
    
        console.log(res1)
    
        allCookies = await getMyUscCookiesDuo2(allCookies, sid, txid, TXP2, callback_object, saml2Request, secondVisitUrl)
    
        console.log(allCookies)
    }
    catch (err) {
        console.log(err)
    }
    
})();