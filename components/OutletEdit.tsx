import CustomizedInput from "./CustomizedInput"
import React from 'react';
import ContactList from "./ContactList";
import { dummyContactList, dummySummaryOutletTableData } from "../common/constant";
import Searchfield from "./Searchfield";
import SummaryTable from "./SummaryTable";

interface Props {
    openOutletEdit: boolean;
    setOpenOutletEdit(openOutletEdit: boolean): void;
}

const OutletEdit = ({ openOutletEdit, setOpenOutletEdit }: Props) => {
    const [contactList, setContactList] = React.useState(dummyContactList);
    return (
        <div className={`overflow-auto top-0 space-y-12 px-6 pt-12 bottom-0 right-0 fixed w-full md:w-[46vw] h-full bg-white ease-in-out z-50 duration-300 ${openOutletEdit ? "translate-x-0 " : "translate-x-full"}`}>
            <div className="divide-y divide-solid">
                <div className="grid grid-cols-2 gap-x-4 pb-6">
                    <CustomizedInput inputType="select" value={"KFC Indonesia"} dropDownData={['KFC Indonesia', 'FKC Indonesia']} />
                    <CustomizedInput hideDropDownPrefixIcon={true} inputType="select" value={"Live"} dropDownData={['Live', 'Pending']} />
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex justify-between">
                        <h6 ><b>Outlet</b> <br /> Information</h6>
                        <button onClick={(e) => { setOpenOutletEdit(!openOutletEdit) }} className={`w-8 h-8`} type='button'>
                            <svg viewBox="0 0 20 20">
                                <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 items-end gap-x-6 gap-y-6">
                        <CustomizedInput label={"Outlet ID"} inputType="text" value={""} />
                        <CustomizedInput hideDropDownPrefixIcon={true} label={"Type"} inputType="select" value="FastFood" dropDownData={["FastFood", "Test", "Test"]} />
                        <CustomizedInput label={"Outlet Name"} inputType="text" value={""} />
                        <CustomizedInput label={"Outlet Address"} inputType="text" value={""} />
                    </div>
                    <div className="grid grid-cols-4 items-end gap-x-6 gap-y-6">
                        <CustomizedInput hideDropDownPrefixIcon={true} label={"Tariff  Rate"} inputType="selectWithPostfix" value={"0.08"} dropDownData={["0.08", "0.09", "0.1"]} />
                        <CustomizedInput hideDropDownPrefixIcon={true} label={"Max Tariff"} inputType="selectWithPostfix" value="FastFood" dropDownData={["FastFood", "Test", "Test"]} />
                        <CustomizedInput label={"Latitude"} inputType="text" value={"6.586904-"} />
                        <CustomizedInput label={"Longitude"} inputType="text" value={"6.586904-"} />
                        <div className="col-span-2">
                            <CustomizedInput hideDropDownPrefixIcon={true} label={"Date of Tariff"} inputType="selectWithPostfix" value={"22-02-2022"} dropDownData={["22-02-2022", "22-02-2022", "22-02-2022"]} />
                        </div>
                        <CustomizedInput label={"Share of Savings"} inputType="textWithPostfix" postFix="%" value={"6.586904-"} />
                        <CustomizedInput label={"A.I. Start Date"} inputType="text" value={"22-02-2022"} />
                    </div>
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex justify-between">
                        <h6 ><b>Equipment</b><br /> Information</h6>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 items-end ">
                        <CustomizedInput label={"Baseline"} inputType="textWithPostfix" postFix={'kW'} value={""} />
                        <CustomizedInput label={"Usage - low"} inputType="textWithPostfix" postFix={'kWH'} value={""} />
                        <CustomizedInput label={"Usage - High"} inputType="textWithPostfix" postFix={'kWH'} value={""} />
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
                        <h6><b>Quantity</b></h6>
                        <h6><b>(2)</b></h6>
                    </div>
                    <div className="grid grid-cols-1 items-center">
                        <div className="w-full overflow-auto">
                            <SummaryTable headers={['Equipment ID', 'Type', 'Name', '']} data={dummySummaryOutletTableData} />
                        </div>
                        <div className="flex justify-end">
                            <span onClick={e => {

                            }} className="cursor-pointer text-sm text-sky-400">Add Equipment Data</span>
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

export default OutletEdit;