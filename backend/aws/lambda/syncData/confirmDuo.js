const { getMyUscCookiesDuo2 } = require('./my.usc.edu/duo/getMyUscCookiesDuo2');
var AWS = require("aws-sdk");



AWS.config.update({
    region: "us-east-1",
});
var docClient = new AWS.DynamoDB.DocumentClient()

const confirmDuo = async (event) => {

    const claims = event.requestContext.authorizer.claims;

    const userId = claims['cognito:username'];



    let getParams = {
        TableName: 'trojandashUserData',
        Key:
        {
            "userId": userId
        }
    }

    let getResult;

    try {
        getResult = await docClient.get(getParams).promise();
    }
    catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify("Error: error getting userData"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    if (!getResult.Item || !getResult.Item.bundledData) {
        return {
            statusCode: 400,
            body: JSON.stringify("Item or Item.bundledData does not exist"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    let myusccookies;

    try {
        console.log("Starting DuoP2")
        myusccookies = await getMyUscCookiesDuo2(getResult.Item.bundledData)
    }
    catch (err) {
        if (err.isCustom) {
            return {
                statusCode: 400,
                body: JSON.stringify(err.message),
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        }
        else {
            return {
                statusCode: 400,
                body: JSON.stringify("error in duop2"),
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
        UpdateExpression: "set #mc = :mc",
        ExpressionAttributeNames:{
            "#mc": "myUscCookies",
        },
        ExpressionAttributeValues:{
            ":mc": myusccookies,
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

module.exports.confirmDuo = confirmDuo;