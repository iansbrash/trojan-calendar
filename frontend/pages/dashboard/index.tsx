import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Assignments from '../../components/assignments/Assignments'
import Grades from '../../components/grades/Grades'
import Schedule from '../../components/schedule/Schedule'
import Notes from '../../components/notes/Notes'
import Announcements from '../../components/announcements/Announcements'
import React, {
    useEffect,
    useState
} from 'react';
import axios from 'axios';
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import AuthRoute from '../../components/authRoute/AuthRoute'
import api from '../../constants/api-gateway/api'
import SettingsModal from '../../components/settings/SettingsModal'
import Cache, {
    Note, 
    CompiledAssignments, 
    CompiledGrades, 
    Schedule as ScheduleInterface
} from './cache'
import SyncModal from '../../components/sync/SyncModal'

const Dashboard : NextPage = () => {

    const [userIsLoaded, setUserIsLoaded] = useState<boolean>(true);

    const [session, setSession] = useState<CognitoUserSession | null>(null);
    const [cachedData, setCachedData] = useState<Cache | null>(null);

    const [assignments, setAssignments] = useState<CompiledAssignments>();
    const [grades, setGrades] = useState<CompiledGrades>();
    const [schedule, setSchedule] = useState<ScheduleInterface>();

    const [notes, setNotes] = useState<Note[] | null>(null);
    const [settings, setSettings] = useState<any | null>(null)

    const [isLoadingCacheData, setIsLoadingCacheData] = useState<boolean>(false);
    const [isLoadingNotes, setIsLoadingNotes] = useState<boolean>(false);
    const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(false);

    const [isSyncing, setIsSyncing] = useState<boolean>(false);

    // Sync
    const [lastSynced, setLastSynced] = useState<number>()

    // Modal
    const [settingsModalVisible, setSettingsModalVisible] = useState<boolean>(false);
    const [syncModal, setSyncModal] = useState<boolean>(false);


    // Check if we can sync
    useEffect(() => {
        if (session === null) return;
        (async () => {

            let lastSynced = 0;

            let canSync = false;
            const token = session.getIdToken().getJwtToken()

            try {
                const checkSyncData = await axios({
                    method: 'get',
                    url: `${api}/account/sync`,
                    headers: {
                        'Authorization': token
                    },
                })

                canSync = checkSyncData.data.canSync;

                setLastSynced(checkSyncData.data.lastSynced)
                lastSynced = checkSyncData.data.lastSynced;

                console.log('checkSyncData', checkSyncData.data)
            }
            catch (err) {
                console.error(err)
                setLastSynced(0);
            }   

            // If it has been like 12 or 1 day or sumn
            if (canSync) {
                // Tell server to fetch new data and wait for response
                try {
                    setIsSyncing(true)
                    console.log("We can sync: Will retrieve data now. LastSynced: " + lastSynced)


                    
                    const getSyncDataResponse = await axios({
                        method: 'post',
                        url: `${api}/account/sync`,
                        headers: {
                            'Authorization': token,
                            'lastsynced': lastSynced + ''
                        },
                    })

                    const syncData : Cache = getSyncDataResponse.data;

                    console.log(syncData)

                    setSchedule(syncData.schedule)
                    setAssignments(syncData.assignments)
                    setGrades(syncData.grades)
                }
                catch (err : any) {
                    console.log(err.message)
                }
                finally {
                    setIsSyncing(false)
                }
            }
        })();
    }, [session])

    // Load Notes
    useEffect(() => {
        if (session === null) return;
        setIsLoadingNotes(true);

        (async () => {
            try {
                // @ts-ignore
                const token = session.getIdToken().getJwtToken()
                const notesData = await axios({
                    method: 'get',
                    url: `${api}/account/notes`,
                    headers: {
                        'Authorization': token
                    },
                })

                setNotes(notesData.data)

                console.log('notesData', notesData.data)
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoadingNotes(false);
            }
        })();
    }, [session])

    // Load Settings
    useEffect(() => {
        if (session === null) return;
        setIsLoadingSettings(true);

        (async () => {
            try {
                // @ts-ignore
                const token = session.getIdToken().getJwtToken()
                const settingsData = await axios({
                    method: 'get',
                    url: `${api}/account/settings`,
                    headers: {
                        'Authorization': token
                    },
                })

                setSettings(settingsData.data)

                console.log('settingsData', settingsData.data)
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoadingSettings(false);
            }
        })();
    }, [session])

    // Load data from cache
    useEffect(() => {

        // return;

        if (session === null) {
            return;
        }


        setIsLoadingCacheData(true);

        (async () => {

            try {

                // @ts-ignore
                const token = session.getIdToken().getJwtToken()
                const cachedData = await axios({
                    method: 'get',
                    url: `${api}/account/cache`,
                    headers: {
                        'Authorization': token
                    },
                })

                const {
                    schedule,
                    assignments,
                    grades
                } = cachedData.data

                // setCachedData(cachedData.data)

                setSchedule(schedule)
                setGrades(grades)
                setAssignments(assignments)

                console.log('cachedData', cachedData.data)
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoadingCacheData(false);
            }
        })();
    }, [session]);

    

    return (
        <div className={"w-screen h-screen bg-slate-100"}>
            <Head>
                <title>My Dashboard</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full h-full flex justify-start flex-col items-center">
                <AuthRoute
                    redirectIfAuth={false}
                    path={'/login'}
                    setSession={setSession}
                >

                    <SettingsModal 
                        settings={['General', 'Account', 'About']}
                        settingsModalVisible={settingsModalVisible}
                        setSettingsModalVisible={setSettingsModalVisible}
                    />

                    <SyncModal 
                        syncModalVisible={syncModal}
                        setSyncModalVisible={setSyncModal}
                    />

                    


                    <div className="absolute top-0 left-0 right-0 flex justify-start flex-col items-center">
                        <Header 
                            setSettingsModal={setSettingsModalVisible}
                            isSyncing={isSyncing}
                            lastSynced={lastSynced ? lastSynced : 0}
                            setSyncModal={setSyncModal}
                        />
                    </div>

                    {/* Main Item Holder */}
                    <div className="pt-20 w-full h-full flex flex-row justify-start items-center p-5">

                        <Assignments 
                            assignments={assignments ? assignments : null}
                        />

                        <Grades 
                            grades={grades ? grades : null}
                        />

                        <Schedule 
                            schedule={schedule ? schedule : null}
                        />

                        {/* For now we're gonna used cachedData, but we'll eventually set up a separate endpoiint */}
                        <Notes 
                            notes={notes ? notes : null}
                            session={session ? session : null}
                            setNotes={setNotes}
                        />

                        {/* For now we're gonna used cachedData, but we'll eventually set up a separate endpoiint */}
                        <Announcements 
                            announcements={cachedData ? [] : null}
                        
                        />
                    </div>
                </AuthRoute>
                
                
            </main>
        </div>
    )
}

export default Dashboard
