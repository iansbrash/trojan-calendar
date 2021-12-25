import React, {
    FC
} from 'react';

const Assignments : FC = () => {
    return (
        <div className="h-full w-1/5 p-10">
            <div className="w-full h-full flex flex-col justify-start items-center drop-shadow-md">

                {/* Header */}
                <div className="w-full h-16 rounded-t-xl bg-zinc-50 px-4 flex flex-row justify-start items-center">
                    <div className="mr-1 text-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div className="font-bold text-2xl text-slate-900">
                        My Assignments
                    </div>
                </div>

                {/* Content */}
                <div className="w-full h-auto rounded-b-xl bg-zinc-100 px-4 py-2 flex flex-col justify-start items-center">
                    <div className="w-full h-auto py-2 flex flex-col justify-start items-center drop-shadow-md relative">
                        {/* Due Date */}
                        <div className="px-2 absolute w-auto h-5 bg-red-500 rounded-md top-0 -right-3 flex justify-center items-center">
                            <div className="font-bold text-white">
                                11/11/11
                            </div>
                        </div>

                        {/* Top Header */}
                        <div className="h-auto w-full rounded-t-md bg-sky-500 flex justify-center items-center py-2">
                            <div className="font-bold text-3xl text-zinc-50">
                                MATH-225
                            </div>
                        </div>

                        {/* Content */}
                        <div className="w-full h-full bg-sky-300 px-2 py-2 text-zinc-50 text-2xl text-center">
                            Homework 8
                        </div>

                        {/* Due Date */}
                        <div className="text-center font-bold text-zinc-50 w-full h-auto rounded-b-md bg-sky-300">
                            Due 12:00 PM
                        </div>
                    </div>

                    <div className="w-full h-auto py-2 flex flex-col justify-start items-center drop-shadow-md relative">

                        <div className="px-2 absolute w-auto h-5 bg-red-500 rounded-md top-0 -right-3 flex justify-center items-center">
                            <div className="font-bold text-white">
                                12/24/21
                            </div>
                        </div>
                        {/* Top Header */}
                        <div className="h-auto w-full rounded-t-md bg-indigo-500 flex justify-center items-center py-2">
                            <div className="font-bold text-3xl text-zinc-50">
                                MATH-225
                            </div>
                        </div>

                        {/* Content */}
                        <div className="w-full h-full bg-indigo-300 px-2 py-2 text-zinc-50 text-2xl text-center">
                            Homework 9
                        </div>

                        {/* Due Date */}
                        <div className="text-center font-bold text-zinc-50 w-full h-auto rounded-b-md bg-indigo-300">
                            Due 11:59 PM
                        </div>
                    </div>

                    <div className="w-full h-auto py-2 flex flex-col justify-start items-center drop-shadow-md relative">
                        {/* Due Date */}
                        <div className="px-2 absolute w-auto h-5 bg-red-500 rounded-md top-0 -right-3 flex justify-center items-center">
                            <div className="font-bold text-white">
                                11/11/11
                            </div>
                        </div>

                        {/* Top Header */}
                        <div className="h-auto w-full rounded-t-md bg-rose-500 flex justify-center items-center py-2">
                            <div className="font-bold text-3xl text-zinc-50">
                                CSCI-270
                            </div>
                        </div>

                        {/* Content */}
                        <div className="w-full h-full bg-rose-300 px-2 py-2 text-zinc-50 text-2xl text-center ">
                            PA 4
                        </div>

                        {/* Due Date */}
                        <div className="text-center font-bold text-zinc-50 w-full h-auto rounded-b-md bg-rose-300">
                            Due 1:45 PM
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assignments;