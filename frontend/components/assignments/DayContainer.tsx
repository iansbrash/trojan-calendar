import React, {
    FC,
    ReactNode
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';

interface DayContainerProps {
    children: ReactNode,
    dayTitle: string,
    dayDate: string
}

const DayContainer : FC<DayContainerProps> = ({
    children,
    dayTitle,
    dayDate
} : DayContainerProps) => {
    return (
        <div className="w-full flex flex-col justify-start items-center w-full ">
            {/* Day Text */}
            <div className="text-slate-800 w-full font-bold px-2 flex justify-start items-center">
                <span className="text-lg">{dayTitle}</span> 
                <span className="ml-1 font-medium text-md text-slate-400">• {dayDate}</span>
            </div>
            {children}
        </div>
    )
}

export const LoadingDayContainer : FC = (props) => {
    return (
        <div className="w-full flex flex-col justify-start items-center animate-pulse">
            {/* Day Text */}
            <div className="text-slate-800 w-full font-bold px-2 flex justify-start items-center">
                <span className="text-lg bg-gray-300 rounded-md">

                    {getInitializedArray(6, 6).map(v => 'ㅤ')}
                </span> 
            </div>
            {props.children}
        </div>
    )
}

export default DayContainer;