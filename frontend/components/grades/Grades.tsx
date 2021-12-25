import React, {
    FC,
    useState
} from 'react';
import ColumnContainer from '../multi/ColumnContainer';

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


enum AssignmentStatus {
    GRADED,
    NOT_SUBMITTED,
    NEEDS_GRADING
}

interface ClassGradeBoxProps {
    className: string,
    chevronColor: string,
    highlightColor: string,
    bulletColor: string,
    gradeTextColor: string,
    gradeBgColor: string
}

const ClassGradeBox : FC<ClassGradeBoxProps> = ({
    className,
    chevronColor,
    highlightColor,
    bulletColor,
    gradeTextColor,
    gradeBgColor
} : ClassGradeBoxProps) => {

    const [isToggled, setIsToggled] = useState<boolean>(false);

    const data : any = [
        {
            assignmentTitle: 'Homework 1',
            assignmentGrade: '89/100',
            assignmentStatus: AssignmentStatus.GRADED
        },
        {
            assignmentTitle: 'Homework 2',
            assignmentGrade: '0/100',
            assignmentStatus: AssignmentStatus.NOT_SUBMITTED
        },
        {
            assignmentTitle: 'Midterm 1',
            assignmentGrade: '0/100',
            assignmentStatus: AssignmentStatus.NEEDS_GRADING
        }
    ]

    const getColorBasedOnStatus = (status : AssignmentStatus) => {
        switch (status) {
            case AssignmentStatus.GRADED:
                return "text-green-300";
            case AssignmentStatus.NEEDS_GRADING:
                return "text-yellow-300";
            case AssignmentStatus.NOT_SUBMITTED:
                return "text-red-300";
        }
    }

    return (
        <div className={`h-auto flex flex-col justify-start items-center w-full `}>

            {/* Header with Chevron */}
            <div className={`w-full flex flex-row justify-start items-center cursor-pointer transition duration-250 ease-in-out ${highlightColor} py-1 rounded-md`}
            onClick={() => setIsToggled(!isToggled)}
            >
                <div className={`${chevronColor} mx-1 ${isToggled ? 'rotate-90' : 'rotate-0' } transition duration-500 ease-in-out`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                <div className="font-medium text-2xl text-slate-800">
                    {className}
                </div>
            </div>

            {/* Grades */}
            <div className={`${isToggled ? 'flex' : 'hidden'} w-full h-auto flex-col justify-start items-center`}>
                {data.map((gradeObject : any) => 
                    <div className="w-full flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-start items-center">
                            {/* Bullet Point */}
                            <div className={`font-bold text-3xl mx-2.5 ${getColorBasedOnStatus(gradeObject.assignmentStatus)}`}>
                                •
                            </div>

                            {/* Assignment Title */}
                            <div className="text-lg text-slate-700 font-medium">
                                {gradeObject.assignmentTitle}
                            </div>
                        </div>

                        {/* Grade */}
                        {/* Assignment Title */}
                        <div className={`text-lg ${gradeTextColor} font-medium ${gradeBgColor} px-2 rounded-md`}>
                            {gradeObject.assignmentGrade}
                        </div>

                        
                    </div>    
                )}
            </div>
            
        </div>
    )
}

export default Grades;