const { getMyUscCookiesDuo1 } = require("../getMyUscCookiesDuo1");
const { username, password } = require('../../private/usclogin');
const qs = require('qs');
const he = require('he');

(async () => {
    // From GetValueByDelim
    // console.log(he.decode('OTc5NWRkOTg0ZGNlNGZiNDgxNWI4ZjY2MjFjMGM4YzM&#x3d;&#x7c;68.181.16.133&#x7c;1641797150&#x7c;7bc5d6187d78e693fbfde444ccdc9f2d8a98b4e3'))

    // From Prompt Data
    // console.log(qs.parse('x=OTc5NWRkOTg0ZGNlNGZiNDgxNWI4ZjY2MjFjMGM4YzM%3D%7C68.181.16.133%7C1641797150%7C7bc5d6187d78e693fbfde444ccdc9f2d8a98b4e3')['x'])
    // console.log(`OTc5NWRkOTg0ZGNlNGZiNDgxNWI4ZjY2MjFjMGM4YzM=|68.181.16.133|1641797150|7bc5d6187d78e693fbfde444ccdc9f2d8a98b4e3`)
    console.log(qs.parse('h=%26%23x3d%3B%26%23x7c%3B'))
    let allCookies = await getMyUscCookiesDuo1(username, password);

    console.log(allCookies)
})();