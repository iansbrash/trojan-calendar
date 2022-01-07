import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import React, {
    FC,
    useState,
    ReactNode,
    useContext,
    useEffect,
    useRef
} from 'react';
import MainButton from '../../components/login-signup/MainButton';
import SubButton from '../../components/login-signup/SubButton';
import { AccountContext } from '../../constants/cognito/Account';
import { useRouter } from 'next/router'
import AuthRoute from '../../components/authRoute/AuthRoute';
import { MainHeader } from '../index';
import axios from 'axios';

const Home: NextPage = () => {

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [needsVerify, setNeedsVerify] = useState<boolean>(false);

    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

    const { register, getSession } = useContext(AccountContext)
    const Router = useRouter();


    const onSignUp = async (event : any) => {
        event.preventDefault();

        

        try {
            if (password !== confirmPassword) {
                throw {
                    code: 'PasswordUnequalException'
                }
            }

            const res = await register(username, confirmPassword);
            if (!res.userConfirmed) {
                setNeedsVerify(true);
            }
            console.log(res)

        }
        catch (err : any) {
            if (err.code === 'PasswordUnequalException') {
                console.error(`Error: PasswordUnequalException`)
            }
            else if (err.code === 'UsernameExistsException') {
                console.error('Error: UsernameExistsException')
            }
            else if (err.code === 'InvalidParameterException') {
                console.error('Error: InvalidParameterException')
            }
            else {
                console.error(`Unknown error: ${err.code}`)
            }
        }

        setIsSigningUp(false)
    }

    return (
        <div className={"w-screen h-screen bg-slate-100"}>
            <Head>
                <title>Sign Up</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={"w-full h-full flex justify-center flex-col items-center"}>
                <AuthRoute
                    path="/dashboard"
                    redirectIfAuth={true}
                >
                    <div className="absolute top-0 right-0 left-0 ">
                        <MainHeader noButtons={true}/>
                    </div>

                    {/* Signing up, before verifying */}

                    {
                        needsVerify ? 
                            <VerifyUI 
                            username={username}
                            password={password}
                            />
                        : 
                            <MiniUIContainer header={'Sign Up'}>

                            {/* User/Pass Inputs */}
                            <div className="flex flex-col w-full h-auto justify-start items-center space-y-4">
                                <UserInput 
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    }
                                    placeholder={'ttrojan@usc.edu'}
                                    value={username}
                                    setValue={setUsername}
                                    type={'email'}
                                />

                                <UserInput 
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                        </svg>
                                    }
                                    placeholder={'Password123'}
                                    value={password}
                                    setValue={setPassword}
                                    type={'password'}
                                />

                                <UserInput 
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    }
                                    placeholder={'Password123'}
                                    value={confirmPassword}
                                    setValue={setConfirmPassword}
                                    type={'password'}
                                />
                            </div>

                            {/* Login / Sign up buttons */}
                            <div className="flex flex-col w-full h-auto justify-start items-center space-y-2">
                                {/* Login/Signup */}
                                <div className="w-full h-auto flex flex-row justify-center items-center space-x-4">
                                    <SubButton
                                        path="/login"
                                        text={'Log In'}
                                        isLoading={isSigningUp}
                                    />

                                    <MainButton 
                                        onClick={async (event) => {
                                            setIsSigningUp(true);
                                            await onSignUp(event)
                                        }}
                                        text={'Sign Up'}
                                        isLoading={isSigningUp}
                                    />
                                </div>
                            </div>
                            </MiniUIContainer>
                    }
                    
                </AuthRoute>

                
            </main>
        </div>
    )
}

interface UserInputProps {
    icon: ReactNode,
    placeholder: string,
    value: string,
    setValue: (s : string) => void,
    type: "email" | "password"
}

const UserInput : FC<UserInputProps> = ({
    icon,
    placeholder,
    value,
    setValue,
    type
} : UserInputProps) => {

    const [isFocused, setIsFocused] = useState<boolean>(false);


    return (
        <div className={`w-full border-2 transition duration-250 ease-in-out ${isFocused ? 'border-sky-300' : 'border-zinc-50'} rounded-md h-auto flex flex-row pr-2 py-1`}>
            {/* Icon */}
            <div className="h-full aspect-square flex justify-center items-center text-sky-300 mr-1">
                {icon}
            </div>
            <input className="text-slate-700 bg-zinc-50 flex-1 focus:outline-none h-auto text-2xl border-none rounded-md placeholder-slate-300"
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                type={type}
            />
        </div>
    )
}

interface MiniUIContainerProps {
    children: ReactNode,
    header: string
}

const MiniUIContainer : FC<MiniUIContainerProps> = ({
    header, children
} : MiniUIContainerProps) => {
    return (
        <div className="relative w-96 h-auto flex flex-col justify-start items-center rounded-lg drop-shadow-lg bg-zinc-50 px-4 py-4 space-y-4">
            {/* Login header */}
            <div className="w-full flex flex-row justify-start items-center">
                {/* Icon */}
                <div className="text-sky-500 mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                <div className="font-bold text-2xl text-slate-900 w-full text-start">
                    {header}
                </div>
            </div>
            {children}
        </div>
    )
}

interface VerifyUIProps {
    username: string,
    password: string
}

export const VerifyUI : FC<VerifyUIProps> = ({
    username,
    password
} : VerifyUIProps) => {

    const [verifyInput, setVerifyInput] = useState<string>('');
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    const verifyChange = (n : string) => {
        console.log(n)
        if (!n.match(/^[0-9]*$/g)) {
            return;
        }
        else if (n.length > 6) {
            return;
        }
        setVerifyInput(n)
    }

    const [inputFocused, setInputFocused] = useState<boolean>(false);

    const input = useRef(document.createElement('input'));

    const onDivClick = () => {
        input.current.focus()
        input.current.selectionStart = input.current.selectionEnd = input.current.value.length;
    }
    const { verify, authenticate } = useContext(AccountContext)
    const Router = useRouter();

    const onVerify = async () => {
        console.log(`Attemping Verification`)
        
        try {
            await verify(username, verifyInput)
            await authenticate(username, password);
            Router.push('/dashboard')
        }
        catch (err : any) {
            if (err.code === 'CodeMismatchException') {
                console.error('Error: CodeMismatchException')
            }
            // When its blank
            else if (err.code === 'InvalidParameterException') {
                console.error('Error: InvalidParameterException')
            }
            else if (err.code === 'ExpiredCodeException') {
                console.error('Error: ExpiredCodeException')
            }
            else {
                console.error(`Unknown error: ${err.code}`)
            }
            setIsVerifying(false)
        }
    }

    return (
        <MiniUIContainer header={'Verify Your Account'}>
            <div className="flex flex-col justify-start items-center space-y-4">
                {/* Please Check your Email */}
                <div className="text-lg font-medium text-slate-600 px-2 -mt-2">
                    Please check <span className="text-slate-800 font-bold">{username}</span> for your 6-digit verification code.

                </div>

                {/* Input */}
                <div className="cursor-pointer relative w-full h-20 rounded-xl shadow-md flex justify-center items-center"
                onClick={() => onDivClick()}
                >
                    <div className={`z-10 absolute border-2 transition duration-250 ease-in-out ${inputFocused ? 'border-sky-300' : 'border-white'} bg-white top-0 left-0 right-0 rounded-xl bottom-0 flex flex-row pointer-events-none`}>
                        {[0, 1, 2, 3, 4, 5].map(v => {

                            const ca = verifyInput.charAt(v);

                            return (
                                <div className="flex flex-col w-1/6 px-2 h-full justify-center items-center">
                                    <div className={`text-5xl font-medium ${ca === '' ? 'text-slate-300' : 'text-slate-800'} `}>
                                        {ca === '' ? '0' : ca}
                                    </div>
                                    {/* <div className={`w-full h-1 ${v % 2 === 0 ? 'bg-slate-900' : 'bg-slate-600'}`}>
                                    </div> */}
                                </div>
                            )
                        })}
                    </div>

                    <input
                        className="z-0 pointer-events-none focus:outline-none "
                        // type="number"
                        maxLength={6}
                        autoFocus={true}
                        value={verifyInput}
                        onChange={(e) => verifyChange(e.target.value)}
                        ref={input}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        autoComplete='one-time-code'
                    />
                    
                    
                </div>

                {/* Resend / Submit */}
                <div className="flex flex-col w-full h-auto justify-start items-center space-y-2">
                    {/* Resend/Submit */}
                    <div className="w-full h-auto flex flex-row justify-center items-center space-x-4">
                        <SubButton
                            path="/login"
                            text={'Resend Code'}
                            isLoading={false}
                        />

                        <MainButton 
                            onClick={async (event) => {
                                setIsVerifying(true);
                                await onVerify()
                            }}
                            text={'Verify'}
                            isLoading={false}
                        />
                    </div>
                </div>
            </div>
        </MiniUIContainer>
    )
}

export default Home
