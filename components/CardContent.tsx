import React, { ForwardedRef } from 'react';
import Card from "./Card";
import PillButton from "./cardcomponents/PillButton";
import SavingMeterDigits from "./cardcomponents/SavingMeterDigits";
import CardHeader from "./CardHeader";
import Jumbotron from "./cardcomponents/Jumbotron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import ProgressiveMeter from "./cardcomponents/ProgressiveMeter";
import BenchMarkMeter from "./cardcomponents/BenchMarkMeter";
import Notification from "./cardcomponents/Notification";
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
    ScriptableContext
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import CustomizedDropDown from './CustomizedDropDown';
import { DropdownProps, first_intermediary_table, outlet, results, secondary_intermediary_table } from '../common/types';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import moment from 'moment';
import { cloneDeep } from '@apollo/client/utilities';
import { dateValueForQuery, numberWithCommas } from '../common/helper';

// ChartJS.register(...registerablesJS);


ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

interface StatusCardProps {
    Title?: String, disableWidthFull?: boolean, SubTitle?: String, className: string, textClassName?: string, Value: any, Prefix?: String, Postfix?: any, RightSideValue?: any, PostfixDirection?: 'horizontal' | 'vertical',
}

const SavingMeter = ({ date, outletId, kiloWatHour }: any): JSX.Element => {

    const dateComp = () => {
        return (<div className="flex flex-row self-end">
            <span className="text-custom-gray text-sm"> Live as of  <span className="text-sky-600"> {date}</span></span>

        </div>)
    }

    return (
        <div className="grid grid-cols-3 gap-4 place-content-between h-full">
            <CardHeader Titles={['Saving Meter']} SubTitle={dateComp()} />
            <div className="col-span-2 flex flex-row-reverse">
                <SavingMeterDigits numberString={kiloWatHour} description={"Kilo Watt Hour"} />
            </div>

            <div className="flex flex-col col-span-2">
                <span className="text-left text-custom-gray">Outlet ID: {outletId}</span>
                <Image alt="barcode not found" src="/barcode.png" width='500' height="100" />
            </div>
        </div>
    )
}
const SustainPerformance = ({ total }: any): JSX.Element => {

    const outlet_category_iconisation = () => {
        return (
            <div className='flex flex-row gap-x-1 text-xs'>
                <Image alt="barcode not found" src="/burger.png" width='50' height="50" />
                <div className='flex flex-col w-2/3'>
                    <span className='text-xs'>
                        McDonald&apos;s
                    </span>
                    <span className='font-bold text-md text-black'>
                        Quarter Pounder with Cheese Bacon
                    </span>
                </div>

            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex justify-between items-baseline">
                <CardHeader Titles={['Sustainability Performance']} SubTitle={'Accummulative'} />
            </div>
            <div className="lg:grid lg:grid-cols-4 grid grid-cols-2 gap-2">
                <StatusCard PostfixDirection={'vertical'} Title={'Energy Savings/Year'} className='bg-custom-gray-card text-custom-gray-card-font' Value={numberWithCommas(total.energy)} Postfix={'SGD'} RightSideValue={<Image alt="barcode not found" src="/asserts/savings.png" width='50' height='50' />} />
                <StatusCard Title={'CO2 Saved/Year'} className='bg-custom-blue-card text-custom-blue-card-font' Value={numberWithCommas(total.co2)} Postfix={'kg/year'} PostfixDirection={'vertical'} RightSideValue={<Image alt="barcode not found" src="/asserts/carbondioxide.svg" width='50' height='50' />} />
                <StatusCard Title={'Planted Tree/Year'} className='bg-custom-green-card text-custom-green-card-font' Value={numberWithCommas(Math.round(total.co2 / 22))} Postfix={'trees/year'} PostfixDirection={'vertical'} RightSideValue={<Image alt="barcode not found" src="/asserts/tree.svg" width='50' height="50" />} />
                <StatusCard Title={'Meals to be sold/Year'} className='bg-custom-orange-card text-custom-orange-card-font' Value={numberWithCommas(total.energy * 2)} Postfix={'meals'} PostfixDirection={'vertical'} RightSideValue={<Image alt="barcode not found" src="/asserts/meals.png" width='50' height="50" />} />
                {/* <StatusCard Title={'Outlet Category Iconisation'} className='bg-custom-orange-card text-custom-orange-card-font' Value={outlet_category_iconisation()} /> */}

            </div>
        </div>
        // <div className="flex flex-row gap-4 w-full h-full">
        //     <CardHeader Titles={['Sustainability', 'Performance']} SubTitle={'(Accummulative)'} />
        //     <div className="flex-1">
        //         <Jumbotron>
        //             <div className="flex flex-col items-start justify-center h-full">
        //                 <h2 className="font-light text-custom-gray text-2xl">CO2 Saved</h2>
        //                 <div>
        //                     <span className="font-bold text-3xl">0.64</span>
        //                     <span className="font-light text-sm text-custom-gray pl-2">kg</span>
        //                 </div>
        //                 <PillButton className={"bg-pillbtn text-xs"} text={"+ 0.5 kg Lower"} />
        //             </div>
        //         </Jumbotron>
        //     </div>
        //     <div className="flex-1">
        //         <Jumbotron>
        //             <div className="flex flex-row items-center h-full">
        //                 <span className="font-light text-custom-gray text-left">Your Savings is equal to planting</span>
        //                 <div className="flex flex-col justify-center">
        //                     <span className="font-bold text-5xl">5</span>
        //                     <span>Trees</span>
        //                 </div>
        //             </div>
        //         </Jumbotron>
        //     </div>
        // </div>
    )
}

const FastFood = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-4">
            <CardHeader Titles={['Fast-Food']} />
            <div className="flex justify-center">
                <Image src="/burger.png" alt="burger not found" width="106" height="67" />
            </div>
            <div className="flex flex-col items-start">
                <span className="text-xs text-red-500">
                    Mcdonalds
                </span>
                <span className="font-medium">
                    Quarter Pounder with Cheese Bacon
                </span>
            </div>
        </div>
    )
}

const BenchMarkComparison = ({ totalKWHs }: any): JSX.Element => {

    const getBMM = React.useMemo(() => {
        if (totalKWHs) {
            return <BenchMarkMeter MinKWH={{ Percentage: '10', ActualKHW: totalKWHs.MinKWH }}
                MaxKWH={{ Percentage: '25', ActualKHW: totalKWHs.MaxKWH }}
                CurrentKHW={{ Percentage: '17', ActualKHW: totalKWHs.CurrentKHW }} />
        } else {
            return <></>
        }

    }, [totalKWHs])

    return (
        <div className="flex flex-col gap-4 h-3/6">
            <CardHeader Titles={['Benchmark', 'Comparison']} SubTitle={"vs. Industry Peer"} />
            <div className="h-full">
                {getBMM}
            </div>
        </div>
    )
}

// const ExpectedSavings = ({ totalKWHs }: any): JSX.Element => {
//     return (
//         <div className="flex flex-col gap-4 h-full">
//             <CardHeader Titles={['Expected Savings']} SubTitle={"(Current Month)"} />
//             <div className="h-full">
//                 <ProgressiveMeter MaxKWH={totalKWHs.MaxKWH} CurrentKHW={totalKWHs.CurrentKHW} />
//             </div>
//         </div>
//     )
// }

interface Props {
    currentOutletID: string;
    latestLiveDate?: string;
}

export const SavingPerformance = ({ currentOutletID, latestLiveDate }: Props): JSX.Element => {
    const [firstIntermediaryData, setFirstIntermediaryData] = React.useState<first_intermediary_table[]>([]);
    const [selectedSavingPerformanceIndex, setSelectedSavingPerformanceIndex] = React.useState(1);
    const [selectedTab, setSelectedTab] = React.useState<'kwh' | 'saving'>('kwh');

    const [selectedMonth, setSelectedMonth] = React.useState(moment().format('MM'));
    const [selectedYear, setSelectedYear] = React.useState("2023");
    const getFirstIntermediaryQuery = gql`
    query First_intermediary_tables($where: First_intermediary_tableWhereInput) {
        first_intermediary_tables(where: $where) {
          outlet_id
          outlet_month_year
          day_of_month
          ke_baseline_kW
          ke_without_TP_kWh
          ke_with_TP_kWh
          ke_savings_kWh
          ke_savings_expenses
          ac_baseline_kWh
          ac_without_TP_kWh
          ac_with_TP_kWh
          ac_savings_kWh
          ac_savings_expenses
          all_eqpt_without_TP_kWh
          all_eqpt_with_TP_kWh
          total_savings_kWh
          total_savings_expenses
          ke_ops_hours
          ac_op_hours
        }
      }
    `;

    const getFirstIntermediaryResult = useLazyQuery(getFirstIntermediaryQuery);

    const getLastSevenDays = (currentMoment: moment.Moment): moment.Moment[] => {
        const momentDaysArray: moment.Moment[] = [];
        momentDaysArray.push(currentMoment);
        for (var i = 1; i < 7; i++) {
            momentDaysArray.push(currentMoment.clone().subtract(i, 'day'));
        }
        return momentDaysArray;
    }

    const getFirstIntermediaryVariable = React.useMemo(() => {
        let variable = {};
        const currentMoment = moment(latestLiveDate, 'DD/MM/YYYY');
        if (currentOutletID) {

            variable = {
                "variables": {
                    "where": {
                        "AND": [
                            {
                                "outlet_month_year": {
                                    "in": [currentMoment.clone().subtract(1, 'months').format("MM/YYYY"), currentMoment.clone().subtract(2, 'months').format("MM/YYYY"), currentMoment.format("MM/YYYY")]
                                },
                                "outlet_id": {
                                    "equals": parseInt(currentOutletID)
                                }
                            }
                        ],

                        // "outlet_id": {
                        //     "equals": parseInt(currentOutletID)
                        // }

                    }
                }
            };
            // switch (selectedSavingPerformanceIndex) {
            //     case 0: variable = {
            //         "variables": {
            //             "where": {
            //                 "AND": [
            //                     {
            //                         "outlet_month_year": {
            //                             "in": [currentMoment.clone().subtract(1, 'months').format("MM/YYYY"), currentMoment.clone().subtract(2, 'months').format("MM/YYYY"), currentMoment.format("MM/YYYY")]
            //                         },
            //                         "outlet_id": {
            //                             "equals": parseInt(currentOutletID)
            //                         }
            //                     }
            //                 ],

            //                 // "outlet_id": {
            //                 //     "equals": parseInt(currentOutletID)
            //                 // }

            //             }
            //         }
            //     }; break;
            //     case 1: variable = {
            //         "variables": {
            //             "where": {
            //                 "AND": [
            //                     {
            //                         "outlet_month_year": {
            //                             "equals": currentMoment.format("MM/YYYY")
            //                         },
            //                         "outlet_id": {
            //                             "equals": parseInt(currentOutletID)
            //                         }
            //                     }
            //                 ],

            //                 // "outlet_id": {
            //                 //     "equals": parseInt(currentOutletID)
            //                 // }

            //             }
            //         }
            //     }; break;
            //     default: variable = {
            //         "variables": {
            //             "where": {
            //                 "AND": [
            //                     {
            //                         "OR": getLastSevenDays(currentMoment).map(mom => {
            //                             return {
            //                                 "outlet_month_year": {
            //                                     "equals": mom.format("MM/YYYY")
            //                                 },
            //                                 "day_of_month": {
            //                                     "equals": mom.format("D")
            //                                 }
            //                             }
            //                         }),
            //                         "outlet_id": {
            //                             "equals": parseInt(currentOutletID)
            //                         }
            //                     }
            //                 ]
            //             }
            //         }
            //     }; break;
            // }
        }
        return variable;
    }, [currentOutletID, latestLiveDate, selectedSavingPerformanceIndex]);

    React.useEffect(() => {
        if (currentOutletID) {
            console.log(selectedMonth, selectedYear);
            getFirstIntermediaryResult[0]({
                "variables": {
                    "where": {
                        "AND": [
                            {
                                "outlet_month_year": {
                                    "contains": dateValueForQuery(selectedMonth, selectedYear, true)
                                },
                                "outlet_id": {
                                    "equals": parseInt(currentOutletID)
                                }
                            }
                        ],
                    }
                }
            }).then(result => {
                if (result.data && result.data.first_intermediary_tables) {
                    const cloned_first_intermediary_tables = cloneDeep(result.data.first_intermediary_tables);
                    const sortDat = cloned_first_intermediary_tables.sort(function (left: any, right: any) {
                        return moment(left.day_of_month + "/" + left.outlet_month_year, "DD/MM/YYYY").diff(moment(right.day_of_month + "/" + right.outlet_month_year, "DD/MM/YYYY"));
                    });
                    setFirstIntermediaryData(sortDat);
                }
            });
        } else {
            setFirstIntermediaryData([]);
        }

    }, [currentOutletID, selectedSavingPerformanceIndex, selectedMonth, selectedYear]);

    const getChartData = React.useMemo(() => {
        if (selectedTab === 'kwh') {
            return [
                {
                    type: 'line' as const,
                    label: 'Without TablePointer',
                    lineTension: 0,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: 'transparent',
                    data: firstIntermediaryData.map(data => Math.round(parseInt(data.all_eqpt_without_TP_kWh || "0"))),
                },
                {
                    type: 'bar' as const,
                    label: 'Measured Savings',
                    backgroundColor: 'rgb(191 219 254)',
                    data: firstIntermediaryData.map(data => Math.round(parseInt(data.all_eqpt_without_TP_kWh || "0")) - Math.round(parseInt(data.all_eqpt_with_TP_kWh || "0"))),
                    barThickness: 25,
                    order: 3,
                },
                {
                    type: 'bar' as const,
                    label: 'With TablePointer',
                    backgroundColor: 'rgb(96 165 250)',
                    data: firstIntermediaryData.map(data => Math.round(parseInt(data.all_eqpt_with_TP_kWh || "0"))),
                    barThickness: 25,
                    order: 2,
                }

            ]
        } else {
            return [
                {
                    type: 'line' as const,
                    label: 'KE Saving Expenses',
                    lineTension: 0,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: true,
                    // backgroundColor: (context: ScriptableContext<"line">) => {
                    //     const ctx = context.chart.ctx;
                    //     var gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    //     gradient.addColorStop(0, 'rgba(255, 218, 225, 1)');
                    //     gradient.addColorStop(1, 'rgba(255, 255, 255,0)');
                    //     return gradient;
                    // },
                    backgroundColor: 'transparent',
                    data: firstIntermediaryData.map(data => Math.round(parseInt(data.ke_savings_expenses || "0"))),
                },
                {
                    type: 'line' as const,
                    label: 'AC Saving Expenses',
                    lineTension: 0,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: 'transparent',
                    data: firstIntermediaryData.map(data => Math.round(parseInt(data.ac_savings_expenses || "0"))),
                },
                {
                    type: 'line' as const,
                    label: 'Total Saving Expenses',
                    lineTension: 0,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: 'transparent',
                    data: firstIntermediaryData.map(data => Math.round(parseInt(data.total_savings_expenses || "0"))),
                }
            ]
        }
    }, [selectedTab, firstIntermediaryData]);


    const data = () => {
        return (
            {
                labels: [...firstIntermediaryData.map(dat => dat.day_of_month + "/" + dat.outlet_month_year),],
                datasets: getChartData
            }
        )
    }

    const option = {

        plugins: {
            legend: {
                position: 'bottom' as const,
                onClick: function (event: any, elem: any) {
                    // console.log(elem.text);
                },
            }, tooltip: {
                callbacks: {
                    label: function (context: any) {
                        if (context.dataset.label === "Without TablePointer") {
                            return Math.round(parseInt(firstIntermediaryData[context.dataIndex].all_eqpt_without_TP_kWh || '0'))
                        } else {
                            return context.formattedValue;
                        }
                    }
                }
            },
        },
        elements: {
            bar: {
                borderRadius: 30,
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },

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

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
                <div className='flex flex-row gap-x-2 text-xs font-extrabold text-custom-gray'>
                    {/* <button onClick={e => { setSelectedSavingPerformanceIndex(0) }} className={`${selectedSavingPerformanceIndex === 0 ? 'active-sp ' : ''}p-2`}>Last 3 Months</button>
                    <button onClick={e => { setSelectedSavingPerformanceIndex(1) }} className={`${selectedSavingPerformanceIndex === 1 ? 'active-sp ' : ''}p-2`}>Last Month</button>
                    <button onClick={e => { setSelectedSavingPerformanceIndex(2) }} className={`${selectedSavingPerformanceIndex === 2 ? 'active-sp ' : ''}p-2`}>Last Week</button> */}
                    <div className="grid grid-cols-2">
                        <button onClick={(e) => { setSelectedTab('kwh'); }} className={selectedTab === 'kwh' ? "bg-custom-lightblue text-custom-darkblue rounded-r-none rounded-l-lg px-4 py-4" : "bg-gray-100 rounded-r-none rounded-lg px-4 py-4"}>
                            kWh
                        </button>
                        <button onClick={(e) => { setSelectedTab('saving'); }} className={selectedTab === 'saving' ? "bg-custom-lightblue text-custom-darkblue rounded-l-none rounded-r-lg px-4 py-4" : "bg-gray-100 rounded-l-none rounded-lg px-4 py-4"}>
                            $
                        </button>
                    </div>
                </div>
                <div className='flex flex-row gap-x-2 text-xs'>
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
                    {/* <select className={`outline-none px-2 py-1 border-2 rounded-lg h-11`}>
                        <option>Start Date</option>
                        <option>Start Date</option>
                    </select>
                    <select className={`outline-none px-2 py-1 border-2 rounded-lg h-11`}>
                        <option>End Date</option>
                        <option>End Date</option>
                    </select> */}
                </div>

            </div>
            <div>
                <Chart type='bar' data={data()} options={option} />
            </div>
        </div>
    )
}

export const EqptEnergyBaseline = ({ currentOutletID, latestLiveDate }: Props): JSX.Element => {
    // const labels = ['10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14','14.5','15','15.5','16','16.5','17','17.5','18','18.5','19','19.5','20','20.5','21','21.5','22'];
    const [secondaryIntermediary, setSecondIntermediary] = React.useState<secondary_intermediary_table[]>([]);
    const [selectedEqptEnergyIndex, setSelectedEqptEnergyIndex] = React.useState(1);
    const [selectedMonth, setSelectedMonth] = React.useState(moment().format('MM'));
    const [selectedYear, setSelectedYear] = React.useState("2023");
    const currentMoment = moment(latestLiveDate, 'DD/MM/YYYY');
    const getSecondIntermediaryQuery = gql`
    query Secondary_intermediary_tables($where: Secondary_intermediary_tableWhereInput) {
        secondary_intermediary_tables(where: $where) {
          outlet_id
          outlet_month_year
          day_of_month
          time
          ke_without_TP_kWh
          ke_baseline_kW
          ac_without_TP_kWh
          ac_baseline_kW
          acmv_without_TP_kWh
          acmv_baseline_kW
        }
      }`;


    const getSecondIntermediaryResult = useLazyQuery(getSecondIntermediaryQuery);

    React.useEffect(() => {
        if (currentOutletID) {

            let getSecondIntermediaryVariable = {};

            switch (selectedEqptEnergyIndex) {
                case 1: getSecondIntermediaryVariable = {
                    "variables": {
                        "where": {
                            "AND": [
                                {
                                    "outlet_month_year": {
                                        "in": [currentMoment.clone().subtract(1, 'months').format("MM/YYYY"), currentMoment.clone().subtract(2, 'months').format("MM/YYYY"), currentMoment.format("MM/YYYY")]
                                    },
                                    "outlet_id": {
                                        "equals": parseInt(currentOutletID)
                                    }
                                }
                            ],
                            // "outlet_id": {
                            //     "equals": parseInt(currentOutletID)
                            // }
                        }
                    }
                }; break;
                default: getSecondIntermediaryVariable = {
                    "variables": {
                        "where": {
                            "AND": [
                                {
                                    "outlet_month_year": {
                                        "equals": currentMoment.format("MM/YYYY")
                                    },
                                    "outlet_id": {
                                        "equals": parseInt(currentOutletID)
                                    }
                                }
                            ],
                            // "outlet_id": {
                            //     "equals": parseInt(currentOutletID)
                            // }
                        }
                    }
                }; break;
            }
            getSecondIntermediaryResult[0]({
                "variables": {
                    "where": {
                        "AND": [
                            {
                                "outlet_month_year": {
                                    "contains": dateValueForQuery(selectedMonth, selectedYear, true)
                                },
                                "outlet_id": {
                                    "equals": parseInt(currentOutletID)
                                }
                            }
                        ],
                    }
                }
            }).then(result => {
                const cloned_second_intermediary_tables = cloneDeep(result.data.secondary_intermediary_tables);
                const sortDat = cloned_second_intermediary_tables.sort(function (left: any, right: any) {
                    return moment(left.day_of_month + "/" + left.outlet_month_year, "DD/MM/YYYY").diff(moment(right.day_of_month + "/" + right.outlet_month_year, "DD/MM/YYYY"));
                });
                setSecondIntermediary(sortDat);
            })
        } else {
            setSecondIntermediary([]);
        }
    }, [currentOutletID, selectedMonth, selectedYear, selectedEqptEnergyIndex])

    const labels = React.useMemo(() => {
        return secondaryIntermediary.map(data => {
            if (data.time) {
                const splitParts = data.time.split(':');
                if (splitParts[1] === '30') {
                    return splitParts[0] + ".5";
                } else {
                    return splitParts[0];
                }
            }
            return 0;

        });
    }, [secondaryIntermediary])

    const data = () => {
        return (
            {
                labels,
                datasets: [
                    {
                        type: 'line' as const,
                        label: 'Line Dataset',
                        data: secondaryIntermediary.map(data => data.acmv_baseline_kW),
                        backgroundColor: 'rgb(0, 0, 255)',
                        borderColor: 'rgb(0, 0, 255)',
                        pointRadius: 0,
                        xAxisID: 'x2' // Specify to which axes to link
                    },
                    {
                        type: 'scatter' as const,
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderColor: 'rgb(255, 0, 0)',
                        pointStyle: 'cross',
                        rotation: 45,
                        data: secondaryIntermediary.map(data => data.acmv_without_TP_kWh)
                    }
                ],
            }
        )
    }

    const option = {
        plugins: {
            legend: {
                display: false,
            }
        },
        elements: {
            bar: {
                borderRadius: 30,
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                display: true,
                ticks: {
                    display: false
                }
            },
            x2: { // add extra axes
                position: 'bottom' as const,
                // type: 'category',
                grid: {
                    display: false
                },
                display: false,
            },
            y: {
                stacked: true,
                grid: {
                    display: false
                }
            },

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

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end items-baseline">

                {/* <div className='flex flex-row gap-x-2 text-xs font-extrabold text-custom-gray'>
                    <button onClick={e => { setSelectedEqptEnergyIndex(1) }} className={selectedEqptEnergyIndex === 1 ? "bg-custom-lightblue text-custom-darkblue rounded-lg p-2" : "p-2"}>Last 3 Months</button>
                    <button onClick={e => { setSelectedEqptEnergyIndex(2) }} className={selectedEqptEnergyIndex === 2 ? "bg-custom-lightblue text-custom-darkblue rounded-lg p-2" : "p-2"}>Last Month</button>
    </div> */}
                <div className='flex flex-row gap-x-2 text-xs'>
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
            <div className='flex flex-col'>
                <Chart type='scatter' data={data()} options={option} />
                <span className='text-custom-gray self-end'>Valid as of {currentMoment.format('Mo YYYY')}</span>
                <span className='text-custom-gray text-custom-subtitle w-1/3  px-4'>Eqpt. Energy Baseline represents the equipment energy usage over a typical hour without TablePointer, and is continuously and dynamically sampled for statistical best-averaging to ensure validity of time</span>
            </div>
        </div>
    )
}

const CardSwitcher = ({ currentOutletID, latestLiveDate }: Props): JSX.Element => {
    const [selectedCard, setSelectedCard] = React.useState<DropdownProps>({
        display: <CardHeader Titles={['Savings Performance']} />,
        value: 'savingPerformance',
    });

    const titleDropdowns: DropdownProps[] = [
        {
            display: <CardHeader Titles={['Savings Performance']} />,
            value: 'savingPerformance',
        },
        {
            display: <CardHeader Titles={['Eqpt. Energy Baseline']} SubTitleAlign="end" SubTitle={<span className='text-custom-subtitle'>Avg. Hourly</span>} />,
            value: 'energyBaseline',
        }
    ]

    const selectedContent = React.useMemo(() => {
        if (selectedCard.value === "savingPerformance") return <SavingPerformance latestLiveDate={latestLiveDate} currentOutletID={currentOutletID} />;
        else return <EqptEnergyBaseline latestLiveDate={latestLiveDate} currentOutletID={currentOutletID} />
    }, [selectedCard, latestLiveDate, currentOutletID])

    return (
        <div className="flex flex-col gap-4">
            <CustomizedDropDown
                data={titleDropdowns}
                selected={selectedCard}
                inputType={'dropdown'}
                hidePrefixIcons={true}
                name={"titleSelection"}
                setSelected={setSelectedCard}
                hideBorder={true}
            />

            {selectedContent}

        </div>
    )
}

interface rankAndOutletPros {
    outlets: outlet[];
}

const RankAndOutlet = ({ outlets }: rankAndOutletPros): JSX.Element => {
    return (
        <div className="flex flex-col gap-y-4 justify-around h-full">
            <Jumbotron>
                <div className="flex flex-row justify-between items-center h-full">
                    <span className="font-bold">Rank</span>
                    <div>
                        <span className="font-thin text-5xl">
                            3
                        </span>
                        <span>
                            th
                        </span>
                    </div>
                </div>
            </Jumbotron>
            <Jumbotron>
                <div className="flex flex-row justify-between items-center h-full">
                    <span className="font-bold">Outlets</span>
                    <div>
                        <span className="font-thin text-5xl">
                            {outlets.length}
                        </span>
                    </div>
                </div>
            </Jumbotron>
        </div>
    )
}

const Remarks = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
                <CardHeader Titles={['Remarks']} />
                <span className="text-sm font-bold cursor-pointer hover:underline text-blue-600">
                    See More
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <Notification IconColor={"red"} IsOpen={true} Description={"SmartFridge sensor is mulfunctioned, need replacement ASAP."} />
                {/* <Notification IconColor={"orange"} IsOpen={true} Description={"Kitchen Exhaust sensor shows significant degrading performance, replace within 1 week."} />
                <Notification IconColor={"green"} IsOpen={false} Description={"Fan Sensor shows overheating, replace within next 3 days"} /> */}
            </div>
        </div>
    )
}

const StatusCard = ({ Title, SubTitle, Value, textClassName, Prefix, Postfix, className, RightSideValue, PostfixDirection = 'horizontal' }: StatusCardProps): JSX.Element => {

    return (
        <div className={`p-2 rounded-lg border-2 border-custom-lightgray justify-between h-auto 2xl:h-full min-w-[148.75px] ${className}`}>
            {Title && <div className="text-left">
                <h4 className="2xl:text-sm text-xs">
                    {Title}
                </h4>
                <span className=" text-extraSmall font-light">{SubTitle}</span>
            </div>}

            <div className={`flex flex-row w-full ${Title ? 'mt-4 justify-between' : 'p-6 justify-center'}`}>
                {PostfixDirection === 'vertical' ?
                    <React.Fragment>
                        <div className='flex flex-col'>
                            <div>
                                <span className={`text-sm ${textClassName}`}>
                                    {Prefix}
                                </span>
                                <span className={`text-[35px]`}>
                                    {Value}
                                </span>

                            </div>
                            <div>
                                <span className={`text-xs self-end ${textClassName}`}>
                                    {Postfix}
                                </span>
                            </div>
                        </div>
                        <div>
                            {RightSideValue}
                        </div>

                    </React.Fragment>
                    : <React.Fragment>
                        <div>
                            <span className={`${textClassName}`}>
                                {Prefix}
                            </span>
                            <span className={`${textClassName} font-medium `}>
                                {Value}
                            </span>
                            <span className={`self-end ${textClassName}`}>
                                {Postfix}
                            </span>
                        </div>
                        <div>
                            {RightSideValue}
                        </div>
                    </React.Fragment>}

            </div>
        </div>
    )
}

const StatusHorizontalCard = ({ Title, SubTitle, Value, textClassName, Prefix, Postfix, className, RightSideValue, PostfixDirection = 'horizontal', disableWidthFull = false }: StatusCardProps): JSX.Element => {

    return (
        <div className={`flex flex-row p-2 rounded-lg border-2 border-custom-lightgray justify-between h-auto 2xl:h-full min-w-[148.75px] ${className}`}>
            {Title && <div className="text-left">
                <h4 className="2xl:text-sm text-xs">
                    {Title}
                </h4>
                <span className=" text-extraSmall font-light">{SubTitle}</span>
            </div>}

            <div className={`flex flex-row ${Title ? 'items-center justify-between' : 'p-6 justify-center'}`}>
                {PostfixDirection === 'vertical' ?
                    <React.Fragment>
                        <div className='flex flex-col'>
                            <div>
                                <span className={`text-sm ${textClassName}`}>
                                    {Prefix}
                                </span>
                                {Value}
                            </div>
                        </div>
                        <div>
                            {RightSideValue}
                        </div>

                    </React.Fragment>
                    : <React.Fragment>
                        <div>
                            <span className={`${textClassName}`}>
                                {Prefix}
                            </span>
                            <span className={`${textClassName} font-medium `}>
                                {Value}
                            </span>
                            <span className={`self-end ${textClassName}`}>
                                {Postfix}
                            </span>
                        </div>
                        <div>
                            {RightSideValue}
                        </div>
                    </React.Fragment>}

            </div>
        </div>
    )
}


interface EqptProps {
    outlet?: outlet;
    latestLiveDate: string;
}

const Equipment = ({ outlet, latestLiveDate }: EqptProps): JSX.Element => {
    const [selectedType, setSelectedType] = React.useState("ke");
    const renderedData = React.useMemo(() => {
        const renderedData = {
            quantity: 0,
            baseline: 0,
            energySaved: 0,
            costSaved: 0,
        }
        if (selectedType === 'ke') {

            if (outlet) {
                if (outlet.outlet_device_ex_fa_input) {
                    renderedData.quantity = outlet.outlet_device_ex_fa_input.length;
                }
                if (outlet.results && outlet.results.length > 0) {
                    renderedData.baseline = outlet.results.reduce((acc, item) => { return acc += parseInt(item.ke_measured_savings_kWh || "") }, 0);
                    renderedData.energySaved = outlet.results.reduce((acc, item) => { return acc += parseInt(item.ke_eqpt_energy_baseline_avg_hourly_kW || "") }, 0);
                    renderedData.costSaved = outlet.results.reduce((acc, item) => { return acc += parseInt(item.outlet_measured_savings_expenses || "") }, 0);
                }
            }

        } else {
            if (outlet) {
                if (outlet.outlet_device_ac_input) {
                    renderedData.quantity = outlet.outlet_device_ac_input.length;
                }
                if (outlet.results && outlet.results.length > 0) {
                    renderedData.baseline = outlet.results.reduce((acc, item) => { return acc += parseInt(item.ac_measured_savings_kWh || "") }, 0);
                    renderedData.energySaved = outlet.results.reduce((acc, item) => { return acc += parseInt(item.ac_eqpt_energy_baseline_avg_hourly_kW || "") }, 0);
                    renderedData.costSaved = outlet.results.reduce((acc, item) => { return acc += parseInt(item.outlet_measured_savings_expenses || "") }, 0);
                }
            }
        }
        return renderedData;
    }, [selectedType, outlet]);

    return (
        <div className="flex flex-col gap-4 h-3/6">
            <div className="flex justify-between items-baseline">
                <CardHeader Titles={['Equipment']} className='text-sm' />
                <select value={selectedType} onChange={((event) => { setSelectedType(event.currentTarget.value) })} className={`outline-none px-2 py-1 border-2 rounded-lg text-xs w-1/2`}>
                    <option value="ke">Kitchen Exhaust</option>
                    <option value="ac">Air Con</option>
                </select>
            </div>
            <div className="2xl:grid grid gap-y-2">
                <StatusHorizontalCard Title={'Baseline'} textClassName='text-l' className='bg-custom-orange-card text-custom-orange-card-font h-3/4' SubTitle={`As of ${latestLiveDate}`} Value={numberWithCommas(renderedData.baseline)} Postfix={'kW'} />
                {/* <StatusCard Title={'Last Available Tariff'} textClassName='text-l' className='h-3/4' SubTitle={`As of ${latestLiveDate}`} Value={numberWithCommas(renderedData.quantity)} />
                <StatusCard Title={'Savings @ Tariff'} textClassName='text-l' className='h-3/4' SubTitle={`As of ${latestLiveDate}`} Value={numberWithCommas(renderedData.baseline)} Postfix={'kW'} /> */}

                {/* <StatusCard Title={'Quantity'} textClassName='text-l' className='bg-custom-blue-card text-custom-blue-card-font h-3/4 my-1' Value={numberWithCommas(renderedData.quantity)} /> */}

                {/* <StatusCard Title={'Energy Saved'} textClassName='text-l' className='bg-custom-green-card text-custom-green-card-font h-3/4 my-1' Value={numberWithCommas(renderedData.energySaved)} Postfix={'kWh'} />
                <StatusCard Title={'Cost Saved'} textClassName='text-l' className='bg-custom-orange-card text-custom-orange-card-font h-3/4 my-1' Value={numberWithCommas(renderedData.costSaved)} Prefix={'$'} /> */}
            </div>
        </div>
    )
}

const ValueFirst = ({ title, subTitle, value, valueColor }: any): JSX.Element => {
    return (
        <div className="flex flex-col gap-y-2">
            <div>
                <CardHeader Titles={[title]} />
                <span className="text-extraSmall">{subTitle}</span>
                {/* <span className='text-custom-gray'>As of <span className="text-custom-darkblue">{subTitle}</span></span> */}
            </div>
            <span className={`text-custom-4xl text-end text-${valueColor}`}>
                {value}
            </span>
            {/* <StatusCard className='bg-custom-green-card text-custom-green-card-font' Value={"$12.5"} Postfix={"cent/kWh"} /> */}
        </div>
    )
}

/**
 * Live outlet card
 */
const LiveOutlet = ({ Value }: any): JSX.Element => {
    return (
        <div className="flex flex-col gap-y-2 py-4">
            <CardHeader Titles={['Live Outlets']} />
            <span className="font-bold text-5xl mt-4 text-center">
                {Value}
            </span>
        </div>
    )
}
interface UsageCardProps {
    Title?: String,
    PreSubTitle?: String,
    PostSubTitle?: any,
    FirstPrefix?: any,
    FirstValue?: any,
    FirstPostfix?: any,
    SecondPrefix?: any,
    SecondValue?: any,
    SecondPostfix?: any,
    TextColor?: any,
    BgColor?: any,
    Icon: boolean,
    Position?: String
}

interface EquipmentEnergyProps {
    WithTableKw?: Number,
    WithTableExpense?: Number,
    WithoutTableKw?: Number,
    WithoutTableExpense?: Number
}
/***
 * Equipment Energy Card
 */
const EquipmentEnergy = ({ WithTableKw, WithTableExpense, WithoutTableKw, WithoutTableExpense }: EquipmentEnergyProps): JSX.Element => {
    return (
        <div className='flex flex-row gap-2 justify-between w-full h-full' >
            <UsageCard BgColor={`bg-custom-blue-card`} TextColor='text-custom-blue-card-font' PreSubTitle='W/O' PostSubTitle="TablePointer" Title='Equipment Energy Usage' FirstValue={WithoutTableKw} FirstPostfix="kWh" SecondPrefix="$" SecondValue={WithoutTableExpense} Icon={false} />
            <UsageCard BgColor={`bg-custom-blue-card`} TextColor='text-custom-green-card-font' PreSubTitle='With' PostSubTitle="TablePointer" Title='Equipment Energy Usage' FirstValue={WithTableKw} FirstPostfix="kWh" SecondPrefix="$" SecondValue={WithTableExpense} Icon={false} />
        </div>
    )
}

interface SavingEnergyProps {
    MeasureKw?: Number,
    MeasureExpense?: Number,
    TariffExpense?: Number,
    TariffKw?: Number
}
/**
 * Saving Energy Card
 */
const SavingEnergy = ({ MeasureKw, MeasureExpense, TariffExpense, TariffKw }: SavingEnergyProps): JSX.Element => {
    return (
        <div>
            <div className='flex flex-row gap-2 justify-between w-full h-full' >
                <UsageCard BgColor={`bg-custom-blue-card`} TextColor='text-custom-blue-card-font' Title='Measured Savings' FirstValue={MeasureKw} FirstPostfix="kWh" SecondPrefix="$" SecondValue={MeasureExpense} Position="vertical" Icon={false} />
                <UsageCard BgColor={`bg-custom-blue-card`} TextColor='text-custom-blue-card-font' Title='Saving @ Tariff' FirstValue={TariffKw} FirstPostfix="kWh" SecondPrefix="$" SecondValue={TariffExpense} Position="vertical" Icon={true} />
            </div>
        </div>
    )
}

/**
 * Usage Card
 */
const UsageCard = ({ Title, PreSubTitle, PostSubTitle, FirstPrefix, FirstValue, FirstPostfix, SecondPrefix, SecondValue, SecondPostfix, BgColor, TextColor, Icon = false, Position = 'horizontal' }: UsageCardProps): JSX.Element => {
    return (
        <div className={`flex flex-col p-2 rounded-lg border-2 border-custom-lightgray ${Position !== 'vertical' ? 'justify-between gap-8' : ''} h-auto 2xl:h-full w-2/3 ${BgColor}`}>
            <div className={'flex flex-col'}>
                {
                    (Icon == true) ?
                        <div className="flex">
                            <h2 className="font-bold text-sm text">{Title} </h2> <FontAwesomeIcon className="px-2 text-2xl" icon={faSortUp} />
                        </div> :
                        <h2 className="font-bold text-sm">
                            {Title}
                        </h2>
                }
                <div className={`text-custom-blue-card-font`}>
                    <span className={`font-bold text-sm mr-2`}>{PreSubTitle}</span>
                    <span className={`text-sm font-thin`}>{PostSubTitle}</span>
                </div>
            </div>
            {
                (Position == 'vertical') ?
                    <div className='flex flex-col gap-5 relative'>
                        <div className="text-left">
                            <span className={`font-bold text-2xl ${TextColor}`}>{FirstPrefix}</span>
                            <span className={`font-bold text-2xl ${TextColor}`}>{FirstValue}</span>
                            <span className={`text-sm ${TextColor}`}>{FirstPostfix}</span>
                        </div>
                        <svg className="absolute inset-x-28" width="44" height="80" viewBox="0 0 44 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.25" x2="118.955" y2="-0.25" transform="matrix(0.359554 -0.933124 0.860639 0.509216 0.714844 112)" stroke="#999999" strokeWidth="0.5" />
                        </svg>
                        <div className="text-right">
                            <span className={`font-bold text-2xl ${TextColor}`}>{SecondPrefix}</span>
                            <span className={`font-bold text-2xl ${TextColor}`}>{SecondValue}</span>
                            <span className={`text-sm ${TextColor}`}>{SecondPostfix}</span>
                        </div>
                    </div> :
                    <div className='flex flex-row justify-between mt-6'>
                        <div>
                            <span className={`font-bold text-2xl ${TextColor}`}>{FirstPrefix}</span>
                            <span className={`font-bold text-2xl ${TextColor}`}>{FirstValue}</span>
                            <span className={`text-sm ${TextColor}`}>{FirstPostfix}</span>
                        </div>
                        <div>
                            <span className={`font-bold text-2xl ${TextColor}`}>{SecondPrefix}</span>
                            <span className={`font-bold text-2xl ${TextColor}`}>{SecondValue}</span>
                            <span className={`text-sm ${TextColor}`}>{SecondPostfix}</span>
                        </div>
                    </div>
            }

        </div>
    )
}

interface YearlyEnergyProps {
    Postfix?: any,
    SmallPostfix?: any,
    Prefix?: any,
    Svg?: any,
    Value: any,
    Year: any,
    TextColor: any,
    BgColor: any,
    Height?: any,
    Width?: any
}
/**
 * Yearly Energy Card
 */
const YearlyEnergy = ({ SmallPostfix, Prefix, Svg, Value, Year, TextColor, Postfix, BgColor, Height, Width }: YearlyEnergyProps): JSX.Element => {
    return (
        <div className="flex flex-col pt-7 justify-between items-center h-auto col-span-1">
            <div className={`${BgColor} flex justify-center rounded-[100%] items-center w-[250px] h-[250px]`}>
                <img src={Svg} alt="" className="text-center m-auto" height={`${Height}`} width={`${Width}`} />
            </div>
            <div className="flex flex-col my-16 text-center">
                <div className={`${TextColor} text-3xl font-medium`}>
                    {Prefix} {Value} {Postfix}<sub>{SmallPostfix}</sub>
                </div>
                <div className={`${TextColor} text-xl font-medium`}>
                    {Year}
                </div>
            </div>
        </div>
    )
}

export const SavingMeterCard = Card(SavingMeter);
export const SustainPerformanceCard = Card(SustainPerformance);
export const FastFoodCard = Card(FastFood);
export const RankAndOutletCard = Card(RankAndOutlet);
export const RemarksCard = Card(Remarks);
// export const ExpectedSavingsCard = Card(ExpectedSavings);
export const BenchMarkComparisonCard = Card(BenchMarkComparison);
export const EquipmentCard = Card(Equipment);
export const ValueFirstCard = Card(ValueFirst);
export const ChartCard = Card(CardSwitcher);
export const LiveOutletCard = Card(LiveOutlet);
export const EquipmentEnergyCard = Card(EquipmentEnergy);
export const SavingEnergyCard = Card(SavingEnergy);
export const YearlyEnergyCard = Card(YearlyEnergy);