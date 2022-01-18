const axios = require("axios");
const { 
    getValueByDelimiters, 
    accumulateCookies, 
    returnParsedCookies, 
    joinCookies, 
    convertCookieArrayToObject, 
    VS 
} = require("./functions/requestFunctions");
const qs = require('qs');
const he = require('he')
const { tryCatchWrapper } = require('./functions/tryCatchWrapper');
const { genHeaders } = require('./functions/genHeaders');
const httpsProxyAgent = require('https-proxy-agent')

// Returns the array of the 2 cookies ASP.NET_SessionId and WWTRBQJP which are required for requests on the WebReg server
// i.e. ['ASP.NET_SessionId=1epqh13zrhdpjtv2zb2lli30', 'WWTRBQJP=0297a45327-1bed-4fkW6stxdAgJdIKmtcIHo74mRJ62zGbETklAwdPDRXbCA_JapSKCybQmjh1vAv8nthd5c']
const getMyUscCookiesDuo1 = async (username, password) => {
    let allCookies = [];


    const agent = new httpsProxyAgent('http://xyzh357:ick430azcjdja@104.165.255.100:3128')


    const SAMLCookieResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url:  'https://my.usc.edu/', // 'https://api.usc.edu/auth/trojancheck/InitiateSingleSignOn?returnurl=https://trojancheck.usc.edu/sso',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "SAMLCookieResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(SAMLCookieResponse.headers['set-cookie']))

    let Res2 = await tryCatchWrapper(() => axios({
        method: 'get',
        url: SAMLCookieResponse.headers.location,
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS
    }), "Res2");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res2.headers['set-cookie']))

    let Res3 = await tryCatchWrapper(() => axios({
        method: 'get',
        url: Res2.headers.location,
        headers: genHeaders(allCookies),
        validateStatus: VS,
        maxRedirects: 0
    }), "Res3");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res3.headers['set-cookie']))

    const Res4  = await tryCatchWrapper(() => axios({
        method: 'post',
        url: 'https://shibboleth.usc.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s1',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: qs.stringify({
            'shib_idp_ls_exception.shib_idp_session_ss': '',
            'shib_idp_ls_success.shib_idp_session_ss': 'true',
            'shib_idp_ls_value.shib_idp_session_ss': '',
            'shib_idp_ls_exception.shib_idp_persistent_ss': '',
            'shib_idp_ls_success.shib_idp_persistent_ss': 'true',
            'shib_idp_ls_value.shib_idp_persistent_ss': '',
            'shib_idp_ls_supported': 'true',
            '_eventId_proceed': '' 
        })
    }), "Res4");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res4.headers['set-cookie']))

    const Res5 = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://shibboleth.usc.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s2',
        headers: genHeaders(allCookies),
        validateStatus: VS,
        maxRedirects: 0
    }), "Res5");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res5.headers['set-cookie']))


    const Res6 = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://shibboleth.usc.edu/idp/sp/login?conversation=e1s2',
        headers: genHeaders(allCookies),
        validateStatus: VS,
        maxRedirects: 0
    }), "Res6");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res6.headers['set-cookie']))


    //https://login.usc.edu/sso/SSORedirect/metaAlias/USCRealm/idp?SAMLRequest=...
    const Res7 = await tryCatchWrapper(() => axios({
        method: 'get',
        url: Res6.headers.location,
        headers: genHeaders(allCookies),
        validateStatus: VS,
        maxRedirects: 0
    }), "Res7");

    let SAMLUrl = Res6.headers.location;
    SAMLQuerys = SAMLUrl.substring('https://login.usc.edu/sso/SSORedirect/metaAlias/USCRealm/idp?'.length)

    const oldRelayState = getValueByDelimiters(SAMLQuerys, '&RelayState=', '&')

    const SAML2WriteResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://login.usc.edu/sso/js/saml2-write.js',
        headers: genHeaders(allCookies, {
            referer: SAMLUrl
        }),
        validateStatus: VS,
        maxRedirects: 0
    }), "Res7");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res7.headers['set-cookie']))

    let saml2Request = getValueByDelimiters(Res7.data, '<input type="hidden" id="saml2Request" value="', '" />')
    let secondVisitUrl = getValueByDelimiters(Res7.data, '<input type="hidden" id="secondVisitUrl" value="', '" />')

    let loginUrl = getValueByDelimiters(Res7.data, '<input type="hidden" id="loginUrl" value="', '" />')
    saml2Request = he.decode(saml2Request);
    secondVisitUrl = he.decode(secondVisitUrl);
    loginUrl = he.decode(loginUrl);

    //https://login.usc.edu/login/login?spEntityID=https://shibboleth.usc.edu/idp/sp&goto=https://login.usc.edu:443/sso/saml2/continue/metaAlias/USCRealm/idp&AMAuthCookie=
    const Res8 = await tryCatchWrapper(() => axios({
        method: 'get',
        url: `https://login.usc.edu/login/login?spEntityID=https://shibboleth.usc.edu/idp/sp&goto=https://login.usc.edu:443/sso/saml2/continue/metaAlias/USCRealm/idp&AMAuthCookie=`,
        headers: genHeaders(allCookies),
        validateStatus: VS,
        maxRedirects: 0
    }), "Res8");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res8.headers['set-cookie']))

    const AuthUserPassResponse = await tryCatchWrapper(() => axios({
        method: 'post',
        url: 'https://login.usc.edu/login/authuserpassword',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: qs.stringify({
            'j_username': username,
            'j_password': password,
            '_eventId_proceed': '' 
        })
    }), "AUPRes");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(AuthUserPassResponse.headers['set-cookie']))
    
    // Then we have incorrect user/pass
    if (AuthUserPassResponse.data.indexOf('Sorry, your username and password do not match.') !== -1) {
        throw {
            isCustom: true,
            message: "Invalid username or password",
            code: "AUPRes"
        };
    }
    else if (AuthUserPassResponse.data.indexOf('Enroll in Two-Factor Authentication') !== -1) {
        console.log(`We need to decline 2FA`)
        const DUO2FAResponse = await tryCatchWrapper(() => axios({
            method: 'post',
            url: 'https://login.usc.edu/login/warning-ack',
            headers: genHeaders(allCookies),
            maxRedirects: 0,
            validateStatus: VS,
            data: qs.stringify({
                callback_object: getValueByDelimiters(AuthUserPassResponse.data, `aria-hidden="true" value='`, "'>")
            })
        }), "DUO2FAResponse");

        allCookies = accumulateCookies(allCookies, returnParsedCookies(DUO2FAResponse.headers['set-cookie']))
    }

    // Start Duo Flow
    // 'api-22627695.duosecurity.com','sig_request': '
    let TXValue = getValueByDelimiters(AuthUserPassResponse.data, "'api-22627695.duosecurity.com','sig_request': '", "'")
    let TXP1 = TXValue.split(':APP|')[0]//.split('TX|')[1]
    let TXP2 = TXValue.split(':APP|')[1]//.split('TX|')[1]
    const callback_object = getValueByDelimiters(AuthUserPassResponse.data, `<input type="hidden" id="callback_object" name="callback_object" aria-hidden="true"  value='`, "'>")

    let duoCookies = [];

    const F1Base = `https://api-22627695.duosecurity.com/frame/web/v1/auth?${qs.stringify({
        tx: TXP1
    })}&parent=https%3A%2F%2Flogin.usc.edu%2Flogin%2Fauthuserpassword&v=2.9`
    const Frame1Response = await tryCatchWrapper(() => axios({
        method: 'get',
        url: F1Base,
        headers: genHeaders(duoCookies),
        maxRedirects: 0,
        validateStatus: VS,
        httpsAgent: agent


    }), "Frame1Response");

    duoCookies = accumulateCookies(duoCookies, returnParsedCookies(Frame1Response.headers['set-cookie']))


    let F2Data = qs.stringify({
        'tx': TXP1,
        'parent': 'https://login.usc.edu/login/authuserpassword',
        'java_version': '',
        'flash_version': '',
        'screen_resolution_width': '1920',
        'screen_resolution_height': '1200',
        'color_depth': '24',
        'ch_ua_brands': '["+Not+A;Brand","Chromium","Google+Chrome"]',
        'ch_ua_mobile': 'false',
        'ch_ua_platform': 'Windows',
        'ch_ua_platform_version': '10.0.0',
        'ch_ua_full_version': '96.0.4664.110',
        'is_cef_browser': 'false',
        'is_ipad_os': 'false',
        'is_ie_compatibility_mode': '',
        'is_user_verifying_platform_authenticator_available': 'false',
        'user_verifying_platform_authenticator_available_error': '',
        'acting_ie_version': '',
        'react_support': 'true',
        'react_support_error_message': '' 
    });

    const Frame2Response = await tryCatchWrapper(() => axios({
        method: 'post',
        url: F1Base,
        headers: genHeaders(duoCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: F2Data,
        httpsAgent: agent
    }), "Frame2Response");

    duoCookies = accumulateCookies(duoCookies, returnParsedCookies(Frame2Response.headers['set-cookie']))

    //https://api-22627695.duosecurity.com/frame/prompt?sid=YzE5NjMxZjIwYmU1NGU2Mzk3YWE4NDhlOWM1MzVjNjM%3D%7C68.181.16.133%7C1641797206%7Cbf84e0d6ca5d7ff6ecd23497932b6a8341db81b0
    const FramePromptGetResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: `https://api-22627695.duosecurity.com${Frame2Response.headers.location}`,
        headers: genHeaders(duoCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: F2Data,
        httpsAgent: agent
    }), "FramePromptGetResponse");
    duoCookies = accumulateCookies(duoCookies, returnParsedCookies(FramePromptGetResponse.headers['set-cookie']))

    let sid = getValueByDelimiters(FramePromptGetResponse.data, '<input type="hidden" name="sid" value="', '">')
    sid = he.decode(sid)

    const FramePromptPostData = `${qs.stringify({
        sid: sid
    })}&device=phone1&factor=Duo+Push&out_of_date=&days_out_of_date=&days_to_block=None`

    const _xsrf = getValueByDelimiters(FramePromptGetResponse.data, 'name="_xsrf" value="', '"')

    const FramePromptPostResponse = await tryCatchWrapper(() => axios({
        method: 'post',
        url: `https://api-22627695.duosecurity.com/frame/prompt`,
        headers: genHeaders(duoCookies, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': `https://api-22627695.duosecurity.com${Frame2Response.headers.location}`,
            // 'X-Xsrftoken:': _xsrf
        }),
        maxRedirects: 0,
        validateStatus: VS,
        data: FramePromptPostData,
        httpsAgent: agent
    }), "FramePromptPostResponse");
    duoCookies = accumulateCookies(duoCookies, returnParsedCookies(FramePromptPostResponse.headers['set-cookie']))


    if (FramePromptPostResponse.data.stat === 'FAIL') throw "F"

    const txid = FramePromptPostResponse.data.response.txid

    console.log(txid)

    const FrameStatusPost1Response = await tryCatchWrapper(() => axios({
        method: 'post',
        url: `https://api-22627695.duosecurity.com/frame/status`,
        headers: genHeaders(duoCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: qs.stringify({
            sid,
            txid
        }),
        httpsAgent: agent
    }), "FrameStatusPost1Response");
    duoCookies = accumulateCookies(duoCookies, returnParsedCookies(FrameStatusPost1Response.headers['set-cookie']))
    console.log(FrameStatusPost1Response.data)

    return {
        allCookies,
        duoCookies,
        txid,
        sid,
        TXP2,
        callback_object,
        saml2Request,
        secondVisitUrl
    }
};

module.exports.getMyUscCookiesDuo1 = getMyUscCookiesDuo1;