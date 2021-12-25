import React, {
    FC,
    ReactNode
} from 'react';

interface ColumnContainerProps {
    header: string,
    icon: ReactNode,
    children: ReactNode
}

const ColumnContainer : FC<ColumnContainerProps> = ({
    header,
    icon,
    children
} : ColumnContainerProps) => {
    return (
        <div className="h-full w-1/5 p-5">
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
                {children}
            </div>
        </div>
    )
}
export default ColumnContainer;