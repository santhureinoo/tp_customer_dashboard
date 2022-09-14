import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { customer, outlet } from "../common/types";
import { BenchMarkComparisonCard, ChartCard, EqptEnergyBaseline, EquipmentCard, ExpectedSavingsCard, FastFoodCard, LastAvailableTarifCard, RankAndOutletCard, RemarksCard, SavingMeterCard, SavingPerformance, SustainPerformanceCard } from "./CardContent";
import ClientOnly from "./ClientOnly";
import { v4 as uuidv4 } from 'uuid';
import CustomSelect from "./cardcomponents/CustomSelect";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Dashboard = (): JSX.Element => {
    const [currentCustomerID, setCurrentCustomerID] = React.useState(1);
    const [outlets, setOutlets] = React.useState<outlet[]>([]);
    const [currentOutletID, setCurrentOutletID] = React.useState("");
    const [title, setTitle] = React.useState(["Outlet", "Tanglin Mall"]);

    const getOutletsByIdQuery = gql`
    query _count($where: OutletWhereInput) {
        outlets(where: $where) {
          outlet_id
          name
          customer_id
        }
      }`;

    const getOutletsByIdVariable = {
        "variables": {
            "where": {
                "customer_id": {
                    "equals": currentCustomerID
                }
            }
        }
    }

    const getOutletsByIdResult = useQuery(getOutletsByIdQuery, getOutletsByIdVariable);

    React.useEffect(() => {
        if (getOutletsByIdResult.data && getOutletsByIdResult.data.outlets) {
            setOutlets(getOutletsByIdResult.data.outlets);
        } else {
            setOutlets([]);
        }
    }, [getOutletsByIdResult.data])

    React.useEffect(() => {
        const customerstring = localStorage.getItem('customer');
        if (customerstring) {
            try {
                setCurrentCustomerID(parseInt(JSON.parse(customerstring).id));
            } catch (err) {
                setCurrentCustomerID(1);
            }

        }
    }, [])

    React.useEffect(() => {
        if (outlets.length > 0) {
            setTitle(["Outlet", outlets[0].name]);
            if (currentOutletID === "") {
                console.log(outlets[0].outlet_id.toString());
                setCurrentOutletID(outlets[0].outlet_id.toString());
            }
        }
    }, [outlets])

    const getHeaderBreadCrumb = React.useMemo(() => {
        return (<h3 className="text-gray-700 text-3xl font-bold">
            <div className="flex items-center">
                {
                    title && title.map((titleStr, ind) => {
                        return (
                            <React.Fragment key={uuidv4()} >
                                <span className="text-custom-gray">{titleStr}</span>
                                {ind !== (title.length - 1) && (<FontAwesomeIcon className="px-2 text-custom-gray text-sm" icon={faAngleRight} />)}
                            </React.Fragment>
                        )
                    })
                }
            </div>

        </h3>)
    }, [title]);

    return (
        <React.Fragment>
            <div className="flex justify-between h-full">
                {getHeaderBreadCrumb}
                <CustomSelect selectedValue={currentOutletID} dropdownValue={outlets.map(out => { return { value: out.outlet_id.toString(), display: out.name } })} />
            </div>

            <div className="flex flex-col mt-8">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div
                        className="align-middle inline-block min-w-full sm:rounded-lg">
                        <ClientOnly>
                            <div className="grid grid-cols-6 gap-2">
                                <div className="col-span-2">
                                    <SavingMeterCard />
                                </div>
                                <div className="col-span-4">
                                    <SustainPerformanceCard />
                                </div>
                                <div>
                                    <BenchMarkComparisonCard />
                                </div>
                                <div>
                                    <ExpectedSavingsCard />
                                </div>
                                <div className="col-span-4">
                                    <ChartCard currentOutletID={currentOutletID} />
                                </div>
                                <div>
                                    <RankAndOutletCard outlets={outlets} />
                                </div>
                                <div>
                                    <RemarksCard />
                                </div>
                                <div className="col-span-3">
                                    <EquipmentCard />
                                </div>
                                <div>
                                    <LastAvailableTarifCard />
                                </div>
                            </div>
                        </ClientOnly>
                    </div>
                </div>
            </div>


        </React.Fragment>

    )
}

export default Dashboard;