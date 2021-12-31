import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Assignments from '../../components/assignments/Assignments'
import Grades from '../../components/grades/Grades'
import Schedule from '../../components/schedule/Schedule'
import Notes from '../../components/notes/Notes'
import Announcements from '../../components/announcements/Announcements'
import React, {
    FC,
    useContext,
    useEffect,
    useState
} from 'react';
import { useRouter } from 'next/router'
import { AccountContext } from '../../constants/cognito/Account'
import axios from 'axios';
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import AuthRoute from '../../components/authRoute/AuthRoute'
import api from '../../constants/api-gateway/api'
import Cache, { Note } from './cache'
import Modal from '../../components/multi/Modal'
import SettingsModal from '../../components/settings/SettingsModal'

const Dashboard : NextPage = () => {

    const [userIsLoaded, setUserIsLoaded] = useState<boolean>(true);

    const [session, setSession] = useState<CognitoUserSession | null>(null);
    const [cachedData, setCachedData] = useState<Cache | null>(null);
    const [notes, setNotes] = useState<Note[] | null>(null);
    const [settings, setSettings] = useState<any | null>(null)

    const [isLoadingCacheData, setIsLoadingCacheData] = useState<boolean>(false);
    const [isLoadingNotes, setIsLoadingNotes] = useState<boolean>(false);
    const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(false);

    // Sync
    const [lastSynced, setLastSynced] = useState<number>()

    // Modal
    const [settingsModalVisible, setSettingsModalVisible] = useState<boolean>(false);


    // Check if we can sync
    useEffect(() => {
        if (session === null) return;
        (async () => {
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
                    console.log("We can sync: Will retrieve data now")
                    
                    const getSyncDataResponse = await axios({
                        method: 'post',
                        url: `${api}/account/sync`,
                        headers: {
                            'Authorization': token
                        },
                    })

                    console.log(getSyncDataResponse.data)
                }
                catch (err) {

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

                setCachedData(cachedData.data)

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

                    <div className="absolute top-0 left-0 right-0 flex justify-start flex-col items-center">
                        <Header 
                            setSettingsModal={setSettingsModalVisible}
                        />
                    </div>

                    {/* Main Item Holder */}
                    <div className="pt-20 w-full h-full flex flex-row justify-start items-center p-5">

                        <Assignments 
                            assignments={cachedData ? cachedData.assignments : null}
                        />

                        <Grades 
                            grades={cachedData ? cachedData.grades : null}
                        />

                        <Schedule 
                            schedule={cachedData ? cachedData.schedule : null}
                        />

                        {/* For now we're gonna used cachedData, but we'll eventually set up a separate endpoiint */}
                        <Notes 
                            notes={notes ? notes : null}
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
