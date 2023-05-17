import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { dateValueForQuery, numberWithCommas, zeroPad } from '../common/helper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import moment from 'moment';
import { customer, group, invoice, outlet, results } from "../common/types";
import { BenchMarkComparisonCard, ChartCard, EqptEnergyBaseline, EquipmentCard, EquipmentEnergyCard, LiveOutletCard, RankAndOutletCard, RemarksCard, SavingEnergyCard, SavingMeterCard, SavingPerformance, SustainPerformanceCard, ValueFirstCard, YearlyEnergyCard } from "./CardContent";
import ClientOnly from "./ClientOnly";
import { v4 as uuidv4 } from 'uuid';
import CustomSelect from "./cardcomponents/CustomSelect";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ({ groupId }: any): JSX.Element => {
    const [currentCustomerID, setCurrentCustomerID] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState<String>('outlet');
    const [lastestLiveDate, setLastestLiveDate] = React.useState('');
    const [outlets, setOutlets] = React.useState<outlet[]>([]);
    const [currentOutlet, setCurrentOutlet] = React.useState<outlet>();
    const [currentOutletID, setCurrentOutletID] = React.useState("");
    const [currentInvoice, setCurrentInvoice] = React.useState<invoice>();
    const [title, setTitle] = React.useState(["Outlet", ""]);
    const [group, setGroup] = React.useState("");
    //summary result
    const [summaryResults, setSummaryResults] = React.useState({
        usageKwWithTP: 0,
        usageExpenseWithTP: 0,
        usageKwWOTP: 0,
        usageExpenseWOTP: 0,
        measureKw: 0,
        measureExpense: 0,
        tariffExpense: 0,
        energySaving: 0,
        co2Saving: 0,
        tariffKWH: 0,
    })

    const [selectedMonth, setSelectedMonth] = React.useState(moment().format('MM'));
    const [selectedYear, setSelectedYear] = React.useState("2023");
    const [totalKWHs, setTotalKWHs] = React.useState<{
        MinKWH: number,
        MaxKWH: number,
        CurrentKHW: number,
        OutletSavingKHW: number,
        SavingTariff: number,
    }>({
        MinKWH: 0,
        MaxKWH: 0,
        CurrentKHW: 0,
        OutletSavingKHW: 0,
        SavingTariff: 0,
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
    //summary results query and variable
    const findFirstGroupSummaryVariable = {
        "variables": {
            "where": {
                "group_id": {
                    "equals": groupId
                }
            },
            ...(selectedMonth !== 'All' || selectedYear !== 'All') && {
                "resultsWhere2": {
                    "outlet_date": {
                        "contains": dateValueForQuery(selectedMonth, selectedYear)
                    }
                }
            },

            ...(selectedMonth !== 'All' || selectedYear !== 'All') && {
                "outletMonthWhere2": {
                    "outlet_date": {
                        "contains": dateValueForQuery(selectedMonth, selectedYear)
                    }
                }
            },
        }
    }

    const findFirstGroupSummaryQuery = gql`
    query Query($where: GroupWhereInput, $resultsWhere2: ResultsWhereInput, $outletMonthWhere2: Outlet_monthWhereInput) {
        findFirstGroup(where: $where) {
          group_id
          group_name
          customers {
            outlet {
              results(where: $resultsWhere2) {
                outlet_eqpt_energy_usage_without_TP_month_kW
                outlet_eqpt_energy_usage_without_TP_month_expenses
                outlet_eqpt_energy_usage_with_TP_month_kW
                outlet_eqpt_energy_usage_with_TP_month_expenses
                outlet_measured_savings_kWh
                outlet_measured_savings_expenses
                savings_tariff_expenses
                tp_sales_expenses
                co2_savings_kg
              }
              outlet_month(where: $outletMonthWhere2) {
                last_avail_tariff
              }
            }
          }
        }
      }`

    const getSummaryResult = useQuery(findFirstGroupSummaryQuery, findFirstGroupSummaryVariable)

    //useEffect hook for summary result 
    React.useEffect(() => {
        if (getSummaryResult.data) {
            const outletList = getSummaryResult.data.findFirstGroup.customers[0].outlet;

            //temp value for results
            let tempUsageKwWithTP = 0
            let tempUsageExpenseWithTP = 0
            let tempUsageKwWOTP = 0
            let tempUsageExpenseWOTP = 0
            let tempMeasureKw = 0
            let tempMeasureExpense = 0
            let tempTariffExpense = 0
            let tempEnergySaving = 0
            let tempCo2Saving = 0
            let tempSavingTariff = 0

            //Sum up all the values from results of outlets
            outletList.forEach((outlet: any) => {
                if (outlet.results.length > 0) {
                    tempUsageKwWithTP += (outlet.results[0].outlet_eqpt_energy_usage_with_TP_month_kW as String ? parseInt(outlet.results[0].outlet_eqpt_energy_usage_with_TP_month_kW) : 0)
                    tempUsageExpenseWithTP += (outlet.results[0].outlet_eqpt_energy_usage_with_TP_month_expenses as String ? parseInt(outlet.results[0].outlet_eqpt_energy_usage_with_TP_month_expenses) : 0)
                    tempUsageKwWOTP += (outlet.results[0].outlet_eqpt_energy_usage_without_TP_month_kW as String ? parseInt(outlet.results[0].outlet_eqpt_energy_usage_without_TP_month_kW) : 0)
                    tempUsageExpenseWOTP += (outlet.results[0].outlet_eqpt_energy_usage_without_TP_month_expenses as String ? parseInt(outlet.results[0].outlet_eqpt_energy_usage_without_TP_month_expenses) : 0)
                    tempMeasureKw += (outlet.results[0].outlet_measured_savings_kWh as String ? parseInt(outlet.results[0].outlet_measured_savings_kWh) : 0)
                    tempMeasureExpense += (outlet.results[0].outlet_measured_savings_expenses as String ? parseInt(outlet.results[0].outlet_measured_savings_expenses) : 0)
                    tempTariffExpense += (outlet.results[0].savings_tariff_expenses as String ? parseInt(outlet.results[0].savings_tariff_expenses) : 0)
                    tempEnergySaving += (outlet.results[0].tp_sales_expenses as String ? parseInt(outlet.results[0].tp_sales_expenses) : 0)
                    tempCo2Saving += (outlet.results[0].co2_savings_kg as String ? parseInt(outlet.results[0].co2_savings_kg) : 0)
                }

                if (outlet.outlet_month.length > 0) {
                    outlet.outlet_month.forEach((month: any) => {
                        tempSavingTariff += Number(month.last_avail_tariff);
                    })

                }
            })

            let tempResult = {
                usageKwWithTP: tempUsageKwWithTP,
                usageExpenseWithTP: tempUsageExpenseWithTP,
                usageKwWOTP: tempUsageKwWOTP,
                usageExpenseWOTP: tempUsageExpenseWOTP,
                measureKw: tempMeasureKw,
                measureExpense: tempMeasureExpense,
                tariffExpense: tempTariffExpense,
                energySaving: tempEnergySaving,
                co2Saving: tempCo2Saving,
                tariffKWH: tempSavingTariff
            }

            setSummaryResults(result => ({
                ...summaryResults,
                ...tempResult
            }))
        }
    }, [selectedMonth, selectedYear, getSummaryResult]);

    const getInvoiceQuery = gql`
    query FindFirstInvoice($where: InvoiceWhereInput) {
        findFirstInvoice(where: $where) {
          year
          month
          last_available_tariff
          invoice_id
        }
      }`;

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
          savings_tariff_expenses
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
    //Group Query by Id
    const getGroupQuery = gql`query Fetchgroup($GroupWhereUniqueInput: GroupWhereUniqueInput!) {
        group (where: $GroupWhereUniqueInput){
            group_id,
            group_name
        }
         
     }`

    const getGroupVariable = {
        "variables":
        {
            "GroupWhereUniqueInput": { "group_id": groupId }
        }
    }

    //Select the month function

    const handleMonthSelect = (event: any) => {
        setSelectedMonth(event.target.value)
    }

    //Select the year function
    const handleYearSelect = (event: any) => {
        setSelectedYear(event.target.value)
    }

    const getResultsResult = useQuery(getResultsQuery, getResultsVariable);
    const getInvoice = useLazyQuery(getInvoiceQuery);

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
                    SavingTariff: parseInt(dat.savings_tariff_expenses || "0"),
                }
            }).reduce((prev, curr) => {
                return {
                    MinKWH: prev.MinKWH + curr.MinKWH,
                    MaxKWH: prev.MaxKWH + curr.MaxKWH,
                    CurrentKHW: prev.CurrentKHW + curr.CurrentKHW,
                    OutletSavingKHW: prev.OutletSavingKHW + curr.OutletSavingKHW,
                    SavingTariff: prev.SavingTariff + curr.SavingTariff
                }
            }, {
                MinKWH: 0,
                MaxKWH: 0,
                CurrentKHW: 0,
                OutletSavingKHW: 0,
                SavingTariff: 0,
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
    }, [getFindFirstLastestReportDateResult.data]);

    React.useEffect(() => {
        if (lastestLiveDate) {
            const latestLiveDateInMoment = moment(lastestLiveDate, 'DD/MM/YYYY');
            getInvoice[0]({
                "variables": {
                    "where": {
                        "month": {
                            "equals": zeroPad(latestLiveDateInMoment.month() + 1, 2).toString()
                        },
                        "year": {
                            "equals": latestLiveDateInMoment.year().toString()
                        }
                    }
                }
            }).then((res) => {
                if (res.data && res.data.findFirstInvoice) {
                    setCurrentInvoice(res.data.findFirstInvoice);
                }
            });
        }
    }, [lastestLiveDate])

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

    const getGroupByIdResult = useQuery(getGroupQuery, getGroupVariable)
    React.useEffect(() => {
        if (getGroupByIdResult.data) {
            setGroup(getGroupByIdResult.data.group.group_name)
        }
    }, [getGroupByIdResult.data])

    return (
        <React.Fragment>
            {
                /**
                 * Checking the dashboard page is outlet or summary
                 */
                currentPage == 'outlet' ?
                    /**
                     * outlet page
                     */
                    <div>
                        <div className="flex justify-between w-1/4 gap-2 mb-[50px]">
                            <span className={`py-3 px-auto rounded-lg text-sm text-center w-1/2 cursor-pointer ${currentPage === 'summary' ? 'bg-custom-darkblue text-white' : 'text-custom-darkblue border-solid border-2'}`} onClick={() => setCurrentPage('summary')}>Summary</span>
                            <span className={`py-3 px-auto rounded-lg text-sm text-custom-darkblue border-solid text-center border-2 w-1/2 cursor-pointer ${currentPage == 'summary' ? 'text-custom-darkblue border-solid border-2' : 'bg-custom-darkblue text-white'}`} onClick={() => setCurrentPage('outlet')}>Outlet</span>
                        </div>
                        <div className="flex justify-between h-full mb-[50px]">
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
                                            <div className="flex flex-col gap-y-2">
                                                <div>
                                                    <BenchMarkComparisonCard totalKWHs={totalKWHs} />
                                                </div>
                                                <div>
                                                    <EquipmentCard outlet={currentOutlet} latestLiveDate={lastestLiveDate} />
                                                </div>
                                                <div>
                                                    <ValueFirstCard title={'Last Available Tariff'} subTitle={`As of ${lastestLiveDate}`} value={`$${numberWithCommas(Number(currentInvoice?.last_available_tariff || '0'))}`} valueColor={'custom-blue-card-font'} />
                                                </div>
                                                <div>
                                                    <ValueFirstCard title={'Savings @ Tariff'} subTitle={`$${Number(currentInvoice?.last_available_tariff || '0')}`} value={`$${numberWithCommas(totalKWHs.SavingTariff)}`} valueColor={'custom-green-card-font'} />
                                                </div>
                                            </div>
                                            {/* <div>
                                            <ExpectedSavingsCard totalKWHs={totalKWHs} />
                                        </div> */}
                                            <div className="col-span-5">
                                                <ChartCard latestLiveDate={lastestLiveDate} currentOutletID={currentOutletID} />
                                            </div>
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
                            <span className={`py-3 px-auto rounded-lg text-sm text-center w-1/2 cursor-pointer ${currentPage == 'summary' ? 'bg-custom-darkblue text-white' : 'text-custom-darkblue border-solid border-2'}`} onClick={() => setCurrentPage('summary')}>Summary</span>
                            <span className={`py-3 px-auto rounded-lg text-sm text-custom-darkblue border-solid text-center border-2 w-1/2 cursor-pointer ${currentPage == 'summary' ? 'text-custom-darkblue border-solid border-2' : 'bg-custom-darkblue text-white'}`} onClick={() => setCurrentPage('outlet')}>Outlet</span>
                        </div>
                        {/**
                     * Group Div
                     */}
                        <div className="flex justify-between h-full mt-10">
                            <div>
                                <span className='text-custom-darkblue font-bold text-sm'>Group</span>
                                <FontAwesomeIcon className="px-2 text-custom-gray text-sm" icon={faAngleRight} />
                                <span className='text-custom-gray text-sm font-bold'>{group}</span>
                            </div>
                            <div className="flex justify-between h-full gap-4">
                                <select id="months" value={selectedMonth} onChange={handleMonthSelect} className="bg-neutral-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                    <option value="All">Month</option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select id="years" value={selectedYear} onChange={handleYearSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="All">Year</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                </select>
                            </div>
                        </div>
                        {/**
                     * Energy card Div
                     * usageKwWithTP: tempUsageKwWithTP,
                usageExpenseWithTP: tempUsageExpenseWithTP,
                usageKwWOTP: tempUsageKwWOTP,
                usageExpenseWOTP: tempUsageExpenseWOTP,
                measureKw: tempMeasureKw,
                measureExpense: tempMeasureExpense,
                tariffExpense: tempTariffExpense,
                energySaving: tempEnergySaving,
                co2Saving: tempCo2Saving
                     */}
                        <div className="flex gap-4 my-4">
                            {/**
                         * Live outlet card
                         */}
                            <div className="w-1/5">
                                <LiveOutletCard Value={outlets.length} />
                            </div>
                            <div className="flex justify-between gap-2 h-full w-2/3">
                                <EquipmentEnergyCard WithTableExpense={numberWithCommas(summaryResults.usageExpenseWithTP)} WithTableKw={numberWithCommas(summaryResults.usageKwWithTP)} WithoutTableExpense={numberWithCommas(summaryResults.usageExpenseWOTP)} WithoutTableKw={numberWithCommas(summaryResults.usageKwWOTP)} />
                            </div>
                            <div className="flex justify-between gap-2 h-full w-2/3">
                                <SavingEnergyCard MeasureKw={numberWithCommas(summaryResults.measureKw)} MeasureExpense={numberWithCommas(summaryResults.measureExpense)} TariffExpense={numberWithCommas(summaryResults.tariffExpense)} TariffKw={numberWithCommas(summaryResults.tariffKWH)} />
                            </div>
                        </div>
                        {
                            /**
                             * 4 cards
                             */
                        }
                        <div className="flex gap-5 justify-between">
                            <YearlyEnergyCard Svg="/asserts/energy-icon.png" Prefix="$" Value={numberWithCommas(summaryResults.energySaving)} Postfix="Energy" Year="Saved / Year" BgColor="bg-blue-200" TextColor="text-custom-blue-card-font" Height="90" Width="90" />
                            <YearlyEnergyCard Svg="/asserts/carbondioxide.png" Value={numberWithCommas(summaryResults.co2Saving)} Postfix="Kg CO" SmallPostfix="2" Year="Saved / Year" BgColor="bg-gray-200" TextColor="text-custom-gray" Height="150" Width="150" />
                            <YearlyEnergyCard Svg="/asserts/bigtree.png" Value={numberWithCommas(Math.round(summaryResults.co2Saving / 22))} Postfix="Trees" Year="to be planted / Year" BgColor="bg-green-200" TextColor="text-custom-green-card-font" Height="150" Width="150" />
                            <YearlyEnergyCard Svg="/asserts/meals.png" Value={numberWithCommas(summaryResults.co2Saving * 2)} Postfix="Meals" Year="to be sold / Year" BgColor="bg-orange-200" TextColor="text-custom-orange-card-font" Height="150" Width="150" />
                        </div>
                    </div>
            }



        </React.Fragment>

    )
}

export default Dashboard;