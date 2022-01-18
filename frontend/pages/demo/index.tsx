import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Assignments from '../../components/assignments/Assignments'
import Grades from '../../components/grades/Grades'
import Schedule from '../../components/schedule/Schedule'
import Notes from '../../components/notes/Notes'
import Announcements from '../../components/announcements/Announcements'
import React, {
    useState
} from 'react';
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import SettingsModal from '../../components/settings/SettingsModal'
import Cache, {
    Note, 
    CompiledAssignments, 
    CompiledGrades, 
    Schedule as ScheduleInterface
} from '../../constants/interfaces/cache'
import NotesDemo from '../../components/notes/NotesDemo'

const Dashboard : NextPage = () => {

    const [session, setSession] = useState<CognitoUserSession | null>(null);
    const [cachedData, setCachedData] = useState<Cache | null>(null);

    const [assignments, setAssignments] = useState<CompiledAssignments>();
    const [grades, setGrades] = useState<CompiledGrades>();
    const [schedule, setSchedule] = useState<ScheduleInterface>();

    const [notes, setNotes] = useState<Note[] | null>(null);


    const [isSyncing, setIsSyncing] = useState<boolean>(false);

    // Sync
    const [lastSynced, setLastSynced] = useState<number>()

    // Modal
    const [settingsModalVisible, setSettingsModalVisible] = useState<boolean>(false);



    return (
        <div className={"w-screen h-screen bg-slate-100"}>
            <Head>
                <title>My Dashboard</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full h-full flex justify-start flex-col items-center">
                

                    <SettingsModal 
                        settings={['General', 'Account', 'About']}
                        settingsModalVisible={settingsModalVisible}
                        setSettingsModalVisible={setSettingsModalVisible}
                    />

                    <div className="absolute top-0 left-0 right-0 flex justify-start flex-col items-center">
                        <Header 
                            setSettingsModal={(a : boolean) => null}
                            isSyncing={false}
                            lastSynced={(Date.now() - 10000)}
                            setSyncModal={(x : boolean) => null}
                        />
                    </div>

                    {/* Main Item Holder */}
                    <div className="pt-20 w-full h-full flex flex-row justify-start items-center p-5">

                        <Assignments 
                            assignments={{
                                "blackboard": [
                                    {
                                        "assignmentTitle": "Practice Quiz",
                                        "className": "20213_csci_270_30263: Introduction to Algorithms and Theory of Computing",
                                        "dueDate": 1630331100000
                                    },
                                    {
                                        "assignmentTitle": "Homework 1",
                                        "className": "MATH 225",
                                        "dueDate": 1630331100000
                                    },
                                    {
                                        "assignmentTitle": "Essay 1",
                                        "className": "WRIT 340",
                                        "dueDate": 1636983900000
                                    },
                                    {
                                        "assignmentTitle": "Lab 0",
                                        "className": "EE 109",
                                        "dueDate": 1637675100000
                                    },
                                    {
                                        "assignmentTitle": "hw2",
                                        "className": "PHIL 166",
                                        "dueDate": 1638366300000
                                    }
                                ],
                                "gradescope": []
                            }}
                        />

                        <Grades 
                            grades={{
                                "blackboard": {
                                    "20213_math_225_39541": [
                                        {
                                            "assignmentTitle": "FE",
                                            "status": "Graded",
                                            "grade": "137.00 200"
                                        },
                                        {
                                            "assignmentTitle": "HW7",
                                            "status": "Graded",
                                            "grade": "56.00 60"
                                        },
                                        {
                                            "assignmentTitle": "HW6",
                                            "status": "Graded",
                                            "grade": "58.00 60"
                                        },
                                        {
                                            "assignmentTitle": "HW5",
                                            "status": "Graded",
                                            "grade": "11.00 19"
                                        },
                                        {
                                            "assignmentTitle": "HW4",
                                            "status": "Graded",
                                            "grade": "53.50 60"
                                        },
                                        {
                                            "assignmentTitle": "M2",
                                            "status": "Graded",
                                            "grade": "68.00 100"
                                        },
                                        {
                                            "assignmentTitle": "HW3",
                                            "status": "Graded",
                                            "grade": "52.50 60"
                                        },
                                        {
                                            "assignmentTitle": "HW2",
                                            "status": "Graded",
                                            "grade": "58.00 60"
                                        },
                                        {
                                            "assignmentTitle": "HW1",
                                            "status": "Graded",
                                            "grade": "55.00 60"
                                        },
                                        {
                                            "assignmentTitle": "HW0",
                                            "status": "Graded",
                                            "grade": "50.00 50"
                                        },
                                        {
                                            "assignmentTitle": "M1",
                                            "status": "Graded",
                                            "grade": "64.50 100"
                                        },
                                        {
                                            "assignmentTitle": "Quiz1",
                                            "status": "Needs Grading",
                                            "grade": "0 20"
                                        },
                                        {
                                            "assignmentTitle": "Quiz2",
                                            "status": "Needs Grading",
                                            "grade": "0 20"
                                        },
                                        {
                                            "assignmentTitle": "Quiz3",
                                            "status": "Needs Grading",
                                            "grade": "0 20"
                                        },
                                        {
                                            "assignmentTitle": "Quiz4",
                                            "status": "Needs Grading",
                                            "grade": "0 20"
                                        },
                                        {
                                            "assignmentTitle": "Quiz5",
                                            "status": "Needs Grading",
                                            "grade": "0 20"
                                        }
                                    ]
                                },
                                "gradescope": {
                                    "20213_math_225_39541": [
                                        {
                                            "assignmentTitle": "Hw-0",
                                            "status": "Graded",
                                            "grade": "50.0 50.0"
                                        },
                                        {
                                            "assignmentTitle": "Hw-1",
                                            "status": "Graded",
                                            "grade": "55.0 60.0"
                                        },
                                        {
                                            "assignmentTitle": "Quiz1",
                                            "status": "Not Submitted",
                                            "grade": "0 0"
                                        },
                                        {
                                            "assignmentTitle": "HW2",
                                            "status": "Graded",
                                            "grade": "58.0 60.0"
                                        },
                                        {
                                            "assignmentTitle": "Quiz2",
                                            "status": "Not Submitted",
                                            "grade": "0 0"
                                        },
                                        {
                                            "assignmentTitle": "HW3",
                                            "status": "Graded",
                                            "grade": "52.5 60.0"
                                        },
                                        {
                                            "assignmentTitle": "Midterm-1",
                                            "status": "Graded",
                                            "grade": "64.5 100.0"
                                        },
                                        {
                                            "assignmentTitle": "HW4",
                                            "status": "Graded",
                                            "grade": "53.5 60.0"
                                        },
                                        {
                                            "assignmentTitle": "Quiz3",
                                            "status": "Not Submitted",
                                            "grade": "0 0"
                                        },
                                        {
                                            "assignmentTitle": "HW5",
                                            "status": "Graded",
                                            "grade": "11.0 19.0"
                                        },
                                        {
                                            "assignmentTitle": "HW6",
                                            "status": "Graded",
                                            "grade": "58.0 60.0"
                                        },
                                        {
                                            "assignmentTitle": "HW7",
                                            "status": "Graded",
                                            "grade": "56.0 60.0"
                                        },
                                        {
                                            "assignmentTitle": "Quiz4",
                                            "status": "Not Submitted",
                                            "grade": "0 0"
                                        },
                                        {
                                            "assignmentTitle": "Quiz5",
                                            "status": "Not Submitted",
                                            "grade": "0 0"
                                        }
                                    ]
                                }
                            }}
                        />

                        <Schedule 
                            schedule={{
                                "wednesday": [
                                    {
                                        "className": "WRIT 340",
                                        "startTime": "8:00",
                                        "endTime": "8:50",
                                        "classType": "Lecture",
                                        "classLocation": "JFF 313"
                                    },
                                    {
                                        "className": "CSCI 353",
                                        "startTime": "12:00",
                                        "endTime": "13:50",
                                        "classType": "Lecture",
                                        "classLocation": "THH 102"
                                    },
                                    {
                                        "className": "BAEP 470",
                                        "startTime": "18:00",
                                        "endTime": "19:50",
                                        "classType": "Lecture",
                                        "classLocation": "SAL 101"
                                    }
                                ],
                                "thursday": [
                                    {
                                        "className": "CSCI 356",
                                        "startTime": "9:30",
                                        "endTime": "10:50",
                                        "classType": "Lecture",
                                        "classLocation": "THH 202"
                                    }
                                ],
                                "friday": [
                                    {
                                        "className": "CSCI 356",
                                        "startTime": "16:00",
                                        "endTime": "17:50",
                                        "classType": "Quiz",
                                        "classLocation": "TBA"
                                    },
                                    {
                                        "className": "CSCI 356",
                                        "startTime": "14:00",
                                        "endTime": "15:50",
                                        "classType": "Discussion",
                                        "classLocation": "CPA 100"
                                    },
                                    {
                                        "className": "WRIT 340",
                                        "startTime": "8:00",
                                        "endTime": "8:50",
                                        "classType": "Lecture",
                                        "classLocation": "JFF 313"
                                    }
                                ],
                                "tuesday": [
                                    {
                                        "className": "CSCI 356",
                                        "startTime": "9:30",
                                        "endTime": "10:50",
                                        "classType": "Lecture",
                                        "classLocation": "THH 202"
                                    }
                                ],
                                "monday": [
                                    {
                                        "className": "CSCI 353",
                                        "startTime": "12:00",
                                        "endTime": "13:50",
                                        "classType": "Lecture",
                                        "classLocation": "THH 102"
                                    },
                                    {
                                        "className": "WRIT 340",
                                        "startTime": "8:00",
                                        "endTime": "8:50",
                                        "classType": "Lecture",
                                        "classLocation": "JFF 313"
                                    }
                                ]
                            }}
                        />

                        {/* For now we're gonna used cachedData, but we'll eventually set up a separate endpoiint */}
                        <NotesDemo 
                            notes={[
                                {
                                    "noteTitle": "To-do",
                                    "noteContent": "Talk to prof. about grading scale\nOrganize room\nBuy textbooks\nWrite lists",
                                    "noteId": "5"
                                },
                                {
                                    "noteTitle": "Remindrs",
                                    "noteId": "6",
                                    "noteContent": "Costco cold brew concentrate 1pt coffe 3pt water\n1 gallon of water per day"
                                },
                                {
                                    "noteTitle": "CLUBS",
                                    "noteContent": "DEADLINE TIS 1/16 GOOOOOOO",
                                    "noteId": "1641404461400"
                                },
                                {
                                    "noteTitle": "Useful links",
                                    "noteContent": "https://my.usc.edu/\nhttps://tailwindcss.com/docs/grid-template-columns",
                                    "noteId": "1641404654642"
                                },
                                {
                                    "noteTitle": "Color test",
                                    "noteContent": "Why are these colors so good",
                                    "noteId": "1641405753780"
                                }
                            ]}
                        />

                        {/* For now we're gonna used cachedData, but we'll eventually set up a separate endpoiint */}
                        <Announcements 
                            announcements={cachedData ? [] : null}
                        
                        />
                    </div>
                
                
            </main>
        </div>
    )
}

export default Dashboard
