import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import moment from 'moment';
import { customer, outlet, results } from "../common/types";
import { BenchMarkComparisonCard, ChartCard, EqptEnergyBaseline, EquipmentCard, ExpectedSavingsCard, FastFoodCard, LastAvailableTarifCard, RankAndOutletCard, RemarksCard, SavingMeterCard, SavingPerformance, SustainPerformanceCard } from "./CardContent";
import ClientOnly from "./ClientOnly";
import { v4 as uuidv4 } from 'uuid';
import CustomSelect from "./cardcomponents/CustomSelect";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Dashboard = (): JSX.Element => {
    const [currentCustomerID, setCurrentCustomerID] = React.useState(1);
    const [outlets, setOutlets] = React.useState<outlet[]>([]);
    const [currentOutlet, setCurrentOutlet] = React.useState<outlet>();
    const [currentOutletID, setCurrentOutletID] = React.useState("");
    const [title, setTitle] = React.useState(["Outlet", ""]);
    const [totalKWHs, setTotalKWHs] = React.useState<{
        MinKWH: number,
        MaxKWH: number,
        CurrentKHW: number,
    }>({
        MinKWH: 0,
        MaxKWH: 0,
        CurrentKHW: 0,
    });
    const currentMoment = moment();

    const getOutletsByIdQuery = gql`
    query _count {
        outlets {
          outlet_id
          name
          customer_id
          outlet_device_ac_input {
            od_device_input_id
          }
          outlet_device_ex_fa_input {
            od_device_input_id
          }
          results {
            outlet_id
            outlet_date
            ke_measured_savings_kWh
            ac_measured_savings_kWh
            acmv_measured_savings_kWh
            outlet_measured_savings_kWh
            outlet_measured_savings_expenses
            outlet_measured_savings_percent
            co2_savings_kg
            savings_tariff_expenses
            tp_sales_expenses
            ke_eqpt_energy_baseline_avg_hourly_kW
            ac_eqpt_energy_baseline_avg_hourly_kW
            acmv_eqpt_energy_baseline_avg_hourly_kW
            ke_eqpt_energy_baseline_avg_hourly_as_date
            ac_eqpt_energy_baseline_avg_hourly_as_date
            acmv_eqpt_energy_baseline_avg_hourly_as_date
            ke_eqpt_energy_usage_without_TP_month_kW
            ac_eqpt_energy_usage_without_TP_month_kW
            outlet_eqpt_energy_usage_without_TP_month_kW
            outlet_eqpt_energy_usage_without_TP_month_expenses
            ke_eqpt_energy_usage_with_TP_month_kW
            ac_eqpt_energy_usage_with_TP_month_kW
            outlet_eqpt_energy_usage_with_TP_month_kW
            outlet_eqpt_energy_usage_with_TP_month_expenses
            acmv_25percent_benchmark_comparison_kWh
            acmv_25percent_benchmark_comparison_expenses
            acmv_10percent_benchmark_comparison_kWh
            acmv_10percent_benchmark_comparison_expenses
            ke_and_ac_25percent_benchmark_comparison_kWh
            ke_and_ac_25percent_benchmark_comparison_expenses
            monday
            tuesday
            wednesday
            thursday
            friday
            saturday
            sunday
            holiday
          }
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
    const getResultsQuery = gql`
    query FindManyResults($where: ResultsWhereInput) {
        findManyResults(where: $where) {
          outlet_id
          outlet_date
          acmv_25percent_benchmark_comparison_kWh
          acmv_10percent_benchmark_comparison_kWh
          acmv_measured_savings_kWh
        }
      }
    `;
    const getResultsVariable = {
        "variables": {
            "where": {
                "outlet_id": {
                    "equals": Number(currentOutletID)
                }
            }
        }
    };
    const getResultsResult = useQuery(getResultsQuery, getResultsVariable);

    React.useEffect(() => {
        if (getResultsResult.data && getResultsResult.data.findManyResults) {
            const currData = getResultsResult.data.findManyResults as results[];
            const currentTotalKWHs = currData.map(dat => {
                return {
                    MinKWH: parseInt(dat.acmv_10percent_benchmark_comparison_kWh || "0"),
                    MaxKWH: parseInt(dat.acmv_25percent_benchmark_comparison_kWh || "0"),
                    CurrentKHW: parseInt(dat.acmv_measured_savings_kWh || "0"),
                }
            }).reduce((prev, curr) => {
                return {
                    MinKWH: prev.MinKWH + curr.MinKWH,
                    MaxKWH: prev.MaxKWH + curr.MaxKWH,
                    CurrentKHW: prev.CurrentKHW + curr.CurrentKHW,
                }
            }, {
                MinKWH: 0,
                MaxKWH: 0,
                CurrentKHW: 0,
            });
            setTotalKWHs(currentTotalKWHs);
        }
    }, [getResultsResult.data]);

    const getOutletsByIdResult = useQuery(getOutletsByIdQuery);

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
                setCurrentOutletID(outlets[0].outlet_id.toString());
            }
            setCurrentOutlet(outlets[0]);
        }
    }, [outlets])

    const getLastResultDate = React.useMemo(() => {
        if (currentOutlet && currentOutlet.results && currentOutlet.results.length > 0) {
            return currentOutlet.results[currentOutlet.results.length - 1].outlet_date;
        } else {
            return "";
        }
    }, [currentOutlet])

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
                <CustomSelect setSelectedValue={(val) => {
                    setCurrentOutletID(val);
                    const curOut = outlets.find(out => out.outlet_id === Number(val));
                    setCurrentOutlet(curOut);
                    setTitle(["Outlet", curOut?.name || '']);
                }} selectedValue={currentOutletID} dropdownValue={outlets.map(out => { return { value: out.outlet_id.toString(), display: out.name } })} />
            </div>

            <div className="flex flex-col mt-8">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div
                        className="align-middle inline-block min-w-full sm:rounded-lg">
                        <ClientOnly>
                            <div className="grid grid-cols-6 gap-2">
                                <div className="col-span-2">
                                    <SavingMeterCard date={getLastResultDate} outletId={currentOutlet?.outlet_id} />
                                </div>
                                <div className="col-span-4">
                                    <SustainPerformanceCard />
                                </div>
                                <div>
                                    <BenchMarkComparisonCard totalKWHs={totalKWHs} />
                                </div>
                                <div>
                                    <ExpectedSavingsCard totalKWHs={totalKWHs} />
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
                                    <EquipmentCard outlet={currentOutlet} />
                                </div>
                                <div>
                                    <LastAvailableTarifCard date={getLastResultDate} />
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