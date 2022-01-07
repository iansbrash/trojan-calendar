import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { useRouter } from 'next/router';
import React, {
    FC,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react';
import { AccountContext } from '../../constants/cognito/Account';

interface AuthRouteProps {
    children: ReactNode,
    path: string,
    redirectIfAuth: boolean,
    setSession?: (s : CognitoUserSession | null) => void
}

const AuthRoute : FC<AuthRouteProps> = ({
    children,
    path,
    redirectIfAuth,
    setSession
} : AuthRouteProps) => {

    const { getSession } = useContext(AccountContext)
    const Router = useRouter();

    const [isFetchingAuthState, setIsFetchingAuthState] = useState<boolean>(true);
    const [authed, setAuthed] = useState<boolean>(false);

    // Redirects us if we're already logged in
    useEffect(() => {

        setIsFetchingAuthState(true);

        (async () => {
            try {
                const session = await getSession();

                setSession ? setSession(session) : null;

                setAuthed(true)

                if (redirectIfAuth) {
                    Router.push(path)
                }
            }
            catch (err) {

                setSession ? setSession(null) : null;


                if (!redirectIfAuth) {
                    Router.push(path)
                }
            }
            finally {
                setIsFetchingAuthState(false)
            }
        })();
    }, [])

    if (isFetchingAuthState || (redirectIfAuth && authed) || (!redirectIfAuth && !authed)) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <div
                    className={`h-16 w-16 animate-spin loader ease-linear rounded-full border-8 border-t-8 border-sky-300`}
                    style={{
                        borderTopColor: '#bae6fd' //#f0f9ff
                    }}
                >
                </div>
            </div>
            
        )
    }
    else {
        return (
            <>
                {children}
            </>
        )
    }
}

export default AuthRoute;