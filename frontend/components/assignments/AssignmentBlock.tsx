import React, {
    FC
} from 'react';

interface AssignmentBlockProps {
    headerColor: string,
    contentColor: string,
    dueTime: string,
    className: string,
    assignmentTitle: string
}

const AssignmentBlock : FC<AssignmentBlockProps> = ({
    headerColor,
    contentColor,
    dueTime,
    className,
    assignmentTitle
} : AssignmentBlockProps) => {
    return (
        <div className="cursor-pointer hover:scale-105 transition ease-in-out duration-250 w-full h-auto py-2 flex flex-col justify-start items-center drop-shadow-md relative">
            {/* Due Date */}
            <div className="px-2 absolute w-auto h-5 bg-red-600 rounded-md top-0 -right-3 flex justify-center items-center">
                <div className="font-bold text-white">
                    {dueTime}
                </div>
            </div>

            {/* Top Header */}
            <div className={`h-auto w-full rounded-t-md ${headerColor} flex justify-center items-center py-2`}>
                <div className="font-bold text-3xl text-zinc-50">
                    {className}
                </div>
            </div>

            {/* Content */}
            <div className={`w-full h-full ${contentColor} rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                {assignmentTitle}
            </div>
        </div>
    )
}

export const LoadingAssignmentBlock : FC = () => {
    return (
        <div className="cursor-pointer w-full h-auto py-2 flex flex-col justify-start items-center drop-shadow-md relative">
            {/* Due Date */}
            <div className="px-2 absolute w-auto h-5 bg-gray-300 rounded-md top-0 -right-3 flex justify-center items-center">
                <div className="font-bold text-white">
                    {Array.apply(null, Array(Math.floor(Math.random() * 2) + 2)).map(function () {}).map(v => 'ㅤ')}
                </div>
            </div>

            {/* Top Header */}
            <div className={`h-auto w-full rounded-t-md bg-gray-200 flex justify-center items-center py-2`}>
                <div className="font-bold text-3xl text-zinc-50">
                    {'ㅤ'}
                </div>
            </div>

            {/* Content */}
            <div className={`w-full h-full bg-gray-200 rounded-b-md px-2 py-2 text-zinc-50 text-2xl text-center`}>
                {'ㅤ'}
            </div>
        </div>
    )
}

export default AssignmentBlock;