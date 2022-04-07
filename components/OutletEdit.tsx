import CustomizedInput from "./CustomizedInput"
import React from 'react';
import ContactList from "./ContactList";
import { dummyContactList, dummySummaryOutletTableData } from "../common/constant";
import SummaryTable from "./SummaryTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

interface Props {
    openOutletEdit: boolean;
    setOpenOutletEdit(openOutletEdit: boolean): void;
}

const OutletEdit = ({ openOutletEdit, setOpenOutletEdit }: Props) => {
    const [contactList, setContactList] = React.useState(dummyContactList);
    const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
    return (
        <div className={`overflow-auto top-0 px-6 pt-6 bottom-0 right-0 fixed w-full md:w-[46vw] h-full bg-white ease-in-out z-50 duration-300 ${openOutletEdit ? "translate-x-0 " : "translate-x-full"}`}>
            <div className="flex justify-end">
                <button onClick={(e) => { setOpenOutletEdit(!openOutletEdit) }} className={`w-8 h-8`} type='button'>
                    <FontAwesomeIcon style={{ fontSize: '2em', cursor: 'pointer' }} icon={faCircleXmark} />
                </button>
            </div>
            <div className="divide-y divide-solid space-y-6 pt-6">
                <div className="grid grid-cols-2 gap-x-4 pb-6">
                    <CustomizedInput inputType="select" value={"KFC Indonesia"} dropDownData={['KFC Indonesia', 'FKC Indonesia']} />
                    <CustomizedInput hideDropDownPrefixIcon={true} inputType="select" value={"Live"} dropDownData={['Live', 'Pending']} />
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex justify-between">
                        <h6 ><b>Outlet</b> <br /> Information</h6>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                        <CustomizedInput label={"Outlet ID"} inputType="text" value={""} />
                        <CustomizedInput hideDropDownPrefixIcon={true} label={"Type"} inputType="select" value="FastFood" dropDownData={["FastFood", "Test", "Test"]} />
                        <CustomizedInput label={"Outlet Name"} inputType="text" value={""} />
                        <CustomizedInput required label={"Outlet Address"} inputType="text" value={""} />
                    </div>
                    <div className="grid grid-cols-4 gap-x-6 gap-y-6">
                        <CustomizedInput hideDropDownPrefixIcon={true} label={"Tariff  Rate"} inputType="selectWithPostfix" value={"0.08"} dropDownData={["0.08", "0.09", "0.1"]} />
                        <CustomizedInput hideDropDownPrefixIcon={true} label={"Max Tariff"} inputType="selectWithPostfix" value="FastFood" dropDownData={["FastFood", "Test", "Test"]} />
                        <CustomizedInput label={"Latitude"} inputType="text" value={"6.586904-"} />
                        <CustomizedInput label={"Longitude"} inputType="text" value={"6.586904-"} />
                        <div className="col-span-2">
                            <CustomizedInput hideDropDownPrefixIcon={true} label={"Date of Tariff"} inputType="date" value={"22-02-2022"} dropDownData={["22-02-2022", "22-02-2022", "22-02-2022"]} />
                        </div>
                        <CustomizedInput label={"Share of Savings"} inputType="textWithPostfix" postFix="%" value={"6.586904-"} />
                        <CustomizedInput label={"A.I. Start Date"} inputType="text" value={"22-02-2022"} />
                    </div>
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex justify-between">
                        <h6 ><b>Equipment</b><br /> Information</h6>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2">
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