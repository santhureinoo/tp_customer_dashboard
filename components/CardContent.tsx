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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Filler,
);
interface EquipmentStatusCardProps {
    Title: String, SubTitle?: String, Value: String, Prefix?: String, Postfix?: String
}

const SavingMeter = (): JSX.Element => {
    return (
        <div className="grid grid-cols-3 gap-4 place-content-between h-full">
            <CardHeader Titles={['Saving', 'Meter']} />
            <div className="col-span-2">
                <SavingMeterDigits numberString="003225" description={"Kilo Watt Hour"} />
            </div>
            <div className="flex flex-col self-end">
                <span className="text-gray-600 text-sm"> Live as of</span>
                <span className="text-sky-600"> 20-02-2022</span>
            </div>
            <div className="flex flex-col col-span-2">
                <Image alt="barcode not found" src="/barcode.png" width='500' height="150" />
                <span className="text-right text-gray-600">Outlet ID: 39505069</span>
            </div>
        </div>
    )
}
const SustainPerformance = (): JSX.Element => {
    return (
        <div className="flex flex-row gap-4 w-full h-full">
            <CardHeader Titles={['Sustainability', 'Performance']} SubTitle={'(Accummulative)'} />
            <div className="flex-1">
                <Jumbotron>
                    <div className="flex flex-col items-start justify-center h-full">
                        <h2 className="font-light text-custom-gray text-2xl">CO2 Saved</h2>
                        <div>
                            <span className="font-bold text-3xl">0.64</span>
                            <span className="font-light text-sm text-custom-gray pl-2">kg</span>
                        </div>
                        <PillButton className={"bg-pillbtn text-xs"} text={"+ 0.5 kg Lower"} />
                    </div>
                </Jumbotron>
            </div>
            <div className="flex-1">
                <Jumbotron>
                    <div className="flex flex-row items-center h-full">
                        <span className="font-light text-custom-gray text-left">Your Savings is equal to planting</span>
                        <div className="flex flex-col justify-center">
                            <span className="font-bold text-5xl">5</span>
                            <span>Trees</span>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        </div>
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


const SavingPerformance = (): JSX.Element => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = () => {
        return (
            {
                labels,
                datasets: [
                    {
                        type: 'line' as const,
                        label: 'Without Tablepointer',
                        lineTension: 0.4,
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
                <CardHeader Titles={['Savings', 'Performace']} />
                <div className='flex flex-row gap-x-2 text-xs text-custom-gray'>
                    <button className="bg-custom-lightblue text-custom-darkblue rounded-lg p-2">Last 3 Months</button>
                    <button className="p-2">Last Month</button>
                    <button className="p-2">Last Week</button>
                    <div className="grid grid-cols-2">
                        <button className="text-xs bg-custom-lightblue text-custom-darkblue rounded-r-none rounded-lg px-2">
                            kWh
                        </button>
                        <button className="text-xs bg-gray-100 rounded-l-none rounded-lg px-2">
                            $
                        </button>
                    </div>
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
                <Chart type='bar' data={data()} options={option} />;
            </div>
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
                <Notification IconColor={"orange"} IsOpen={true} Description={"Kitchen Exhaust sensor shows significant degrading performance, replace within 1 week."} />
                <Notification IconColor={"green"} IsOpen={false} Description={"Fan Sensor shows overheating, replace within next 3 days"} />
            </div>
        </div>
    )
}

const EquipmentStatusCard = ({ Title, SubTitle, Value, Prefix, Postfix }: EquipmentStatusCardProps): JSX.Element => {
    return (
        <div className="flex flex-col p-4 rounded-lg border-2 border-gray-200 justify-between min-h-[115px] min-w-[148.75px]">
            <div className="text-left">
                <h4 className="text-sm text-blue-600">
                    {Title}
                </h4>
                <span className="text-xs font-light text-custom-gray">{SubTitle}</span>
            </div>

            <div className="flex flex-row w-full gap-1">
                <span className="text-custom-gray">
                    {Prefix}
                </span>
                <span className="text-custom-5xl font-medium">
                    {Value}
                </span>
                <span className="self-end text-custom-gray">
                    {Postfix}
                </span>

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
            <div className="flex flex-row flex-wrap gap-2">
                <EquipmentStatusCard Title={'Quantity'} Value={"1"} />
                <EquipmentStatusCard Title={'Baseline'} SubTitle={'As of 14/01/2022'} Value={"14,9"} Postfix={'kW'} />
                <EquipmentStatusCard Title={'Energy Saved'} Value={"305"} Postfix={'kWh'} />
                <EquipmentStatusCard Title={'Cost Saved'} Value={"159"} Prefix={'$'} />
            </div>
        </div>
    )
}

const LastAvailableTarif = (): JSX.Element => {
    return (
        <div className="flex flex-col h-full justify-between gap-y-2">
            <div>
                <CardHeader Titles={['Last Available', 'Tariff']} />
                <span className='text-custom-gray'>As of <br /><span className="text-custom-darkblue">14/01/2022</span></span>
            </div>
            <div>
                <span className="text-4xl font-bold font-lg">
                    $12,5
                </span>
                <span className="text-sm font-gray-200">cent / kwh</span>
            </div>
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
export const SavingPerformanceCard = Card(SavingPerformance);