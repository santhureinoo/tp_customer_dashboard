import React from "react";
import * as d3 from 'd3';

interface Props {
    MaxKWH: number;
    CurrentKHW: number;
}

const ProgressiveMeter = (props: Props): JSX.Element => {
    const progressDivRef: React.RefObject<HTMLDivElement> = React.createRef();
    const orgHeight = 230; // Equivalent to h-48 of tailwind v3.0.24

    const yScale = d3.scaleLinear()
        .domain([0, props.MaxKWH])
        .range([0, orgHeight]);

    React.useEffect(() => {

        // Clean out the existing div
        if (progressDivRef.current && progressDivRef.current.children.length > 0) {
            progressDivRef.current.removeChild(progressDivRef.current.children[0]);
        }
        var svg = d3.select(progressDivRef.current)
            .append('svg')
            .attr('viewBox', `0 0 110 ${orgHeight}`);

        var bgRectGroup = svg.append('g');

        bgRectGroup.append('rect')
            .attr('class', 'bg-rect')
            .attr('rx', 10)
            .attr('ry', 10)
            .attr('fill', 'rgb(229,231,235)')
            .attr('height', '100%')
            .attr('width', 15)
            .attr('x', 0);

        bgRectGroup.append("foreignObject")
            .attr("width", '100%')
            .attr("height", '100%')
            .append("xhtml:div")
            .html(`<div class="absolute h-full w-full justify-between text-gray-400">
            <div class="absolute top-0 right-0 w-full">
                <span class="pl-6">. ${props.MaxKWH} kWh</span>
            </div>
            <div class="absolute bottom-0 right-0 w-full">
                <span class="pl-6"> . 0 kWh</span>
            </div>
        </div>`);

        var progressRectGroup = svg.append('g');

        progressRectGroup.append('rect')
            .attr('class', 'progress-rect')
            .attr('fill', 'rgb(96,165,250)')
            .attr('height', 0)
            .attr('width', 15)
            .attr('rx', 10)
            .attr('ry', 10)
            .attr('y', orgHeight)
            .transition()
            .duration(1000)
            .attr('y', orgHeight - yScale(props.CurrentKHW))
            .attr('height', yScale(props.CurrentKHW));

        progressRectGroup.append("foreignObject")
            .attr("width", '100%')
            .attr("height", yScale(props.CurrentKHW))
            .attr('y', orgHeight - yScale(props.CurrentKHW))
            .append("xhtml:div")
            .html(`<div class="relative h-full w-full justify-between">
            <div class="absolute top-0 right-0 text-blue-400 w-full">
                <span class="pl-6">. ${props.CurrentKHW} kWh</span>
            </div>
        </div>`);

    }, [props, progressDivRef, yScale]);

    return (
        <div className="h-full" ref={progressDivRef}></div>
    )
}

export default ProgressiveMeter;