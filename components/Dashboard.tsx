import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import moment from 'moment';
import { customer, group, outlet, results } from "../common/types";
import { BenchMarkComparisonCard, ChartCard, EqptEnergyBaseline, EquipmentCard, ExpectedSavingsCard, FastFoodCard, LastAvailableTarifCard, RankAndOutletCard, RemarksCard, SavingMeterCard, SavingPerformance, SustainPerformanceCard, LiveOutletCard, EquipmentEnergyCard, SavingEnergyCard, YearlyEnergyCard } from "./CardContent";
import ClientOnly from "./ClientOnly";
import { v4 as uuidv4 } from 'uuid';
import CustomSelect from "./cardcomponents/CustomSelect";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ({ groupId }: any): JSX.Element => {
    const [currentCustomerID, setCurrentCustomerID] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState('outlet');
    const [lastestLiveDate, setLastestLiveDate] = React.useState('');
    const [outlets, setOutlets] = React.useState<outlet[]>([]);
    const [currentOutlet, setCurrentOutlet] = React.useState<outlet>();
    const [currentOutletID, setCurrentOutletID] = React.useState("");
    const [title, setTitle] = React.useState(["Outlet", ""]);
    const [totalKWHs, setTotalKWHs] = React.useState<{
        MinKWH: number,
        MaxKWH: number,
        CurrentKHW: number,
        OutletSavingKHW: number,
    }>({
        MinKWH: 0,
        MaxKWH: 0,
        CurrentKHW: 0,
        OutletSavingKHW: 0,
    });

    const [totalPerYear, setTotalPerYear] = React.useState<{
        energy: number,
        co2: number,
    }>({
        energy: 0,
        co2: 0
    });

    const getFindFirstLastestReportDateQuery = gql`
    query FindFirstLastest_report_date {
        findFirstLastest_report_date {
          date_id
          lastest_report_month_year
        }
      }
    `;

    const getOutletsByGroupIdQuery = gql`
    query FindFirstGroup($findFirstGroupWhere: GroupWhereInput) {
        findFirstGroup(where: $findFirstGroupWhere) {
          customers {
            outlet {
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
          }
        }
      }`;

    const getOutletsByGroupIdVariable = {
        "variables": {
            "findFirstGroupWhere": {
                "group_id": {
                    "equals": groupId
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
          outlet_measured_savings_kWh
          outlet_measured_savings_expenses
          outlet_measured_savings_percent
          tp_sales_expenses
          co2_savings_kg
        }
      }
    `;
    const getResultsVariable = {
        "variables": {
            "where": {
                "outlet_id": {
                    "equals": Number(currentOutletID)
                }
                // "AND": [
                //     {
                //         "outlet_date": {
                //             "equals": lastestLiveDate
                //         },
                //         "outlet_id": {
                //             "equals": Number(currentOutletID)
                //         }
                //     }
                // ],

            }
        }
    };
    const getResultsResult = useQuery(getResultsQuery, getResultsVariable);

    React.useEffect(() => {
        if (getResultsResult.data && getResultsResult.data.findManyResults) {

            const currData = getResultsResult.data.findManyResults as results[];

            // Per month calculation
            const currentTotalKWHs = currData.filter(dat => {
                const resultDate = moment(dat.outlet_date, 'DD/MM/YYYY');
                const currentDate = moment(lastestLiveDate, 'DD/MM/YYYY');
                return resultDate.diff(currentDate) <= 0;
            }).map(dat => {
                return {
                    MinKWH: parseInt(dat.acmv_10percent_benchmark_comparison_kWh || "0"),
                    MaxKWH: parseInt(dat.acmv_25percent_benchmark_comparison_kWh || "0"),
                    CurrentKHW: parseInt(dat.acmv_measured_savings_kWh || "0"),
                    OutletSavingKHW: parseInt(dat.outlet_measured_savings_kWh || "0"),
                }
            }).reduce((prev, curr) => {
                return {
                    MinKWH: prev.MinKWH + curr.MinKWH,
                    MaxKWH: prev.MaxKWH + curr.MaxKWH,
                    CurrentKHW: prev.CurrentKHW + curr.CurrentKHW,
                    OutletSavingKHW: prev.OutletSavingKHW + curr.OutletSavingKHW,
                }
            }, {
                MinKWH: 0,
                MaxKWH: 0,
                CurrentKHW: 0,
                OutletSavingKHW: 0,
            });
            setTotalKWHs(currentTotalKWHs);

            // Per year calculation
            const currentTotalYearly = currData.filter(dat => {
                const resultDate = moment(dat.outlet_date, 'DD/MM/YYYY');
                const currentDate = moment(lastestLiveDate, 'DD/MM/YYYY');
                return resultDate.diff(currentDate, "years") === 0;
            }).map(dat => {
                return {
                    energy: parseInt(dat.tp_sales_expenses || "0"),
                    co2: parseInt(dat.co2_savings_kg || "0"),
                }
            }).reduce((prev, curr) => {
                return {
                    energy: prev.energy + curr.energy,
                    co2: prev.co2 + curr.co2,
                }
            }, {
                energy: 0,
                co2: 0,
            });

            setTotalPerYear(currentTotalYearly);
        }
    }, [getResultsResult.data]);

    const getOutletsByIdResult = useQuery(getOutletsByGroupIdQuery, getOutletsByGroupIdVariable);
    const getFindFirstLastestReportDateResult = useQuery(getFindFirstLastestReportDateQuery);

    React.useEffect(() => {
        if (getFindFirstLastestReportDateResult.data
            && getFindFirstLastestReportDateResult.data.findFirstLastest_report_date
            && getFindFirstLastestReportDateResult.data.findFirstLastest_report_date.lastest_report_month_year) {
            setLastestLiveDate(getFindFirstLastestReportDateResult.data.findFirstLastest_report_date.lastest_report_month_year);
        } else {
            setLastestLiveDate('');
        }
    }, [getFindFirstLastestReportDateResult.data])

    React.useEffect(() => {
        if (getOutletsByIdResult.data && getOutletsByIdResult.data.findFirstGroup) {
            const currentOutlets: outlet[] = [];
            const group: group | undefined = getOutletsByIdResult.data.findFirstGroup;
            if (group) {
                group.customers && group.customers.forEach(custom => {
                    custom.outlet && custom.outlet.forEach(outlet => {
                        currentOutlets.push(outlet);
                    })
                })
            }
            setOutlets(currentOutlets);
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

    const getHeaderBreadCrumb = React.useMemo(() => {
        return (<h3 className="text-gray-700 text-sm font-bold">
            <div className="flex items-center">
                {
                    title && title.map((titleStr, ind) => {
                        return (
                            <React.Fragment key={uuidv4()} >
                                <span className={`${ind === 0 ? 'text-custom-darkblue' : 'text-custom-gray'}`}>{titleStr}</span>
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
            {
                /**
                 * Checking the dashboard page is outlet or summary
                 */
                currentPage=='outlet' ? 
                /**
                 * outlet page
                 */
                <div>
                    <div className="flex justify-between mb-4 w-1/4 gap-2">
                        <span className={`py-3 px-auto rounded-lg text-sm text-center w-1/2 cursor-pointer ${currentPage == 'summary' ? 'bg-custom-darkblue text-white': 'text-custom-darkblue border-solid border-2'}`} onClick={()=> setCurrentPage('summary')}>Summary</span>
                        <span className={`py-3 px-auto rounded-lg text-sm text-custom-darkblue border-solid text-center border-2 w-1/2 cursor-pointer ${currentPage == 'summary' ? 'text-custom-darkblue border-solid border-2' : 'bg-custom-darkblue text-white'}`} onClick={()=> setCurrentPage('outlet')}>Outlet</span>
                    </div>
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
                        <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                className="align-middle inline-block min-w-full sm:rounded-lg">
                                <ClientOnly>
                                    <div className="grid grid-cols-6 gap-2">
                                        <div className="col-span-2">
                                            <SavingMeterCard date={lastestLiveDate} kiloWatHour={totalKWHs.OutletSavingKHW.toString()} outletId={currentOutlet?.outlet_id} />
                                        </div>
                                        <div className="col-span-4">
                                            <SustainPerformanceCard total={totalPerYear} />
                                        </div>
                                        <div>
                                            <div className="mb-2">
                                                <BenchMarkComparisonCard totalKWHs={totalKWHs} />
                                            </div>
                                            <div>
                                                <EquipmentCard outlet={currentOutlet} latestLiveDate={lastestLiveDate} />
                                            </div>
                                        </div>
                                        {/* <div>
                                            <ExpectedSavingsCard totalKWHs={totalKWHs} />
                                        </div> */}
                                        <div className="col-span-5">
                                            <ChartCard latestLiveDate={lastestLiveDate} currentOutletID={currentOutletID} />
                                        </div>
                                        <div>
                                            {/* <RankAndOutletCard outlets={outlets} /> */}
                                        </div>
                                        <div>
                                            {/* <RemarksCard /> */}
                                        </div>
                                        {/* <div>
                                            <LastAvailableTarifCard date={getLastResultDate} />
                                        </div> */}
                                    </div>
                                </ClientOnly>
                            </div>
                        </div>
                    </div>
                </div> : 
                /**
                 * summary page
                 */
                <div>
                    <div className="flex justify-between mb-4 w-1/4 gap-2">
                        <span className={`py-3 px-auto rounded-lg text-sm text-center w-1/2 cursor-pointer ${currentPage == 'summary' ? 'bg-custom-darkblue text-white': 'text-custom-darkblue border-solid border-2'}`} onClick={()=> setCurrentPage('summary')}>Summary</span>
                        <span className={`py-3 px-auto rounded-lg text-sm text-custom-darkblue border-solid text-center border-2 w-1/2 cursor-pointer ${currentPage == 'summary' ? 'text-custom-darkblue border-solid border-2' : 'bg-custom-darkblue text-white'}`} onClick={()=> setCurrentPage('outlet')}>Outlet</span>
                    </div>
                    {/**
                     * Group Div
                     */}
                    <div className="flex justify-between h-full">
                        <div>
                            <span className='text-custom-darkblue font-bold text-sm'>Group</span>
                            <FontAwesomeIcon className="px-2 text-custom-gray text-sm" icon={faAngleRight} />
                            <span className='text-custom-grey text-sm'>KFC</span>
                        </div>
                        <div className="flex justify-between h-full gap-4">
                            <select id="countries" className="bg-neutral-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                <option selected>Month</option>
                                <option value="US">January</option>
                                <option value="CA">February</option>
                                <option value="FR">March</option>
                                <option value="DE">April</option>
                                <option value="DE">May</option>
                                <option value="DE">June</option>
                                <option value="DE">July</option>
                                <option value="DE">August</option>
                                <option value="DE">September</option>
                                <option value="DE">October</option>
                                <option value="DE">November</option>
                                <option value="DE">December</option>
                            </select>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected>Year</option>
                                <option value="US">1997</option>
                                <option value="CA">1998</option>
                                <option value="FR">1999</option>
                                <option value="DE">2000</option>
                                <option value="DE">2001</option>
                                <option value="DE">2002</option>
                                <option value="DE">2003</option>
                                <option value="DE">2004</option>
                                <option value="DE">2005</option>
                                <option value="DE">2006</option>
                                <option value="DE">2007</option>
                                <option value="DE">2008</option>
                                <option value="DE">2009</option>
                                <option value="DE">2010</option>
                                <option value="DE">2011</option>
                                <option value="DE">2012</option>
                                <option value="DE">2013</option>
                                <option value="DE">2014</option>
                                <option value="DE">2015</option>
                                <option value="DE">2016</option>
                                <option value="DE">2017</option>
                                <option value="DE">2018</option>
                                <option value="DE">2019</option>
                                <option value="DE">2020</option>
                                <option value="DE">2021</option>
                                <option value="DE">2022</option>
                                <option value="DE">2023</option>
                            </select>
                        </div>
                    </div>
                    {/**
                     * Energy card Div
                     */}
                    <div className="flex gap-4 my-4">
                        {/**
                         * Live outlet card
                         */}
                        <div className="w-1/5">
                            <LiveOutletCard />
                        </div>
                        <div className="flex justify-between gap-2 h-full w-2/3">
                            <EquipmentEnergyCard />
                        </div>
                        <div className="flex justify-between gap-2 h-full w-2/3">
                            <SavingEnergyCard />
                        </div>
                    </div>
                    {
                        /**
                         * 4 cards
                         */
                    }
                    <div className="flex gap-4 justify-between">
                        <YearlyEnergyCard Svg="/asserts/energy.png" Value="$22,793 Energy" Year="Saved / Year" BgColor="bg-blue-200" TextColor="text-blue-500"/>
                        <YearlyEnergyCard Svg="/asserts/greycarbondioxide.svg" Value="89,000 kg CO2" Year="Saved / Year" BgColor="bg-grey-600" TextColor="text-gray-400/50"/>
                        <YearlyEnergyCard Svg="/asserts/bigtree.svg" Value="1,400 Trees" Year="to be planted / Year" BgColor="bg-green-200" TextColor="text-green-600"/>
                        <YearlyEnergyCard Svg="/asserts/meals.png" Value="24.000 Meals" Year="to be sold / Year" BgColor="bg-orange-200" TextColor="text-orange-400"/>
                    </div>
                </div>
            }
            


        </React.Fragment>

    )
}

export default Dashboard;