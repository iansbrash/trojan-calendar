import React, {
    FC,
    useState
} from 'react';
import ColumnContainer from '../multi/ColumnContainer';

const Announcements : FC = () => {

    

    return (

        <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            }
            header={`Announcements`}
        >
            {/* Content */}
            <div className="w-full flex-1 rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-between items-center">
                

            </div>
        </ColumnContainer>
    )
}


export default Announcements;