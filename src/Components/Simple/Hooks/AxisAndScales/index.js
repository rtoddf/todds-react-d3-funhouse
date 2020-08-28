import React, {useRef, useEffect, useState} from "react";
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear, max } from "d3";
// import { extent, max, min } from "d3-array";

function AxisAndScales() {
    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
    const svgRef = useRef();

    const width = 500,
    height = 300

    useEffect(() => {
        const svg = select(svgRef.current)
            .attr("width", width)
            .attr("height", height)

        const xScale = scaleLinear()
            .domain([0, data.length -1])
            .range([0, width])

        const yScale = scaleLinear()
            .domain([0, max(data)])
            .range([height, 0])

        const xAxis = axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(index => index + 1)
        const yAxis = axisRight(yScale)

        svg.select('.x-axis')
            .style('transform', `translateY(${height}px)`)
            .call(xAxis);

        svg.select('.y-axis')
            .style('transform', `translateX(${width}px)`)
            .call(yAxis);

        const myLine = line()
            .x((value, index) => xScale(index))
            // .x((value, index) => index * (width / (data.length -1)))
            .y(yScale)
            // .y(value => yScale(value))

            .curve(curveCardinal)

        svg.selectAll('.line')
            .data([data])
            .join('path')
            .attr('d', myLine)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'orange')

        svg
            .selectAll("circle")
            .data(data)
            .join("circle")
                .attr("r", 5)
                .attr("cx", (value, index) => xScale(index))
                .attr("cy", yScale)
                .attr("fill", "orange")
        

        console.log(svg.selectAll("circle").data(data))
    }, [data])

    return (
        <>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <br />
            <br />
            <br />
            <button onClick={() => setData(data.map(value => value + 3))}>update data</button>
            <button onClick={() => setData(data.filter(value => value <= 35))}>filter data</button>
        </>
    )
}

export default AxisAndScales;