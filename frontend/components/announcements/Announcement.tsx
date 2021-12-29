import React, {
    FC
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';

interface AnnouncementProps {
    chevronColor: string,
    text: string
}

const Announcement : FC<AnnouncementProps> = ({
    chevronColor,
    text
} : AnnouncementProps) => {
    return (
        <div className="flex flex-col justify-start items-center w-full h-auto">
            <div className="w-full flex flex-row justify-start items-start">
                <div className={`${chevronColor} mx-1`}>
                    {/* • */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="mt-1.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                <div className="text-start font-medium text-2xl text-slate-900">
                    {text}
                </div>
            </div>
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