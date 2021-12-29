import React, {
    FC,
    useState
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';
import ColumnContainer from '../multi/ColumnContainer';
import Announcement, { LoadingAnnouncement } from './Announcement';

interface AnnouncementsProps {
    announcements: string[] | null
}

const Announcements : FC<AnnouncementsProps> = ({
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
            <div className="w-full flex-1 rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-start items-center space-y-4">
                {/* Individual Announcement */}
                <Announcement 
                    text={'Add/Drop Period Ends February 3rd'}
                    chevronColor='text-amber-500'
                />

                <Announcement 
                    text={'IFC Confirms Sigma Nu Suspended Indefinitely'}
                    chevronColor='text-sky-500'
                />
            </div>
        </ColumnContainer>
    )
}


export default Announcements;