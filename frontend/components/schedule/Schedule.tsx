import React, {
    FC,
    useEffect,
    useRef,
    useState
} from 'react';
import { Event, Schedule } from '../../constants/interfaces/cache';
import ColumnContainer from '../multi/ColumnContainer';
import CalendarItem, { LoadingCalendarItem } from './CalendarItem';
import colors, {
    gradientColors
} from '../assignments/colors';

interface ScheduleProps {
    schedule : Schedule | null,
    tutorialStep: number
}

const Schedule : FC<ScheduleProps> = React.memo(({
    schedule,
    tutorialStep
} : ScheduleProps) => {


    const [todaysSchedule, setTodaysSchedule] = useState<Event[]>();
    const [times, setTimes] = useState<number[]>([])

    // We have to do this bc of the way tailwind compiles its styles
    const timeIncrements = {
        '6/6': 'h-6/6',
        '7/6': 'h-7/6',
        '8/6': 'h-8/6',
        '9/6': 'h-9/6',
        '10/6': 'h-10/6',
        '11/6': 'h-11/6',
        '12/6': 'h-12/6',
        '13/6': 'h-13/6',
        '14/6': 'h-14/6',
        '15/6': 'h-15/6',
        '16/6': 'h-16/6',
        '17/6': 'h-17/6',
        '18/6': 'h-18/6',
        '19/6': 'h-19/6',
        '20/6': 'h-20/6',
        '21/6': 'h-21/6',
        '22/6': 'h-22/6',
        '23/6': 'h-23/6',
        '24/6': 'h-24/6',
    }

    useEffect(() => {
        if (!schedule) return;

        let day : any = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][(new Date()).getDay()]
        setTimes([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])

        // day = 'wednesday';
        if (day === 'sunday' || day === 'saturday') {
            setTodaysSchedule([]);
            return;
        }

        // @ts-ignore
        setTodaysSchedule(schedule[day].sort((e1 : Event, e2 : Event) => {

            let e1index = e1.startTime.indexOf(':')
            let e2index = e2.startTime.indexOf(':')

            if (e1index !== e2index) {
                if (e1index > e2index) {
                    return 1;
                }
                return -1;
            }
            // AM
            else if (e1index === 1) {
                if (parseInt( e1.startTime.substring(0, 1) ) > parseInt(e2.startTime.substring(0, 1))) {
                    return 1;
                }
                else if (parseInt( e1.startTime.substring(0, 1) ) < parseInt(e2.startTime.substring(0, 1))) {
                    return -1
                }
                else {
                    return 0;
                }
            }
            // PM
            else {
                if (parseInt( e1.startTime.substring(0, 2) ) > parseInt(e2.startTime.substring(0, 2))) {
                    return 1;
                }
                else if (parseInt( e1.startTime.substring(0, 2) ) < parseInt(e2.startTime.substring(0, 2))) {
                    return -1
                }
                else {
                    return 0;
                }
            }

        }))

    }, [schedule])

    const divRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        if (tutorialStep === 4) {
            divRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'end',
            });
        }
    }, [tutorialStep])


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
            w={'w-1/4 2xl:w-1/5'}
            ref={divRef}
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

    return (

        <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            }
            header={`My Schedule`}
            breakpoint='xl:block'
            w={'w-1/4 2xl:w-1/5'}
            ref={divRef}
        >
            {/* Content */}
            <div ref={divRef} className="bg-emerald-300 w-full flex-1 rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-between items-center">

                {/* Container just in case */}
                <div className="relative w-full h-full flex flex-col justify-start items-center">
                    {times.map(n => {
                        
                        let hypIndex = todaysSchedule?.findIndex((e) => n + ':' === e.startTime.substring(0, (n + ':').length));
                        let event;
                        let height;
                        let startMinute = 0;

                        // This code is actually fucking insane
                        if (todaysSchedule && hypIndex !== null && hypIndex !== undefined && hypIndex !== -1) {
                            event = todaysSchedule[hypIndex];

                            let startHour = parseInt(event.startTime.split(':')[0])
                            let endHour = parseInt(event.endTime.split(':')[0])  

                            startMinute = parseInt(event.startTime.split(':')[1])
                            let endMinute = parseInt(event.endTime.split(':')[1])

                            let hourDifference = endHour - startHour;
                            let minuteDifference = endMinute - startMinute;

                            // Round down to 10... this shouldn't happen anyway
                            if (minuteDifference % 10 !== 0) {
                                minuteDifference -= minuteDifference % 10;
                            }

                            let heightIncrement = (hourDifference * 6) + (minuteDifference / 10);

                            // @ts-ignore
                            height = timeIncrements[`${heightIncrement}/6`];
                            
                        }

                        return <div className={`w-full flex flex-1 justify-start items-center border-t`}
                        key={n}
                        >
                            <div className="h-full flex flex-col justify-start items-start w-12">
                                <div className={`font-medium text-slate-900 text-md`}>
                                    {`${n === 12 || n === 24 ? 12 : n % 12}${n >= 12 ? 'PM' : 'AM'}`}
                                </div>
                            </div>

                            

                            

                            {/* ${n % 2 === 0 ? 'bg-zinc-100' : 'bg-zinc-200'} */}
                            <div className={` flex flex-1 h-full relative`}> 
                                {
                                    event ?
                                    <>
                                        <CalendarItem
                                            className={event.className}
                                            classType={event.classType}
                                            classLocation={event.classLocation}
                                            bgColor={gradientColors[hypIndex!]['bg400']}

                                            // @ts-ignore
                                            height={height}
                                            // initialOffset={}
                                            startMinute={startMinute}
                                        />
                                    </>
                                    : null
                                }
                            </div>
                        </div>    
                        }
                    )}
                </div>
                
                

            </div>
        </ColumnContainer>
    )
})

Schedule.displayName = 'Schedule';



export default Schedule;