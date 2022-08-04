import React from "react";
import { BenchMarkComparisonCard, ChartCard, EqptEnergyBaseline, EquipmentCard, ExpectedSavingsCard, FastFoodCard, LastAvailableTarifCard, RankAndOutletCard, RemarksCard, SavingMeterCard, SavingPerformance, SustainPerformanceCard } from "./CardContent";

const Dashboard = (): JSX.Element => {
    return (
        <React.Fragment>
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-2">
                    <SavingMeterCard />
                </div>
                <div className="col-span-4">
                    <SustainPerformanceCard />
                </div>
                {/* <div>
                    <FastFoodCard />
                </div> */}
                <div>
                    <BenchMarkComparisonCard />
                </div>
                <div>
                    <ExpectedSavingsCard />
                </div>
                <div className="col-span-4">
                    <ChartCard elements={([<SavingPerformance key={'spCard'}/>, <EqptEnergyBaseline key={'eebCard'} />])} />
                </div>
                <div>
                    <RankAndOutletCard />
                </div>
                <div>
                        <RemarksCard />
                    </div>
                <div className="col-span-3">
                    <EquipmentCard />
                </div>
                <div>
                    <LastAvailableTarifCard />
                </div>
            </div>
        </React.Fragment>

    )
}

export default Dashboard;