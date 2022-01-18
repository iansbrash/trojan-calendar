import React, {
    FC
} from 'react';
import getInitializedArray from '../../constants/functions/getInitializedArray';

interface CalendarItemProps {
    className: string,
    classType: string,
    classLocation: string,
    bgColor: string,
    height: string,
    startMinute: number
}

const CalendarItem : FC<CalendarItemProps> = ({
    className,
    classType,
    classLocation,
    bgColor,
    height, // h-10/6
    startMinute
} : CalendarItemProps) => {

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-start items-center">
            {[0, 10, 20, 30, 40, 50].map(v => {
                
                if (startMinute === v) {
                    return (
                        <div className="flex flex-1 w-full relative" key={v}>
                            <div className="w-full relative absolute top-0 left-0 right-0 h-600">
                                <div className={`cursor-pointer absolute top-0 left-0 right-0 ${height} ${bgColor} rounded-md flex flex-col justify-start items-center`}>
                                    <div className="w-full h-full relative flex flex-col justify-start items-center px-2 py-1">
                                        <div className="font-medium text-white text-lg w-full">
                                            {className}
                                        </div>
                                        <div className="text-white text-lg w-full -mt-2">
                                            {classLocation}
                                        </div>

                                        <div className="absolute -top-2 -right-2 w-auto">
                                            <div className="bg-red-600 rounded-md font-medium text-md text-white px-1">
                                                {classType}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )
                }
                else {
                    return <div className="flex flex-1 w-full relative" key={v}></div>
                }

            })}

            

        </div>

    )
}

export const LoadingCalendarItem : FC = () => {
    return (
        <div className={`absolute bg-zinc-50 top-0 left-0 right-0 h-10/6 rounded-md flex flex-col justify-start items-center`}>
            <div className="animate-pulse bg-gray-200 rounded-md  w-full h-full relative flex flex-col justify-start items-center px-2 py-1">
                

                <div className="absolute -top-2 -right-2 w-auto">
                    <div className="bg-gray-300 rounded-md font-medium text-md text-white px-1">
                        {getInitializedArray(5, 3).map(v => 'ㅤ')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarItem;