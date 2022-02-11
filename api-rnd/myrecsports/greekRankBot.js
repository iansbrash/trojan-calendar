

const axios = require('axios');
const qs = require('qs');

(async () => {

    let numUpvotes = 10;

    const type = 'dislike' // || 'like'
    const id = '3015901'
    const item_id = '3134020'

    var data = qs.stringify({
        'id': id,
        'type': type,
        'item_type': '1',
        'item_id': item_id
    });

      
    var config = {
        method: 'post',
        url: 'https://www.greekrank.com/voting/getResult.php',
        headers: { 
        'authority': 'www.greekrank.com', 
        'pragma': 'no-cache', 
        'cache-control': 'no-cache', 
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"', 
        'dnt': '1', 
        'sec-ch-ua-mobile': '?0', 
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36', 
        'sec-ch-ua-platform': '"Windows"', 
        'content-type': 'application/x-www-form-urlencoded', 
        'accept': '*/*', 
        'origin': 'https://www.greekrank.com', 
        'sec-fetch-site': 'same-origin', 
        'sec-fetch-mode': 'cors', 
        'sec-fetch-dest': 'empty', 
        'referer': 'https://www.greekrank.com/uni/49/discussion/', 
        'accept-language': 'en-US,en;q=0.9', 
        },
        data : data
    };

    for (let i = 0; i < numUpvotes; i++) {
        let res = await axios(config);

        if (!res.data.includes('success')) {
            console.log("Error: " + res.data)
        }
        else {
            console.log("Added 1 " + type + " for a total of " + res.data.split('||')[1]);
        }
    }


})();

