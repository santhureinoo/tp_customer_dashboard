import React from "react";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    numberString: string;
    description: string;
}

const SavingMeterDigits = ({ numberString, description }: Props): JSX.Element => {
    const numberStringElem = numberString.split('').map((char, index) => {
        const bgColor = index !== numberString.length - 1 ? 'bg-slate-200' : 'bg-sky-400';
        return (<div key={uuidv4()} className={`py-2 px-3 rounded-lg text-lg ${bgColor}`}>
            {char}
        </div>);
    })
    return (
        <div className="flex flex-col items-end">
            <div className="flex gap-x-1 flex-row">
                {numberStringElem}
            </div>
            <span className="text-sm justify-self-end text-slate-200">{description}</span>
        </div>
    )
}

export default SavingMeterDigits;