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
    Schedule as ScheduleInterface,
    CompiledAnnouncements
} from '../../constants/interfaces/cache'
import SyncModal, { SyncStage } from '../../components/sync/SyncModal'
import Tutorial from '../../components/tutorial/Tutorial'

const Dashboard : NextPage = () => {

    const [syncStage, setSyncStage] = useState<SyncStage>(SyncStage.idle)

    const [userIsLoaded, setUserIsLoaded] = useState<boolean>(true);

    const [session, setSession] = useState<CognitoUserSession | null>(null);
    const [cachedData, setCachedData] = useState<Cache | null>(null);

    const [assignments, setAssignments] = useState<CompiledAssignments>();
    const [grades, setGrades] = useState<CompiledGrades>();
    const [schedule, setSchedule] = useState<ScheduleInterface>();
    const [announcements, setAnnouncements] = useState<CompiledAnnouncements>()

    const [notes, setNotes] = useState<Note[] | null>(null);
    const [settings, setSettings] = useState<any | null>(null)

    const [isLoadingCacheData, setIsLoadingCacheData] = useState<boolean>(false);
    const [isLoadingNotes, setIsLoadingNotes] = useState<boolean>(false);
    const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(false);

    const [isSyncing, setIsSyncing] = useState<boolean>(false);

    // Sync
    const [lastSynced, setLastSynced] = useState<number | null>(null)

    // Modal
    const [settingsModalVisible, setSettingsModalVisible] = useState<boolean>(false);
    const [syncModal, setSyncModal] = useState<boolean>(false);

    // Tut
    const [tutorial, setTutorial] = useState<boolean>(false);
    const [tutorialStep, setTutorialStep] = useState<number>(1);


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
            }
            catch (err) {
                console.error(err)
                setLastSynced(0);
            }   

            // If it has been like 12 or 1 day or sumn
            if (canSync) {
                // Tell server to fetch new data and wait for response
                // await trySync(token);
            }
        })();
    }, [session])

    const trySync = async (username : string, password : string) => {
        try {
            console.log(`username: ${username}, password: ${password}`)
            if (session === null) return;
            const token = session.getIdToken().getJwtToken()

            setIsSyncing(true)
            console.log("We can sync: Will retrieve data now. LastSynced: " + lastSynced)

            setSyncStage(SyncStage.initiate)
            
            const getSyncDataResponse1 = await axios({
                method: 'post',
                url: `${api}/account/sync?stage=${1}`,
                headers: {
                    'Authorization': token,
                    'lastsynced': lastSynced + ''
                },
                data: JSON.stringify({
                    username: username,
                    password: password
                })
            })

            setSyncStage(SyncStage.confirm)

            console.log(`getSyncDataResponse1.data`, getSyncDataResponse1.data)

            const getSyncDataResponse2 = await axios({
                method: 'post',
                url: `${api}/account/sync?stage=${2}`,
                headers: {
                    'Authorization': token,
                },
            })

            setSyncStage(SyncStage.fetch)


            console.log(`getSyncDataResponse2.data`, getSyncDataResponse2.data)

            const getSyncDataResponse3 = await axios({
                method: 'post',
                url: `${api}/account/sync?stage=${3}`,
                headers: {
                    'Authorization': token,
                },
            })



            console.log(`getSyncDataResponse3.data`, getSyncDataResponse3.data)

            const syncData : Cache = getSyncDataResponse3.data;

            setSchedule(syncData.schedule)
            setAssignments(syncData.assignments)
            setGrades(syncData.grades)
            setAnnouncements(syncData.announcements)
            setLastSynced(Date.now())
        }
        catch (err : any) {
            console.log(err)
            console.log(err.response)

            throw err.response.data
        }
        finally {
            setIsSyncing(false)
            setSyncStage(SyncStage.idle)
        }
    }

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

                if (settingsData.data.needsTutorial) {
                    setTutorial(true)
                }
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
                    grades,
                    announcements
                } = cachedData.data

                setSchedule(schedule)
                setGrades(grades)
                setAssignments(assignments)
                setAnnouncements(announcements)
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
                        trySync={trySync}
                        setSyncStage={setSyncStage}
                    />

                    {tutorial ? <Tutorial 
                        tutorialModalVisible={tutorial}
                        setTutorialModalVisible={setTutorial}
                        session={session}
                        setSyncModalVisible={setSyncModal}
                        step={tutorialStep}
                        setStep={setTutorialStep}
                    /> : null}



                    


                    <div className="absolute top-0 left-0 right-0 flex justify-start flex-col items-center">
                        <Header 
                            setSettingsModal={setSettingsModalVisible}
                            isSyncing={isSyncing}
                            lastSynced={lastSynced}
                            setSyncModal={setSyncModal}
                            syncStage={syncStage}
                        />
                    </div>

                    {/* Main Item Holder */}
                    <div className="scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-sky-200 pt-20 w-full h-full flex flex-row justify-start items-center p-5 overflow-x-scroll">

                        <Assignments 
                            assignments={assignments ? assignments : null}
                            tutorialStep={tutorialStep}
                        />

                        <Grades 
                            grades={grades ? grades : null}
                            tutorialStep={tutorialStep}
                        />

                        <Schedule 
                            schedule={schedule ? schedule : null}
                            tutorialStep={tutorialStep}
                        />

                        {/* For now we're gonna used cachedData, but we'll eventually set up a separate endpoiint */}
                        <Notes 
                            notes={notes ? notes : null}
                            session={session ? session : null}
                            setNotes={setNotes}
                            tutorialStep={tutorialStep}
                        />

                        {/* For now we're gonna used cachedData, but we'll eventually set up a separate endpoiint */}
                        <Announcements 
                            announcements={announcements ? announcements : null}
                            tutorialStep={tutorialStep}
                        />
                    </div>
                </AuthRoute>
                
                
            </main>
        </div>
    )
}

export default Dashboard
