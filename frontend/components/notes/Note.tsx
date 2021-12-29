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
        <div className="w-full h-auto flex flex-col justify-start items-center drop-shadow-md">
            {/* Header */}
            <div className={`px-2 py-1 ${headerColor} rounded-t-md w-full`}>
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