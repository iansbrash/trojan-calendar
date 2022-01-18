import React, {
    FC,
    useEffect,
    useRef,
    useState
} from 'react';
import { Note } from '../../pages/dashboard/cache';


interface EditingNoteProps {
    noteTitle: string,
    noteContent: string,
    noteId: string,
    headerColor: string,
    contentColor: string,
    editNote: (n : Note) => Promise<void>,
    setIsEditing: (b : boolean) => void
}

const EditingNote : FC<EditingNoteProps> = ({
    noteTitle,
    noteContent,
    noteId,
    headerColor,
    contentColor,
    editNote,
    setIsEditing
} : EditingNoteProps) => {

    const [isProcessing, setisProcessing] = useState<boolean>(false);

    const checkButtonClicked = async () => {

        // If no changes
        if (noteContent === editContent && noteTitle === editTitle) {
            setIsEditing(false);
            return;
        }

        setisProcessing(true)
        await editNote({
            noteId: noteId,
            noteContent:editContent,
            noteTitle: editTitle
        })
        setisProcessing(false)
        setIsEditing(false)
    }

    const xButtonClicked = () => {
        setIsEditing(false);
    }

    const penButtonClicked = () => {

    }

    const [editTitle, setEditTitle] = useState<string>(noteTitle)
    const [editContent, setEditContent] = useState<string>(noteContent)

    const inputSpan = useRef<HTMLTextAreaElement>(document.createElement('textarea'));

    // TODO: Fix bug
    function auto_grow(element : HTMLElement) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";

        // updates the X/maxCharLength counter
        // we have to do this because emojis are represented by 2 unicode surrogate pairs
        // setInputLength(Array.from(inputSpan.current.value).length)

        // updates confession for preview
        setEditContent(inputSpan.current.value);
    }


    // Dynamically sets starting size on page load
    useEffect(() => {
        auto_grow(inputSpan.current)
    }, [])

    return (
        <div className={`${isProcessing ? 'pointer-events-none' : ''} relative flex cursor-pointer w-full h-auto flex-col justify-start items-center`}>

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


            <div className={`px-2 py-1 ${headerColor} rounded-t-md w-full relative`}>
                <div className={`${isProcessing ? 'hidden pointer-events-none' : 'flex'} absolute -top-2 -right-2 flex flex-row justify-start items-center space-x-3`}>
                    {/* X Button */}
                    <div className="w-6 h-6 rounded-md bg-red-400 border-2 border-white flex justify-center items-center text-white"
                    onClick={() => xButtonClicked()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    {/* Change Color Button */}
                    <div className="w-6 h-6 rounded-md bg-sky-400 border-2 border-white flex justify-center items-center text-white"
                    onClick={() => penButtonClicked()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </div>

                    {/* Check Button */}
                    <div className="w-6 h-6 rounded-md bg-emerald-400 border-2 border-white flex justify-center items-center text-white"
                    onClick={() => checkButtonClicked()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <input
                className="w-full text-white font-medium text-lg focus:outline-none bg-transparent placeholder-slate-100 "
                placeholder='Note Title'
                onChange={e => setEditTitle(e.target.value)}
                value={editTitle}
                >
                    
                </input>
            </div>

            <div className={`px-2 pt-1 ${contentColor} rounded-b-md w-full`}>
                <textarea className="-mb-0.5 text-white text-lg w-full bg-transparent placeholder-slate-100 font-normal h-min focus:outline-none resize-none overflow-hidden leading-7 whitespace-normal break-text"
                placeholder='Write something!'
                ref={inputSpan}
                
                onInput={e => auto_grow(e.currentTarget)}
                onChange={e => setEditContent(e.target.value)}
                value={editContent}
                >
                        
                </textarea>
            </div>
        </div>
    )
}

export default EditingNote;