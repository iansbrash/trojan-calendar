import React, {
    FC
} from 'react';
import AssignmentBlock from './AssignmentBlock';
import DayContainer from './DayContainer';
import ColumnContainer from '../multi/ColumnContainer';

const Assignments : FC = () => {
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
        </ColumnContainer>
    )
}

export default Assignments;