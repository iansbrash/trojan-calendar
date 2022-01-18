import React, {
    FC, useEffect, useState
} from 'react';
import AssignmentBlock, { LoadingAssignmentBlock } from './AssignmentBlock';
import DayContainer, { LoadingDayContainer } from './DayContainer';
import ColumnContainer from '../multi/ColumnContainer';
import { CompiledAssignments, UpcomingAssignment } from '../../pages/dashboard/cache';
import getInitializedArray from '../../constants/functions/getInitializedArray';
import colors from './colors'

interface AssignmentsProps {
    assignments: CompiledAssignments | null
}

const Assignments : FC<AssignmentsProps> = React.memo(({
    assignments
} : AssignmentsProps) => {

    const todaysDate = (new Date()).getDate();
    const [as, setAs] = useState<any>([])
    const [assignmentDays, setAssignmentDays] = useState<number[]>();
    const [listOfClasses, setListOfClasses] = useState<string[]>();

    


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



{/* GESTING */}
                <div className="cursor-pointer w-full  h-auto flex flex-col justify-start items-center drop-shadow-md relative py-2">
                    {/* Due Date */}
                    <div className="px-2 absolute w-auto h-5 bg-red-600 rounded-md top-0 -right-3 flex justify-center items-center">
                        <div className="font-bold text-white">
                            {'11:45'}
                        </div>
                    </div>

                    {/* Top Header */}
                    <div className={`w-full rounded-t-md bg-gradient-to-r from-sky-600 to-blue-600 flex justify-center items-center py-2`}>
                        <div className="font-bold text-3xl text-zinc-50">
                            {'MATH-123'}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full h-full bg-gradient-to-r from-sky-400 to-blue-400 rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                        {'Hw3'}
                    </div>
                </div>

                <div className="cursor-pointer w-full  h-auto flex flex-col justify-start items-center drop-shadow-md relative py-2">
                    {/* Due Date */}
                    <div className="px-2 absolute w-auto h-5 bg-red-600 rounded-md top-0 -right-3 flex justify-center items-center">
                        <div className="font-bold text-white">
                            {'11:45'}
                        </div>
                    </div>

                    {/* Top Header */}
                    <div className={`w-full rounded-t-md bg-gradient-to-r from-emerald-600 to-green-600 flex justify-center items-center py-2`}>
                        <div className="font-bold text-3xl text-zinc-50">
                            {'MATH-123'}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                        {'Hw3'}
                    </div>
                </div>

                <div className="cursor-pointer w-full  h-auto flex flex-col justify-start items-center drop-shadow-md relative py-2">
                    {/* Due Date */}
                    <div className="px-2 absolute w-auto h-5 bg-red-600 rounded-md top-0 -right-3 flex justify-center items-center">
                        <div className="font-bold text-white">
                            {'11:45'}
                        </div>
                    </div>

                    {/* Top Header */}
                    <div className={`w-full rounded-t-md bg-gradient-to-r from-indigo-600 to-violet-600 flex justify-center items-center py-2`}>
                        <div className="font-bold text-3xl text-zinc-50">
                            {'MATH-123'}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full h-full bg-gradient-to-r from-indigo-400 to-violet-400 rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                        {'Hw3'}
                    </div>
                </div>

                <div className="cursor-pointer w-full  h-auto flex flex-col justify-start items-center drop-shadow-md relative py-2">
                    {/* Due Date */}
                    <div className="px-2 absolute w-auto h-5 bg-red-600 rounded-md top-0 -right-3 flex justify-center items-center">
                        <div className="font-bold text-white">
                            {'11:45'}
                        </div>
                    </div>

                    {/* Top Header */}
                    <div className={`w-full rounded-t-md bg-gradient-to-r from-fuchsia-600 to-pink-600 flex justify-center items-center py-2`}>
                        <div className="font-bold text-3xl text-zinc-50">
                            {'MATH-123'}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full h-full bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                        {'Hw3'}
                    </div>
                </div>

                <div className="cursor-pointer w-full  h-auto flex flex-col justify-start items-center drop-shadow-md relative py-2">
                    {/* Due Date */}
                    <div className="px-2 absolute w-auto h-5 bg-red-600 rounded-md top-0 -right-3 flex justify-center items-center">
                        <div className="font-bold text-white">
                            {'11:45'}
                        </div>
                    </div>

                    {/* Top Header */}
                    <div className={`w-full rounded-t-md bg-gradient-to-r from-pink-600 to-rose-600 flex justify-center items-center py-2`}>
                        <div className="font-bold text-3xl text-zinc-50">
                            {'MATH-123'}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                        {'Hw3'}
                    </div>
                </div>

                <div className="cursor-pointer w-full  h-auto flex flex-col justify-start items-center drop-shadow-md relative py-2">
                    {/* Due Date */}
                    <div className="px-2 absolute w-auto h-5 bg-red-600 rounded-md top-0 -right-3 flex justify-center items-center">
                        <div className="font-bold text-white">
                            {'11:45'}
                        </div>
                    </div>

                    {/* Top Header */}
                    <div className={`w-full rounded-t-md bg-gradient-to-r from-teal-600 to-cyan-600 flex justify-center items-center py-2`}>
                        <div className="font-bold text-3xl text-zinc-50">
                            {'MATH-123'}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                        {'Hw3'}
                    </div>
                </div>

                <div className="cursor-pointer w-full  h-auto flex flex-col justify-start items-center drop-shadow-md relative py-2">
                    {/* Due Date */}
                    <div className="px-2 absolute w-auto h-5 bg-red-600 rounded-md top-0 -right-3 flex justify-center items-center">
                        <div className="font-bold text-white">
                            {'11:45'}
                        </div>
                    </div>

                    {/* Top Header */}
                    <div className={`w-full rounded-t-md bg-gradient-to-r from-orange-600 to-amber-600 flex justify-center items-center py-2`}>
                        <div className="font-bold text-3xl text-zinc-50">
                            {'MATH-123'}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                        {'Hw3'}
                    </div>
                </div>

                <div className="cursor-pointer w-full  h-auto flex flex-col justify-start items-center drop-shadow-md relative py-2">
                    {/* Due Date */}
                    <div className="px-2 absolute w-auto h-5 bg-red-600 rounded-md top-0 -right-3 flex justify-center items-center">
                        <div className="font-bold text-white">
                            {'11:45'}
                        </div>
                    </div>

                    {/* Top Header */}
                    <div className={`w-full rounded-t-md bg-gradient-to-r from-teal-600 to-sky-600 flex justify-center items-center py-2`}>
                        <div className="font-bold text-3xl text-zinc-50">
                            {'MATH-123'}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full h-full bg-gradient-to-r from-teal-400 to-sky-400 rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                        {'Hw3'}
                    </div>
                </div>

                <div className="cursor-pointer w-full  h-auto flex flex-col justify-start items-center drop-shadow-md relative py-2">
                    {/* Due Date */}
                    <div className="px-2 absolute w-auto h-5 bg-red-600 rounded-md top-0 -right-3 flex justify-center items-center">
                        <div className="font-bold text-white">
                            {'11:45'}
                        </div>
                    </div>

                    {/* Top Header */}
                    <div className={`w-full rounded-t-md bg-gradient-to-r from-cyan-600 to-blue-600 flex justify-center items-center py-2`}>
                        <div className="font-bold text-3xl text-zinc-50">
                            {'MATH-123'}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                        {'Hw3'}
                    </div>
                </div>







{/* GESTING */}


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

                                let hours = indAssignmentDate.getHours();
                                let minutes = indAssignmentDate.getMinutes();

                                let isPM = hours > 12;

                                let classIndex = listOfClasses?.indexOf(a.className);

                                if (classIndex === -1) console.log('uhh wtf')

                                return <AssignmentBlock 
                                    key={i}
                                    headerColor={colors[classIndex! % colors.length]['bg500']}
                                    contentColor={colors[classIndex! % colors.length]['bg300']}
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

export default Assignments;