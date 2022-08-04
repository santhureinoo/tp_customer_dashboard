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
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    ScriptableContext,
    Filler,
    SubTitle,
    registerables 
} from 'chart.js';
import { Chart, Line  } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import CustomizedDropDown from './CustomizedDropDown';
import { DropdownProps } from '../common/types';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Filler,
    ...registerables 
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

const BenchMarkComparison = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-4 h-full">
            <CardHeader Titles={['Benchmark', 'Comparison']} SubTitle={"(Last Month)"} />
            <div className="h-full">
                <BenchMarkMeter MinKWH={{ Percentage: '10', ActualKHW: 728 }}
                    MaxKWH={{ Percentage: '25', ActualKHW: 1689 }}
                    CurrentKHW={{ Percentage: '17', ActualKHW: 1224 }} />
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


export const SavingPerformance = (): JSX.Element => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = () => {
        return (
            {
                labels,
                datasets: [
                    {
                        type: 'line' as const,
                        label: 'Without Tablepointer',
                        lineTension: 0,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                        fill: true,
                        backgroundColor: (context: ScriptableContext<"line">) => {
                            const ctx = context.chart.ctx;
                            var gradient = ctx.createLinearGradient(0, 0, 0, 200);
                            gradient.addColorStop(0, 'rgba(255, 218, 225, 1)');
                            gradient.addColorStop(1, 'rgba(255, 255, 255,0)');
                            return gradient;
                        },
                        data: [510, 750, 748, 560, 1000, 560],
                    },
                    {
                        type: 'bar' as const,
                        label: 'With Tablepointer',
                        backgroundColor: 'rgb(96 165 250)',
                        data: [250, 250, 250, 250, 250, 250],
                        barThickness: 25,
                    },
                    {
                        type: 'bar' as const,
                        label: 'Measured Savings',
                        backgroundColor: 'rgb(191 219 254)',
                        data: [260, 500, 498, 310, 750, 310],
                        barThickness: 25,
                    },
                ],
            }
        )
    }

    const option = {
        plugins: {
            legend: {
                position: 'bottom' as const,
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
            },
            y: {
                stacked: true
            },

        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
                <div className='flex flex-row gap-x-2 text-xs font-extrabold text-custom-gray'>
                    <button className="bg-custom-lightblue text-custom-darkblue rounded-lg p-2">Last 3 Months</button>
                    <button className="p-2">Last Month</button>
                    <button className="p-2">Last Week</button>
                    <div className="grid grid-cols-2">
                        <button className="bg-custom-lightblue text-custom-darkblue rounded-r-none rounded-lg px-2">
                            kWh
                        </button>
                        <button className="bg-gray-100 rounded-l-none rounded-lg px-2">
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

export const EqptEnergyBaseline = (): JSX.Element => {
    const labels = ['0', '4.50', '9.00', '13.50', '18.00'];
    const data = () => {
        return (
            {
                labels,
                datasets: [
                    {
                        type: 'line' as const,
                        label: 'Line Dataset',
                        data: [900, 900, 900, 900, 900, 900],
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
                        data: [850, 1000, 748, 920, 980, 560]
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

const CardSwitcher = (elements: Array<JSX.Element>): JSX.Element => {
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
        if (selectedCard.value === "savingPerformance") return <SavingPerformance />;
        else return <EqptEnergyBaseline />
    }, [selectedCard])

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

const RankAndOutlet = (): JSX.Element => {
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
                            15
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