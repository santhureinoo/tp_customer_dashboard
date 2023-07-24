import React from "react";
import * as d3 from 'd3';
import { BenchMarkProps } from "../../common/types";
import { off } from "process";
import { getInDecimal } from "../../common/helper";

const BenchMarkMeter = (props: BenchMarkProps): JSX.Element => {
    const progressDivRef: React.RefObject<HTMLDivElement> = React.createRef();
    const orgHeight = 176; // Equivalent to h-36 of tailwind v3.0.24

    const yScale = d3.scaleBand()
        .domain([props.MinKWH.Percentage, props.MaxKWH.Percentage])
        .range([0, orgHeight]);

    React.useEffect(() => {

        // Clean out the existing div
        if (progressDivRef.current && progressDivRef.current.children.length > 0) {
            progressDivRef.current.removeChild(progressDivRef.current.children[0]);
        }

        var svg = d3.select(progressDivRef.current)
            .append('svg').attr('viewBox', `0 0 110 ${orgHeight}`);
        var bgLineGroup = svg.append('g');

        bgLineGroup.append('line')
            .attr('class', 'dashed')
            .attr('rx', 10)
            .attr('ry', 10)
            .attr('fill', 'rgb(229,231,235)')
            .attr('width', 15)
            .attr("x1", 55)
            .attr("x2", 55)
            .attr("y1", 0)
            .attr("y2", orgHeight)
            .attr("stroke", "black");

        var progressRectGroup = svg.append('g');

        progressRectGroup.append('rect')
            .attr('class', 'progress-rect')
            .attr('fill', 'rgb(96,165,250)')
            .attr('height', 0)
            .attr('width', 15)
            .attr('rx', 10)
            .attr('ry', 10)
            .attr('y', orgHeight / 2)
            .attr('x', 47)
            .transition()
            .duration(1000)
            .attr('y', orgHeight / 8)
            // .attr('y', orgHeight - (yScale(props.MinKWH.Percentage) || 0))
            .attr('height', (yScale(props.MaxKWH.Percentage) || 0) + 50);

        progressRectGroup.append("foreignObject")
            .attr("width", '100%')
            .attr('y', orgHeight / 8)
            // .attr('y', orgHeight - (yScale(props.MinKWH.Percentage) || 0))
            .attr('height', (yScale(props.MaxKWH.Percentage) || 0) + 60)
            .append("xhtml:div")
            .html(`<div class="absolute z-10 h-full left-0 flex flex-col justify-between">
                <div class="mr-4">
                    <span class="text-gray-400 text-extraSmall block text-right">
                        25%
                    </span>
                    <span class="text-extraSmall align-top text-right">
                        ${getInDecimal(props.MaxKWH.ActualKHW.valueOf(), 0)} kWh
                    </span>
                </div>
                <div class="mr-4">
                    <span class="text-gray-400 text-extraSmall block text-right">
                        10%
                    </span>
                    <span class="text-extraSmall align-top text-right">
                        ${getInDecimal(props.MinKWH.ActualKHW.valueOf(), 0)} kWh
                    </span>
                </div>
    </div>`);

        progressRectGroup.append("foreignObject")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('y', (orgHeight - (yScale(props.MaxKWH.Percentage) || 0)) / 1.5)
            .append("xhtml:div")
            .html(`<div class="absolute pl-2 right-0 z-10 flex flex-col  justify-center">
                        <div class="flex flex-col items-center">
                            <span class="text-extraSmall">Last Month</span>
                            <span class="text-xl text-blue-600 font-bold">
                                17%
                            </span>
                        <span class="text-extraSmall">(${props.CurrentKHW.ActualKHW} kWh)</span>
                    </div>
        </div>`);
    }, [props, progressDivRef, yScale]);

    return (
        <div ref={progressDivRef}></div>
    )
}

export default BenchMarkMeter;