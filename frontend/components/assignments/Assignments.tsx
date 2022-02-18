import React, {
    FC, useEffect, useRef, useState
} from 'react';
import AssignmentBlock, { LoadingAssignmentBlock } from './AssignmentBlock';
import DayContainer, { LoadingDayContainer } from './DayContainer';
import ColumnContainer from '../multi/ColumnContainer';
import { CompiledAssignments, UpcomingAssignment } from '../../constants/interfaces/cache';
import getInitializedArray from '../../constants/functions/getInitializedArray';
import colors, {
    gradientColors as colors2
} from './colors'

interface AssignmentsProps {
    assignments: CompiledAssignments | null,
    tutorialStep: number
}

const Assignments : FC<AssignmentsProps> = React.memo(({
    assignments,
    tutorialStep
} : AssignmentsProps) => {

    const [todaysDate, setTodaysDate] = useState<number>((new Date()).getDate());
    const [as, setAs] = useState<any>([])
    const [assignmentDays, setAssignmentDays] = useState<number[]>();
    const [listOfClasses, setListOfClasses] = useState<string[]>();

    const divRef = useRef<HTMLDivElement>(typeof window === 'undefined' ? null : document.createElement('div'));
    useEffect(() => {
        if (typeof window !== 'undefined' && tutorialStep === 2) {
            divRef.current!.scrollIntoView({
                // behavior: 'smooth',
                inline: 'end',
            });
        }
    }, [tutorialStep])


    useEffect(() => {

        if (assignments === null) {
            return;
        }

        let assignmentsCopy : UpcomingAssignment[] = [];
        Object.keys(assignments).forEach(key => assignmentsCopy = [...assignmentsCopy, ...assignments[key]])

        let obj : any = {

        }

        let listOfC = new Set<string>();

        assignmentsCopy?.forEach(a => {
            const day = (new Date(a.dueDate)).getDate()

            listOfC.add(a.className)
            
            if (!obj[day]) {
                obj[day] = [a];
            }
            else {
                obj[day] = [...obj[day], a];
            }
        })


        setAs(obj)
        setListOfClasses(Array.from(listOfC))

        // We have confirmed sort() works
        // Remember the keys are strings though... now it works (high coding)
        let daysWithAssignments : any = Object.keys(obj);
        daysWithAssignments = daysWithAssignments.map((s : string) => parseInt(s));
        daysWithAssignments.sort(function(a : string, b : string){return parseInt(a)-parseInt(b)});

        let startingDate;
        for (let i = todaysDate, k = 0; k < 32; i++, k++) {

            if (obj[i + '']) {
                startingDate = i;
                break;
            }

            if (i === 31) {
                i = 0;
            }
            
        }

        // Change the array so the the first element is the closest day to today's date
        // i.e. Today is Jan. 5
        //      Orignally, the list is [1, 4, 6, 10, 11]
        //      It changes the list so the first index is the closest to 5 (without going backwards)
        //      So the list is now     [6, 10, 11, 1, 4]
        // We do this because it lets us order the assignments in order of most close to being due
        // This assumes that we don't load any assignments that are past the due date.
        daysWithAssignments = [...daysWithAssignments, ...daysWithAssignments].slice(daysWithAssignments.indexOf(startingDate), daysWithAssignments.indexOf(startingDate) + daysWithAssignments.length);

        setAssignmentDays(daysWithAssignments)

    }, [assignments, todaysDate]);

    

    if (assignments === null) {
        return (
            <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            }
            header={`My Assignments`}
            w={'w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5'}
            >
                {/* Content */}
                <div className="w-full h-auto rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-start items-center space-y-8">
                    <LoadingDayContainer>
                        <LoadingAssignmentBlock />
                        <LoadingAssignmentBlock />
                    </LoadingDayContainer>
                    <LoadingDayContainer>
                        {getInitializedArray(1, 3).map((v, i) => <LoadingAssignmentBlock key={i}/>)}
                    </LoadingDayContainer>
                </div>
            </ColumnContainer>
        )
    }

    return (

        <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            }
            header={`My Assignments`}
            w={'w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5'}
        >
            {/* Content */}
            <div ref={divRef} className="rounded-b-xl bg-zinc-50 w-full h-full flex flex-col justify-start items-center">
                <div className="overflow-y-scroll scrollbar-hide px-4 pb-2 py-2  w-full h-full flex flex-col justify-start items-center">
                {assignmentDays?.length === 0 ?
                <>
                    <div className="flex flex-row justify-center items-center my-8 space-x-2">
                        
                        
                        <div className="text-lg text-slate-800 font-medium">
                            No Assignments
                        </div>
                        <div className="text-slate-600 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                    </div>
                    
                </>
                : null}
                {assignmentDays?.map((day, index) => {

                    let assignmentList : UpcomingAssignment[] = as[day + ''];
                    // return;
                    if (!assignmentList) {
                        console.log("Something very not good happened (Assignments.tsx")
                        return;
                    }
                    let date = new Date(assignmentList[0].dueDate);

                    let header;
                    if (day === todaysDate) {
                        header = "Today"
                    }
                    else {
                        header = date.getDay();
                        header = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][header];
                    }


                    return (
                        <DayContainer
                        key={index}
                        dayTitle={header}
                        // Notice we do +1 because the months are zero-indexed...
                        dayDate={`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
                        >
                            {assignmentList.map((a, i) => {

                                let indAssignmentDate = new Date(a.dueDate);
                                console.log(`a.dueDate`, a.dueDate)
                                console.log(`indAssignmentDate.UTC`, indAssignmentDate.toUTCString())
                                console.log(indAssignmentDate)
                                console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

                                let hours = indAssignmentDate.getHours();
                                let minutes = indAssignmentDate.getMinutes();

                                console.log('hours', hours)

                                let isPM = hours > 12;

                                let classIndex = listOfClasses?.indexOf(a.className);

                                if (classIndex === -1) console.log('uhh wtf')

                                return <AssignmentBlock 
                                    key={i}
                                    headerColor={colors2[classIndex! % colors2.length]['bg600']}
                                    contentColor={colors2[classIndex! % colors2.length]['bg400']}
                                    dueTime={`${isPM ? hours - 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${isPM ? 'PM' : 'AM'}`}
                                    className={a.className}
                                    assignmentTitle={a.assignmentTitle}
                                />
                            })}
                        </DayContainer>)
                })}

                </div>

            </div>
        </ColumnContainer>
    )
})

Assignments.displayName = 'Assignments';

export default Assignments;