import React from "react";
import {v4 as uuidv4} from 'uuid';

interface Props {
    Titles: string[];
    SubTitle?: string;
}

const CardHeader = ({ Titles, SubTitle }: Props): JSX.Element => {
    return (
        <div>
            <h4 className="font-bold text-base">
                {Titles.map(title => {
                    return (
                        <span className="block" key={uuidv4()}>{title}</span>
                    )
                })}
            </h4>
            {SubTitle && <span className="text-sm text-custom-gray font-thin">{SubTitle}</span>}
        </div>
    )
}

export default CardHeader;