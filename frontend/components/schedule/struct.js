// DynamoDB (as of 12/30)
const struct = {
    userId: '123-123-123', // Primary Key
    cache: {
        // Should probably add 'Source' (where it is from: Blackboard, GS, DEN, etc)
        assignments: {
            blackboard: [
                {
                    assignmentTitle: 'Homework 1',
                    className: 'BAEP-470',
                    dueDate: 1640000000,
                    // source: "Gradescope | Blackboard | USCDen | Canvas" // Tentative
                }
            ]
        },
        grades: {
            blackboard: {
                'BAEP-470': [
                    {
                        assignmentTitle: 'Quiz 1',
                        status: "Graded",
                        grade: "0 100"
                    }
                ]
            }
        },
        schedule: {
            // courseName
            // courseTitle
            // ----
            // sectionId
            // sectionType
            // sectionSchedule
            // sectionLocation
            // sectionInstructor
            // sectionInfo (NOT NEEDED PROLLY)
            monday: [
                {
                    className: 'BAEP-470',
                    startTime: '8:00',
                    endTime: '8:50',
                    classType: 'Lecture',
                    classLocation: 'SGM 123 & Online & TBA & Office... etc' // Not yet implemented
                }
            ],
            tuesday: [

            ],
            wednesday: [

            ],
            thursday: [

            ],
            friday: [

            ]
        }
    },
    storage: {
        notes: [
            {
                noteId: 1,
                noteTitle: 'Note Title!',
                noteContent: 'This is a note\nThis is definitely a note!\nNote end.'
            }
        ],
        settings: [

        ]
    },
    lastSynced: 1642000000 // Timestamp, you get the idea
}

// Settings
const settings = {
    general: {

    },
    account: {
        
    }
}

// API
const api = {
    api: {
        account: {
            retrieve: 'Retrieve cached data',
            sync: 'Sync data and get new data as response',
            delete: 'Delete account',
            settings: 'Update settings',
            notes: 'POST or DELETE notes',
            assignments: {
                complete: 'mark assignment as complete',
                incomplete: 'mark assignment as incomplete'
            }
        },
        auth: {
            // This should be handled by cognito
        }

    }
}

// Other useful Lambdas

/**
"L": [
    {
      "M": {
        "className": {
          "S": "BAEP-470"
        },
        "assignments": {
          "L": [
            {
              "M": {
                "assignmentTitle": {
                  "S": "HW 1"
                },
                "status": {
                  "S": "Graded"
                },
                "grade": {
                  "S": "77 100"
                }
              }
            },
            {
              "M": {
                "assignmentTitle": {
                  "S": "HW 2"
                },
                "status": {
                  "S": "Needs Grading"
                },
                "grade": {
                  "S": "66 100"
                }
              }
            }
          ]
        }
      }
    },
    {
      "M": {
        "className": {
          "S": "MATH-225"
        },
        "assignments": {
          "L": [
            {
              "M": {
                "assignmentTitle": {
                  "S": "quiz 1"
                },
                "status": {
                  "S": "Graded"
                },
                "grade": {
                  "S": "0 100"
                }
              }
            },
            {
              "M": {
                "assignmentTitle": {
                  "S": "quiz 2"
                },
                "status": {
                  "S": "Not Submitted"
                },
                "grade": {
                  "S": "0 100"
                }
              }
            }
          ]
        }
      }
    }
  ] */