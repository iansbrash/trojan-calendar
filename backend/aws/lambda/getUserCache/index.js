var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body:  JSON.stringify(event) //JSON.stringify(event),
    };
    
    const claims = event.requestContext.authorizer.claims;
    
    const userId = claims['cognito:username'];
    
    
    let res2 = {
        statusCode: 200,
        body: JSON.stringify(userId),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
    
    console.log(`userId: ${userId}`)
    
    const params = {
        TableName: 'trojandashUserData',
        Key:
        {
            "userId": userId,
            // "lastSynced": '1640622174567'
        }
    }
    
    let result = await docClient.query(params).promise();
    
    res2.body = JSON.stringify(result)
    
    return res2;
};
