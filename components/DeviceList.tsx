import React from "react"

const DeviceList = () => {
    function GetNoData(): any {
        return <div className="flex flex-col justify-center w-full h-32 bg-slate-200">
            <span className="text-center">No Device Data is <br />available for this outlet</span>
        </div>
    };
    return GetNoData();
}

export default DeviceList;