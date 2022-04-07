import CustomizedInput from "./CustomizedInput"
import React from 'react';
import Searchfield from "./Searchfield";
import SummaryTable from "./SummaryTable";
import ContactList from "./ContactList";
import { dummyContactList, dummySummaryTableData } from "../common/constant";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark } from '@fortawesome/free-regular-svg-icons';


interface Props {
    openCustomerEdit: boolean;
    setOpenCustomerEdit(setCE: boolean): void;
}

const CustomerEdit = ({ openCustomerEdit, setOpenCustomerEdit }: Props) => {

    const [contactList, setContactList] = React.useState(dummyContactList);
    return (
        <div className={`shadow-lg overflow-auto top-0 px-6 pt-6 bottom-0 right-0 fixed w-full md:w-[46vw] h-full bg-white ease-in-out z-50 duration-300 ${openCustomerEdit ? "translate-x-0 " : "translate-x-full"}`}>
            <div className="flex justify-end">
                <button onClick={(e) => { setOpenCustomerEdit(!openCustomerEdit) }} className={`w-8 h-8`} type='button'>
                    <FontAwesomeIcon style={{ fontSize: '2em', cursor: 'pointer' }} icon={faCircleXmark} />
                </button>
            </div>
            <div className="divide-y divide-solid space-y-6 pt-6">
                <div className="space-x-3 space-y-3">
                    <div>
                        <h6 ><b>Customer</b> <br /> Information</h6>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 pb-6">
                        <CustomizedInput label={"Customer ID"} inputType="text" value={""} />
                        <CustomizedInput label={"Customer Name"} inputType="text" value={""} />
                        <CustomizedInput label={"Country"} inputType="text" value={""} />
                        <CustomizedInput label={"City"} inputType="text" value={""} />
                        <CustomizedInput label={"Current Adress"} inputType="text" value={""} />
                        <CustomizedInput label={"Postal Code"} inputType="text" value={""} />
                    </div>
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex">
                        <h6 ><b>Person In Charge</b><br /> Information</h6>
                    </div>
                    <ContactList contactList={contactList} setContactList={setContactList} />
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex justify-between">
                        <h6 ><b>Outlet</b><br />Assignment</h6>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-x-1">
                        <Searchfield IconFront={true} WithButton={true} ButtonText={"Search"} />
                        <div className="w-full overflow-auto">
                            <SummaryTable headers={['ID', 'Name', 'Equipment', '']} data={dummySummaryTableData} />
                        </div>
                        <div className="flex justify-end">
                            <span onClick={e => {
                            }} className="cursor-pointer text-sm text-sky-400">Add Outlet Data</span>
                        </div>

                    </div>
                </div>
                <div className="flex flex-row gap-x-3 justify-between">
                    <button type='button' className="bg-white text-blue-500 border border-neutral-400 rounded-lg w-full text-sm h-11 text-center">Reset</button>
                    <button type='button' className="bg-blue-500 text-white rounded-lg w-full text-sm h-11 text-center">Save</button>
                </div>
            </div>

        </div>
    )
}

export default CustomerEdit;