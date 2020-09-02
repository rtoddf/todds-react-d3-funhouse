import React, {useRef, useEffect, useState} from "react";
import { select, axisBottom, axisRight, scaleLinear, scaleBand, max } from "d3";

function AnimatedBarChart() {
    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
    const svgRef = useRef();

    const width = 500,
    height = 300

    useEffect(() => {
        const svg = select(svgRef.current)
            .attr("width", width)
            .attr("height", height)

        const xScale = scaleBand()
            .domain(data.map((value, index) => index))
            .range([0, width])
            .padding(0.5)

        const yScale = scaleLinear()
            .domain([0, max(data)])
            .range([height, 0])

        const colorScale = scaleLinear()
            .domain([0, max(data)])
            .range(["blue", "orange"])
            // .clamp(true)

        const xAxis = axisBottom(xScale)
            .ticks(data.length)
        const yAxis = axisRight(yScale)

        svg.select('.x-axis')
            .style('transform', `translateY(${height}px)`)
            .call(xAxis);

        svg.select('.y-axis')
            .style('transform', `translateX(${width}px)`)
            .call(yAxis);
        
        svg.selectAll('.bar')
            .data(data)
            .join('rect')
                .attrs({
                    'class': 'bar',
                    'x': (value, index) => xScale(index),
                    // reset the height in relation to the origin point at the top
                    'y': -height,
                    'width': xScale.bandwidth()
                })
                .styles({
                    // flip the bars so they animate the correct way
                    'transform': 'scale(1, -1)'
                })
                .transition()
                .attrs({
                    'height': value => height - yScale(value),
                    'fill': colorScale
                })

        console.log(svg.selectAll("circle").data(data))
    }, [data])

    return (
        <div className="display">
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <br />
            <br />
            <br />
            <button onClick={() => setData(data.map(value => value + 3))}>update data</button>&nbsp;
            <button onClick={() => setData(data.filter(value => value <= 35))}>filter data</button>
        </div>
    )
}

export default AnimatedBarChart;