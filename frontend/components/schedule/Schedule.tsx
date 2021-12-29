import React, {
    FC,
    useState
} from 'react';
import { Schedule } from '../../pages/dashboard/cache';
import ColumnContainer from '../multi/ColumnContainer';
import CalendarItem, { LoadingCalendarItem } from './CalendarItem';

interface ScheduleProps {
    schedule : Schedule | null
}

const Schedule : FC<ScheduleProps> = ({
    schedule
} : ScheduleProps) => {

    if (schedule === null) {

        const theRandom = Math.floor(Math.random() * 10) + 8

        return (
            <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            }
            header={`My Schedule`}
            breakpoint='xl:block'
            >
                {/* Content */}
                <div className="w-full flex-1 rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-between items-center">

                    {/* Container just in case */}
                    <div className="w-full h-full flex flex-col justify-start items-center">
                        {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(n => 
                            <div className={`w-full flex flex-1 justify-start items-center border-t`}
                            key={n}
                            >
                                <div className="h-full flex flex-col justify-start items-start w-12">
                                    <div className={`font-medium text-slate-900 text-md`}>
                                        {`${n === 12 || n === 24 ? 12 : n % 12}${n >= 12 ? 'PM' : 'AM'}`}
                                    </div>
                                </div>

                                {/* ${n % 2 === 0 ? 'bg-zinc-100' : 'bg-zinc-200'} */}
                                <div className={` flex flex-1 h-full relative`}> 
                                    {theRandom === n ? 
                                    <>
                                        <LoadingCalendarItem />
                                    </>
                                    : null}
                                </div>
                            </div>    
                        )}
                    </div>
                </div>
            </ColumnContainer>
        )
    }

    const data : any = [
        {
            startTime: 8,
            endTime: 9,
            className: 'MATH-225',
            classType: 'Discussion',
            classLocation: 'SGM-152'
        },
        {
            startTime: 12,
            endTime: 14,
            className: 'CSCI-270',
            classType: 'Lecture',
            classLocation: 'FCK-112'
        },
        {
            startTime: 14,
            endTime: 15,
            className: 'CSCI-201',
            classType: 'Discussion',
            classLocation: 'RRT-224'
        }
    ]


    return (

        <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            }
            header={`My Schedule`}
            breakpoint='xl:block'
        >
            {/* Content */}
            <div className="w-full flex-1 rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-between items-center">

                {/* Container just in case */}
                <div className="w-full h-full flex flex-col justify-start items-center">
                    {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(n => 
                        <div className={`w-full flex flex-1 justify-start items-center border-t`}
                        key={n}
                        >
                            <div className="h-full flex flex-col justify-start items-start w-12">
                                <div className={`font-medium text-slate-900 text-md`}>
                                    {`${n === 12 || n === 24 ? 12 : n % 12}${n >= 12 ? 'PM' : 'AM'}`}
                                </div>
                            </div>

                            {/* ${n % 2 === 0 ? 'bg-zinc-100' : 'bg-zinc-200'} */}
                            <div className={` flex flex-1 h-full relative`}> 
                                {Math.random() * 10 > 9 ? 
                                <>
                                    <CalendarItem
                                        className='MATH-225'
                                        classType='Lecture'
                                        classLocation="SGM-152"
                                        bgColor={Math.random() * 10 > 5 ? 'bg-sky-400' : 'bg-emerald-400'}
                                    />
                                </>
                                : null}
                            </div>
                        </div>    
                    )}
                </div>
                
                

            </div>
        </ColumnContainer>
    )
}



export default Schedule;