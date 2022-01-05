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
        noteTitle,
        noteContent,
        noteId
    } = JSON.parse(event.body)


    // Don't allow blank notes
    if (noteTitle === '' || noteContent === '') {
        console.log('Recieved blank note.')
        return {
            statusCode: 400,
            body: "Error: Note title or content cannot be blank",
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    let oldNotes = getResult.Item.storage.notes;
    
    let toDeleteIndex = oldNotes.findIndex((element, index, array) => element.noteId === noteId )
    
    oldNotes[toDeleteIndex] = {
        noteTitle: noteTitle,
        noteContent: noteContent,
        noteId: noteId
    }

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
            ":n": oldNotes,
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
        body: JSON.stringify(oldNotes),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };
    return response;
};
