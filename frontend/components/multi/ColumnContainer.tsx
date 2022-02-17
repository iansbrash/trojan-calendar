import React, {
    FC,
    ReactNode
} from 'react';

interface ColumnContainerProps {
    header: string,
    icon: ReactNode,
    children: ReactNode,
    breakpoint?: string,
    w: string,
}

const ColumnContainer : FC<ColumnContainerProps> = ({
    header,
    icon,
    children,
    breakpoint,
    w,
} : ColumnContainerProps) => {
    return (
        <div className={`h-full min-w-[24rem] p-5 `}>
            <div className="relative w-full h-full flex-col justify-start items-center drop-shadow-md">

                {/* Header */}
                <div className="absolute top-0 left-0 right-0 h-16 rounded-t-xl bg-zinc-50 px-4 flex flex-row justify-start items-center">
                    <div className="mr-1 text-slate-700">
                        {icon}
                    </div>
                    <div className="font-bold text-2xl text-slate-900">
                        {header}
                    </div>
                </div>
                <div className="pt-16 flex w-full flex-col justify-start items-center h-full">
                    {children}
                </div>
                
            </div>
        </div>
    )
}
export default ColumnContainer;