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
import Cache from './cache'

const Dashboard : NextPage = () => {

    const [userIsLoaded, setUserIsLoaded] = useState<boolean>(true);

    const [session, setSession] = useState<CognitoUserSession | null>(null);
    const [cachedData, setCachedData] = useState<Cache | null>(null);

    // // Redirects us if we're already logged in
    // useEffect(() => {

    //     getSession().then((session : any) => {
    //         console.log("Session", session)
    //         setSession(session)
    //     }).catch((err : Error) => {
    //         console.error("Error", err)
    //         Router.push('/login')
    //     })

    //     return () => {
    //     }
    // }, [])

    const [isLoadingCacheData, setIsLoadingCacheData] = useState<boolean>(false);

    // Load data from cache
    useEffect(() => {

        if (session !== null) {
            return;
        }

        setIsLoadingCacheData(true);

        (async () => {

            try {

                const token = session.getIdToken().getJwtToken()
                console.log(session)

                const cachedData = await axios({
                    method: 'get',
                    url: `${api}/account/cache`,
                    headers: {
                        'Authorization': token
                    },
                })

                setCachedData(cachedData.data.cache)

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
                    <Header />

                    {/* Main Item Holder */}
                    <div className="w-full flex flex-1 flex-row justify-start items-center p-5">
                        <Assignments 
                            assignments={cachedData ? cachedData.assignments : null}
                        />

                        <Grades />

                        <Schedule />

                        <Notes />

                        <Announcements />
                    </div>
                </AuthRoute>
                
                
            </main>
        </div>
    )
}

export default Dashboard
