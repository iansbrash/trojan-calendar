var AWS = require("aws-sdk");
const { getBlackboardRouter } = require("./blackboard/getBlackboardRouter");
const { getGSAssignmentsAndGrades } = require("./gradescope/getGSAssignmentsAndGrades");
const { getMyUscCookies } = require("./my.usc.edu/getMyUscCookies");
const { getMyUscCalendar } = require('./my.usc.edu/getMyUscCalendar');
const { getBlackboardAssignments } = require("./blackboard/getBlackboardAssignments");
const { getBlackboardGrades } = require('./blackboard/getBlackboardGrades')
const { getGradescopeCookies } = require("./gradescope/getGradescopeCookies");
const { getBlackboardClasses } = require("./blackboard/getBlackboardClasses");
const { getGradescopeClasses } = require("./gradescope/getGradescopeClasses");

AWS.config.update({
    region: "us-east-1",
});
var docClient = new AWS.DynamoDB.DocumentClient()

const delayBetweenSync = 86400000 / 2; // one day, then divded by 2

exports.handler = async (event) => {
    
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
    
    let myUscCookies;
    try {
        myUscCookies = await getMyUscCookies(username, password)
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
    
    

    // fuck this
    const schedulePromise = new Promise((resolve, reject) => {
        getMyUscCalendar(myUscCookies).then(v => {
            resolve(v)
        }).catch(e => {
            reject(e)
        })
    }) 

    const bbRouterPromise = new Promise(async (resolve, reject) => {
        let blackboardRouterCookies = await getBlackboardRouter(myUscCookies);

        let bbClasses = await getBlackboardClasses(blackboardRouterCookies);

        let promiseArray = [
            
            // Gradescope Assignments + Grades
            new Promise(async (resolve, reject) => {

                
                // \|/ GRADESCOPE \|/
                try {

                    if (Object.keys(bbClasses).length === 0) {
                        console.log('Resolving because bbClasses.length === 0')
                        resolve({
                            assignments: [
                                
                            ],
                            grades: {
                    
                            },
                        })
                    }
                    
                    console.log(`bbClasses`)
                    console.log(bbClasses)

                    console.log('About to call getGradescopeCookies')
                    let gsResponse = await getGradescopeCookies(blackboardRouterCookies, bbClasses['20213'][0].course_id)

                    console.log('About to call getGradescopeClasses')
                    const classes = await getGradescopeClasses(gsResponse.cookies, 'Fall 2020')

                    if (Object.keys(classes).length === 0) {
                        console.log('Resolving because classes.length === 0')
                        resolve({
                            assignments: [
                                
                            ],
                            grades: {
                    
                            },
                        })
                    }

                    let gradescopeCookies = gsResponse.cookies;
                    // let gsLink = gsResponse.link;
    
                    // Returns an array for now
                    // {assignments: [], grades: { }}
                    let gsAssignmentsPromises = []
                    Object.keys(classes).forEach((key) => {
                        gsAssignmentsPromises.push(new Promise(async (resolve, reject) => {
                            try {
                                let gradescopeAssignments = await getGSAssignmentsAndGrades(gradescopeCookies, `https://www.gradescope.com/courses/${classes[key].courseId}`);
                                resolve(gradescopeAssignments)
                            }
                            catch {
                                reject();
                            }

                        }))
                    })

                    Promise.all(gsAssignmentsPromises).then(compiledGS => {
                        let toReturn = {
                            assignments: [],
                            grades: {
                                // courseName
                            }
                        }
                        compiledGS.forEach(cV => {
                            toReturn.assignments = [...toReturn.assignments, ...cV.assignments];
                            toReturn.grades = {...toReturn.grades, ...cV.grades}
                        })

                        resolve(toReturn)
                    })

                    // let gradescopeAssignments = await getGSAssignmentsAndGrades(gradescopeCookies, `https://www.gradescope.com/courses/${classes[Object.keys(classes)[0]].courseId}`);

                    // resolve (gradescopeAssignments)
                }
                catch (err) {
                    reject(err);
                }
                // /|\ GRADESCOPE /|\
            }),
            // Blackboard Assignments
            new Promise(async (resolve, reject) => {
                // \|/ BLACKBOARD \|/

                try {
                    const blackboardCourseAssignmentsRes = await getBlackboardAssignments(blackboardRouterCookies);
                    

                    resolve(blackboardCourseAssignmentsRes)
                }
                catch (err) {
                    reject(err);
                }
                // /|\ BLACKBOARD /|\

            }),
        ]

        
        bbClasses['20213'].forEach(v => {
            promiseArray.push(
                // Blackboard Grades
                new Promise(async (resolve, reject) => {
                    // \|/ BLACKBOARD \|/
    
                    try {
                        const blackboardGradesRes = await getBlackboardGrades(blackboardRouterCookies, v.course_id);
                        
    
                        resolve(blackboardGradesRes)
                    }
                    catch (err) {
                        reject(err);
                    }
                    // /|\ BLACKBOARD /|\
    
                }),)
        })

        Promise.all(promiseArray).then(v => resolve(v)).catch(e => reject(e))
    });

    // Promise Tree
    //                /--> getUscSchedule
    // getMyUscCookie/---> getBlackboardRouter \---> getGradescopeCookies --> getGSAssignmentsAndGrades
    //                                          \--> getBlackboardAssignments
    //                                           \-> getBlackboardGrades
   

    // Schedule, bbRouterPromise
    let compiledPromise = await Promise.all([
        schedulePromise, 
        // GS Assignments+Grades, BB Assignments, ...BB Grades
        bbRouterPromise, 
    ]);

    let bbGradesCompiledTemp = compiledPromise[1].slice(2, compiledPromise[1].length);

    let bbGradesCompiled = {}

    bbGradesCompiledTemp.forEach(v => bbGradesCompiled[Object.keys(v)[0]] = v[Object.keys(v)[0]]);

    console.log(`bbGradesCompiled`)
    console.log(bbGradesCompiled)



    let finalResponse = {
        assignments: {
            gradescope: compiledPromise[1][0]['assignments'],
            blackboard: compiledPromise[1][1]
        },
        grades: {
            gradescope: compiledPromise[1][0]['grades'],
            blackboard: bbGradesCompiled
        },
        schedule: compiledPromise[0]
    }

    // Update cache
    var updateParams = {
        TableName: 'trojandashUserData',
        Key:{
            "userId": userId,
        },
        UpdateExpression: "set cache = :c, lastSynced = :d, timesSynced = :t",
        ExpressionAttributeValues:{
            ":c": finalResponse,
            ":d": Date.now() + '',
            ":t": result.Items[0].timesSynced + 1
        },
        ReturnValues:"UPDATED_NEW"
    };
    
    console.log("Updating the item...");
    const res = await docClient.update(updateParams).promise()

    console.log(res)

    let cantSyncResponse = {
        statusCode: 200,
        body: JSON.stringify(finalResponse),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
    
    return cantSyncResponse;
};
