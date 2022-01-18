
import React, {
    FC,
    useEffect,
    useState
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';
import { IndividualGrade } from '../../constants/interfaces/cache';

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
    gradeBgColor: string,
    individualGrades: IndividualGrade[]
}

interface MappingProps {
    assignmentTitle: string,
    grade: string,
    status: AssignmentStatus
}

const ClassGradeBox : FC<ClassGradeBoxProps> = ({
    className,
    chevronColor,
    highlightColor,
    bulletColor,
    gradeTextColor,
    gradeBgColor,
    individualGrades
} : ClassGradeBoxProps) => {

    const [isToggled, setIsToggled] = useState<boolean>(false);

    //"Needs Grading"
    //"Graded"
    //"Not Submitted"
    const [ass, setAss] = useState<MappingProps[]>()

    useEffect(() => {

        if (!individualGrades) return;

        let a : MappingProps[] = individualGrades.map(s => {

            let enumStatus;
    
            
            if (s.status === 'Graded') {
                enumStatus = AssignmentStatus.GRADED
            }
            else if (s.status === 'Not Submitted') {
                enumStatus = AssignmentStatus.NOT_SUBMITTED
            }
            else {
                enumStatus = AssignmentStatus.NEEDS_GRADING
            }
    
            return {
                assignmentTitle: s.assignmentTitle,
                grade: enumStatus === AssignmentStatus.NEEDS_GRADING ? 'N/A' : s.grade.split(' ').join('/'),
                status: enumStatus
            }
        })

        setAss(a);
    }, [individualGrades])

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
                <div className="h-full flex flex-col justify-start items-center pt-1">
                <div className={`${chevronColor} mx-1 ${isToggled ? 'rotate-90' : 'rotate-0' } transition duration-500 ease-in-out`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                </div>
                
                <div className="font-medium text-2xl text-slate-800">
                    {className}
                </div>
            </div>

            {/* Grades */}
            <div className={`${isToggled ? 'flex' : 'hidden'} w-full h-auto flex-col justify-start items-center`}>

                {/* When there's no grades */}
                {ass?.length === 0 ? 
                <div className="w-full flex flex-row justify-start items-center">
                    <div className={`font-bold text-3xl mx-2.5 ${bulletColor}`}>
                        •
                    </div>

                    {/* Assignment Title */}
                    <div className="text-lg text-slate-700 font-medium">
                        No grades yet
                    </div>
                </div>
                : null}

                {/* When there are grades! */}
                {ass?.map((gradeObject : any, index : number) => 
                    <div className="w-full flex flex-row justify-between items-center" key={index}>
                        <div className="flex flex-row justify-start items-center">
                            {/* Bullet Point */}
                            <div className={`font-bold text-3xl mx-2.5 ${getColorBasedOnStatus(gradeObject.status)}`}>
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
                            {gradeObject.grade}
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