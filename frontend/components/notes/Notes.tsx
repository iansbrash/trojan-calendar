import { CognitoUserSession } from 'amazon-cognito-identity-js';
import axios from 'axios';
import React, {
    FC,
    useState,
    useRef,
    useEffect
} from 'react';
import api from '../../constants/api-gateway/api';
import getInitializedArray from '../../constants/functions/getInitializedArray';
import { Note } from '../../constants/interfaces/cache';
import ColumnContainer from '../multi/ColumnContainer';
import NoteComponent, { LoadingNote } from './Note'
import qs from 'qs';

interface NotesProps {
    notes: Note[] | null,
    session: CognitoUserSession | null,
    setNotes: (n : Note[]) => void,
    tutorialStep: number
}

const Notes : FC<NotesProps> = React.memo(({
    notes,
    session,
    setNotes,
    tutorialStep
} : NotesProps) => {

    

    const [isCreatingNewNote, setIsCreatingNewNote] = useState<boolean>(false);
    const [newNoteTitle, setNewNoteTitle] = useState<string>('')
    const [newNoteContent, setNewNoteContent] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement>(document.createElement('div'));
    useEffect(() => {
        if (tutorialStep === 5) {
            divRef.current.scrollIntoView({
                inline: 'end',
            });
        }
    }, [tutorialStep])

    const inputSpan = useRef<HTMLTextAreaElement>(document?.createElement('textarea'));


    function auto_grow(element : HTMLElement) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";

        // updates the X/maxCharLength counter
        // we have to do this because emojis are represented by 2 unicode surrogate pairs
        // setInputLength(Array.from(inputSpan.current.value).length)

        // updates confession for preview
        setNewNoteContent(inputSpan.current.value);
    }

    // Dynamically sets starting size on page load
    useEffect(() => {
        auto_grow(inputSpan.current)
    }, [isCreatingNewNote])

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
    

    const newNote = () => {
        setIsCreatingNewNote(!isCreatingNewNote)
    }

    const submitClicked = async () => {
        setIsProcessing(true)
        try {
            if (!session) return;

            const Response = await axios({
                method: 'post',
                url: `${api}/account/notes`,
                headers: {
                    Authorization: session.getIdToken().getJwtToken()
                },
                data: JSON.stringify({
                    noteTitle: newNoteTitle,
                    noteContent: newNoteContent
                })
            })         

            setNewNoteContent('')
            setNewNoteTitle('')
            setNotes([...(notes ? notes : []), Response.data])
            setIsCreatingNewNote(false)

            console.log(Response.data)
        }
        catch (err) {

        }
        finally {
            setIsProcessing(false)
        }
    }

    const changeColorClicked = () => {

    }


    // We pass this into Notes and they call it when they want to delete themselves
    const deleteNote = async (n : Note) => {
        console.log("Attemping to delete noteId: " + n.noteId)
        try {
            if (!session) return;

            const Response = await axios({
                method: 'delete',
                url: `${api}/account/notes`,
                headers: {
                    Authorization: session.getIdToken().getJwtToken()
                },
                data: JSON.stringify(n)
            })         

            setNotes(notes ? notes.filter(no => no.noteId !== n.noteId) : [])

            console.log(Response.data)
        }
        catch (err) {

        }
    }

    const editNote = async (n : Note) => {
        console.log("Attemping to edit noteId: " + n.noteId)
        try {
            if (!session) return;

            const Response = await axios({
                method: 'patch',
                url: `${api}/account/notes`,
                headers: {
                    Authorization: session.getIdToken().getJwtToken()
                },
                data: JSON.stringify(n)
            })         

            setNotes(notes ? notes.map(no => no.noteId === n.noteId ? n : no) : [])

            console.log(Response.data)
        }
        catch (err) {

        }
    }

    if (notes === null) {
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
            <div className="w-full rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-start items-center space-y-4 pb-4">

                {/* New Note */}
                <div className="animate-pulse py-1 cursor-pointer bg-gray-300 transition duration-250 ease-in-out rounded-md w-full flex flex-row justify-start items-center"
                onClick={() => null}
                >
                    <div className="text-slate-700 font-medium text-lg">
                        {'???'}
                    </div>
                </div>

                {getInitializedArray(2, 3).map((v, i) => <LoadingNote key={i}/>)}
            </div>
        </ColumnContainer>
        )
    }

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
            <div ref={divRef} className="rounded-b-xl bg-zinc-50 w-full h-full flex flex-col justify-start items-center">
                <div className="overflow-y-scroll scrollbar-hide px-4 pb-2 py-2  w-full h-full flex flex-col justify-start items-center">

                    {/* New Note */}
                    <div className={`${isCreatingNewNote ? 'hidden pointer-events-none' : 'flex'} py-1 cursor-pointer hover:bg-sky-100 transition duration-250 ease-in-out rounded-md w-full flex-row justify-start items-center`}
                    onClick={() => newNote()}
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


                    {/* When we're creaitng a new now this shows */}
                    <div className={`${isCreatingNewNote ? 'flex' : 'hidden pointer-events-none'} relative cursor-pointer w-full h-auto flex-col justify-start items-center`}>

                        {/* Processing overlay */}
                        <div className={`flex justify-center items-center z-10 transition duration-250 ease-in-out ${isProcessing ? 'opacity-50' : 'opacity-0 pointer-events-none'} rounded-md absolute top-0 left-0 bottom-0 right-0 bg-white`}></div>
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
                        <div className={`px-2 py-1 ${'bg-slate-600'} rounded-t-md w-full relative`}>

                            <div className={`${isProcessing ? 'hidden pointer-events-none' : 'flex'} absolute -top-2 -right-2  flex-row justify-start items-center space-x-3`}>
                                {/* X Button */}
                                <div className="w-6 h-6 rounded-md bg-red-400 border-2 border-white flex justify-center items-center text-white"
                                onClick={() => setIsCreatingNewNote(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>

                                {/* Change Color Button */}
                                {/* <div className="w-6 h-6 rounded-md bg-sky-400 border-2 border-white flex justify-center items-center text-white"
                                onClick={() => changeColorClicked()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </div> */}

                                {/* Check Button */}
                                <div className="w-6 h-6 rounded-md bg-emerald-400 border-2 border-white flex justify-center items-center text-white"
                                onClick={() => submitClicked()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            <input
                            className="w-full text-white font-medium text-lg focus:outline-none bg-transparent placeholder-slate-100 "
                            placeholder='Note Title'
                            onChange={e => setNewNoteTitle(e.target.value)}
                            value={newNoteTitle}
                            >
                                
                            </input>
                        </div>

                        <div className={`px-2 py-1 ${'bg-slate-400'} rounded-b-md w-full`}>
                            <textarea className="text-white text-lg w-full bg-transparent placeholder-slate-100 font-normal h-min focus:outline-none resize-none overflow-hidden leading-6 whitespace-normal break-text"
                            placeholder='Write something!'
                            ref={inputSpan}
                            onInput={e => auto_grow(e.currentTarget)}
                            onChange={e => setNewNoteContent(e.target.value)}
                            value={newNoteContent}
                            >
                                    
                            </textarea>
                        </div>
                    </div>

                    {/* Holds actual notes */}
                    <div className="w-full mt-4 flex flex-col justify-start items-center space-y-4">
                        {notes.length === 0 ?
                        <>
                            <div className="flex flex-row justify-center items-center my-8 space-x-2">
                                <div className="text-lg text-slate-800 font-medium">
                                    No Notes
                                </div>
                                <div className="text-slate-600 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                        </>
                        : null}
                        {
                            notes.map((n, i) => {
                                return <NoteComponent 
                                    noteId={n.noteId}
                                    key={n.noteId}
                                    noteTitle={n.noteTitle}
                                    noteContent={n.noteContent}
                                    headerColor={noteColors[i % noteColors.length]['bg600']}
                                    contentColor={noteColors[i % noteColors.length]['bg400']}
                                    deleteNote={deleteNote}
                                    editNote={editNote}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </ColumnContainer>
    )
})

Notes.displayName = 'Notes';


export default Notes;