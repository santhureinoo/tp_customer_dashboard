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
import { cloneDeep } from '@apollo/client/utilities';

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
    Title?: String, SubTitle?: String, className: string, Value: any, Prefix?: String, Postfix?: any, RightSideValue?: any, PostfixDirection?: 'horizontal' | 'vertical'
}

const SavingMeter = ({ date, outletId }: any): JSX.Element => {

    const dateComp = () => {
        return (<div className="flex flex-row self-end">
            <span className="text-custom-gray text-sm"> Live as of  <span className="text-sky-600"> {date}</span></span>

        </div>)
    }

    return (
        <div className="grid grid-cols-3 gap-4 place-content-between h-full">
            <CardHeader Titles={['Saving Meter']} SubTitle={dateComp()} />
            <div className="col-span-2 flex flex-row-reverse">
                <SavingMeterDigits numberString="003225" description={"Kilo Watt Hour"} />
            </div>

            <div className="flex flex-col col-span-2">
                <span className="text-left text-custom-gray">Outlet ID: {outletId}</span>
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
            <div className="2xl:grid 2xl:grid-cols-4 grid grid-cols-2 gap-2">
                <StatusCard Title={'Energy Savings/Year'} className='bg-custom-gray-card text-custom-gray-card-font' Value={"100.590"} Postfix={'SGD'} PostfixDirection={'vertical'} RightSideValue={<Image alt="barcode not found" src="/asserts/savings.png" width='50' height='50' />} />
                <StatusCard Title={'CO2 Saved/Year'} className='bg-custom-blue-card text-custom-blue-card-font' Value={"225,7"} Postfix={'kg/year'} PostfixDirection={'vertical'} RightSideValue={<Image alt="barcode not found" src="/asserts/carbondioxide.svg" width='50' height='50' />} />
                <StatusCard Title={'Planted Tree/Year'} className='bg-custom-green-card text-custom-green-card-font' Value={"3.370"} Postfix={'trees/year'} PostfixDirection={'vertical'} RightSideValue={<Image alt="barcode not found" src="/asserts/tree.svg" width='50' height="50" />} />
                <StatusCard Title={'Meals to be sold/Year'} className='bg-custom-orange-card text-custom-orange-card-font' Value={"201.800"} Postfix={'meals'} PostfixDirection={'vertical'} RightSideValue={<Image alt="barcode not found" src="/asserts/meals.png" width='50' height="50" />} />
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
        <div className="flex flex-col gap-4 h-full">
            <CardHeader Titles={['Benchmark', 'Comparison']} SubTitle={"vs. Industry Peer"} />
            <div className="h-full">
                {getBMM}
            </div>
        </div>
    )
}

const ExpectedSavings = ({ totalKWHs }: any): JSX.Element => {
    return (
        <div className="flex flex-col gap-4 h-full">
            <CardHeader Titles={['Expected Savings']} SubTitle={"(Current Month)"} />
            <div className="h-full">
                <ProgressiveMeter MaxKWH={totalKWHs.MaxKWH} CurrentKHW={totalKWHs.CurrentKHW} />
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
            getFirstIntermediaryResult[0](getFirstIntermediaryVariable).then(result => {
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
                    backgroundColor: 'transparent',
                    data: firstIntermediaryData.map(data => parseInt(data.total_savings_expenses || "0")),
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
    // const labels = ['10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14','14.5','15','15.5','16','16.5','17','17.5','18','18.5','19','19.5','20','20.5','21','21.5','22'];
    const [secondaryIntermediary, setSecondIntermediary] = React.useState<secondary_intermediary_table[]>([]);
    const [selectedEqptEnergyIndex, setSelectedEqptEnergyIndex] = React.useState(1);
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
                const cloned_second_intermediary_tables = cloneDeep(result.data.secondary_intermediary_tables);
                const sortDat = cloned_second_intermediary_tables.sort(function (left: any, right: any) {
                    return moment(left.day_of_month + "/" + left.outlet_month_year, "DD/MM/YYYY").diff(moment(right.day_of_month + "/" + right.outlet_month_year, "DD/MM/YYYY"));
                });
                setSecondIntermediary(sortDat);
            })
        } else {
            setSecondIntermediary([]);
        }
    }, [currentOutletID])

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

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
                <div className='flex flex-row gap-x-2 text-xs font-extrabold text-custom-gray'>
                    <button onClick={e => { setSelectedEqptEnergyIndex(1) }} className={selectedEqptEnergyIndex === 1 ? "bg-custom-lightblue text-custom-darkblue rounded-lg p-2" : "p-2"}>Last 3 Months</button>
                    <button onClick={e => { setSelectedEqptEnergyIndex(2) }} className={selectedEqptEnergyIndex === 2 ? "bg-custom-lightblue text-custom-darkblue rounded-lg p-2" : "p-2"}>Last Month</button>
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

const StatusCard = ({ Title, SubTitle, Value, Prefix, Postfix, className, RightSideValue, PostfixDirection = 'horizontal' }: StatusCardProps): JSX.Element => {

    return (
        <div className={`flex flex-col p-2 rounded-lg border-2 border-custom-lightgray justify-between h-[115px] 2xl:h-full min-w-[148.75px] ${className}`}>
            {Title && <div className="text-left">
                <h4 className="2xl:text-sm text-xs">
                    {Title}
                </h4>
                <span className="2xl:text-xs text-extraSmall font-light">{SubTitle}</span>
            </div>}

            <div className={`flex flex-row w-full gap-1 ${Title ? 'mt-4 justify-between' : 'p-6 justify-center'}`}>
                {PostfixDirection === 'vertical' ?
                    <React.Fragment>
                        <div className='flex flex-col'>
                            <div>
                                <span className='text-sm'>
                                    {Prefix}
                                </span>
                                <span className="text-4xl font-medium">
                                    {Value}
                                </span>
                            </div>
                            <div>
                                <span className="text-xs self-end">
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
                    </React.Fragment>}

            </div>
        </div>
    )
}

interface EqptProps {
    outlet?: outlet;
}

const Equipment = ({ outlet }: EqptProps): JSX.Element => {
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
                    renderedData.baseline = parseInt(outlet.results[0].ke_measured_savings_kWh || "");
                    renderedData.energySaved = parseInt(outlet.results[0].ke_eqpt_energy_baseline_avg_hourly_kW || "");
                    renderedData.costSaved = parseInt(outlet.results[0].outlet_measured_savings_expenses || "")
                }
            }

        } else {
            if (outlet) {
                if (outlet.outlet_device_ac_input) {
                    renderedData.quantity = outlet.outlet_device_ac_input.length;
                }
                if (outlet.results && outlet.results.length > 0) {
                    renderedData.baseline = parseInt(outlet.results[0].ac_measured_savings_kWh || "");
                    renderedData.energySaved = parseInt(outlet.results[0].ac_eqpt_energy_baseline_avg_hourly_kW || "");
                    renderedData.costSaved = parseInt(outlet.results[0].outlet_measured_savings_expenses || "")
                }
            }
        }
        return renderedData;
    }, [selectedType, outlet]);

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex justify-between items-baseline">
                <CardHeader Titles={['Equipment']} />
                <select value={selectedType} onChange={((event) => { setSelectedType(event.currentTarget.value) })} className={`outline-none px-2 py-1 border-2 rounded-lg text-sm h-11`}>
                    <option value="ke">Kitchen Exhaust</option>
                    <option value="ac">Air Con</option>
                </select>
            </div>
            <div className="2xl:grid 2xl:grid-cols-4 grid grid-cols-2 gap-x-2">
                <StatusCard Title={'Quantity'} className='bg-custom-blue-card text-custom-blue-card-font' Value={renderedData.quantity} />
                <StatusCard Title={'Baseline'} className='bg-custom-red-card text-custom-red-card-font' SubTitle={'As of 14/01/2022'} Value={renderedData.baseline} Postfix={'kW'} />
                <StatusCard Title={'Energy Saved'} className='bg-custom-green-card text-custom-green-card-font' Value={renderedData.energySaved} Postfix={'kWh'} />
                <StatusCard Title={'Cost Saved'} className='bg-custom-orange-card text-custom-orange-card-font' Value={renderedData.costSaved} Prefix={'$'} />
            </div>
        </div>
    )
}

const LastAvailableTarif = ({ date }: any): JSX.Element => {
    return (
        <div className="flex flex-col gap-y-2">
            <div>
                <CardHeader Titles={['Last Available Tariff']} />
                <span className='text-custom-gray'>As of <span className="text-custom-darkblue">{date}</span></span>
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