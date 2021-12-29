
import React, {
    FC,
    useState
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';

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
                {data.map((gradeObject : any, index : number) => 
                    <div className="w-full flex flex-row justify-between items-center" key={index}>
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

export const LoadingClassGradeBox : FC = () => {

    return (
        <div className={`animate-pulse wh-auto flex flex-row justify-start items-center w-full `}>

            {/* Header with Chevron */}
            <div className={`w-auto bg-gray-300 flex flex-row justify-start items-center cursor-pointer transition duration-250 ease-in-out  py-1 rounded-md`}
            >
                <div className="font-medium text-2xl text-slate-800">
                    {getInitializedArray(8, 4).map(v => 'ㅤ')}
                </div>
            </div>
        </div>
    )
}

export default ClassGradeBox;