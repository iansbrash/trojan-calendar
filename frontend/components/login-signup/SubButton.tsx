import Link from 'next/link';
import React, {
    FC
} from 'react';

interface SubButtonProps {
    path: string,
    text: string,
    isLoading: boolean
}

const SubButton : FC<SubButtonProps> = ({
    path,
    text,
    isLoading
} : SubButtonProps) => {
    return (    
        <Link
        href={path}
        >
            <button 
            disabled={isLoading}
            className={`${isLoading ? 'cursor-no-drop' : 'cursor-pointer'} drop-shadow-md border-2 border-sky-400  flex flex-1 h-full justify-center items-center rounded-md bg-zinc-50 px-2 py-1`}>
                <div className="text-2xl text-sky-400 font-medium">
                    {text}
                </div>
            </button>
        </Link>
    )
}

export default SubButton;