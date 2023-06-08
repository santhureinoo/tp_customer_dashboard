import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { zeroPad } from "../../common/helper";

interface Props {
    numberString: string;
    description: string;
}

const SavingMeterDigits = ({ numberString, description }: Props): JSX.Element => {
    numberString = zeroPad(numberString, 4);
    const numberStringElem = numberString.split('').map((char, index) => {
        const bgColor = index !== numberString.length - 1 ? 'bg-custom-lightgray' : 'bg-custom-darkblue text-white';
        return (<div key={uuidv4()} className={`py-2 px-3 rounded-lg text-2xl ${bgColor}`}>
            {char}
        </div>);
    })
    return (
        <div className="flex flex-col">
            <span className="text-sm  text-custom-gray text-right">{description}</span>
            <div className="flex gap-x-1 flex-row">
                {numberStringElem}
            </div>

        </div>
    )
}

export default SavingMeterDigits;