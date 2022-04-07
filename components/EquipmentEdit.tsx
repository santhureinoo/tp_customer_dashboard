import CustomizedInput from "./CustomizedInput"
import React from 'react';
import ContactList from "./ContactList";
import { dummyContactList, dummySummaryEquipmentTableData, dummySummaryOutletTableData, dummySummaryTableData } from "../common/constant";
import SummaryTable from "./SummaryTable";
import FileUpload from "./FileUpload";
import Searchfield from "./Searchfield";
import CustomizedDropDown from "./CustomizedDropDown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

interface Props {
    openEquipmentEdit: boolean;
    setOpenEquipmentEdit(openEquipmentEdit: boolean): void;
}

const OutletEdit = ({ openEquipmentEdit, setOpenEquipmentEdit }: Props) => {
    const [contactList, setContactList] = React.useState(dummyContactList);
    const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);

    const getSearchinput = () => {
        return (
            <CustomizedDropDown hidePrefixIcons={true} data={["Type of Device", "VFD"]} selected={"Type of Device"} setSelected={function (selected: string): void {
                throw new Error('Function not implemented.');
            }} inputType={"dropdown"} />
        )
    }
    return (
        <div className={`overflow-auto top-0 px-6 pt-6 bottom-0 right-0 fixed w-full md:w-[46vw] h-full bg-white ease-in-out z-50 duration-300 ${openEquipmentEdit ? "translate-x-0 " : "translate-x-full"}`}>
            <div className="flex justify-end">
                <button onClick={(e) => { setOpenEquipmentEdit(!openEquipmentEdit) }} className={`w-8 h-8`} type='button'>
                    <FontAwesomeIcon style={{ fontSize: '2em', cursor: 'pointer' }} icon={faCircleXmark} />
                </button>
            </div>
            <div className="divide-y divide-solid space-y-6 pt-6">
                <div className="pb-6">
                    <CustomizedInput inputType="select" value={"KFC Indonesia"} dropDownData={['KFC Indonesia', 'FKC Indonesia']} />
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex justify-between">
                        <h6 ><b>Equipment</b> <br /> Information</h6>
                    </div>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                        <CustomizedInput label={"Equipment ID"} inputType="text" value={""} />
                        <CustomizedInput hideDropDownPrefixIcon={true} label={"Type"} inputType="select" value="FastFood" dropDownData={["FastFood", "Test", "Test"]} />
                        <CustomizedInput label={"Equipment Name"} inputType="text" value={""} />
                        <CustomizedInput label={"Equipment SerialNo."} inputType="text" value={""} />
                        <CustomizedInput label={"Equipment Manufacturer"} inputType="text" value={""} />
                        <CustomizedInput required label={"Equipment Model"} inputType="text" value={""} />
                        <div className="col-span-3">
                            <FileUpload uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
                        </div>
                    </div>
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex justify-between">
                        <h6 ><b>Energy</b><br /> Information</h6>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 ">
                        <CustomizedInput label={"Baseline"} inputType="textWithPostfix" postFix={'kW'} value={""} />
                        <CustomizedInput label={"Usage - low"} inputType="textWithPostfix" postFix={'kWH'} value={""} />
                        <CustomizedInput label={"Usage - High"} inputType="textWithPostfix" postFix={'kWH'} value={""} />

                    </div>
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex justify-between">
                        <h6><b>Device</b></h6>
                        <h6><b>(5)</b></h6>
                    </div>
                    <div className="grid grid-cols-1 items-center">
                        <Searchfield IconFront={false} WithButton={true} InputElement={getSearchinput()} ButtonText={"Retrieve from Emily"} />
                        <div className="w-full overflow-auto">
                            <SummaryTable headers={['Device ID', 'Type', 'Name', 'Status', '']} data={dummySummaryEquipmentTableData} />
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