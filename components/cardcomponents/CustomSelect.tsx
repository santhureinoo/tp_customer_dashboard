import { DropdownProps } from "../../common/types";

interface Props {
    dropdownValue: DropdownProps[];
    selectedValue: string;
    setSelectedValue: (val: string) => void;
}
const CustomSelect = ({ dropdownValue, selectedValue, setSelectedValue }: Props): JSX.Element => {
    return (
        <div className="flex justify-center items-baseline gap-x-2">
            <label className="text-black text-custom-xs font-medium">Outlet</label>
            <select value={selectedValue} onChange={(event) => { setSelectedValue(event.target.value) }} className="form-select appearance-none
      block
      mb-3 min-w-[104.68px] h-full
      px-3
      py-1.5
      text-custom-xs
      font-medium
      text-custom-gray
      bg-custom-lightgray bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      outline-none">
                {
                    dropdownValue.map((val, index) => {
                        return <option key={index} value={val.value}>{val.display}</option>
                    })
                }


            </select>
        </div>
    )
}

export default CustomSelect;