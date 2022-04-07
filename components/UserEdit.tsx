import { dummySummaryBillingTableData, dummySummaryOutletTableData } from "../common/constant";
import CustomizedInput from "./CustomizedInput";
import PillButton from "./PillButton";
import SummaryTable from "./SummaryTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';


interface Props {
    openUserEdit: boolean;
    setOpenUserEdit(openUserEdit: boolean): void;
}

const UserEdit = ({ openUserEdit, setOpenUserEdit }: Props) => {
    return (
        <div className={`shadow-lg overflow-auto top-0 px-6 pt-6 bottom-0 right-0 fixed w-full md:w-[46vw] h-full bg-white ease-in-out z-50 duration-300 ${openUserEdit ? "translate-x-0 " : "translate-x-full"}`}>
            <div className="flex justify-end">
                <button onClick={(e) => { setOpenUserEdit(!openUserEdit) }} className={`w-8 h-8`} type='button'>
                    <FontAwesomeIcon style={{ fontSize: '2em', cursor: 'pointer' }} icon={faCircleXmark} />
                </button>
            </div>
            <div className="divide-y divide-solid space-y-6 pt-6">
                <div className="text-lg pb-6 space-y-4">
                    <h6 ><b>User</b> <br /> Information</h6>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 pb-6">
                        <div className="col-span-2">
                            <CustomizedInput label={"Category"} inputType="select" value={"Administrator"} dropDownData={['Administrator', 'Customer']} />
                        </div>
                        <CustomizedInput label={"Customer ID"} inputType="text" value={""} />
                        <CustomizedInput label={"Customer Name"} inputType="text" value={""} />
                        <CustomizedInput label={"Country"} inputType="text" value={""} />
                        <CustomizedInput label={"City"} inputType="text" value={""} />
                        <CustomizedInput label={"Current Adress"} inputType="text" value={""} />
                        <CustomizedInput label={"Postal Code"} inputType="text" value={""} />
                    </div>
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <CustomizedInput label={"Customer"} inputType="autocomplete" value={"Administrator"} dropDownData={['Administrator', 'Customer']} />
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <CustomizedInput label={"Outlet"} inputType="autocomplete" value={"Administrator"} dropDownData={['Administrator', 'Customer']} />
                </div>
            </div>
            <div className="flex flex-row gap-x-3 justify-between">
                <button type='button' className="bg-white text-blue-500 border border-neutral-400 rounded-lg w-full text-sm h-11 text-center">Reset</button>
                <button type='button' className="bg-blue-500 text-white rounded-lg w-full text-sm h-11 text-center">Save</button>
            </div>
        </div>
    )
}

export default UserEdit;