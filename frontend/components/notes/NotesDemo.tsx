import React, {
    FC,
} from 'react';
import { Note } from '../../constants/interfaces/cache';
import ColumnContainer from '../multi/ColumnContainer';
import NoteComponent, { LoadingNote } from './Note'

interface NotesDemoProps {
    notes: Note[]
}

const NotesDemo : FC<NotesDemoProps> = ({
    notes
} : NotesDemoProps) => {

    const fakeEdit = async (n : Note) => {};

    const noteColors = [
        {
            'bg600': 'bg-blue-600',
            'bg400': 'bg-blue-400'
        },
        {
            'bg600': 'bg-red-600',
            'bg400': 'bg-red-400'
        },
        {
            'bg600': 'bg-green-600',
            'bg400': 'bg-green-400'
        },
        {
            'bg600': 'bg-amber-600',
            'bg400': 'bg-amber-400'
        },
        {
            'bg600': 'bg-pink-600',
            'bg400': 'bg-pink-400'
        },
        {
            'bg600': 'bg-teal-600',
            'bg400': 'bg-teal-400'
        },
        
    ]

    return (
        <ColumnContainer
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            }
            header={`My Notes`}
            breakpoint='lg:block'
            w={'w-1/3 xl:w-1/4 2xl:w-1/5'}
        >
            {/* Content */}
            <div className="rounded-b-xl bg-zinc-50 w-full h-full flex flex-col justify-start items-center">
                <div className="overflow-y-scroll scrollbar-hide px-4 pb-2 py-2  w-full h-full flex flex-col justify-start items-center">

                    {/* New Note */}
                    <div className={`${'flex'} py-1 cursor-pointer hover:bg-sky-100 transition duration-250 ease-in-out rounded-md w-full flex-row justify-start items-center`}
                    onClick={() => null}
                    >
                        <div className="text-sky-400 mx-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div className="text-slate-700 font-medium text-lg">
                            New Note
                        </div>
                    </div>

                    {/* Holds actual notes */}
                    <div className="w-full mt-4 flex flex-col justify-start items-center space-y-4">
                        {
                            notes.map((n, i) => {
                                return <NoteComponent 
                                    noteId={n.noteId}
                                    key={n.noteId}
                                    noteTitle={n.noteTitle}
                                    noteContent={n.noteContent}
                                    headerColor={noteColors[i % noteColors.length]['bg600']}
                                    contentColor={noteColors[i % noteColors.length]['bg400']}
                                    deleteNote={fakeEdit}
                                    editNote={fakeEdit}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </ColumnContainer>
    )
}



export default NotesDemo;