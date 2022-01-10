const axios = require("axios");
const { 
    getValueByDelimiters, 
    accumulateCookies, 
    returnParsedCookies, 
    joinCookies, 
    convertCookieArrayToObject, 
    VS 
} = require("../functions/requestFunctions");
const qs = require('qs');
const he = require('he')
const { tryCatchWrapper } = require('../functions/tryCatchWrapper');
const { genHeaders } = require('./genHeaders');

// Returns the array of the 2 cookies ASP.NET_SessionId and WWTRBQJP which are required for requests on the WebReg server
// i.e. ['ASP.NET_SessionId=1epqh13zrhdpjtv2zb2lli30', 'WWTRBQJP=0297a45327-1bed-4fkW6stxdAgJdIKmtcIHo74mRJ62zGbETklAwdPDRXbCA_JapSKCybQmjh1vAv8nthd5c']
const getMyUscCookiesDuo1 = async (username, password) => {
    let allCookies = [];

    const SAMLCookieResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://my.usc.edu/',
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

    let duoCookies = [];

    const F1Base = `https://api-22627695.duosecurity.com/frame/web/v1/auth?${qs.stringify({
        tx: TXP1
    })}&parent=https%3A%2F%2Flogin.usc.edu%2Flogin%2Fauthuserpassword&v=2.9`
    const Frame1Response = await tryCatchWrapper(() => axios({
        method: 'get',
        url: F1Base,
        headers: genHeaders(duoCookies),
        maxRedirects: 0,
        validateStatus: VS
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
        data: F2Data
    }), "Frame2Response");

    duoCookies = accumulateCookies(duoCookies, returnParsedCookies(Frame2Response.headers['set-cookie']))

    //https://api-22627695.duosecurity.com/frame/prompt?sid=YzE5NjMxZjIwYmU1NGU2Mzk3YWE4NDhlOWM1MzVjNjM%3D%7C68.181.16.133%7C1641797206%7Cbf84e0d6ca5d7ff6ecd23497932b6a8341db81b0
    const FramePromptGetResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: `https://api-22627695.duosecurity.com${Frame2Response.headers.location}`,
        headers: genHeaders(duoCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: F2Data
    }), "FramePromptGetResponse");
    duoCookies = accumulateCookies(duoCookies, returnParsedCookies(FramePromptGetResponse.headers['set-cookie']))


    let sid = getValueByDelimiters(FramePromptGetResponse.data, '<input type="hidden" name="sid" value="', '">')
    sid = he.decode(sid)

    const FramePromptPostData = `${qs.stringify({
        sid: sid
    })}&device=phone1&factor=Duo+Push&out_of_date=&days_out_of_date=&days_to_block=None`

    // const FramePromptPostData = `sid=${sid}&device=phone1&factor=Duo+Push&out_of_date=&days_out_of_date=&days_to_block=None`
    console.log(FramePromptPostData)

    const _xsrf = getValueByDelimiters(FramePromptGetResponse.data, 'name="_xsrf" value="', '"')
    console.log(`_xsrf: ${_xsrf}`)
    console.log(duoCookies)

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
        data: FramePromptPostData
    }), "FramePromptPostResponse");

    console.log(FramePromptPostResponse.data)
    console.log(FramePromptPostResponse.status)

    //'https://api-22627695.duosecurity.com/frame/prompt',




    //https://login.usc.edu/sso/saml2/continue/metaAlias/USCRealm/idp
    const Res81 = await tryCatchWrapper(() =>  axios({
        method: 'get',
        url: `https://login.usc.edu/sso/saml2/continue/metaAlias/USCRealm/idp`,
        headers: genHeaders(allCookies),
        validateStatus: VS,
        maxRedirects: 0
    }), "Res8.1");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res81.headers['set-cookie']))

    //https://login.usc.edu/sso/js/saml2-read.js
    const SAML2ReadResponse = await tryCatchWrapper(() =>  axios({
        method: 'get',
        url: `https://login.usc.edu/sso/js/saml2-read.js`,
        headers: genHeaders(allCookies, {
            referer: 'https://login.usc.edu/sso/saml2/continue/metaAlias/USCRealm/idp'
        }),
        validateStatus: VS,
        maxRedirects: 0
    }), "SAML2Read");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(SAML2ReadResponse.headers['set-cookie']))

    // https://login.usc.edu/sso/SSORedirect/metaAlias/USCRealm/idp?ReqID=_b6555c46a49558a1050fbce08796b158&index=null&acsURL=https://shibboleth.usc.edu/idp/sp/Shibboleth.sso/SAML2/POST&spEntityID=https://shibboleth.usc.edu/idp/sp&binding=urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST
    const Res9 = await tryCatchWrapper(() => axios({
        method: 'post', 
        //'get',
        url:   `https://login.usc.edu${secondVisitUrl}`,
        //AuthUserPassResponse.headers.location,
        headers: genHeaders(allCookies, {
            referer: 'https://login.usc.edu/sso/saml2/continue/metaAlias/USCRealm/idp'
        }),
        data: qs.stringify({
            saml2Request: saml2Request
        }),
        maxRedirects: 0,
        validateStatus: VS,
    }), "Res9");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res9.headers['set-cookie']))



    let Res10SAMLResponse = getValueByDelimiters(Res9.data, '<input type="hidden" name="SAMLResponse" value="', '"') 
    let Res10RelayState = getValueByDelimiters(Res9.data, 'name="RelayState" value="', '"')

    let newRelayState = getValueByDelimiters(Res9.data, '<input type="hidden" name="RelayState" value="', '"')
    newRelayState = he.decode(newRelayState);

    const Res10 = await tryCatchWrapper(() => axios({
        method: 'post',
        url: 'https://shibboleth.usc.edu/idp/sp/Shibboleth.sso/SAML2/POST',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: () => true,
        data:
            qs.stringify({
                'SAMLResponse': he.decode(Res10SAMLResponse), //encodeURIComponent(Res10SAMLResponse),
                'RelayState': newRelayState
            })
    }), "Res10");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res10.headers['set-cookie']))

    const Res11 = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://shibboleth.usc.edu/idp/sp/login?conversation=e1s2',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "Res11");


    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res11.headers['set-cookie']))


    // 'https://shibboleth.usc.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s2&_eventId_proceed=1'
    const Res12 = await tryCatchWrapper(() => axios({
        method: 'post',
        url: Res11.headers.location,
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "Res12");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res12.headers['set-cookie']))

    // https://shibboleth.usc.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s3
    // https://shibboleth.usc.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s3
    // idp/profile/SAML2/Redirect/SSO?execution=e1s3
    const Res13 = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://shibboleth.usc.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s3',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "Res13");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res13.headers['set-cookie']))


    const Res14 = await tryCatchWrapper(() => axios({
        method: 'post',
        url: 'https://shibboleth.usc.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s3',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: 'shib_idp_ls_exception.shib_idp_session_ss=&shib_idp_ls_success.shib_idp_session_ss=true&_eventId_proceed='
    }), "Res14");



    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res14.headers['set-cookie']))
    let Res15SAMLResponse = getValueByDelimiters(Res14.data, '<input type="hidden" name="SAMLResponse" value="', '"') 
    let Res15RelayState = getValueByDelimiters(Res14.data, '<input type="hidden" name="RelayState" value="', '"')


    const Res15 = await tryCatchWrapper(() => axios({
        method: 'post',
        url: 'https://my.usc.edu/portal/Shibboleth.sso/SAML2/POST', //'https://my.usc.edu/portal/Shibboleth.sso/SAML2/POST',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data:
            qs.stringify({
                'SAMLResponse': he.decode(Res15SAMLResponse), //encodeURIComponent(Res10SAMLResponse),
                'RelayState': he.decode(Res15RelayState)
            })
    }), "Res15");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(Res15.headers['set-cookie']))


    const AuthorizationResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://my.usc.edu/wp-login.php?redirect_to=%2F', //'https://my.usc.edu/portal/Shibboleth.sso/SAML2/POST',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus:  VS,
    }), "AuthRes");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(AuthorizationResponse.headers['set-cookie']))


    return allCookies;//returnParsedCookies(AuthorizationResponse.headers['set-cookie']);
};

module.exports.getMyUscCookiesDuo1 = getMyUscCookiesDuo1;