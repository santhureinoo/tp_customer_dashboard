import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    data?: string[];
    selected: string;
    inputType: 'dropdown' | 'autocomplete';
    hidePrefixIcons: boolean;
    setSelected(selected: string): void;
}

const CustomizedDropDown = ({ data, selected, inputType, setSelected, hidePrefixIcons = false }: Props): React.ReactElement => {
    const [openOutletList, setOpenOutletList] = React.useState(false);

    const getInputElem = () => {
        if (inputType === 'autocomplete') {
            return (<input type="text" className="grow w-full outline-none" placeholder="Search" />);
        } else {
            return (<div className="grow w-full outline-none overflow-hidden">{selected}</div>)
        }
    }

    return (
        <div className="relative outline-none border-2 rounded-lg">
            <div onClick={(e) => { setOpenOutletList(!openOutletList) }} className="w-full text-black font-medium rounded-lg text-sm px-4 py-2.5  items-center">
                <div className="flex w-full gap-x-2">
                    {!hidePrefixIcons && <svg className="text-slate-400 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>}
                    {getInputElem()}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
            <div className={`${openOutletList ? 'absolute' : 'hidden'} top-7 right-0 w-full bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}>
                <ul className="py-1" aria-labelledby="dropdown">
                    {data && data.map((dat, ind) => {
                        return (
                            <li key={uuidv4()} onClick={(e: any) => {
                                setSelected(dat);
                                setOpenOutletList(!openOutletList);
                            }}>
                                <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">{dat}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default CustomizedDropDown;