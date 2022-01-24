import React, {
    FC
} from 'react';

interface StepProps {
    step: number,
    setStep: (x : number) => void
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
        <div className="w-full h-full flex justify-center items-center flex-col">
            <div className="max-w-md px-2">
                <div className="w-full h-auto rounded-lg bg-zinc-50 flex flex-col justify-start items-center">
                    {/* Welcome */}
                    <div className="font-bold text-slate-800 text-lg">
                        Welcome to Unidash!
                    </div>

                    {/* Explanation */}
                    <div className="font-medium text-slate-800 text-lg">
                        Unidash is a simple dashboard meant to help organize your schoolwork and track your grades, designed specifically for USC students.
                    </div>
                </div>
                    
            </div>
        </div>
    )
}

// Assignments
export const Step2 : FC<StepProps> = ({
    step,
    setStep
} : StepProps) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 flex ">

        </div>
    )
}