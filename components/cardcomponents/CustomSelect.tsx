import { SearchOutlined } from "@ant-design/icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Input } from "antd";
import React from "react";
import { unknown } from "superstruct";
import { DropdownProps } from "../../common/types";

interface Props {
    dropdownValue: DropdownProps[];
    selectedValue: string;
    setSelectedValue: (val: string) => void;
}
const CustomSelect = ({ dropdownValue, selectedValue, setSelectedValue }: Props): JSX.Element => {
    const [currentDropdownValue, setCurrentDropdownValue] = React.useState<{ value: any, display: any }[]>([]);
    const findDisplayByValue = (selected: any) => dropdownValue.find(val => val.value === selected)?.display || '';
    const [changedValue, setChangedValue] = React.useState('');

    React.useEffect(() => {
        setChangedValue(findDisplayByValue(selectedValue))
    }, [selectedValue]);

    React.useEffect(() => {
        setCurrentDropdownValue(dropdownValue.sort((a, b) => {
            return a.display.localeCompare(b.display);
        }));
    }, [dropdownValue])

    const autoComp = React.useMemo(() => {
        return <AutoComplete
            disabled={dropdownValue.length < 1}
            options={currentDropdownValue.map(val => {
                return {
                    'value': val.value,
                    'label': <span className="font-semibold">{val.display}</span>
                }
            })}
            className="w-[300px] font-semibold"
            value={changedValue}
            onSelect={(val) => {
                setSelectedValue(val);
            }}
            onFocus={() => {
                setChangedValue('');
            }}
            onBlur={() => {
                setChangedValue(findDisplayByValue(selectedValue))
            }}
            onSearch={(text) => {
                setCurrentDropdownValue(dropdownValue.filter(val => {
                    const str = val.display as string;
                    return str.toLowerCase().includes(text.toLowerCase());
                }).sort((a, b) => {
                    return a.display.localeCompare(b.display, undefined, { sensitivity: 'base' });
                }));
                setChangedValue(text);
            }}
            notFoundContent={<span className="px-2 font-semibold">No outlet found</span>}
        >
            <Input suffix={<FontAwesomeIcon className="text-sm" icon={faSearch} />}></Input>
        </AutoComplete>
    }, [currentDropdownValue, changedValue])
    return (
        <div className="flex items-baseline gap-x-2">
            <label className="text-black text-custom-xs font-medium">Outlet</label>
            {autoComp}
        </div>
    )
}

export default CustomSelect;