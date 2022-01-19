var AWS = require("aws-sdk");
const { getBlackboardRouter } = require("./blackboard/getBlackboardRouter");
const { getGSAssignmentsAndGrades } = require("./gradescope/getGSAssignmentsAndGrades");
const { getMyUscCalendar } = require('./my.usc.edu/getMyUscCalendar');
const { getBlackboardAssignments } = require("./blackboard/getBlackboardAssignments");
const { getBlackboardGrades } = require('./blackboard/getBlackboardGrades')
const { getGradescopeCookies } = require("./gradescope/getGradescopeCookies");
const { getBlackboardClasses } = require("./blackboard/getBlackboardClasses");
const { getGradescopeClasses } = require("./gradescope/getGradescopeClasses");
const { getBlackboardAnnouncements } = require("./blackboard/getBlackboardAnnouncements");

AWS.config.update({
    region: "us-east-1",
});
var docClient = new AWS.DynamoDB.DocumentClient()

const bbTerm = '20221' // '20213'
const gsTerm = 'Spring 2022' //'Fall 2020'

const fetchData = async (event) => {
    
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

    if (!getResult.Item || !getResult.Item.myUscCookies) {
        return {
            statusCode: 400,
            body: JSON.stringify("Item or Item.myUscCookies does not exist"),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    let myUscCookies = getResult.Item.myUscCookies;

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
                    let gsResponse = await getGradescopeCookies(blackboardRouterCookies, bbClasses[bbTerm][0].course_id)

                    console.log('About to call getGradescopeClasses')
                    const classes = await getGradescopeClasses(gsResponse.cookies, gsTerm)

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
            // Blackboard Announcements
            new Promise(async (resolve, reject) => {
                // \|/ BLACKBOARD \|/

                try {
                    // An array of objects
                    const bbAnnouncementsRes = await getBlackboardAnnouncements(blackboardRouterCookies);
                    

                    resolve(bbAnnouncementsRes)
                }
                catch (err) {
                    reject(err);
                }
                // /|\ BLACKBOARD /|\

            }),
        ]

        
        bbClasses[bbTerm].forEach(v => {
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

    let bbGradesCompiledTemp = compiledPromise[1].slice(3, compiledPromise[1].length);

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
        schedule: compiledPromise[0],
        announcements: {
            blackboard: compiledPromise[1][2]
        }
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
            ":t": getResult.Item.timesSynced + 1
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
}

module.exports.fetchData = fetchData;