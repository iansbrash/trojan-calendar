const { joinCookies } = require('../functions/requestFunctions');

const genHeaders = (allCookies, optionalHeaders) => {
    let headers = {
        'Connection': 'keep-alive', 
        'Pragma': 'no-cache', 
        'Cache-Control': 'no-cache', 
        'DNT': '1', 
        'Upgrade-Insecure-Requests': '1', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36', 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
        'Sec-Fetch-Site': 'none', 
        'Sec-Fetch-Mode': 'navigate', 
        'Sec-Fetch-User': '?1', 
        'Sec-Fetch-Dest': 'document', 
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
        'sec-ch-ua-mobile': '?0', 
        'Accept-Language': 'en-US,en;q=0.9', 
        cookie: joinCookies(allCookies)
    }

    if (optionalHeaders) {
        headers = {
            ...headers,
            ...optionalHeaders
        }
    }

    return headers;
}

module.exports.genHeaders = genHeaders;