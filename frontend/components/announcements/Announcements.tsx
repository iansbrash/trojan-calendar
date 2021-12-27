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
            breakpoint='2xl:block'
        >
            {/* Content */}
            <div className="w-full flex-1 rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-start items-center space-y-4">
                {/* Individual Announcement */}
                <div className="flex flex-col justify-start items-center w-full h-auto">
                    <div className="w-full flex flex-row justify-start items-start">
                        <div className="text-amber-500 mx-1">
                            {/* • */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="mt-1.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="text-start font-medium text-2xl text-slate-900">
                            Add/Drop Period Ends February 3rd
                        </div>
                    </div>
                </div>

                {/* Individual Announcement */}
                <div className="flex flex-col justify-start items-center w-full h-auto">
                    <div className="w-full flex flex-row justify-start items-start">
                        <div className="text-sky-500 mx-1">
                            {/* • */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="mt-1.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="text-start font-medium text-2xl text-slate-900">
                            IFC Confirms Sigma Nu Suspended Indefinitely
                        </div>
                    </div>
                </div>

            </div>
        </ColumnContainer>
    )
}


export default Announcements;