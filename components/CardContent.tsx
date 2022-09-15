import React, { ForwardedRef } from 'react';
import Card from "./Card";
import PillButton from "./cardcomponents/PillButton";
import SavingMeterDigits from "./cardcomponents/SavingMeterDigits";
import CardHeader from "./CardHeader";
import Jumbotron from "./cardcomponents/Jumbotron";
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
    Title?: String, SubTitle?: String, className: string, Value: any, Prefix?: String, Postfix?: any, RightSideValue?: any,
}

const SavingMeter = (): JSX.Element => {

    const date = () => {
        return (<div className="flex flex-row self-end">
            <span className="text-custom-gray text-sm"> Live as of  <span className="text-sky-600"> 20-02-2022</span></span>

        </div>)
    }

    return (
        <div className="grid grid-cols-3 gap-4 place-content-between h-full">
            <CardHeader Titles={['Saving Meter']} SubTitle={date()} />
            <div className="col-span-2 flex flex-row-reverse">
                <SavingMeterDigits numberString="003225" description={"Kilo Watt Hour"} />
            </div>

            <div className="flex flex-col col-span-2">
                <span className="text-left text-custom-gray">Outlet ID: 39505069</span>
                <Image alt="barcode not found" src="/barcode.png" width='500' height="100" />
            </div>
        </div>
    )
}
const SustainPerformance = (): JSX.Element => {

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
            <div className="2xl:grid 2xl:grid-cols-3 grid grid-cols-2 gap-2">
                <StatusCard Title={'CO2 Saved'} className='bg-custom-blue-card text-custom-blue-card-font' Value={"0.64"} Postfix={'kg'} RightSideValue={<Image alt="barcode not found" src="/asserts/carbondioxide.svg" width='50' height='50' />} />
                <StatusCard Title={'Your Savings is equal to planting'} className='bg-custom-green-card text-custom-green-card-font' Value={"5"} Postfix={'trees'} RightSideValue={<Image alt="barcode not found" src="/asserts/tree.svg" width='50' height="50" />} />
                <StatusCard Title={'Outlet Category Iconisation'} className='bg-custom-orange-card text-custom-orange-card-font' Value={outlet_category_iconisation()} />

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

const BenchMarkComparison = ({ outlet_id }: any): JSX.Element => {
    const [selectedResult, setSelectedResult] = React.useState<results[]>([]);
    const [totalKWHs, setTotalKWHs] = React.useState({
        MinKWH : 0,
        MaxKWH : 0,
        CurrentKHW : 0,
    });
    const currentMoment = moment();
    const getResultsQuery = gql`
    query FindManyResults($where: ResultsWhereInput) {
        findManyResults(where: $where) {
          outlet_id
          outlet_date
          acmv_25percent_benchmark_comparison_kWh
          acmv_10percent_benchmark_comparison_kWh
        }
      }
    `;
    const getResultsVariable = {
        "variables": {
            "where": {
                "outlet_id": {
                    "equals": outlet_id
                }
            }
        }
    };
    const getResultsResult = useQuery(getResultsQuery,getResultsVariable);

    React.useEffect(()=>{
        if(getResultsResult.data && getResultsResult.data.findManyResults) {
            const currData = getResultsResult.data.findManyResults as results[];
            setSelectedResult(currData);
            const currentTotalKWHs = currData.map(dat=>{
                return {
                    MinKWH : parseInt(dat.acmv_10percent_benchmark_comparison_kWh || "") ,
                    MaxKWH : parseInt(dat.acmv_25percent_benchmark_comparison_kWh || ""),
                    CurrentKHW : parseInt(dat.acmv_measured_savings_kWh || ""),
                }
            }).reduce((prev, curr) => {
               return {
                MinKWH : prev.MinKWH +curr.MaxKWH,
                MaxKWH : prev.MaxKWH + curr.MaxKWH,
                CurrentKHW : prev.CurrentKHW + curr.CurrentKHW,
               }
            }, {
                MinKWH : 0,
                MaxKWH : 0,
                CurrentKHW : 0,  
            });

            setTotalKWHs(currentTotalKWHs);
        }
    },[getResultsResult.data]);

    return (
        <div className="flex flex-col gap-4 h-full">
            <CardHeader Titles={['Benchmark', 'Comparison']} SubTitle={"(Last Month)"} />
            <div className="h-full">
                <BenchMarkMeter MinKWH={{ Percentage: '10', ActualKHW: totalKWHs.MinKWH }}
                    MaxKWH={{ Percentage: '25', ActualKHW: totalKWHs.MaxKWH }}
                    CurrentKHW={{ Percentage: '17', ActualKHW: totalKWHs.CurrentKHW }} />
            </div>
        </div>
    )
}

const ExpectedSavings = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-4 h-full">
            <CardHeader Titles={['Expected Savings']} SubTitle={"(Current Month)"} />
            <div className="h-full">
                <ProgressiveMeter MaxKWH={600} CurrentKHW={300} />
            </div>
        </div>
    )
}

interface Props {
    currentOutletID: string;
}

export const SavingPerformance = ({ currentOutletID }: Props): JSX.Element => {
    const [firstIntermediaryData, setFirstIntermediaryData] = React.useState<first_intermediary_table[]>([]);
    const [selectedSavingPerformanceIndex, setSelectedSavingPerformanceIndex] = React.useState(0);
    const [selectedTab, setSelectedTab] = React.useState<'kwh' | 'saving'>('kwh');
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
        const currentMoment = moment();
        if (currentOutletID) {
            switch (selectedSavingPerformanceIndex) {
                case 0: variable = {
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

                        }
                    }
                }; break;
                case 1: variable = {
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

                        }
                    }
                }; break;
                default: variable = {
                    "variables": {
                        "where": {
                            "AND": [
                                {
                                    "OR": getLastSevenDays(currentMoment).map(mom => {
                                        return {
                                            "outlet_month_year": {
                                                "equals": mom.format("MM/YYYY")
                                            },
                                            "day_of_month": {
                                                "equals": mom.format("DD")
                                            }
                                        }
                                    }),
                                    "outlet_id": {
                                        "equals": parseInt(currentOutletID)
                                    }
                                }
                            ]

                        }
                    }
                }; break;
            }
        }

        return variable;
    }, [currentOutletID, selectedSavingPerformanceIndex]);

    React.useEffect(() => {
        if (currentOutletID) {
            // const getFirstIntermediaryVariable = {
            //     "variables": {
            //         "where": {
            //             "AND": [
            //                 {
            //                     "outlet_id": {
            //                         "equals": parseInt(currentOutletID)
            //                     }
            //                 }
            //             ],

            //         }
            //     }
            // }
            getFirstIntermediaryResult[0](getFirstIntermediaryVariable).then(result => {
                if (result.data && result.data.first_intermediary_tables) {
                    setFirstIntermediaryData(result.data.first_intermediary_tables);
                }
            });
        } else {
            setFirstIntermediaryData([]);
        }

    }, [currentOutletID, selectedSavingPerformanceIndex]);

    const getChartData = React.useMemo(() => {
        if (selectedTab === 'kwh') {
            return [
                {
                    type: 'line' as const,
                    label: 'Measured Savings',
                    lineTension: 0,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: 'transparent',
                    data: firstIntermediaryData.map(data => parseInt(data.all_eqpt_without_TP_kWh || "0")),
                },
                {
                    type: 'bar' as const,
                    label: 'Without Tablepointer',
                    backgroundColor: 'rgb(191 219 254)',
                    data: firstIntermediaryData.map(data => parseInt(data.all_eqpt_without_TP_kWh || "0") - parseInt(data.all_eqpt_with_TP_kWh || "0")),
                    barThickness: 25,
                    order: 3,
                },
                {
                    type: 'bar' as const,
                    label: 'With Tablepointer',
                    backgroundColor: 'rgb(96 165 250)',
                    data: firstIntermediaryData.map(data => parseInt(data.all_eqpt_with_TP_kWh || "0")),
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
                    data: firstIntermediaryData.map(data => parseInt(data.ke_savings_expenses || "0")),
                },
                {
                    type: 'line' as const,
                    label: 'AC Saving Expenses',
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
                    data: firstIntermediaryData.map(data => parseInt(data.ac_savings_expenses || "0")),
                },
                {
                    type: 'line' as const,
                    label: 'Total Saving Expenses',
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
                    data: firstIntermediaryData.map(data => parseInt(data.total_savings_expenses || "0")),
                }
            ]
        }
    }, [selectedTab, firstIntermediaryData]);


    const data = () => {
        return (
            {
                labels: [...firstIntermediaryData.map(dat => dat.day_of_month + " " + dat.outlet_month_year),],
                datasets: getChartData
            }
        )
    }

    const option = {

        plugins: {
            legend: {
                position: 'bottom' as const,
                onClick: function (event: any, elem: any) {
                    console.log(elem.text);
                },
            }, tooltip: {
                callbacks: {
                    label: function (context: any) {
                        console.log(context);
                        console.log(context.dataset.label);
                        if (context.dataset.label === "Without Tablepointer") {
                            return firstIntermediaryData[context.dataIndex].all_eqpt_without_TP_kWh
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

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
                <div className='flex flex-row gap-x-2 text-xs font-extrabold text-custom-gray'>
                    <button onClick={e => { setSelectedSavingPerformanceIndex(0) }} className={`${selectedSavingPerformanceIndex === 0 ? 'active-sp ' : ''}p-2`}>Last 3 Months</button>
                    <button onClick={e => { setSelectedSavingPerformanceIndex(1) }} className={`${selectedSavingPerformanceIndex === 1 ? 'active-sp ' : ''}p-2`}>Last Month</button>
                    <button onClick={e => { setSelectedSavingPerformanceIndex(2) }} className={`${selectedSavingPerformanceIndex === 2 ? 'active-sp ' : ''}p-2`}>Last Week</button>
                    <div className="grid grid-cols-2">
                        <button onClick={(e) => { setSelectedTab('kwh'); }} className={selectedTab === 'kwh' ? "bg-custom-lightblue text-custom-darkblue rounded-r-none rounded-lg px-2" : "bg-gray-100 rounded-l-none rounded-lg px-2"}>
                            kWh
                        </button>
                        <button onClick={(e) => { setSelectedTab('saving'); }} className={selectedTab === 'saving' ? "bg-custom-lightblue text-custom-darkblue rounded-r-none rounded-lg px-2" : "bg-gray-100 rounded-l-none rounded-lg px-2"}>
                            $
                        </button>
                    </div>
                </div>
                <div className='flex flex-row gap-x-2 text-xs'>
                    <select className={`outline-none px-2 py-1 border-2 rounded-lg h-11`}>
                        <option>Start Date</option>
                        <option>Start Date</option>
                    </select>
                    <select className={`outline-none px-2 py-1 border-2 rounded-lg h-11`}>
                        <option>End Date</option>
                        <option>End Date</option>
                    </select>
                </div>

            </div>
            <div>
                <Chart type='bar' data={data()} options={option} />
            </div>
        </div>
    )
}

export const EqptEnergyBaseline = ({ currentOutletID }: Props): JSX.Element => {
    const labels = ['0', '4.50', '9.00', '13.50', '18.00'];
    const [secondaryIntermediary, setSecondIntermediary] = React.useState<secondary_intermediary_table[]>([]);
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
            const getSecondIntermediaryVariable = {
                "variables": {
                    "where": {
                        "outlet_id": {
                            "equals": parseInt(currentOutletID)
                        }
                    }
                }
            }
            getSecondIntermediaryResult[0](getSecondIntermediaryVariable).then(result => {
                setSecondIntermediary(result.data.secondary_intermediary_tables);
            })
        } else {
            setSecondIntermediary([]);
        }
    }, [currentOutletID])

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

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
                <div className='flex flex-row gap-x-2 text-xs font-extrabold text-custom-gray'>
                    <button className="bg-custom-lightblue text-custom-darkblue rounded-lg p-2">Last 3 Months</button>
                    <button className="p-2">Last Month</button>
                </div>
                <div className='flex flex-row gap-x-2 text-xs'>
                    <select className={`outline-none px-2 py-1 border-2 rounded-lg h-11`}>
                        <option>Start Date</option>
                        <option>Start Date</option>
                    </select>
                    <select className={`outline-none px-2 py-1 border-2 rounded-lg h-11`}>
                        <option>End Date</option>
                        <option>End Date</option>
                    </select>
                </div>

            </div>
            <div className='flex flex-col'>
                <Chart type='scatter' data={data()} options={option} />
                <span className='text-custom-gray self-end'>Valid as of 30th 2022</span>
                <span className='text-custom-gray text-custom-subtitle w-1/3  px-4'>Eqpt. Energy Baseline represents the equipment energy usage over a typical hour without TablePointer, and is continuously and dynamically sampled for statistical best-averaging to ensure validity of time</span>
            </div>
        </div>
    )
}

const CardSwitcher = ({ currentOutletID }: Props): JSX.Element => {
    const [selectedCard, setSelectedCard] = React.useState<DropdownProps>({
        display: <CardHeader Titles={['Savings Performace']} />,
        value: 'savingPerformance',
    });

    const titleDropdowns: DropdownProps[] = [
        {
            display: <CardHeader Titles={['Savings Performace']} />,
            value: 'savingPerformance',
        },
        {
            display: <CardHeader Titles={['Eqpt. Energy Baseline']} SubTitleAlign="end" SubTitle={<span className='text-custom-subtitle'>Avg. Hourly</span>} />,
            value: 'energyBaseline',
        }
    ]

    const selectedContent = React.useMemo(() => {
        if (selectedCard.value === "savingPerformance") return <SavingPerformance currentOutletID={currentOutletID} />;
        else return <EqptEnergyBaseline currentOutletID={currentOutletID} />
    }, [selectedCard, currentOutletID])

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

const StatusCard = ({ Title, SubTitle, Value, Prefix, Postfix, className, RightSideValue }: StatusCardProps): JSX.Element => {

    return (
        <div className={`flex flex-col p-2 rounded-lg border-2 border-custom-lightgray justify-between h-[115px] 2xl:h-full min-w-[148.75px] ${className}`}>
            {Title && <div className="text-left">
                <h4 className="2xl:text-sm text-xs">
                    {Title}
                </h4>
                <span className="2xl:text-xs text-extraSmall font-light">{SubTitle}</span>
            </div>}

            <div className={`flex flex-row w-full gap-1 ${Title ? 'mt-4 justify-between' : 'p-6 justify-center'}`}>
                <div>
                    <span>
                        {Prefix}
                    </span>
                    <span className="text-4xl font-medium">
                        {Value}
                    </span>
                    <span className="self-end">
                        {Postfix}
                    </span>
                </div>
                <div>
                    {RightSideValue}
                </div>

            </div>
        </div>
    )
}

const Equipment = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex justify-between items-baseline">
                <CardHeader Titles={['Equipment']} />
                <select className={`outline-none px-2 py-1 border-2 rounded-lg text-sm h-11`}>
                    <option>Kitchen Exhaust</option>
                    <option>Kitchen Exhaust</option>
                </select>
            </div>
            <div className="2xl:grid 2xl:grid-cols-4 grid grid-cols-2 gap-x-2">
                <StatusCard Title={'Quantity'} className='bg-custom-blue-card text-custom-blue-card-font' Value={"1"} />
                <StatusCard Title={'Baseline'} className='bg-custom-red-card text-custom-red-card-font' SubTitle={'As of 14/01/2022'} Value={"14,9"} Postfix={'kW'} />
                <StatusCard Title={'Energy Saved'} className='bg-custom-green-card text-custom-green-card-font' Value={"305"} Postfix={'kWh'} />
                <StatusCard Title={'Cost Saved'} className='bg-custom-orange-card text-custom-orange-card-font' Value={"159"} Prefix={'$'} />
            </div>
        </div>
    )
}

const LastAvailableTarif = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-y-2">
            <div>
                <CardHeader Titles={['Last Available Tariff']} />
                <span className='text-custom-gray'>As of <span className="text-custom-darkblue">14/01/2022</span></span>
            </div>
            <StatusCard className='bg-custom-green-card text-custom-green-card-font' Value={"$12.5"} Postfix={"cent/kWh"} />
        </div>
    )
}

export const SavingMeterCard = Card(SavingMeter);
export const SustainPerformanceCard = Card(SustainPerformance);
export const FastFoodCard = Card(FastFood);
export const RankAndOutletCard = Card(RankAndOutlet);
export const RemarksCard = Card(Remarks);
export const ExpectedSavingsCard = Card(ExpectedSavings);
export const BenchMarkComparisonCard = Card(BenchMarkComparison);
export const EquipmentCard = Card(Equipment);
export const LastAvailableTarifCard = Card(LastAvailableTarif);
export const ChartCard = Card(CardSwitcher);