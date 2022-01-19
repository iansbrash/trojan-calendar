import React, {
    FC
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';
import gradescopeNameParser from '../../constants/functions/gradescopeNameParser';
import { Announcement as AnnouncementInterface } from '../../constants/interfaces/cache';

interface AnnouncementProps {
    announcement: AnnouncementInterface
}

const Announcement : FC<AnnouncementProps> = ({
    announcement
} : AnnouncementProps) => {

    let date = (new Date(announcement.postedOn));

    return (
        <div className="flex flex-col justify-start items-center w-full h-auto ">
            <div className="w-full flex flex-row justify-start items-center">
                <div className="text-slate-800 text-lg font-medium">
                    {gradescopeNameParser( announcement.postedTo.split(':')[0] )}
                </div>
                <div className="mx-1 text-lg font-bold text-slate-400">
                    •
                </div>
                <div className="text-md font-medium text-slate-400">
                    {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
                </div>
                
                {/* <div className={`${'text-indigo-600'} mx-1`}>
                    •
                    <svg xmlns="http://www.w3.org/2000/svg" className="mt-1.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                <div className="text-start font-medium text-2xl text-slate-800">
                    {announcement.postedBy}
                </div> */}
            </div>
            <div className="text-md font-medium text-slate-600 w-full">
                {announcement.postedBy}
            </div>
            <div className="flex flex-row justify-start items-center w-full">
                <div className="text-sky-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                <div className="text-lg font-bold text-slate-800 w-full">
                    {announcement.announcementTitle}
                </div>
            </div>
            <div className="text-slate-700 text-md max-w-xxs break-words" dangerouslySetInnerHTML={{__html: announcement.details}}></div>
            
        </div>
    )
}

export const LoadingAnnouncement : FC = () => {
    return (
        <div className="flex flex-col justify-start items-center w-full h-auto rounded-md bg-gray-200 animate-pulse">
            <div className="w-full flex flex-col justify-start items-start">
                {getInitializedArray(2,3).map((v, i) => <div key={i} className="text-start font-medium text-2xl text-slate-900">{'ㅤ'}</div>)}
            </div>
        </div>
    )
}

export default Announcement;