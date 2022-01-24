import axios from 'axios';
import React, {
    FC,
    useEffect,
    useRef,
    useState
} from 'react';
import api from '../../constants/api-gateway/api';
import getInitializedArray from '../../constants/functions/getInitializedArray';
import { Note } from '../../constants/interfaces/cache';
import EditingNote from './EditingNote';

interface NoteProps {
    noteTitle: string,
    noteContent: string,
    noteId: string,
    headerColor: string,
    contentColor: string,
    deleteNote: (n : Note) => Promise<void>,
    editNote: (n : Note) => Promise<void>
}

const Note : FC<NoteProps> = ({
    noteTitle,
    noteContent,
    noteId,
    headerColor,
    contentColor,
    deleteNote,
    editNote
} : NoteProps) => {

    const [hover, setHover] = useState<boolean>(false);
    
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isProcessing, setIsProccessing] = useState<boolean>(false);

    const editClicked = () => {
        setIsEditing(true)
    }

    const deleteClicked = async () => {
        setIsProccessing(true)
        await deleteNote({
            noteTitle,
            noteContent,
            noteId
        })
    }

    if (isEditing) {
        return (
            <EditingNote 
                noteTitle={noteTitle}
                noteContent={noteContent}
                noteId={noteId}
                headerColor={headerColor}
                contentColor={contentColor}
                editNote={editNote}
                setIsEditing={setIsEditing}
            
            />
        )
    }

    return (
        <div className={`${isProcessing ? 'pointer-events-none' : ''} relative cursor-pointer w-full h-auto flex flex-col justify-start items-center drop-shadow-md`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={`flex justify-center items-center z-10 transition duration-250 ease-in-out ${isProcessing ? 'opacity-50' : 'opacity-0 pointer-events-none'} rounded-md absolute top-0 left-0 bottom-0 right-0 bg-white`}>
                
            </div>

            <div className={`flex justify-center items-center z-20 transition duration-250 ease-in-out ${isProcessing ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute top-0 left-0 bottom-0 right-0`}>
                {isProcessing ?
                    <div 
                    className={`h-${6} w-${6} animate-spin loader ease-linear rounded-full border-4 border-t-4 border-sky-300`}
                    style={{
                        // borderTopColor: '#e0f2fe' //#f0f9ff
                        borderTopColor: '#38bdf8'// '#f0f9ff' //#f0f9ff
                    }}
                    >
                    </div> : null
                }
            </div>

            {/* Header */}
            <div className={`px-2 py-1 ${headerColor} rounded-t-md w-full relative`}>
                <div className={`z-40 ${hover ? 'opacity-100 ' : 'opacity-0 pointer-events-none'} cursor-pointer transition duration-250 ease-in-out absolute -top-2 -right-2 flex flex-row justify-start items-center space-x-3`}>
                    {/* Trash Button */}
                    <div className="w-6 h-6 rounded-md bg-red-400 border-2 border-white flex justify-center items-center text-white"
                    onClick={() => deleteClicked()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Edit Button */}
                    <div className="w-6 h-6 rounded-md bg-amber-400 border-2 border-white flex justify-center items-center text-white"
                    onClick={() => editClicked()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </div>
                </div>

                <div className="text-lg font-bold text-white">
                    {noteTitle}
                </div>
            </div>

            <div className={`px-2 py-1 ${contentColor} rounded-b-md w-full`}>
                <div className="text-lg text-white break-words">
                    {noteContent.split('\n').map((line, index) => {
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