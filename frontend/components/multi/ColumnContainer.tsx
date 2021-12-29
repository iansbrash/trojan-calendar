import React, {
    FC,
    ReactNode
} from 'react';

interface ColumnContainerProps {
    header: string,
    icon: ReactNode,
    children: ReactNode,
    breakpoint?: string
}

const ColumnContainer : FC<ColumnContainerProps> = ({
    header,
    icon,
    children,
    breakpoint
} : ColumnContainerProps) => {
    return (
        <div className={`h-full w-full bg-black p-5 ${breakpoint ? `hidden ${breakpoint}` : 'block'}`}>
            <div className="w-full h-full flex flex-col justify-start items-center drop-shadow-md">

                {/* Header */}
                <div className="w-full h-16 rounded-t-xl bg-zinc-50 px-4 flex flex-row justify-start items-center">
                    <div className="mr-1 text-slate-700">
                        {icon}
                    </div>
                    <div className="font-bold text-2xl text-slate-900">
                        {header}
                    </div>
                </div>
                <div className="overflow-x-visible w-full flex flex-col justify-start items-center h-full overflow-y-scroll scrollbar-hide ">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default ColumnContainer;