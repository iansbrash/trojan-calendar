const { getMyUscCookiesDuo1 } = require('./getMyUscCookiesDuo1')
const { getMyUscCookiesDuo2 } = require('./getMyUscCookiesDuo2')
const { username, password } = require('../../private/usclogin')


;(async () => {
    const bundledData = await getMyUscCookiesDuo1(username, password)
    console.log(bundledData)

    const finalResponse = await getMyUscCookiesDuo2(bundledData)
    console.log(finalResponse)

})()