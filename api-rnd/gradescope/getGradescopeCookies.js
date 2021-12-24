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


const getGradescopeCookies = async (bbCookies) => {
    let allCookies = bbCookies;

    // As it turns out, this is kinda irrelevant
    const course_id = `_251705_1`;

    // This is very relevant. This value works.
    const blti_placement_id= `_237_1`

    const LaunchPlacementResponse = await tryCatchWrapper(() => axios({
        method: 'get',
        url: `https://blackboard.usc.edu/webapps/blackboard/execute/blti/launchPlacement?blti_placement_id=${blti_placement_id}&course_id=${course_id}`,
        headers: genHeaders(allCookies),
        maxRedirects: 0,
        validateStatus: VS,
    }), "LaunchPlacementResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(LaunchPlacementResponse.headers['set-cookie']));

    const shortenedData = LaunchPlacementResponse.data.substring(LaunchPlacementResponse.data.indexOf('<form method="POST" name="bltiLaunchForm" action="https://www.gradescope.com/auth/lti/callback"'))

    let LTIData = {
        'tool_consumer_info_product_family_code': '', //'BlackboardLearn',
        'custom_blackboard_course_shortname': '', //'20213_math_225_39541',
        'context_title': '', //'20213_math_225_39541:+Linear+Algebra+and+Linear+Differential+Equations',
        'roles': '', //'urn:lti:role:ims/lis/Learner',
        'lis_person_name_family': '', //'Brash',
        'tool_consumer_instance_name': '', //'University+of+Southern+California',
        'tool_consumer_instance_guid': '', //'2d9c6efeed7c4a1fb8b19ac174157ffa',
        'custom_blackboard_course_name': '', //'20213_math_225_39541:+Linear+Algebra+and+Linear+Differential+Equations',
        'resource_link_id': '', //'_275718_1gradescope',
        'oauth_signature_method': '', //'HMAC-SHA1',
        'oauth_version': '', //'1.0',
        'ext_fnds_user_id': '', //'2603ede1-e12e-11eb-aa5c-1fc81e3588fe',
        'custom_caliper_profile_url': '', //'https://blackboard.usc.edu/learn/api/v1/telemetry/caliper/profile/_275718_1gradescope',
        'launch_presentation_return_url': '', //'https://blackboard.usc.edu/webapps/blackboard/execute/blti/launchReturn?course_id=_275718_1&nonce=2165f4715b75487d9d6f8e8f43e1c108&launch_id=885d0765-f1dc-48ae-8da9-1b5fcc4df996&link_id=_275718_1gradescope&launch_time=1640300835629',
        'ext_launch_id': '', //'885d0765-f1dc-48ae-8da9-1b5fcc4df996',
        'ext_fnds_tenant_id': '', //'e113d537-b9c5-41e0-8299-e6bca979e17e',
        'ext_lms': '', //'bb-3900.28.0-rel.22+1a80aa0',
        'lti_version': '', //'LTI-1p0',
        'custom_launch_url': '', //'https://www.gradescope.com/auth/lti/callback',
        'lis_person_contact_email_primary': '', //'brash@usc.edu',
        'oauth_signature': '', //'9urq+B2ZUuLT+g0ANKKbzAGlQqU=',
        'tool_consumer_instance_description': '', //'University+of+Southern+California',
        'ext_fnds_course_id': '', //'15713855-e18b-11eb-af8b-b5c7b4617588',
        'oauth_consumer_key': '', //'253_blackboard',
        'launch_presentation_locale': 'en-US',
        'custom_caliper_federated_session_id': '', //'https://caliper-mapping.cloudbb.blackboard.com/v1/sites/4da0a596-99be-4a6d-b4ce-2f9313e6c492/sessions/5556C64A669F92664A98043091B31E07',
        'custom_blackboard_course_membership_role': '', //'S',
        'lis_person_sourcedid': '', //'brash',
        'oauth_timestamp': '', //'1640300835',
        'lis_person_name_full': '', //'Ian+Brash',
        'tool_consumer_instance_contact_email': '', //'blackboard@usc.edu',
        'custom_lms_name': '', //'blackboard',
        'lis_person_name_given': '', //'Ian',
        'custom_tc_profile_url': '', //'https://blackboard.usc.edu/learn/api/v1/lti/profile?lti_version=LTI-1p0',
        'custom_gs_school_id': '', //'253',
        'oauth_nonce': '', //'363213531048535',
        'lti_message_type': '', //'basic-lti-launch-request',
        'user_id': '', //'f22e6717ea2e4f958864dbe8aba50b39',
        'oauth_callback': '', //'about:blank',
        'tool_consumer_info_version': '', //'3900.28.0-rel.22+1a80aa0',
        'custom_blackboard_course_id': '', //'_275718_1',
        'context_id': '', //'681b7c0ebb0d490abb9c630e3d724175',
        'custom_blackboard_user_id': '', //'_397301_1',
        'context_label': '', //'20213_math_225_39541',
        'launch_presentation_document_target': '', //'window',
        'ext_launch_presentation_css_url': '', //'https://blackboard.usc.edu/common/shared.css,https://blackboard.usc.edu/themes/as_2015/theme.css' 
    };

    Object.keys(LTIData).forEach(k => LTIData[k] = getValueByDelimiters(shortenedData, `<input type="hidden" name="${k}" id="${k}" value="`, '"      />'))

    console.log(LTIData)

    const GSCallbackResponse = await tryCatchWrapper(() => axios({
        method: 'post',
        url: 'https://www.gradescope.com/auth/lti/callback',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
          },
        maxRedirects: 0,
        validateStatus: VS,
        data: qs.stringify(LTIData)
    }), "GSCallbackResponse");

    allCookies = accumulateCookies(allCookies, returnParsedCookies(GSCallbackResponse.headers['set-cookie']));

    console.log(GSCallbackResponse)

    return returnParsedCookies(GSCallbackResponse.headers['set-cookie']);
}

module.exports.getGradescopeCookies = getGradescopeCookies;