import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
    FC, ReactNode, useContext, useState
} from 'react';
import { AccountContext } from '../../constants/cognito/Account';


interface HeaderProps {
    setSettingsModal: (b : boolean) => void,
    isSyncing: boolean,
    lastSynced: number | null,
    setSyncModal: (b : boolean) => void
}

const Header : FC<HeaderProps> = ({
    setSettingsModal,
    isSyncing,
    lastSynced,
    setSyncModal
} : HeaderProps) => {


    const { logout } = useContext(AccountContext)
    const Router = useRouter();

    const logoutAndRedirect = () => {
        logout() ? Router.push('/login') : null;
    }

    const getLastUpdated = (d : number) => {
        const difference = Date.now() - d;

        // Less than a minute ago
        if (difference < 1000 * 60) {
            return "a few seconds ago";
        }
        // Less than an hour ago
        else if (difference < 1000 * 60 * 60) {
            return "a few minutes ago"
        }
        else if (difference < 1000 * 60 * 60 * 24) {
            return `${Math.floor(difference / 1000 / 60 / 60)} hours ago`
        }
        else {
            return `${Math.floor(difference / 1000 / 60 / 60)} hours ago`
        }
    }


    return (
        <div className="z-30 w-full h-auto flex flex-col">
            <div className="w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-500">

            </div>
            <div className="w-full h-20 flex flex-row justify-between items-center px-10 bg-slate-50 shadow-md">

                {/* My Dashboard */}
                <Link href="/">
                    <div className="cursor-pointer h-full font-bold text-2xl flex flex-row justify-start items-center">
                        <div className="text-slate-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex flex-row justify-start items-center text-slate-800 ml-2">
                            My Dashboard <span className="hidden md:block font-medium text-slate-400 text-base pt-1 ml-1">{isSyncing ? 'Syncing...' : (lastSynced === null ? '' : `(last updated ${getLastUpdated(lastSynced)})`)}</span>
                        </div>
                    </div>
                </Link>

                {/* Settings Icon */}
                <div className="h-full flex justify-center items-center space-x-6">
                    <div className="h-full flex flex-col justify-center items-center">
                        <div className="h-full flex justify-center items-center">
                            <HeaderIconWrapper
                            onClick={() => setSyncModal(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                            </HeaderIconWrapper>
                        </div>
                        
                        {/* <div className="relative w-full">
                            <div className="absolute top-0 right-0 flex justify-center items-center w-80 h-20 bg-zinc-50 border-4 rounded-xl border-sky-400">
                                
                            </div>
                        </div> */}
                    </div>
                    
                        
                    <HeaderIconWrapper
                    onClick={() => setSettingsModal(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                    </HeaderIconWrapper>

                    <HeaderIconWrapper
                    onClick={() => logoutAndRedirect()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                    </HeaderIconWrapper>


                </div>
            </div>

        </div>
    )
}

interface HeaderIconWrapperProps {
    children: ReactNode,
    onClick: () => void
}

const HeaderIconWrapper : FC<HeaderIconWrapperProps> = ({
    children,
    onClick
} : HeaderIconWrapperProps) => {
    return (
        <button className="text-slate-800 transition duration-250 ease-in-out hover:scale-110 p-2 rounded-lg"
        onClick={() => onClick()}
        >
            {children}
        </button>
    )
}

export default Header;