var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
});
var docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
    
    const claims = event.requestContext.authorizer.claims;
    const userId = claims['cognito:username'];
    
    var getParams = {
        TableName: 'trojandashUserData',
        Key:{
            "userId": userId
        }
    };
    
    let result = await docClient.get(getParams).promise();
    
    if (result.Item === null || result.Item === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Error: userId can't be found"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    
    let checkSyncResponse = {
        statusCode: 200,
        body: JSON.stringify({
            canSync: true,
            lastSynced: result.Item['lastSynced']
        }),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
    
    return checkSyncResponse;
};
