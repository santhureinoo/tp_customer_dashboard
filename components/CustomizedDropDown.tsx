import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { v5 as uuidv5 } from 'uuid';
import { DropdownProps } from '../common/types';

interface Props {
    data?: DropdownProps[];
    selected: DropdownProps;
    name: string;
    textColor?: string;
    inputType: 'dropdown' | 'autocomplete';
    hidePrefixIcons: boolean;
    hideBorder: boolean;
    extraIcon?: JSX.Element;
    setSelected(selected: DropdownProps): void;
}

const CustomizedDropDown = ({ data, name, selected,hideBorder = false, extraIcon, textColor = 'text-black', inputType, setSelected, hidePrefixIcons = false }: Props): React.ReactElement => {
    const [openOutletList, setOpenOutletList] = React.useState(false);
    const id = uuidv5(name ,uuidv5.URL);

    React.useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", (ev : MouseEvent) => {
            let isFound = false;
            ev.composedPath().forEach((et)=>{
                const elem = et as HTMLElement;
                if (elem.id === id) {
                   isFound = true;
                }
             
            })
            !isFound && setOpenOutletList(false);
        });
    }, [id]);


    const getInputElem = () => {
        if (inputType === 'autocomplete') {
            return (<input type="text" className="grow w-full outline-none" placeholder="Search" />);
        } else {
            return (<div onClick={(e) => { setOpenOutletList(!openOutletList) }} className="cursor-pointer grow w-full outline-none overflow-hidden">{selected.display}</div>)
        }
    }

    return (
        <div id={id} className={`relative w-fit outline-none ${!hideBorder ? 'border-2' : ''} rounded-lg ${openOutletList && !hideBorder ? 'focus-within:border focus-within:border-black' : ''} `}>
            <div className={`w-full ${textColor} font-medium rounded-lg text-sm px-4 py-2.5 items-center`}>
                <div className="flex w-full gap-x-2">
                    {!hidePrefixIcons && <svg className="text-slate-400 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>}
                    {getInputElem()}
                    <div tabIndex={0} onBlur={(e) => setOpenOutletList(false)} onClick={(e) => { setOpenOutletList(!openOutletList) }} className="flex items-center gap-x-2">
                        {extraIcon}
                        <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faChevronDown} />
                    </div>

                </div>
            </div>
            <div className={`${openOutletList ? 'absolute' : 'hidden'} top-7 right-0 w-full bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}>
                <ul className="py-1" aria-labelledby="dropdown">
                    {data && data.map((dat, ind) => {
                        return (
                            <li key={'cd-'+ind} onClick={(e: any) => {
                                setSelected(dat);
                                setOpenOutletList(!openOutletList);
                            }}>
                                <a href="#" className={`text-sm overflow-hidden hover:bg-gray-100 ${textColor} block px-4 py-2`}>{dat.display}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default CustomizedDropDown;