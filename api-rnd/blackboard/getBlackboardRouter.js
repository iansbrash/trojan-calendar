const axios = require("axios");
const { 
    getValueByDelimiters, 
    accumulateCookies, 
    returnParsedCookies, 
    joinCookies, 
    convertCookieArrayToObject, 
    VS 
} = require("../functions/requestFunctions");
const { tryCatchWrapper } = require('../functions/tryCatchWrapper');
const { genHeaders } = require('../usc/genHeaders');
const he = require('he');
const qs = require('qs');


const getBlackboardRouter = async (myUscCookies) => {
    let allCookies = myUscCookies;

    const WebappLoginResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://blackboard.usc.edu/webapps/login/',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "WebappLoginResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(WebappLoginResponse.headers['set-cookie']));

    const BBAuthSamlResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://blackboard.usc.edu/auth-saml/saml/login?apId=_212_1&redirectUrl=https%3A%2F%2Fblackboard.usc.edu%2Fwebapps%2Fportal%2Fexecute%2FdefaultTab',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "BBAuthSamlResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(BBAuthSamlResponse.headers['set-cookie']));

    // i.e. https://login.usc.edu/sso/SSORedirect/metaAlias/USCRealm/idp?SAMLRequest=fVJdb9owFP0r1n1PTAztgkWoAqhaJSZQEvawl8o4t%2BAusZmvg%2FbzFwJs3UtfLNk%2BH77nePb0u23YGT0ZZzNI4hEwtNrVxh4y2FXPUQpP8xmpthEnmXfhaAv81SEF1hMtyetNBp230ikyJK1qkWTQssy%2FraWIR%2FLkXXDaNcByIvSht1o6S12LvkR%2FNhp3xTqDYwgnkpzvG6V%2F7p3yddyRjrHuuOqNo4sVH5ay3HDVGEX8VSTiNQG26l9krArDFHehxh2M%2FatB5C7EAmvjUQfeYlD5ILIrlwWqpuWmPgF7dl7jMGkGb6ohBPayykBNUnH8kirzPt2biTgm6ePDo04Pb%2B8P5qAvINoqInPGfzSiDl8sBWVDBmIkkigRkRhXYiQnUzkex9NJ8gPY9pbPwthr7p%2BFub%2BCSH6tqm203ZQVsO%2F3%2FnoA3NqSg7v%2FWNPnwureDcwvZ1GfSrRY58vFpljN%2BEfN%2BW37%2F4eY%2FwE%3D&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=anxgnLIZRu03sMTXApvOhQu6NNCwZte78szQyQ04cSJN3NhatULYSpFlaaZMFuFzs2xDfIQM0NOQKvJ2eJkioQfzUDl3p03IcGzo5%2BQE6VT3VzF7aT20ifa8jHdJ6cWs%2FHxzKNEY1RAyzlaL5cc26ift9ScFXpSQcRrLjQJd2G5mmG9TLStQSaWMG1niGYpkjztFM9I%2FSuWf8BikkVeYP5k3j9cHAHlRGwTfrIAlrlDcPA8Wu0zS%2F7KtdjY5mkt8RdjCrfBmw9Zf7P9080m9u5a3M8LZy2gGMToTP4HZ3LkZVuv8rcXZPSHuKHGOJVGqK%2FRGRg4yjPbIwCX3xvHd0g%3D%3D
    const BBSamlRedirectResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: BBAuthSamlResponse.headers.location,
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "BBSamlRedirectResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(BBSamlRedirectResponse.headers['set-cookie']));

    console.log(`BBAuthSamlResponse.headers.location: ${BBAuthSamlResponse.headers.location}`)

    let samlRes = getValueByDelimiters(BBSamlRedirectResponse.data, '<input type="hidden" name="SAMLResponse" value="', '" />') //
    samlRes = he.decode(samlRes);


    const BBPostAuthSamlResponse = await tryCatchWrapper(() => axios({
        method: 'post',
        url: `https://blackboard.usc.edu/auth-saml/saml/SSO/alias/_212_1`,
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: qs.stringify({
            SAMLResponse: samlRes
        })
    }), "BBSamlRedirectResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(BBPostAuthSamlResponse.headers['set-cookie']));

    const BBGetDefaultTabResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: BBPostAuthSamlResponse.headers.location,
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "BBGetDefaultTabResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(BBGetDefaultTabResponse.headers['set-cookie']));

    return returnParsedCookies(BBGetDefaultTabResponse.headers['set-cookie']);
}

module.exports.getBlackboardRouter = getBlackboardRouter;