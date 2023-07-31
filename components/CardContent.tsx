import React, { ForwardedRef } from 'react';
import Card from "./Card";
import PillButton from "./cardcomponents/PillButton";
import SavingMeterDigits from "./cardcomponents/SavingMeterDigits";
import CardHeader from "./CardHeader";
import Jumbotron from "./cardcomponents/Jumbotron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSortUp } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import BenchMarkMeter from "./cardcomponents/BenchMarkMeter";
import Notification from "./cardcomponents/Notification";
import { DatePicker, Radio } from 'antd';
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
import { dateValueForQuery, getInDecimal, getMonths, numberWithCommas, zeroPad } from '../common/helper';
import dayjs from 'dayjs';
import { number } from 'superstruct';
import TooltipIcon from './cardcomponents/TooltipIcon';

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
            <span className="text-custom-gray text-sm"> Year to Date ({date})</span>

        </div>)
    }

    return (
        <div className="grid grid-cols-3 gap-4 place-content-between h-full">
            <CardHeader Titles={['Savings Meter']} SubTitle={dateComp()} />
            <div className="col-span-2 flex flex-row-reverse">
                <SavingMeterDigits numberString={kiloWatHour} description={"Kilo Watt Hour"} />
            </div>

            <div className="flex flex-col col-span-2">
                <span className="text-left text-custom-gray">Outlet ID: {Number(outletId) < 100 ? Number(outletId) + 99 : outletId}</span>
                <Image alt="barcode not found" src="/barcode.png" width='500' height="100" />
            </div>
        </div>
    )
}
const SustainPerformance = ({ total, year }: any): JSX.Element => {

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
            <div className="flex gap-x-2">
                <CardHeader Titles={['Sustainability Performance']} SubTitle={`Year to Date (${year})`} />
                <TooltipIcon text={`Total Savings Performance this year`}></TooltipIcon>
            </div>
            <div className="lg:grid lg:grid-cols-4 grid grid-cols-2 gap-2">
                <StatusCard PostfixDirection={'vertical'} Title={'Energy Savings'} className='bg-custom-blue-card text-custom-blue-card-font' Value={numberWithCommas(total.energy)} Postfix={'SGD'} RightSideValue={<Image alt="barcode not found" src="/asserts/Money_small.svg" width='50' height='50' />} />
                <StatusCard Title={'CO2 Saved'} className='bg-custom-gray-card text-custom-gray-card-font' Value={numberWithCommas(total.co2)} Postfix={'kg'} PostfixDirection={'vertical'} RightSideValue={<Image alt="barcode not found" src="/asserts/CO2_small.svg" width='50' height='50' />} />
                <StatusCard Title={'Planted Tree'} className='bg-custom-green-card text-custom-green-card-font' Value={numberWithCommas(Math.round(total.co2 / 60.5))} Postfix={'trees'} PostfixDirection={'vertical'} RightSideValue={<Image alt="barcode not found" src="/asserts/Trees_small.svg" width='50' height="50" />} />
                <StatusCard Title={'Meals to be sold'} className='bg-custom-orange-card text-custom-orange-card-font' Value={numberWithCommas(Math.round(total.energy * 2))} Postfix={'meals'} PostfixDirection={'vertical'} RightSideValue={<Image alt="barcode not found" src="/asserts/Meal_small.svg" width='50' height="50" />} />
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
        <div className="flex flex-col gap-4">
            <div className='flex flex-row px-2'>
                <CardHeader Titles={['Benchmark Comparison']} SubTitle={"vs. Industry Peer"} />
                <TooltipIcon text={`Comparison of the highest/lowestand previous month’s consumption`}></TooltipIcon>
            </div>

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
    const [selectedTab, setSelectedTab] = React.useState<'kwh' | 'saving'>('kwh');
    const currentMoment = moment(latestLiveDate, 'MM/YYYY');
    const [selectedMonth, setSelectedMonth] = React.useState(currentMoment.format('MM'));
    const [selectedYear, setSelectedYear] = React.useState(currentMoment.format('YYYY'));
    const [measuredSavings, setMeasuredSavings] = React.useState<{
        measuredSavingsExpense: number,
        measuredSavingsKwh: number,
    }>({
        measuredSavingsExpense: 0,
        measuredSavingsKwh: 0,
    });
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

    const getFindManyResultsQuery = gql`
        query FindManyResults($where: ResultsWhereInput) {
            findManyResults(where: $where) {
            outlet_measured_savings_kWh
            outlet_measured_savings_expenses
        }
    }`;

    const getFirstIntermediaryResult = useLazyQuery(getFirstIntermediaryQuery);
    const getFindManyresultsResult = useLazyQuery(getFindManyResultsQuery);

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
        const currentMoment = moment(latestLiveDate, 'MM/YYYY');
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
        }
        return variable;
    }, [currentOutletID, latestLiveDate]);

    React.useEffect(() => {
        const currentMoment = moment(latestLiveDate, 'MM/YYYY');
        setSelectedMonth(currentMoment.format('MM'));
        setSelectedYear(currentMoment.format('YYYY'));
    }, [latestLiveDate]);

    React.useEffect(() => {
        if (currentOutletID) {
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

            getFindManyresultsResult[0]({
                "variables": {
                    "where": {
                        "AND": [
                            {
                                "outlet_date": {
                                    "contains": dateValueForQuery(selectedMonth, selectedYear)
                                },
                                "outlet_id": {
                                    "equals": parseInt(currentOutletID)
                                }
                            }
                        ],
                    }
                }
            }).then(
                result => {
                    if (result.data && result.data.findManyResults) {
                        const cloned_results: any[] = cloneDeep(result.data.findManyResults);
                        const totalMeasuredSaving = cloned_results.reduce((pv, cv) => {
                            pv.measuredSavingsKwh = getInDecimal(Number(cv.outlet_measured_savings_kWh) + Number(pv.measuredSavingsKwh));
                            pv.measuredSavingsExpense = getInDecimal(Number(cv.outlet_measured_savings_expenses) + Number(pv.measuredSavingsExpense));

                            return pv;
                        }, {
                            measuredSavingsExpense: 0,
                            measuredSavingsKwh: 0,
                        });
                        setMeasuredSavings(totalMeasuredSaving);
                    }
                }
            )
        } else {
            setFirstIntermediaryData([]);
            setMeasuredSavings({
                measuredSavingsExpense: 0,
                measuredSavingsKwh: 0,
            })
        }

    }, [currentOutletID, selectedMonth, selectedYear]);

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
                    data: firstIntermediaryData.map(data => {
                        return getInDecimal(parseFloat(data.all_eqpt_without_TP_kWh || "0"));
                    }),
                },
                {
                    type: 'bar' as const,
                    label: 'Measured Savings',
                    backgroundColor: 'rgb(191 219 254)',
                    data: firstIntermediaryData.map(data => {
                        return (getInDecimal(parseFloat(data.all_eqpt_without_TP_kWh || "0")) - getInDecimal(parseFloat(data.all_eqpt_with_TP_kWh || "0")));
                    }),
                    barThickness: 15,
                    order: 3,
                },
                {
                    type: 'bar' as const,
                    label: 'With TablePointer',
                    backgroundColor: 'rgb(96 165 250)',
                    data: firstIntermediaryData.map(data => getInDecimal(parseFloat(data.all_eqpt_with_TP_kWh || "0"))),
                    barThickness: 15,
                    order: 2,
                }

            ]
        } else {
            return [
                {
                    type: 'bar' as const,
                    label: 'KE Saving Expenses',
                    backgroundColor: 'rgb(96 165 250)',
                    data: firstIntermediaryData.map(data => getInDecimal(parseFloat(data.ke_savings_expenses || "0"), 2)),
                    barThickness: 15,
                    order: 1,
                },
                {
                    type: 'bar' as const,
                    label: 'AC Saving Expenses',
                    backgroundColor: 'rgb(191 219 254)',
                    data: firstIntermediaryData.map(data => getInDecimal(parseFloat(data.ac_savings_expenses || "0"), 2)),
                    barThickness: 15,
                    order: 2,
                },
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
                labels: {
                    padding: 30,
                    usePointStyle: true,
                    pointStyle: 'circle',
                }
            }, tooltip: {
                callbacks: {
                    label: function (context: any) {
                        if (context.dataset.label === "Without TablePointer") {
                            return getInDecimal(parseFloat(firstIntermediaryData[context.dataIndex].all_eqpt_without_TP_kWh || '0'))
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
                barPercentage: 0.8,
            }
        },
        responsive: true,
        aspectRatio: 1.5,
        // maintainAspectRatio: false,
        ...(selectedTab === 'kwh') && {
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },

            }
        }
    }

    return (
        <div className="flex flex-col gap-4 px-4">
            <div className="flex justify-between items-baseline">
                <div className='flex flex-row gap-x-2 my-4'>
                    <div className='flex flex-col'>
                        <CardHeader Titles={['Measured Savings']} />
                        <div className='flex flex-row items-baseline'>
                            <div className='mr-4'>
                                <span className="font-bold text-3xl text-custom-blue-card-font">{measuredSavings?.measuredSavingsKwh}</span>
                                <sub className="text-extra-small text-custom-blue-card-font font-thin mr-1">kWh</sub>
                            </div>

                            <span className="font-bold text-3xl text-custom-blue-card-font">${measuredSavings?.measuredSavingsExpense}</span>
                        </div>
                    </div>

                    {/* <h2>{measuredSavings?.measuredSavingsExpense}</h2>
                    <h2>{measuredSavings?.measuredSavingsKwh}</h2> */}
                </div>
                <div className='flex flex-row gap-x-2 text-xs'>
                    <div className="grid grid-cols-2">
                        <button onClick={(e) => { setSelectedTab('kwh'); }} className={selectedTab === 'kwh' ? "bg-custom-lightblue text-custom-darkblue rounded-r-none rounded-l-lg px-4 py-4" : "bg-gray-100 rounded-r-none rounded-lg px-4 py-4"}>
                            kWh
                        </button>
                        <button onClick={(e) => { setSelectedTab('saving'); }} className={selectedTab === 'saving' ? "bg-custom-lightblue text-custom-darkblue rounded-l-none rounded-r-lg px-4 py-4" : "bg-gray-100 rounded-l-none rounded-lg px-4 py-4"}>
                            $
                        </button>
                    </div>
                    {/* <DatePicker
                        placeholder="Select date"
                        value={dayjs(selectedMonth + '/' + selectedYear, 'MM/YYYY')}
                        onChange={(value) => {
                            if (value) {
                                setSelectedMonth(zeroPad(value.month() + 1, 2));
                                setSelectedYear(value.year().toString());
                            }
                        }}
                        clearIcon={false}
                        disabledDate={(date) => {
                            const latestLiveDateInDayjs = dayjs(latestLiveDate, 'MM/YYYY');
                            if (date.year() < 2022 || date.year() > 2023) {
                                return true;
                            } else if (date.isAfter(latestLiveDateInDayjs)) {
                                return true;
                            } else {
                                return false;
                            }
                        }}
                        format={'MM/YYYY'}
                        picker={'month'}
                    ></DatePicker> */}
                </div>

            </div>
            <Chart className='h-full' type={selectedTab === 'kwh' ? 'bar' : 'line'} data={data()} options={option} />
        </div>
    )
}

export const EqptEnergyBaseline = ({ currentOutletID, latestLiveDate }: Props): JSX.Element => {
    // const labels = ['10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14','14.5','15','15.5','16','16.5','17','17.5','18','18.5','19','19.5','20','20.5','21','21.5','22'];
    const [secondaryIntermediary, setSecondIntermediary] = React.useState<secondary_intermediary_table[]>([]);
    const [selectedEqptEnergyIndex, setSelectedEqptEnergyIndex] = React.useState(1);
    const latestLiveDateMoment = moment(latestLiveDate, 'MM/YYYY');
    const [selectedMonth, setSelectedMonth] = React.useState(latestLiveDateMoment.format('MM'));
    const [selectedYear, setSelectedYear] = React.useState(latestLiveDateMoment.format('YYYY'));
    const currentMoment = moment(selectedMonth, 'DD/MM/YYYY');
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

    React.useEffect(() => {
        const currentMoment = moment(latestLiveDate, 'MM/YYYY');
        setSelectedMonth(currentMoment.format('MM'));
        setSelectedYear(currentMoment.format('YYYY'));
    }, [latestLiveDate]);

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
                        data: secondaryIntermediary.map(data => data.acmv_baseline_kW ? getInDecimal(parseFloat(data.acmv_baseline_kW), 2) : null),
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
                        data: secondaryIntermediary.map(data => data.acmv_without_TP_kWh ? getInDecimal(parseFloat(data.acmv_without_TP_kWh), 2) : null)
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

    const getValidDate = React.useMemo(() => {
        if (selectedMonth === 'All' && selectedYear === 'All') {
            return 'All';
        } else if (selectedMonth === 'All') {
            return moment(`01/${selectedYear}`, 'DD/YYYY').format('YYYY');
        } else if (selectedYear === 'All') {
            return moment(`01/${selectedMonth}`, 'DD/MM').format('Mo');
        } else {
            return moment(`01/${selectedMonth}/${selectedYear}`, 'DD/MM/YYYY').format('Mo YYYY');
        }

    }, [selectedMonth, selectedYear])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end items-baseline">

                {/* <div className='flex flex-row gap-x-2 text-xs font-extrabold text-custom-gray'>
                    <button onClick={e => { setSelectedEqptEnergyIndex(1) }} className={selectedEqptEnergyIndex === 1 ? "bg-custom-lightblue text-custom-darkblue rounded-lg p-2" : "p-2"}>Last 3 Months</button>
                    <button onClick={e => { setSelectedEqptEnergyIndex(2) }} className={selectedEqptEnergyIndex === 2 ? "bg-custom-lightblue text-custom-darkblue rounded-lg p-2" : "p-2"}>Last Month</button>
    </div> */}
                {/* <div className='flex flex-row gap-x-2 text-xs'>
                    <DatePicker
                        placeholder="Select date"
                        value={dayjs(selectedMonth + '/' + selectedYear, 'MM/YYYY')}
                        onChange={(value) => {
                            if (value) {
                                setSelectedMonth(zeroPad(value.month() + 1, 2));
                                setSelectedYear(value.year().toString());
                            }
                        }}
                        clearIcon={false}
                        disabledDate={(date) => {
                            const latestLiveDateInDayjs = dayjs(latestLiveDate, 'MM/YYYY');
                            if (date.year() < 2022 || date.year() > 2023) {
                                return true;
                            } else if (date.isAfter(latestLiveDateInDayjs)) {
                                return true;
                            } else {
                                return false;
                            }
                        }}
                        format={'MM/YYYY'}
                        picker={'month'}
                    ></DatePicker>
                </div> */}

            </div>
            <div className='flex flex-col'>
                <Chart type='scatter' data={data()} options={option} />
                <span className='text-custom-gray self-end'>Valid as of {getValidDate}</span>
                <span className='text-custom-gray text-custom-subtitle w-2/3  px-4'>Eqpt. Energy Baseline represents the equipment energy usage over a typical hour without TablePointer, and is continuously and dynamically sampled for statistical best-averaging to ensure validity of time</span>
            </div>
        </div>
    )
}

const CardSwitcher = ({ currentOutletID, latestLiveDate }: Props): JSX.Element => {
    const [selectedCard, setSelectedCard] = React.useState<string>("savingPerformance");
    const currentMoment = moment(latestLiveDate, 'MM/YYYY');
    const [selectedMonth, setSelectedMonth] = React.useState(currentMoment.format('MM'));
    const [selectedYear, setSelectedYear] = React.useState(currentMoment.format('YYYY'));

    const selectedContent = React.useMemo(() => {
        if (selectedCard === "savingPerformance") return <SavingPerformance latestLiveDate={moment(selectedMonth + '/' + selectedYear, 'MM/YYYY').format('MM/YYYY')} currentOutletID={currentOutletID} />;
        else return <EqptEnergyBaseline latestLiveDate={moment(selectedMonth + '/' + selectedYear, 'MM/YYYY').format('MM/YYYY')} currentOutletID={currentOutletID} />
    }, [selectedCard, latestLiveDate, currentOutletID, selectedMonth, selectedYear])

    const getTooltip = React.useMemo(() => {
        if (selectedCard === 'savingPerformance') return <TooltipIcon text='Energy consumption with and without Tablepointer'></TooltipIcon>
        else return <TooltipIcon text={`Represents the individual equipment's energy usagewithout TablePointer over a typical hour for statistical best-fit averaging,and is continuously and dynamically sampled to ensure its validity over time`}></TooltipIcon>
    }, [selectedCard])

    return (
        <div className="flex flex-col gap-4">
            {/* <CustomizedDropDown
                data={titleDropdowns}
                selected={selectedCard}
                inputType={'dropdown'}
                hidePrefixIcons={true}
                name={"titleSelection"}
                setSelected={setSelectedCard}
                hideBorder={true}
            /> */}

            <div className='flex flex-row gap-x-2 items-center justify-between'>
                <div className='flex items-center gap-x-2'>
                    <Radio.Group size="large" buttonStyle="solid" onChange={((event) => { setSelectedCard(event.target.value) })} value={selectedCard}>
                        <Radio.Button value="savingPerformance">Savings Performance</Radio.Button>
                        <Radio.Button value="energyBaseline">Eqpt. Energy Baseline</Radio.Button>
                    </Radio.Group>
                    {getTooltip}
                </div>
                <div>
                    <DatePicker
                        placeholder="Select date"
                        value={dayjs(selectedMonth + '/' + selectedYear, 'MM/YYYY')}
                        onChange={(value) => {
                            if (value) {
                                setSelectedMonth(zeroPad(value.month() + 1, 2));
                                setSelectedYear(value.year().toString());
                            }
                        }}
                        clearIcon={false}
                        disabledDate={(date) => {
                            const latestLiveDateInDayjs = dayjs(latestLiveDate, 'MM/YYYY');
                            if (date.year() < 2022 || date.year() > 2023) {
                                return true;
                            } else if (date.isAfter(latestLiveDateInDayjs)) {
                                return true;
                            } else {
                                return false;
                            }
                        }}
                        format={'MM/YYYY'}
                        picker={'month'}
                    ></DatePicker>
                </div>

            </div>

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
                                <span className={`text-xl`}>
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
        <div className={`flex flex-row p-2 rounded-lg border-2 border-custom-lightgray justify-between h-auto ${className}`}>
            {Title && <div className="text-left leading-3">
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
    renderedData: any
}

const Equipment = ({ outlet, latestLiveDate, renderedData }: EqptProps): JSX.Element => {
    const [selectedType, setSelectedType] = React.useState("ke");
    const [show, setShow] = React.useState(true);
    
    return (<div className="flex flex-col gap-4 h-3/6">
            <div className="flex justify-between items-baseline">
                <CardHeader Titles={['Equipment']} className='text-sm' />
            </div>
            <Radio.Group className='w-full text-extraSmall' size="small" buttonStyle="solid" onChange={((event) => { setSelectedType(event.target.value) })} value={selectedType} style={{ marginBottom: 8 }}>
                <Radio.Button value="ke">Kitchen Exhaust</Radio.Button>
                <Radio.Button value="ac">Air Con</Radio.Button>
            </Radio.Group>
            <div className="2xl:grid grid gap-y-2">
                <StatusHorizontalCard Title={'Baseline'} textClassName='text-sm' className='bg-custom-orange-card text-custom-orange-card-font' SubTitle={`As of ${latestLiveDate}`} Value={getInDecimal(selectedType == 'ke' ? renderedData.baselineKE : renderedData.baselineAC, 2)} Postfix={'kW'} />
                {/* <StatusCard Title={'Last Available Tariff'} textClassName='text-l' className='h-3/4' SubTitle={`As of ${latestLiveDate}`} Value={numberWithCommas(renderedData.quantity)} />
                <StatusCard Title={'Savings @ Tariff'} textClassName='text-l' className='h-3/4' SubTitle={`As of ${latestLiveDate}`} Value={numberWithCommas(renderedData.baseline)} Postfix={'kW'} /> */}

                {/* <StatusCard Title={'Quantity'} textClassName='text-l' className='bg-custom-blue-card text-custom-blue-card-font h-3/4 my-1' Value={numberWithCommas(renderedData.quantity)} /> */}

                {/* <StatusCard Title={'Energy Saved'} textClassName='text-l' className='bg-custom-green-card text-custom-green-card-font h-3/4 my-1' Value={numberWithCommas(renderedData.energySaved)} Postfix={'kWh'} />
                <StatusCard Title={'Cost Saved'} textClassName='text-l' className='bg-custom-orange-card text-custom-orange-card-font h-3/4 my-1' Value={numberWithCommas(renderedData.costSaved)} Prefix={'$'} /> */}
            </div>
        </div>
    )
}

const ValueFirst = ({ title, tooltip, subTitle, value, valueColor }: any): JSX.Element => {
    return (
        <div className="flex flex-col gap-y-2">
            <div>
                <div className='flex flex-row justify-between'>
                    <CardHeader Titles={[title]} />
                    {tooltip && <TooltipIcon text={tooltip}></TooltipIcon>}
                </div>
                <span className="text-sm text-custom-gray font-thin self-start">{subTitle}</span>
                {/* <span className='text-custom-gray'>As of <span className="text-custom-darkblue">{subTitle}</span></span> */}
            </div>
            <span className={`text-2xl text-end text-${valueColor}`}>
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
    Title?: string,
    TooltipText?: string | JSX.Element,
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
        <div>
            <h2 className="font-bold text-sm">
                Equipment Energy Usage
            </h2>
            <div className='flex flex-row gap-2 justify-between w-full h-full mt-2' >
                <UsageCard BgColor={`bg-custom-blue-card`} TextColor='text-custom-blue-card-font' Title='W/O TablePointer' TooltipText={`Amount of energy your equipment will consumewithout TablePointer's solution`} FirstValue={WithoutTableKw} FirstPostfix="kWh" SecondPrefix="$" SecondValue={WithoutTableExpense} Icon={false} />
                <UsageCard BgColor={`bg-custom-blue-card`} TextColor='text-custom-green-card-font' Title='With TablePointer' TooltipText={`Amount of energy your equipment consumedwith TablePointer's solution`} FirstValue={WithTableKw} FirstPostfix="kWh" SecondPrefix="$" SecondValue={WithTableExpense} Icon={false} />
            </div>
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
            <h2 className="font-bold text-sm">
                Savings
            </h2>
            <div className='flex flex-row gap-2 justify-between w-full h-full mt-2' >
                <UsageCard BgColor={`bg-custom-blue-card`} TextColor='text-custom-blue-card-font' Title='Measured Savings' TooltipText={<p>Σ (Equipment Energy Usage Without TablePointer - Equipment Energy Usage With TablePointer) time<br /><br />Automatically measured when the individualequipment is in use by the outlet andenergy saving happens<br /><br />Savings Co-share Invoicing is based on MeasuredEnergy Savings and the Last Available Tariff </p>} FirstValue={MeasureKw} FirstPostfix="kWh" SecondPrefix="$" SecondValue={MeasureExpense} Position="vertical" Icon={false} />
                <UsageCard BgColor={`bg-custom-blue-card`} TextColor='text-custom-blue-card-font' Title='Savings @ Tariff Increase' TooltipText={`The amount of savings generated assumingat the regulated tariff rate as provided by the Energy Market Authority`} FirstValue={"$" + TariffKw} SecondPrefix="$" SecondValue={TariffExpense} Position="vertical" Icon={false} />
            </div>
        </div>
    )
}

/**
 * Usage Card
 */
const UsageCard = ({ Title, TooltipText, FirstPrefix, FirstValue, FirstPostfix, SecondPrefix, SecondValue, SecondPostfix, BgColor, TextColor, Icon = false, Position = 'horizontal' }: UsageCardProps): JSX.Element => {
    return (
        <div className={`flex flex-col p-2 rounded-lg border-2 border-custom-lightgray h-auto 2xl:h-full w-2/3 ${BgColor}`}>
            {/* <div className={'flex flex-col'}>
                {
                    (Icon == true) ?
                        <div className="flex">
                            <h2 className="font-bold text-sm text">{Title} </h2> <FontAwesomeIcon className="px-2 text-xl" icon={faSortUp} />
                        </div> :
                        <h2 className="font-bold text-sm">
                            {Title}
                        </h2>
                }
                <div className={`text-custom-blue-card-font`}>
                    <span className={`font-bold text-sm mr-2`}>{PreSubTitle}</span>
                    <span className={`text-sm font-thin`}>{PostSubTitle}</span>
                </div>
            </div> */}
            <div className="flex justify-between">
                <h2 className="font-bold text-sm text">{Title} </h2> {TooltipText && <TooltipIcon text={TooltipText}></TooltipIcon>}
            </div>
            <div className='flex flex-col justify-between mt-2'>
                <div>
                    {FirstPrefix && <span className={`font-bold text-3xl ${TextColor}`}>{FirstPrefix}</span>}
                    <span className={`font-bold text-3xl ${TextColor}`}>{FirstValue}</span>
                    {FirstPostfix && <span className={`text-sm ${TextColor} mx-1`}>{FirstPostfix}</span>}
                </div>
                <div>
                    {SecondPrefix && <span className={`font-bold text-3xl ${TextColor}`}>{SecondPrefix}</span>}
                    <span className={`font-bold text-3xl ${TextColor}`}>{SecondValue}</span>
                    {SecondPostfix && <span className={`text-sm ${TextColor} mx-1`}>{SecondPostfix}</span>}
                </div>
            </div>

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
            <div className={`flex justify-center rounded-[100%] items-center`}>
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