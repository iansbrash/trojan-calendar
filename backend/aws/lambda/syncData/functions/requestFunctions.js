const getNumberOfRedirects = (res ) => {
    return res.request._redirectable._redirectCount
}
module.exports.getNumberOfRedirects = getNumberOfRedirects;

// takes the string to parse, and strings to delimit the value we want to find
const getValueByDelimiters = (data, start , end )  => {
    const delimiterStartLength = start.length;
    const delimiterStartIndex = data.indexOf(start);
    const dataStartSubstring = data.substring(delimiterStartIndex + delimiterStartLength);
    const delimiterDifference = dataStartSubstring.indexOf(end);
    return dataStartSubstring.substring(0, delimiterDifference);
}
module.exports.getValueByDelimiters = getValueByDelimiters;

// takes a cookie or cookie[] that is unparsed
// i.e. test=123 path="/" expires="123123"
// returns the cookie by itself in an array
 const returnParsedCookies = (cookieArray  ) => {

    if (cookieArray === '' || cookieArray === [] || cookieArray === undefined) {
        return [];
    }

    // is array
    if (Array.isArray(cookieArray)){
        let arr = [];

        for (let i = 0; i < cookieArray.length; i++){
    
            let cookie = cookieArray[i];
    
            let toAppend = cookie.substring(0, cookie.indexOf(';'));
            if (toAppend.substring(toAppend.length - 2) === '""'){
                // console.log('Shitty cookie. Discarding.')
            }
            else {
                arr.push(toAppend);
            }
        }
    
        return arr;
    }
    // is individual cookie
    else {
        let cookie = cookieArray;
    
        let toAppend = cookie.substring(0, cookie.indexOf(';'));
        return [toAppend];
    }
}
module.exports.returnParsedCookies = returnParsedCookies;

// takes an array of parsed cookies and joins them together
 const joinCookies = (cookiesArray)  => {


    return cookiesArray.join('; ');
}
module.exports.joinCookies = joinCookies;


// feed in set-cookie array after parsing with returnParsedCookies
// replaces any cookies that already exist
// returns a string[]
 const accumulateCookies = (originalCookieArray, setCookieArray) => {
    
    // returns AWSALB= or dtCookie= etc
    const parseForEquals = (cookie ) => {
        return cookie.substring(0, cookie.indexOf('=') + 1)//.toLowerCase(); ;
    }

    let newOriginalCookieArray;
    let cookiesToAddArray;

    if (!Array.isArray(originalCookieArray)) {
        newOriginalCookieArray = [originalCookieArray];
    }
    else {
        newOriginalCookieArray = originalCookieArray;
    }

    if (!Array.isArray(setCookieArray)) {
        cookiesToAddArray = [setCookieArray];
    }
    else {
        cookiesToAddArray = setCookieArray;
    }

    let newCookieArray = [];

    // Loop over the cookies we got from the most recent request
    cookiesToAddArray.forEach(newCookie => {

        // Isolate the cookie's name plus an equals sign
        // i.e. AWSALB=07 turns into AWSALB=
        const newParsedCookie = parseForEquals(newCookie);

        // We want to check for the number of occurences of this cookie's name
        // Ideally, we want ct to equal the size of our original cookie array 
        // so we can add the cookie to our original cookie array without any collision consequences.
        // This is because ct tracks the # of times we don't have a match between the cookie we're iterating over
        // And the original cookies
        let ct = 0;

        // This is just a copy of the old cookie array we passed into the function as the first param
        newOriginalCookieArray.forEach(origCookie => {

            // If the old cookie's name equals the new cookie's name 
            if (parseForEquals(origCookie) === newParsedCookie //.substring(0, newParsedCookie.length) 
            
            // JESUS CHRSIT THIS IS BAD
            // && !newParsedCookie.toLowerCase().includes('jsessionid')
            // && newParsedCookie !== 'WWTRBQJP='
            // && newParsedCookie !== 'AWSALB='
            // && newParsedCookie !== 'AWSALBCORS='
            // && !newParsedCookie.includes('shibsession')
            // && !newParsedCookie.includes('shibstate')

            ) {

                // console.log("Found a duplicate cookie! " + `${origCookie.substring(0, newParsedCookie.length)} === ${newParsedCookie}`)

                newCookieArray.push(newCookie)
            }
            else {
                ct += 1;
            }
        })

        if (ct === newOriginalCookieArray.length){
            newCookieArray.push(newCookie)
        }
    })

    // We once again loop over the old cookie array
    // This has remained unchanged thus far
    newOriginalCookieArray.forEach(origCookie => {

        let ct = 0;

        // AWSALB=07 turns into AWSALB=
        const origCookieParsed = parseForEquals(origCookie);

        // Iterate over newCookieArray,
        // Which should only contain cookies that we
        // want to override in our old cookie array
        // i.e. our old cookie array contains JSESSIONID
        // and our cookies array from the latest request also contains JSESSIONID
        // Therefore, we added JSESSIONID to newCookieArray because they both contain it
        for (let i = 0; i < newCookieArray.length; i++){

            // Here, we iterate over newCookieArray because we're adding the non-collisions in newOriginalCookieArray
            // to newCookieArray (because we want to preserve the old cookies obviously)
            if (newCookieArray[i].substring(0, origCookieParsed.length) === origCookieParsed

            // This accounts for the edge case where we have multiple JSESSIONIDs which is weird af
            && (!newCookieArray[i].includes('JSESSIONID'))
            && (!newCookieArray[i].includes('WWTRBQJP'))
            ) {
                ct += 1;
            }
        }

        // If there are 0 collisions in cookie name
        if (ct === 0) {
            newCookieArray.push(origCookie);
        }
    })

    return newCookieArray;
}
module.exports.accumulateCookies = accumulateCookies;


const convertCookieArrayToObject = (cookieArray) => {
    let toReturnObject = {};

    cookieArray.forEach((cookie ) => {
        let indexOfEquals = cookie.indexOf('=');
        let cookieName = cookie.substring(0, indexOfEquals);
        let cookieValue = cookie.substring(indexOfEquals + 1);

        toReturnObject[cookieName] = cookieValue;
    })
    
    
    return toReturnObject;
}
module.exports.convertCookieArrayToObject = convertCookieArrayToObject;

const VS = (status) => status < 303 && status >= 200;

module.exports.VS = VS;
