import React, {
    FC, useEffect, useState
} from 'react';
import AssignmentBlock, { LoadingAssignmentBlock } from './AssignmentBlock';
import DayContainer, { LoadingDayContainer } from './DayContainer';
import ColumnContainer from '../multi/ColumnContainer';
import { UpcomingAssignment } from '../../pages/dashboard/cache';
import getInitializedArray from '../../constants/functions/getInitializedArray';

interface AssignmentsProps {
    assignments: UpcomingAssignment[] | null
}

const Assignments : FC<AssignmentsProps> = ({
    assignments
} : AssignmentsProps) => {

    const todaysDate = (new Date()).getDate();
    const [as, setAs] = useState<any>([])
    const [assignmentDays, setAssignmentDays] = useState<number[]>();
    

    useEffect(() => {

        if (assignments === null) {
            return;
        }

        let obj : any = {

        }

        assignments?.forEach(a => {
            const day = (new Date()).getDay()
            
            if (!obj[day]) {
                obj[day] = [a];
            }
            else {
                obj[day] = [...obj[day], a];
            }
        })

        setAs(obj)

        console.log(obj)

        // We have confirmed sort() works
        // Remember the keys are strings though... now it works (high coding)
        let daysWithAssignments : any = Object.keys(obj);
        daysWithAssignments = daysWithAssignments.map((s : string) => parseInt(s));
        daysWithAssignments.sort(function(a : string, b : string){return parseInt(a)-parseInt(b)});

        daysWithAssignments = ["0", "1", "2", "3", "4", "5", "6", "7"];


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

        daysWithAssignments = [...daysWithAssignments, ...daysWithAssignments].slice(daysWithAssignments.indexOf(startingDate + ''), daysWithAssignments.indexOf(startingDate + '') + daysWithAssignments.length);
        console.log(daysWithAssignments)

        setAssignmentDays(daysWithAssignments)

    }, [assignments]);

    

    if (assignments === null) {
        return (
            <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            }
            header={`My Assignments`}
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
        >
            {/* Content */}
            <div className="rounded-b-xl bg-zinc-50 w-full h-full flex flex-col justify-start items-center">
                <div className="overflow-y-scroll scrollbar-hide px-4 pb-2 py-2  w-full h-full flex flex-col justify-start items-center">

                {assignmentDays?.map((day, index) => {
                    let assignmentList : UpcomingAssignment[] = as[day + ''];
                    // return;
                    if (!assignmentList) {
                        console.log("Something very not good happened (Assignments.tsx")
                        return;
                    }

                    let header;
                    if (day === todaysDate) {
                        header = "Today"
                    }
                    else {
                        header = "Eventually"
                    }

                    console.log( 'assignmentList', assignmentList)

                    return <>
                        <DayContainer
                        dayTitle={header}
                        dayDate={'12/25/21'}
                        >
                            {assignmentList.map((a, i) => {
                                return <AssignmentBlock 
                                    key={i}
                                    headerColor={'bg-sky-500'}
                                    contentColor={'bg-sky-300'}
                                    dueTime={'1:69 PM'}
                                    className={a.className}
                                    assignmentTitle={a.assignmentTitle}
                                />
                            })}
                        </DayContainer>
                    </>
                })}

                <DayContainer
                    dayTitle={'Today'}
                    dayDate={'12/25/21'}
                >
                    
                    <AssignmentBlock 
                        headerColor={'bg-sky-500'}
                        contentColor={'bg-sky-300'}
                        dueTime={'1:45 PM'}
                        className={'MATH-225'}
                        assignmentTitle={'Homework 8'}
                    />

<AssignmentBlock 
                        headerColor={'bg-sky-500'}
                        contentColor={'bg-sky-300'}
                        dueTime={'1:45 PM'}
                        className={'MATH-225'}
                        assignmentTitle={'Homework 8'}
                    />

<AssignmentBlock 
                        headerColor={'bg-sky-500'}
                        contentColor={'bg-sky-300'}
                        dueTime={'1:45 PM'}
                        className={'MATH-225'}
                        assignmentTitle={'Homework 8'}
                    />

                    <AssignmentBlock 
                        headerColor={'bg-rose-500'}
                        contentColor={'bg-rose-300'}
                        dueTime={'12:00 PM'}
                        className={'CSCI-270'}
                        assignmentTitle={'PA 4'}
                    />
                </DayContainer>

                <DayContainer
                    dayTitle={'Tomorrow'}
                    dayDate={'12/26/21'}
                >
                    <AssignmentBlock 
                        headerColor={'bg-indigo-500'}
                        contentColor={'bg-indigo-300'}
                        dueTime={'12:00 PM'}
                        className={'BAEP-470'}
                        assignmentTitle={'Reflection 3'}
                    />
                </DayContainer>

                <DayContainer
                    dayTitle={'Monday'}
                    dayDate={'12/27/21'}
                >
                    <AssignmentBlock 
                        headerColor={'bg-emerald-500'}
                        contentColor={'bg-emerald-300'}
                        dueTime={'11:59 PM'}
                        className={'WRIT-340'}
                        assignmentTitle={'Essay 2'}
                    />
                    <AssignmentBlock 
                        headerColor={'bg-orange-500'}
                        contentColor={'bg-orange-300'}
                        dueTime={'5:00 PM'}
                        className={'CSCI-201'}
                        assignmentTitle={'Quiz 5'}
                    />
                </DayContainer>
                </div>

                </div>
        </ColumnContainer>
    )
}

export default Assignments;