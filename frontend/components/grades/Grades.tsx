import React, {
    FC,
    useState
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';
import { CompiledGrades } from '../../pages/dashboard/cache';
import ColumnContainer from '../multi/ColumnContainer';
import ClassGradeBox, { LoadingClassGradeBox } from './ClassGradeBox';
import colors from '../assignments/colors';

interface GradesProps {
    grades: CompiledGrades | null
}

const Grades : FC<GradesProps> = React.memo(({
    grades
} : GradesProps) => {

    if (grades === null) {
        return (
            <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            }
            header={`My Grades`}
            breakpoint='md:block'
        >
            {/* Content */}
            <div className="w-full pb-4 rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-start items-center space-y-4">
                {getInitializedArray(3, 3).map((v, i) => <LoadingClassGradeBox key={i}/>)}
            </div>
            </ColumnContainer>
        )
    }


    return (

        <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            }
            header={`My Grades`}
            breakpoint='md:block'
        >
            {/* Content */}
            <div className="overflow-y-scroll scrollbar-hide w-full pb-4 h-auto rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-start items-center space-y-4">
                {
                    Object.keys(grades).map(key =>  Object.keys(grades[key]).map((k2, i) => {

                        return (
                            <ClassGradeBox 
                                key={k2}
                                chevronColor={colors[i]['text400']}
                                className={k2}
                                highlightColor={colors[i]['hoverbg100']}
                                bulletColor={colors[i]['text200']}
                                gradeTextColor={colors[i]['text700']}
                                gradeBgColor={colors[i]['bg100']}
                                individualGrades={grades[key][k2]}
                            />
                        )
                    }))
                }
            </div>
        </ColumnContainer>
    )
})


export default Grades;