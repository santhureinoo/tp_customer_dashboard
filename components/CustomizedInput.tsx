    import React from 'react';
    import CustomizedDropDown from './CustomizedDropDown';

    interface Props {
        inputType: 'text' | 'mail' | 'number' | 'date' | 'textWithPostfix' | 'select' | 'autocomplete' | 'selectWithPostfix';
        label?: string;
        value: string;
        dropDownData? : string[];
        hideDropDownPrefixIcon?: boolean;
        postFix?: string;
        required?: boolean;
        errorField?: boolean;
    }

    const CustomizedInput = ({inputType, label, required = false, value, dropDownData, postFix = "", hideDropDownPrefixIcon = false } : Props) => {

        const validateInput = () => {
            if (required && !value) {
                return 'this field cannot be left empty.';
            } else {
                return undefined;
            }
        
        }

        const InputElem = () => {
            let elem;
            switch (inputType) {
                case 'text':
                case 'mail':
                case 'number':
                case 'date':
                    elem = <input type={inputType} className={`outline-none px-6 py-3 border-2 rounded-lg h-11 w-full ${!validateInput() ? '' : 'border-red-200'}`} />
                    break;
                case 'textWithPostfix':
                    elem = <div className="flex flex-row w-auto border-2 rounded-lg items-center">
                        <input type="text" className="outline-none overflow-hidden  px-6 py-3  h-11 w-9/12" />
                        <span className="m-2 text-sm text-center text-gray-300 w-3/12 ">{postFix}</span>
                    </div>
                    break;
                case 'autocomplete':
                    elem = <CustomizedDropDown inputType={'autocomplete'} hidePrefixIcons={hideDropDownPrefixIcon} data={dropDownData} selected={value} setSelected={function (selected: string): void {
                         } }/>
                    break;
                default:
                    elem = <CustomizedDropDown inputType={'dropdown'} hidePrefixIcons={hideDropDownPrefixIcon} data={dropDownData} selected={value} setSelected={function (selected: string): void {
                    } }/>
                    break;
            }
            return elem;
        }

        return (
            <div>
                {label && <span className="block pl-2 pb-1 text-xs">{label}</span>}
                {InputElem()}
                <span className='text-sm text-red-500'>{validateInput()}</span>
            </div>
        )
    }

    export default CustomizedInput;