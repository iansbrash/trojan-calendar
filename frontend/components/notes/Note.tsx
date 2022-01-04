import React, {
    FC
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';

interface NoteProps {
    noteTitle: string,
    noteContents: string,
    headerColor: string,
    contentColor: string
}

const Note : FC<NoteProps> = ({
    noteTitle,
    noteContents,
    headerColor,
    contentColor
} : NoteProps) => {
    return (
        <div className="cursor-pointer w-full h-auto flex flex-col justify-start items-center drop-shadow-md">
            {/* Header */}
            <div className={`px-2 py-1 ${headerColor} rounded-t-md w-full relative`}>
                {/* Buttons */}
                {/* <div className="absolute -top-3 -right-3 flex justify-center items-center space-x-1">
                    <div className="text-white w-6 h-6 rounded-full bg-amber-600 shadow-md border-2 border-white flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <div className=" w-6 h-6 rounded-full bg-red-600 shadow-md border-2 border-white">

                    </div>

                </div> */}

                <div className="text-lg font-bold text-white">
                    {noteTitle}
                </div>
            </div>

            <div className={`px-2 py-1 ${contentColor} rounded-b-md w-full`}>
                <div className="text-lg text-white">
                    {noteContents.split('\n').map((line, index) => {
                        return (
                            <div key={index}>
                                {line}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export const LoadingNote : FC = () => {
    return (
        <div className="animate-pulse w-full h-auto flex flex-col justify-start items-center drop-shadow-md">
            {/* Header */}
            <div className={`px-2 py-1 bg-gray-300 rounded-t-md w-full`}>
                <div className="text-lg font-bold text-white">
                    {'ㅤ'}
                </div>
            </div>

            <div className={`px-2 py-1 bg-gray-200 rounded-b-md w-full`}>
                <div className="text-lg text-white">
                    {getInitializedArray(2, 3).map((line, index) => {
                        return (
                            <div key={index}>
                                {'ㅤ'}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Note;