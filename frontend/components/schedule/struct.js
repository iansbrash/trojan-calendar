// DynamoDB (as of 12/30)
const struct = {
    userId: '123-123-123', // Primary Key
    cache: {
        // Should probably add 'Source' (where it is from: Blackboard, GS, DEN, etc)
        assignments: [
            {
                assignmentTitle: 'Homework 1',
                className: 'BAEP-470',
                dueDate: 1640000000,
                source: "Gradescope | Blackboard | USCDen | Canvas" // Tentative
            }
        ],
        grades: [
            {
                className: 'BAEP-470',
                assignments: [
                    {
                        assignmentTitle: 'HW 2',
                        status: 'Needs Grading',
                        grade: null,
                        source: "Gradescope | Blackboard | USCDen | Canvas" // Tentative
                    }
                ]
            }
        ],
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
