import React, {
    FC, ReactNode
} from 'react';


interface StepBaseProps {
    children: ReactNode,
    stepForwards: () => void,
    stepBackwards: () => void
}

const StepBase : FC<StepBaseProps> = ({
    children,
    stepForwards,
    stepBackwards
} : StepBaseProps) => {
    return (
        <div className="w-full h-auto rounded-lg bg-zinc-50 flex flex-col justify-start items-center p-6">
            {children}

            {/* Next / Back */}
            <div className="w-full flex flex-row justify-between items-center space-x-8 mt-4">
                <div className="cursor-pointer border-2 border-sky-500 px-2 flex flex-1 justify-center items-center hover:bg-zinc-100 transition duration-250 ease-in-out font-medium text-lg text-slate-800 rounded-lg"
                onClick={() => stepBackwards()}
                >
                    Back
                </div>

                <div className="cursor-pointer border-2 border-sky-500 px-2 flex flex-1 justify-center items-center hover:bg-zinc-100 transition duration-250 ease-in-out font-medium text-lg text-slate-800 rounded-lg"
                onClick={() => stepForwards()}
                >
                    Next
                </div>
            </div>
        </div>
    )
}

interface StepProps {
    step: number,
    setStep: (x : number) => void,
}

const StepRenderer : FC<StepProps> = ({
    step,
    setStep
} : StepProps) => {
    return (
        <div>

        </div>
    )
}

// Welcome
export const Step1 : FC<StepProps> = ({
    step,
    setStep
} : StepProps) => {
    return (
        <div className="z-20 absolute w-full h-full flex justify-center items-center flex-col">
            <div className="max-w-md px-2">
                <StepBase
                stepBackwards={() => setStep(1)}
                stepForwards={() => setStep(step + 1)}
                >
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg">
                        Welcome to Unidash!
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg">
                        Unidash is a simple dashboard meant to help organize your schoolwork and track your grades, designed specifically for USC students.
                    </div>
                </StepBase>
                    
            </div>
        </div>
    )
}

// Assignments
export const Step2 : FC<StepProps> = ({
    step,
    setStep,
} : StepProps) => {
    return (
        <div className={`top-20 absolute w-full h-auto flex justify-center items-center flex-col`}>
            <div className="max-w-md px-2">
                <StepBase
                stepBackwards={() => setStep(step - 1)}
                stepForwards={() => setStep(step + 1)}
                >
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg">
                        Assignments
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg">
                        Here, you'll see all your assignments from Blackboard and Gradescope (more sites coming soon!)
                    </div>
                </StepBase>
                    
            </div>
        </div>
    )
}

// Grades
export const Step3 : FC<StepProps> = ({
    step,
    setStep,
} : StepProps) => {
    return (
        <div className={`top-20 absolute w-full h-auto flex justify-center items-center flex-col`}>
            <div className="max-w-md px-2">
                <StepBase
                stepBackwards={() => setStep(step - 1)}
                stepForwards={() => setStep(step + 1)}
                >
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg">
                        Grades
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg">
                        Here, you'll see all your grades, also synced from Gradescope and Blackboard
                    </div>
                </StepBase>
                    
            </div>
        </div>
    )
}

// Schedule
export const Step4 : FC<StepProps> = ({
    step,
    setStep,
} : StepProps) => {
    return (
        <div className={`top-20 absolute w-full h-auto flex justify-center items-center flex-col`}>
            <div className="max-w-md px-2">
                <StepBase
                stepBackwards={() => setStep(step - 1)}
                stepForwards={() => setStep(step + 1)}
                >
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg">
                        Schedule
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg">
                        Here, you'll see all your schedule for the day, synced from my.usc.edu
                    </div>
                </StepBase>
                    
            </div>
        </div>
    )
}

// Notes
export const Step5 : FC<StepProps> = ({
    step,
    setStep,
} : StepProps) => {
    return (
        <div className={`top-20 absolute w-full h-auto flex justify-center items-center flex-col`}>
            <div className="max-w-md px-2">
                <StepBase
                stepBackwards={() => setStep(step - 1)}
                stepForwards={() => setStep(step + 1)}
                >
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg">
                        Notes
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg">
                        You can create, update, and delete notes about whatever you want here! Press 'Add Note' to get started
                    </div>
                </StepBase>
                    
            </div>
        </div>
    )
}

// Announcements
export const Step6 : FC<StepProps> = ({
    step,
    setStep,
} : StepProps) => {
    return (
        <div className={`top-20 absolute w-full h-auto flex justify-center items-center flex-col`}>
            <div className="max-w-md px-2">
                <StepBase
                stepBackwards={() => setStep(step - 1)}
                stepForwards={() => setStep(step + 1)}
                >
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg">
                        Announcements
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg">
                        Any announcements from teachers on Blackboard will appear here
                    </div>
                </StepBase>
                    
            </div>
        </div>
    )
}

// Announcements
export const Step7 : FC<StepProps> = ({
    step,
    setStep,
} : StepProps) => {
    return (
        <div className={`z-20 right-0 top-10 absolute w-96 h-auto flex justify-end items-center flex-col`}>
            <div className="max-w-md px-2">
                <StepBase
                stepBackwards={() => setStep(step - 1)}
                stepForwards={() => setStep(step + 1)}
                >
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg flex flex-row justify-center items-center">
                        <i className="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>    
                        </i>
                        Syncing Data
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg">
                        In order to use all these features, you need to sync information from Blackboard, Gradescope, etc.
                    </div>
                </StepBase>
                    
            </div>
        </div>
    )
}

// Announcements
export const Step8 : FC<StepProps> = ({
    step,
    setStep,
} : StepProps) => {
    return (
        <div className={`z-20 right-0 top-10 absolute w-96 h-auto flex justify-end items-center flex-col`}>
            <div className="max-w-md px-2">
                <StepBase
                stepBackwards={() => setStep(step - 1)}
                stepForwards={() => setStep(step + 1)}
                >
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg flex flex-row justify-center items-center">
                        <i className="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>    
                        </i>
                        Syncing Data
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg break-words">
                        To do so, click the Sync button and put in your @usc.edu email and password (not the login you created for this website)
                    </div>
                </StepBase>
                    
            </div>
        </div>
    )
}

// Announcements
export const Step9 : FC<StepProps> = ({
    step,
    setStep,
} : StepProps) => {
    return (
        <div className={`z-20 right-0 top-10 absolute w-96 h-auto flex justify-end items-center flex-col`}>
            <div className="max-w-md px-2">
                <StepBase
                stepBackwards={() => setStep(step - 1)}
                stepForwards={() => setStep(step + 1)}
                >
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg flex flex-row justify-center items-center">
                        <i className="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>    
                        </i>
                        Syncing Data
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg">
                        Once you do that, you'll get a Duo 2FA notification that you'll have to accept. After, your data will be synced to your dashboard!
                    </div>
                </StepBase>
                    
            </div>
        </div>
    )
}

// Announcements
export const Step10 : FC<StepProps> = ({
    step,
    setStep,
} : StepProps) => {
    return (
        <div className={`z-20 absolute w-full h-full flex justify-center items-center flex-col`}>
            <div className="max-w-md px-2">
                <StepBase
                stepBackwards={() => setStep(step - 1)}
                stepForwards={() => setStep(step + 1)}
                >
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg">
                        Get started!
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg">
                        Wait
                    </div>
                </StepBase>
                    
            </div>
        </div>
    )
}