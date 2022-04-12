import React from "react";
import {v4 as uuidv4} from 'uuid';

interface Props {
    Titles: string[];
    SubTitle?: string;
}

const CardHeader = ({ Titles, SubTitle }: Props): JSX.Element => {
    return (
        <div>
            <h4 className="font-bold text-sm">
                {Titles.map(title => {
                    return (
                        <span className="block" key={uuidv4()}>{title}</span>
                    )
                })}
            </h4>
            {SubTitle && <span className="text-sm font-thin">{SubTitle}</span>}
        </div>
    )
}

export default CardHeader;