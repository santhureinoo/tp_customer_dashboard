import CustomizedInput from "./CustomizedInput"
import React from 'react';
import Searchfield from "./Searchfield";
import SummaryTable from "./SummaryTable";
import ContactList from "./ContactList";
import { dummyContactList, dummySummaryTableData } from "../common/constant";


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
                    <svg viewBox="0 0 20 20">
                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                    </svg>
                </button>
            </div>
            <div className="divide-y divide-solid space-y-6 pt-6">
                <div className="space-x-3 space-y-3">
                    <div>
                        <h6 ><b>Customer</b> <br /> Information</h6>
                    </div>
                    <div className="grid grid-cols-2 items-end gap-x-6 gap-y-6 pb-6">
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