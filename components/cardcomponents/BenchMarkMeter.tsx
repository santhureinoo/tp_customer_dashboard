import React from "react";

const BenchMarkMeter = (): JSX.Element => {
    return (
        <div className="relative h-full flex flex-row items-center">
            <div className="absolute h-full w-full top-1/2 left-1/2 transform -translate-y-1/2 ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-2"
                    fill="none"
                    viewBox="0 0 2 385"
                >
                    <path
                        stroke="#989AAC"
                        strokeDasharray="9 9"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M1 1.365v381.803"
                    ></path>
                </svg>
            </div>
            <div className="absolute h-full w-full top-1/2 left-0 transform -translate-y-1/2 w-full h-2/3 rounded-lg">
                <div className="absolute z-10 top-0 left-0 bottom-0 flex flex-col justify-between w-30">
                    <div>
                        <span className="text-gray-400 text-lg block text-right">
                            25%
                        </span>
                        <span>
                            1689 kWh
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-400 text-lg block text-right">
                            10%
                        </span>
                        <span>
                            728 kWh
                        </span>
                    </div>

                </div>
                <div className="absolute top-0 left-[48%] bg-blue-400 w-4 h-full rounded-lg text-white"></div>
                <div className="absolute right-0 top-0 bottom-0 z-10 pl-2 flex flex-col top-1/2 justify-center">
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-bold">Last Month</span>
                        <span className="text-3xl text-blue-600 font-bold">
                            17%
                        </span>
                        <span className="text-extraSmall">(1.224 kWh)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BenchMarkMeter;