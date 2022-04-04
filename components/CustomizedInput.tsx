import React from 'react';
import CustomizedDropDown from './CustomizedDropDown';

interface Props {
    inputType: 'text' | 'mail' | 'number' | 'textWithPostfix' | 'select' | 'selectWithPostfix';
    label?: string;
    value: string;
    dropDownData? : string[];
    hideDropDownPrefixIcon?: boolean;
    postFix?: string;
}

const CustomizedInput = ({inputType, label, value, dropDownData, postFix = "", hideDropDownPrefixIcon = false } : Props) => {
    function InputElem() {
        let elem;
        switch (inputType) {
            case 'text':
            case 'mail':
            case 'number':
                elem = <input type={inputType} className="outline-none px-6 py-3 border-2 rounded-lg h-11 w-full" value={value} />
                break;
            case 'textWithPostfix':
                elem = <div className="flex flex-row w-auto border-2 rounded-lg items-center  w-full">
                    <input type="text" className="outline-none  px-6 py-3  h-11 w-9/12" value={value} />
                    <span className="m-2 text-sm text-center text-gray-300 w-3/12 ">{postFix}</span>
                </div>
                break;
            default:
                elem = <CustomizedDropDown hidePrefixIcons={hideDropDownPrefixIcon} data={dropDownData} selected={value} setSelected={function (selected: string): void {
                    throw new Error('Function not implemented.');
                } }/>
                break;
        }
        return elem;
    }

    return (
        <div>
            {label && <span className="block pl-2 text-xs">{label}</span>}
            {InputElem()}
        </div>
    )
}

export default CustomizedInput;