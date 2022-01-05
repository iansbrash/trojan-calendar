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
        noteId
    } = JSON.parse(event.body)

    let oldNotes = getResult.Item.storage.notes;
    
    let oldNotesWithoutDeletedNote = oldNotes.filter(n => n.noteId !== noteId)

    let updateParams = {
        TableName: 'trojandashUserData',
        Key:
        {
            "userId": userId,
        },
        UpdateExpression: "set #s.#n = :n",
        ExpressionAttributeNames:{
            "#s": "storage",
            "#n": "notes"
        },
        ExpressionAttributeValues:{
            ":n": oldNotesWithoutDeletedNote,
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
            body: "Error: could not delete note",
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(oldNotesWithoutDeletedNote),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };
    return response;
};
