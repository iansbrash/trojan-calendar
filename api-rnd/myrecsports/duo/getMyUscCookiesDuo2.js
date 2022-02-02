const axios = require("axios");
const { 
    getValueByDelimiters, 
    accumulateCookies, 
    returnParsedCookies, 
    VS 
} = require("./functions/requestFunctions");
const qs = require('qs');
const he = require('he')
const { tryCatchWrapper } = require('./functions/tryCatchWrapper');
const { genHeaders } = require('./functions/genHeaders');
const httpsProxyAgent = require('https-proxy-agent');

const getMyUscCookiesDuo2 = async (bundledData) => {

    const agent = new httpsProxyAgent('http://xyzh357:pn535cjrgogjp@104.165.255.88:3128') //'http://xyzh357:ick430azcjdja@104.165.255.100:3128'

    let {
        allCookies,
        sid,
        txid,
        TXP2,
        callback_object,
        saml2Request,
        secondVisitUrl
    } = bundledData;

    let duoCookies = []

    const FrameStatusPost2Response = await tryCatchWrapper(() => axios({
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
    }), "FrameStatusPost2Response");


    const FrameStatusPost3Response = await tryCatchWrapper(() => axios({
        method: 'post',
        url: `https://api-22627695.duosecurity.com/frame/status/${txid}`,
        headers: genHeaders(duoCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: qs.stringify({
            sid,
        }),
        httpsAgent: agent
    }), "FrameStatusPost3Response");



    let PostAuthDuoResponseData = qs.stringify({
        'duo_response': `${FrameStatusPost3Response.data.response.cookie}:APP|${TXP2}`,
        'callback_object': callback_object,
        '_eventId_proceed': ''
    })

    const PostAuthDuoResponse = await tryCatchWrapper(() => axios({
        method: 'post',
        url: `https://login.usc.edu/login/authduo`,
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
        data: PostAuthDuoResponseData
    }), "PostAuthDuoResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(PostAuthDuoResponse.headers['set-cookie']))



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
        url: 'https://myrecsports.usc.edu/Shibboleth.sso/SAML2/POST', //'https://my.usc.edu/portal/Shibboleth.sso/SAML2/POST',
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


    const ShibState2 = await tryCatchWrapper(() => axios({
        method: 'get',
        url: Res15.headers['location'], //'https://my.usc.edu/portal/Shibboleth.sso/SAML2/POST',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "ShibState2");


    


    allCookies = accumulateCookies(allCookies, returnParsedCookies(ShibState2.headers['set-cookie']))


    const AuthorizationResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: 'https://myrecsports.usc.edu/Account/ExternalLoginCallback?ReturnUrl=%2F', //'https://my.usc.edu/portal/Shibboleth.sso/SAML2/POST',
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus:  VS,
    }), "ReturnUrlResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(AuthorizationResponse.headers['set-cookie']))



    return allCookies//AuthorizationResponse.data;
};

module.exports.getMyUscCookiesDuo2 = getMyUscCookiesDuo2;