const { initiateDuo } = require('./initiateDuo')
const { confirmDuo } = require('./confirmDuo')
const { fetchData } = require('./fetchData')


exports.handler = async (event) => {


    if (!event.queryStringParameters) {
        return {
            statusCode: 400,
            body: JSON.stringify("Error: no querystrings provided"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    else {
        switch (parseInt( event.queryStringParameters.stage )) {
            case 1:
                try {
                    const iDuoRes = await initiateDuo(event);

                    return iDuoRes;
                }
                catch (err) {
                    console.log(err)
                    return {
                        statusCode: 400,
                        body: JSON.stringify("Error: error in initiateDuo"),
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        }
                    }
                }
            case 2:
                try {
                    const confirmDuoRes = await confirmDuo(event);

                    return confirmDuoRes;
                }
                catch (err) {
                    console.log(err)
                    return {
                        statusCode: 400,
                        body: JSON.stringify("Error: error in confirmDuo"),
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        }
                    }
                }
            case 3:
                try {
                    const fetchDataRes = await fetchData(event);

                    return fetchDataRes;
                }
                catch (err) {
                    console.log(err)
                    return {
                        statusCode: 400,
                        body: JSON.stringify("Error: error in fetchData"),
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        }
                    }
                }
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify("Error: Incorrect stage number"),
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }
        }
    }
};
