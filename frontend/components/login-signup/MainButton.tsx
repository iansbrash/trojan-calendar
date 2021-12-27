import React, {
    FC
} from 'react';

interface MainButtonProps {
    onClick: (e : any) => void,
    text: string,
    isLoading: boolean
}

const MainButton : FC<MainButtonProps> = ({
    onClick,
    text,
    isLoading
} : MainButtonProps) => {
    return (    
        <button className={`${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} border-2 border-sky-400 drop-shadow-md h-full flex flex-1 justify-center items-center rounded-md bg-sky-400 px-2 py-1`}
        disabled={isLoading}
        onClick={onClick}
        >
            {isLoading ?
                <div 
                    className={`h-${6} w-${6} animate-spin loader ease-linear rounded-full border-4 border-t-4 border-sky-200`}
                    style={{
                        // borderTopColor: '#e0f2fe' //#f0f9ff
                        borderTopColor: '#f0f9ff' //#f0f9ff
                    }}
                >
                </div>
                :
                <div className="text-2xl text-white font-medium h-full">
                    {text}
                </div>
            }
        </button>
    )
}

export default MainButton;