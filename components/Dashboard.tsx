import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { dateValueForQuery, getMonths, numberWithCommas, zeroPad } from '../common/helper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import moment from 'moment';
import { customer, global_input, group, invoice, outlet, outlet_month, results } from "../common/types";
import { BenchMarkComparisonCard, ChartCard, EqptEnergyBaseline, EquipmentCard, EquipmentEnergyCard, LiveOutletCard, RankAndOutletCard, RemarksCard, SavingEnergyCard, SavingMeterCard, SavingPerformance, SustainPerformanceCard, ValueFirstCard, YearlyEnergyCard } from "./CardContent";
import ClientOnly from "./ClientOnly";
import { v4 as uuidv4 } from 'uuid';
import CustomSelect from "./cardcomponents/CustomSelect";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ({ groupId }: any): JSX.Element => {
    const [currentCustomerID, setCurrentCustomerID] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState<String>('summary');
    const [lastestLiveDate, setLastestLiveDate] = React.useState('');
    const [outlets, setOutlets] = React.useState<outlet[]>([]);
    const [latestOutlets, setLatestOutlets] = React.useState<outlet[]>([]);
    const [currentOutlet, setCurrentOutlet] = React.useState<outlet>();
    const [currentOutletID, setCurrentOutletID] = React.useState("");
    const [currentInvoice, setCurrentInvoice] = React.useState<invoice>();
    const [globalSetting, setGlobalSetting] = React.useState<global_input>();
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

    const [selectedMonth, setSelectedMonth] = React.useState('01');
    const [selectedYear, setSelectedYear] = React.useState('2022');
    const [totalKWHs, setTotalKWHs] = React.useState<{
        MinKWH: number,
        MaxKWH: number,
        CurrentKHW: number,
        OutletSavingKHW: number,
        SavingTariff: number,
        LastAvailTariff: number,
    }>({
        MinKWH: 0,
        MaxKWH: 0,
        CurrentKHW: 0,
        OutletSavingKHW: 0,
        SavingTariff: 0,
        LastAvailTariff: 0,
    });

    const [totalPerYear, setTotalPerYear] = React.useState<{
        energy: number,
        co2: number,
    }>({
        energy: 0,
        co2: 0
    });

    const getGlobalInputQuery = gql`
    query Global_input($where: Global_inputWhereUniqueInput!) {
        global_input(where: $where) {
          poss_tariff_increase
        }
      }`;


    const getFindFirstLastestReportDateQuery = gql`
    query FindFirstLastest_report_date {
        findFirstLastest_report_date {
          date_id
          lastest_report_month_year
        }
      }
    `;

    const getOutletsBySelectedDateQuery = gql`
    query Outlet_months($where: Outlet_monthWhereInput, $where2: ResultsWhereInput, $where3: First_intermediary_tableWhereInput) {
        outlet_months(where: $where) {
            last_avail_tariff
            outlet {
                outlet_id
                  name
                  customer_id
                  outlet_device_live_date {
                    outlet_id
                    outlet_date
                  }
                  outlet_device_ac_input {
                    device_num
                  }
                  outlet_device_ex_fa_input {
                    device_num
                  }
                  first_intermediary_table(where: $where3) {
                    ke_baseline_kW
                    ac_baseline_kWh
                  }
                  results(where: $where2) {
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
      }`;

    const getGlobalInputVariable = {
        "variables": {
            "where": {
                "global_input_id": 1
            }
        }
    }

    const getOutletsBySelectedDateVariable = {
        "variables": {
            "where": {
                "outlet_date": {
                    "contains": `${selectedMonth}/${selectedYear}`
                }
            },
            "where2": {
                "outlet_date": {
                    "contains": `${selectedMonth}/${selectedYear}`
                }
            },
            "where3": {
                "outlet_month_year": {
                    "equals": `${selectedMonth}/${selectedYear}`
                },
                "day_of_month": {
                    "equals": '1'
                }
            }
        }
    };

    const getOutletsByLatestDateVariable = {
        "variables": {
            "where": {
                "outlet_date": {
                    "contains": lastestLiveDate
                }
            },
            "where2": {
                "outlet_date": {
                    "contains": lastestLiveDate
                }
            },
            "where3": {
                "outlet_month_year": {
                    "equals": lastestLiveDate
                },
                "day_of_month": {
                    "equals": '1'
                }
            }
        }
    };
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
              outlet_id
              name
              results(where: $resultsWhere2) {
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
                outlet_id
                outlet_date
              }
              outlet_month(where: $outletMonthWhere2) {
                last_avail_tariff
              }
            }
          }
        }
      }`

    const getSummaryResult = useQuery(findFirstGroupSummaryQuery, findFirstGroupSummaryVariable);
    const getGlobalInputResult = useQuery(getGlobalInputQuery, getGlobalInputVariable);

    //useEffect hook for summary result 
    React.useEffect(() => {
        if (getSummaryResult.data) {

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
            let tempOutlets: outlet[] = [];

            getSummaryResult.data.findFirstGroup.customers.forEach((customer: any) => {

                const outletList = customer.outlet;
                //Sum up all the values from results of outlets
                tempOutlets = [
                    ...tempOutlets,
                    ...outletList
                ]
                outletList.forEach((outlet: any) => {
                    if (outlet.results.length > 0) {
                        //
                        outlet.results.forEach((result: any) => {
                            if (result) {
                                tempUsageKwWithTP += (result.outlet_eqpt_energy_usage_with_TP_month_kW as String ? parseFloat(result.outlet_eqpt_energy_usage_with_TP_month_kW) : 0)
                                tempUsageExpenseWithTP += (result.outlet_eqpt_energy_usage_with_TP_month_expenses as String ? parseFloat(result.outlet_eqpt_energy_usage_with_TP_month_expenses) : 0)
                                tempUsageKwWOTP += (result.outlet_eqpt_energy_usage_without_TP_month_kW as String ? parseFloat(result.outlet_eqpt_energy_usage_without_TP_month_kW) : 0)
                                tempUsageExpenseWOTP += (result.outlet_eqpt_energy_usage_without_TP_month_expenses as String ? parseFloat(result.outlet_eqpt_energy_usage_without_TP_month_expenses) : 0)
                                tempMeasureKw += (result.outlet_measured_savings_kWh as String ? parseFloat(result.outlet_measured_savings_kWh) : 0)
                                tempMeasureExpense += (result.outlet_measured_savings_expenses as String ? parseFloat(result.outlet_measured_savings_expenses) : 0)
                                tempTariffExpense += (result.savings_tariff_expenses as String ? parseFloat(result.savings_tariff_expenses) : 0)
                                tempEnergySaving += (result.tp_sales_expenses as String ? parseFloat(result.tp_sales_expenses) : 0)
                                tempCo2Saving += (result.co2_savings_kg as String ? parseFloat(result.co2_savings_kg) : 0)
                            }

                            console.log(tempUsageKwWithTP, result.outlet_eqpt_energy_usage_with_TP_month_kW, result.outlet_id, result.outlet_date);

                        })

                    }

                    if (outlet.outlet_month.length > 0) {
                        outlet.outlet_month.forEach((month: any) => {
                            tempSavingTariff += Number(month.last_avail_tariff);
                        })

                    }
                })
            });

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

    React.useEffect(() => {
        if (getGlobalInputResult.data) {
            setGlobalSetting(getGlobalInputResult.data.global_input);
        }
    }, [getGlobalInputResult]);

    const getInvoiceQuery = gql`
    query FindFirstInvoice($where: InvoiceWhereInput) {
        findFirstInvoice(where: $where) {
          year
          month
          last_available_tariff
          invoice_id
        }
      }`;

    const getOutletQuery = gql`
    query FindFirstOutlet($where: Outlet_monthWhereInput, $resultsWhere2: ResultsWhereInput, $findFirstOutletWhere2: OutletWhereInput) {
        findFirstOutlet(where: $findFirstOutletWhere2) {
          name
          outlet_device_live_date {
            outlet_id
            outlet_date
          }
          results(where: $resultsWhere2) {
            outlet_id
            outlet_date
            ke_baseline_factor_rg3
            ac_baseline_factor_rg3
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
            ke_and_ac_10percent_benchmark_comparison_kWh
            ke_and_ac_10percent_benchmark_comparison_expenses
            monday
            tuesday
            wednesday
            thursday
            friday
            saturday
            sunday
            holiday
          }
          outlet_month(where: $where) {
            outlet_date
            outlet_outlet_id
            percent_share_of_savings
            last_avail_tariff
            tariff_month
            no_of_ex_in_outlet
            no_of_fa_in_outlet
            no_of_ac_in_outlet
            no_of_ex_installed
            no_of_fa_installed
            no_of_ac_installed
            remarks_on_eqpt_in_outlet_or_installed
            remarks_on_overall_outlet
          }
        }
      }
    `;
    const getOutletVariable = {
        "variables": {
            "where": {
                "outlet_date": {
                    "contains": moment().year().toString()
                },
                "outlet_outlet_id": {
                    "equals": Number(currentOutletID)
                }
            },
            "resultsWhere2": {
                "outlet_date": {
                    "contains": moment().year().toString()
                },
                "outlet_id": {
                    "equals": Number(currentOutletID)
                }
            },
            "findFirstOutletWhere2": {
                "outlet_id": {
                    "equals": Number(currentOutletID)
                }
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

    const getOutletResult = useQuery(getOutletQuery, getOutletVariable);
    const getInvoice = useLazyQuery(getInvoiceQuery);

    React.useEffect(() => {
        if (getOutletResult.data && getOutletResult.data.findFirstOutlet) {

            const currData = getOutletResult.data.findFirstOutlet.results as results[];
            const currOutletMonth = getOutletResult.data.findFirstOutlet.outlet_month as outlet_month[];

            // Per month calculation
            const currentTotalKWHs = currData.filter(dat => {
                const resultDate = moment(dat.outlet_date, 'DD/MM/YYYY');
                const currentDate = moment(lastestLiveDate, 'MM/YYYY');
                return resultDate.diff(currentDate) <= 0;
            }).map(dat => {
                const resultDate = moment(dat.outlet_date, 'DD/MM/YYYY');
                const currentDate = moment(lastestLiveDate, 'MM/YYYY');
                const diff = resultDate.diff(currentDate);
                return {
                    MinKWH: diff === 0 ? parseFloat(dat.acmv_10percent_benchmark_comparison_kWh || "0") : 0,
                    MaxKWH: diff === 0 ? parseFloat(dat.acmv_25percent_benchmark_comparison_kWh || "0") : 0,
                    CurrentKHW: diff === 0 ? parseInt(dat.acmv_measured_savings_kWh || "0") : 0,
                    OutletSavingKHW: diff <= 0 ? parseFloat(dat.outlet_measured_savings_kWh || "0") : 0,
                    SavingTariff: diff === 0 ? parseFloat(dat.savings_tariff_expenses || "0") : 0
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

            const currentTotalKWHsWithOM = currOutletMonth.filter(dat => {
                const resultDate = moment(dat.outlet_date, 'DD/MM/YYYY');
                const currentDate = moment(lastestLiveDate, 'MM/YYYY');
                return resultDate.diff(currentDate) == 0;
            }).map(dat => {
                return {
                    LastAvailTariff: Number(dat.last_avail_tariff || "0") || 0
                }
            }).reduce((prev, curr) => {
                return {
                    LastAvailTariff: prev.LastAvailTariff + curr.LastAvailTariff
                }
            }, {
                LastAvailTariff: 0,
            });

            setTotalKWHs({
                ...currentTotalKWHs,
                ...currentTotalKWHsWithOM
            });

            // Per year calculation
            const currentTotalYearly = currData.filter(dat => {
                const resultDate = moment(dat.outlet_date, 'DD/MM/YYYY');
                const currentDate = moment(lastestLiveDate, 'MM/YYYY');
                return resultDate.diff(currentDate, "years") === 0;
            }).map(dat => {
                return {
                    energy: parseFloat(dat.outlet_measured_savings_expenses || "0"),
                    co2: parseFloat(dat.co2_savings_kg || "0"),
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
    }, [getOutletResult.data]);

    const getOutletsByIdResult = useQuery(getOutletsBySelectedDateQuery, getOutletsBySelectedDateVariable);
    const getLatestOutletsResult = useQuery(getOutletsBySelectedDateQuery, getOutletsByLatestDateVariable);
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
            const latestLiveDateInMoment = moment(lastestLiveDate, 'MM/YYYY');
            setSelectedMonth(latestLiveDateInMoment.format('MM'));
            setSelectedYear(latestLiveDateInMoment.format('YYYY'));
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
        if (getOutletsByIdResult.data && getOutletsByIdResult.data.outlet_months) {
            const currentOutlets: outlet[] = [];
            const outletmonths: outlet_month[] | undefined = getOutletsByIdResult.data.outlet_months;
            if (outletmonths) {
                outletmonths.forEach(month => {
                    month.outlet && currentOutlets.push(month.outlet);
                })
            }
            // Ping
            setOutlets(currentOutlets);
        } else {
            setOutlets([]);
        }
    }, [getOutletsByIdResult.data])

    React.useEffect(() => {
        if (getLatestOutletsResult.data && getLatestOutletsResult.data.outlet_months) {
            const currentOutlets: outlet[] = [];
            const outletmonths: outlet_month[] | undefined = getLatestOutletsResult.data.outlet_months;
            if (outletmonths) {
                outletmonths.forEach(month => {
                    month.outlet && currentOutlets.push(month.outlet);
                })
            }
            // Ping
            setLatestOutlets(currentOutlets);
        } else {
            setLatestOutlets([]);
        }
    }, [getLatestOutletsResult.data])

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
        if (latestOutlets.length > 0) {
            setTitle(["Outlet", latestOutlets[0].name]);
            if (currentOutletID === "") {
                setCurrentOutletID(latestOutlets[0].outlet_id.toString());
            }
            setCurrentOutlet(latestOutlets[0]);
        }
    }, [latestOutlets])

    const getSavingMeterFirstDate = React.useMemo(() => {
        if (currentOutlet && currentOutlet.outlet_device_live_date) {
            const arrayForSort = [...currentOutlet.outlet_device_live_date];
            const sortedArr = arrayForSort.sort((a, b) => (moment(a.outlet_date, "DD/MM/YYYY") > moment(b.outlet_date, "DD/MM/YYYY")) ? 1 : ((moment(a.outlet_date, "DD/MM/YYYY") < moment(b.outlet_date, "DD/MM/YYYY")) ? -1 : 0));
            return sortedArr.length > 0 ? sortedArr[0].outlet_date : '-';
        } else {
            return '-';
        }

    }, [currentOutlet]);

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
                                const curOut = latestOutlets.find(out => out.outlet_id === Number(val));
                                setCurrentOutlet(curOut);
                                setTitle(["Outlet", curOut?.name || '']);
                            }} selectedValue={currentOutletID} dropdownValue={latestOutlets.map(out => { return { value: out.outlet_id.toString(), display: out.name } })} />
                        </div>

                        <div className="flex flex-col mt-8">
                            <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                                <div
                                    className="align-middle inline-block min-w-full sm:rounded-lg">
                                    <ClientOnly>
                                        <div className="grid grid-cols-6 gap-2">
                                            <div className="col-span-2">
                                                <SavingMeterCard date={moment(lastestLiveDate, 'MM/YYYY').year()} kiloWatHour={totalKWHs.OutletSavingKHW.toFixed(1)} outletId={currentOutlet?.outlet_id} />
                                            </div>
                                            <div className="col-span-4">
                                                <SustainPerformanceCard total={totalPerYear} year={moment(lastestLiveDate, 'MM/YYYY').year()} />
                                            </div>
                                            <div className="flex flex-col gap-y-2">
                                                <div>
                                                    <BenchMarkComparisonCard totalKWHs={totalKWHs} />
                                                </div>
                                                <div>
                                                    <EquipmentCard outlet={currentOutlet} latestLiveDate={lastestLiveDate} />
                                                </div>
                                                <div>
                                                    <ValueFirstCard title={'Last Available Tariff'} subTitle={`As of ${lastestLiveDate}`} value={`$${numberWithCommas(Number(totalKWHs.LastAvailTariff || '0'), 2)}`} valueColor={'custom-blue-card-font'} />
                                                </div>
                                                <div>
                                                    <ValueFirstCard title={'Savings @ Tariff'} subTitle={`$${numberWithCommas(parseFloat(globalSetting?.poss_tariff_increase || '0.00'), 2)}`} value={`$${numberWithCommas(totalKWHs.SavingTariff, 4)}`} valueColor={'custom-green-card-font'} />
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
                                <select id="months" value={selectedMonth} onChange={handleMonthSelect} className="bg-neutral-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[115px] p-2.5 ">
                                    {getMonths(lastestLiveDate, selectedYear).map(mon => {
                                        return <option key={mon.value} value={mon.value}>{mon.display}</option>
                                    })}
                                    {/* <option value="All">Month</option> */}
                                    {/* <option value="01">January</option>
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
                                    <option value="12">December</option> */}
                                </select>
                                <select id="years" value={selectedYear} onChange={handleYearSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    {/* <option value="All">Year</option> */}
                                    {/* <option value="2020">2020</option>
                                    <option value="2021">2021</option> */}
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
                                <SavingEnergyCard MeasureKw={numberWithCommas(summaryResults.measureKw)} MeasureExpense={numberWithCommas(summaryResults.measureExpense)} TariffExpense={numberWithCommas(summaryResults.tariffExpense)} TariffKw={numberWithCommas(Number(globalSetting ? globalSetting.poss_tariff_increase : 0), 4)} />
                            </div>
                        </div>
                        {
                            /**
                             * 4 cards
                             */
                        }
                        <div className="flex gap-5 justify-between">
                            <YearlyEnergyCard Svg="/asserts/3.png" Value={`$` + numberWithCommas(summaryResults.energySaving)} Postfix="Energy" Year="Saved" BgColor="bg-blue-200" TextColor="text-custom-blue-card-font" Height="250" Width="250" />
                            <YearlyEnergyCard Svg="/asserts/2.png" Value={numberWithCommas(summaryResults.co2Saving)} Postfix="Kg CO" SmallPostfix="2" Year="Saved" BgColor="bg-gray-200" TextColor="text-custom-gray" Height="250" Width="250" />
                            <YearlyEnergyCard Svg="/asserts/1.png" Value={numberWithCommas(Math.round(summaryResults.co2Saving / 22))} Postfix="Trees" Year="to be planted" BgColor="bg-green-200" TextColor="text-custom-green-card-font" Height="250" Width="250" />
                            <YearlyEnergyCard Svg="/asserts/4.png" Value={numberWithCommas(summaryResults.co2Saving * 2)} Postfix="Meals" Year="to be sold" BgColor="bg-orange-200" TextColor="text-custom-orange-card-font" Height="250" Width="250" />
                        </div>
                    </div>
            }



        </React.Fragment>

    )
}

export default Dashboard;