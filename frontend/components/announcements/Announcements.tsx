import React, {
    FC,
    useState,
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';
import { CompiledAnnouncements } from '../../constants/interfaces/cache';
import ColumnContainer from '../multi/ColumnContainer';
import Announcement, { LoadingAnnouncement } from './Announcement';

interface AnnouncementsProps {
    announcements: CompiledAnnouncements | null
}

const Announcements : FC<AnnouncementsProps> = React.memo( ({
    announcements
} : AnnouncementsProps) => {

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
        >
            {/* Content */}
            <div className="rounded-b-xl bg-zinc-50 w-full h-full flex flex-col justify-start items-center">
                <div className="overflow-y-scroll scrollbar-hide px-4 pb-2 py-2  w-full h-full flex flex-col justify-start items-center space-y-4">

                    {announcements['blackboard'].map(ann => {
                        return (
                            <Announcement 
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