import React, {
    FC,
    useState
} from 'react';
import ColumnContainer from '../multi/ColumnContainer';

const Notes : FC = () => {

    const newNote = () => {

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
        >
            {/* Content */}
            <div className="w-full rounded-b-xl bg-zinc-50 px-4 py-2 flex flex-col justify-start items-center space-y-4 pb-4">

                {/* New Note */}
                <div className="py-1 cursor-pointer hover:bg-sky-100 transition duration-250 ease-in-out rounded-md w-full flex flex-row justify-start items-center"
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

                <Note 
                    noteTitle={`To-do list`}
                    noteContents={`Math HW\n Work on resume\nRenew meal plan\nTalk with prof`}
                    headerColor={'bg-rose-600'}
                    contentColor={'bg-rose-400'}
                />

                <Note 
                    noteTitle={`Reminders`}
                    noteContents={`Meditate each morning even if you don't feel like it\n3parts water 1part concentrate costco cold brew`}
                    headerColor={'bg-teal-600'}
                    contentColor={'bg-teal-400'}
                />

            </div>
        </ColumnContainer>
    )
}

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

export default Notes;