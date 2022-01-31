var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    if (!event.body) return {
        statusCode: 400,
        body: "Error: No body",
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }

    const userId = event.requestContext.authorizer.claims['cognito:username'];

    const getParams = {
        TableName: 'trojandashUserData',
        Key:
        {
            "userId": userId,
        }
    }
    
    let getResult = await docClient.get(getParams).promise();

    if (!getResult.Item) return {
        statusCode: 400,
        body: "Error: User does not exist",
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }

    const {
        settings
    } = JSON.parse(event.body)


    // Don't allow blank notes
    if (!settings) {
        console.log('Recieved no settings note.')
        return {
            statusCode: 400,
            body: "Error: settings is blank",
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    let updateParams = {
        TableName: 'trojandashUserData',
        Key:
        {
            "userId": userId,
        },
        UpdateExpression: "set #st.#se.#nt = :f",
        ExpressionAttributeNames:{
            "#st": "storage",
            "#se": "settings",
            "#nt": "needsTutorial"
        },
        ExpressionAttributeValues:{
            ":f": false,
        },
        ReturnValues:"UPDATED_NEW"

    }

    try {
        let updateResult = await docClient.update(updateParams).promise();
    }
    catch (err) {
        console.log(err)
        return {
            statusCode: 400,
            body: "Error: could not update notes",
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(true),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };
    return response;
};
