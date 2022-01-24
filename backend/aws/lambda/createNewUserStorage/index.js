var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {

    const userId = event.userName;

    const putParams = {
        TableName: 'trojandashUserData',
        Item: {
            "userId": userId,
            "lastSynced": 0,
            "timesSynced": 0,
            "cache": {
                "schedule": {
                    "wednesday": [],
                    "thursday": [],
                    "friday": [],
                    "tuesday": [],
                    "monday": []
                },
                "assignments": {
                    "blackboard": [],
                    "gradescope": []
                },
                "grades": {
                    "blackboard": {},
                    "gradescope": {}
                },
                "announcements": {
                    "blackboard": []
                }
            },
            "storage": {
                "settings": {
                    "needsTutorial": true
                },
                "notes": []
            }
        }
    }

    try {
        const putResult = await docClient.put(putParams).promise();
    }
    catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify('Error putting'),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    callback(null, event);
};
