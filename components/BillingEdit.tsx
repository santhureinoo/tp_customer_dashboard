import { dummySummaryBillingTableData, dummySummaryOutletTableData } from "../common/constant";
import PillButton from "./PillButton";
import SummaryTable from "./SummaryTable";

interface Props {
    openBillingEdit: boolean;
    setOpenBillingEdit(openBillingEdit: boolean): void;
}

const BillingEdit = ({ openBillingEdit, setOpenBillingEdit }: Props) => {
    return (
        <div className={`shadow-lg overflow-auto top-0 px-6 pt-6 bottom-0 right-0 fixed w-full md:w-[46vw] h-full bg-white ease-in-out z-50 duration-300 ${openBillingEdit ? "translate-x-0 " : "translate-x-full"}`}>
            <div className="flex justify-end">
                <button onClick={(e) => { setOpenBillingEdit(!openBillingEdit) }} className={`w-8 h-8`} type='button'>
                    <svg viewBox="0 0 20 20">
                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                    </svg>
                </button>
            </div>
            <div className="space-y-6 pt-6">
                <div className="pb-6 space-y-4">
                    <div className="flex text-lg justify-between">
                        <div>
                            <h4 ><b>Invoice ID</b> <br /> Set-2095860</h4>
                        </div>

                        <button type="button" onClick={(e) => { }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Download Invoice
                        </button>
                    </div>
                    <PillButton className={"bg-green-300  w-40 h-12"} text={"Invoice Extracted"} />
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex bg-slate-200 p-4 items-center">
                        <h6 ><b>Business</b> Information</h6>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 gap-y-8">
                        <div>
                            <h4>Business Name</h4>
                            <span className="text-slate-300">KFC Holding Indonesia</span>
                        </div>
                        <div className="col-span-2">
                            <h4>Business Address</h4>
                            <span className="text-slate-300">Sahid Building <br />Sudirman Boulevard No.12 Floor 15/<br />Unit 09</span>
                        </div>
                        <div>
                            <h4>Country</h4>
                            <span className="text-slate-300">Indonesia</span>
                        </div>
                        <div>
                            <h4>City</h4>
                            <span className="text-slate-300">Jakarta</span>
                        </div>
                        <div>
                            <h4>Postal Code </h4>
                            <span className="text-slate-300">150345</span>
                        </div>
                    </div>
                </div>
                <div className="space-x-3 space-y-3 py-6">
                    <div className="flex bg-slate-200 p-4 items-center">
                        <h6 ><b>Invoice</b> Information</h6>
                    </div>
                    <div className="grid grid-cols-4 gap-x-2 gap-y-8">
                        <div>
                            <h4>Invoice ID</h4>
                            <span className="text-slate-300">Set-2095860</span>
                        </div>
                        <div>
                            <h4>Invoice Date</h4>
                            <span className="text-slate-300">30/09/2022</span>
                        </div>
                        <div>
                            <h4>Due Date</h4>
                            <span className="text-slate-300">30/10/2022</span>
                        </div>
                        <div>
                            <h4>Tax</h4>
                            <span className="text-slate-300">0</span>
                        </div>
                        <div>
                            <h4>Total Service Fee</h4>
                            <span className="text-slate-300">$485.09</span>
                        </div>
                        <div>
                            <h4>Total Savings ($)</h4>
                            <span className="text-slate-300">$250</span>
                        </div>
                        <div>
                            <h4>Total Savings (kWh)</h4>
                            <span className="text-slate-300">470</span>
                        </div>
                    </div>
                </div>
                <div className="space-x-3 bg-slate-200 space-y-3 py-6">
                    <div className="flex p-4 items-center">
                        <h6><b>Outlet (5)</b></h6>
                    </div>
                    <div className="grid grid-cols-1 items-center">
                        <div className="w-full overflow-auto">
                            <SummaryTable headerColor={`bg-slate-100`} headers={['Outlet Name','Last Available Tariff','Eqpt.EnergyBaseline','Energy Usage','Savings', 'Service Fee']} data={dummySummaryBillingTableData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillingEdit;