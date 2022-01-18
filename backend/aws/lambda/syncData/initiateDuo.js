const AWS = require("aws-sdk");
const { getMyUscCookiesDuo1 } = require('./my.usc.edu/duo/getMyUscCookiesDuo1')


AWS.config.update({
    region: "us-east-1",
});
var docClient = new AWS.DynamoDB.DocumentClient()

const initiateDuo = async (event) => {
    const claims = event.requestContext.authorizer.claims;

    const lastsynced = event.headers['lastsynced'] + ''
    
    const userId = claims['cognito:username'];

    if (!lastsynced) {
        console.log(`lastsynced: ${lastsynced} is not provided`)
        return {
            statusCode: 400,
            body: JSON.stringify("Error: lastsynced is not provided"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    
    
    if (!event.body) {
        console.log(`event.body missing`)
        return {
            statusCode: 400,
            body: JSON.stringify("Error: event.body is not provided"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    
     const {
        username,
        password
    } = JSON.parse(event.body)
    
    if (!username || !password) {
        console.log(`username/password: ${username}/${password} is not provided`)
        return {
            statusCode: 400,
            body: JSON.stringify("Error: username/password is not provided"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    
    // Other Notes:
    // We should have a strict error throwing setup here since there is a lot that could go wrong
    
    // Flow:
    // 1). Ensure we actually can sync (not just a forged request)
    // 2). Get My.Usc.Edu cookie
    // 3). Do Promise.all() on Blackboard, Gradescope, and Calendar
    //      If anything goes wrong, throw an error.
    //      On another note, we could simply ignore the errors and only return valid data
    //      We'd have to update our database a little bit so it knows the data source (i.e. each assignment has a 'source' attribute that corresponds to Blackboard, Gradescope, USCDen, etc)
    // 4). Once all the promises are resolved, bundle them into a cache object
    // 5). Update the cache object in the database
    // 6). Update the 'lastSynced' attribute in the user's storage
    // 7). Return the object in the response
    
    const params = {
        TableName: 'trojandashUserData',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId,
        }
    }
    
    let result = await docClient.query(params).promise();
    
    if (result.Items.length === 0) {
        return {
            statusCode: 400,
            body: JSON.stringify("Error: userId can't be found"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    // If it is me :)
    else if (result.Items[0].userId === '30d7eee8-a37d-40ef-b3aa-038f6a1b2883') {}
    // If we still can't sync
    else if (Date.now() - parseInt( result.Items[0].lastSynced) < delayBetweenSync) {
        return {
            statusCode: 420,
            body: JSON.stringify("Error: Rate Limit"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    else {
        return {
            statusCode: 469,
            body: JSON.stringify("Error: You are not that guy"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    
    // So now we are sure we have authority to sync
    // We do something with our USC user/pass

    // const username = 'brash@usc.edu';
    // const password = 'fL&AX3%m7p3^1q8H';
    
    let bundledData;
    try {
        bundledData = await getMyUscCookiesDuo1(username, password)
    }
    catch (err) {
        if (err.code === 'AUPRes') {
            return {
                statusCode: 404,
                body: JSON.stringify("Error: user/pass is incorrect"),
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        }
    }

    let updateParams = {
        TableName: 'trojandashUserData',
        Key:
        {
            "userId": userId,
        },
        UpdateExpression: "set #bd = :bd",
        ExpressionAttributeNames:{
            "#bd": "bundledData",
        },
        ExpressionAttributeValues:{
            ":bd": bundledData,
        },
        ReturnValues:"UPDATED_NEW"
    }

    let updateResult = await docClient.update(updateParams).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(true),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}

module.exports.initiateDuo = initiateDuo;