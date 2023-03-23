import React from "react";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    Titles: string[];
    SubTitle?: string | JSX.Element;
    SubTitleAlign?: 'start' | 'end' ;
    className?: String;
}

const CardHeader = ({ Titles, SubTitle, SubTitleAlign = 'start', className}: Props): JSX.Element => {
    return (
        <div className={`flex flex-col w-fit`}>
            <h4 className={`font-bold ${className}`}>
                {Titles.map(title => {
                    return (
                        <span className="block" key={uuidv4()}>{title}</span>
                    )
                })}
            </h4>
            {SubTitle && <span className={`text-sm text-custom-gray font-thin self-${SubTitleAlign} `}>{SubTitle}</span>}
        </div>
    )
}

export default CardHeader;