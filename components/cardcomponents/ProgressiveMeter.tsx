import React from "react";

const ProgressiveMeter = (): JSX.Element => {
    return (
        <div className="relative flex flex-row h-full">
            <div className="shadow h-64 w-4 bg-blue-200 rounded-lg"></div>
            <div className="flex flex-col justify-between">
                <div className="pl-2">
                    . 600 kWh
                </div>
                <div className="pl-2">
                    . 0 kWh
                </div>
            </div>
            <div className="absolute w-full bottom-0 h-2/5 flex flex-row">
                <div className="bg-blue-400 w-4 text-xs leading-none h-full  py-1 text-center rounded-lg text-white"></div>
                <div className="pl-2">
                    . 300 kWh
                </div>
            </div>
        </div>
    )
}

export default ProgressiveMeter;