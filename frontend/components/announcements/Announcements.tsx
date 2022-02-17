import React, {
    FC,
    useEffect,
    useRef,
    useState,
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';
import { CompiledAnnouncements } from '../../constants/interfaces/cache';
import ColumnContainer from '../multi/ColumnContainer';
import Announcement, { LoadingAnnouncement } from './Announcement';

interface AnnouncementsProps {
    announcements: CompiledAnnouncements | null,
    tutorialStep: number

}

const Announcements : FC<AnnouncementsProps> = React.memo( ({
    announcements,
    tutorialStep
} : AnnouncementsProps) => {


    const divRef = useRef<HTMLDivElement>(document.createElement('div'));
    useEffect(() => {
        if (tutorialStep === 6) {
            divRef.current.scrollIntoView({
                inline: 'end',
            });
        }
    }, [tutorialStep])

    if (announcements === null) {
        return (
            <ColumnContainer
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                header={`Announcements`}
                breakpoint='2xl:block'
                w={'w-1/5'}
            >
                {/* Content */}
                <div className="w-full flex-1 rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-start items-center space-y-4">
                    {/* Individual Announcement */}
                    {getInitializedArray(3, 3).map((v, i) => <LoadingAnnouncement key={i}/>)}
                </div>
            </ColumnContainer>
        )
    }
    

    return (

        <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            }
            header={`Announcements`}
            breakpoint='2xl:block'
            w={'w-1/5'}
        >
            {/* Content */}
            <div ref={divRef} className="rounded-b-xl bg-zinc-50 w-full h-full flex flex-col justify-start items-center">
                <div className="overflow-y-scroll scrollbar-hide px-4 pb-2 py-2  w-full h-full flex flex-col justify-start items-center space-y-4">
                    {announcements['blackboard'].length === 0 ?
                    <>
                        <div className="flex flex-row justify-center items-center my-8 space-x-2">
                            <div className="text-lg text-slate-800 font-medium">
                                No Announcements
                            </div>
                            <div className="text-slate-600 flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </div>
                        </div>
                    </>
                    : null}
                    {announcements['blackboard'].map((ann, i) => {
                        return (
                            <Announcement 
                                key={i}
                                announcement={ann}
                            />
                        )
                    })}
                </div>
            </div>
        </ColumnContainer>
    )
})
// This is so dumb.
Announcements.displayName = "Announcements";

export default Announcements;