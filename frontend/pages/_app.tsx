import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Account } from '../constants/cognito/Account'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Account>
            <Component {...pageProps} />
        </Account>
    )
}

export default MyApp
