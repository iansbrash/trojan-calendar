import React, {
    FC,
    useState
} from 'react';
import ColumnContainer from '../multi/ColumnContainer';
import ClassGradeBox from './ClassGradeBox';

const Grades : FC = () => {
    return (

        <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            }
            header={`My Grades`}
        >
            {/* Content */}
            <div className="w-full h-auto rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-start items-center space-y-4">

                <ClassGradeBox 
                    chevronColor='text-sky-400'
                    className='MATH-225'
                    highlightColor='hover:bg-sky-100'
                    bulletColor='text-sky-200'
                    gradeTextColor='text-sky-700'
                    gradeBgColor='bg-sky-100'
                />

                <ClassGradeBox 
                    chevronColor='text-rose-400'
                    className='CSCI-270'
                    highlightColor='hover:bg-rose-100'
                    bulletColor='text-rose-200'
                    gradeTextColor='text-rose-700'
                    gradeBgColor='bg-rose-100'
                />

                <ClassGradeBox 
                    chevronColor='text-indigo-400'
                    className='BAEP-470'
                    highlightColor='hover:bg-indigo-100'
                    bulletColor='text-indigo-200'
                    gradeTextColor='text-indigo-700'
                    gradeBgColor='bg-indigo-100'
                />

                <ClassGradeBox 
                    chevronColor='text-emerald-400'
                    className='WRIT-340'
                    highlightColor='hover:bg-emerald-100'
                    bulletColor='text-emerald-200'
                    gradeTextColor='text-emerald-700'
                    gradeBgColor='bg-emerald-100'
                />

                <ClassGradeBox 
                    chevronColor='text-orange-400'
                    className='CSCI-201'
                    highlightColor='hover:bg-orange-100'
                    bulletColor='text-orange-200'
                    gradeTextColor='text-orange-700'
                    gradeBgColor='bg-orange-100'
                />

            </div>
        </ColumnContainer>
    )
}


export default Grades;