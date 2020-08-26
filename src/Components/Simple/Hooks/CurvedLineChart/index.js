import React, {useRef, useEffect, useState} from "react";
import { select, line, curveCardinal } from "d3";

function CurvedLineChart() {
    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
    const svgRef = useRef();

    const width = 500,
    height = 300

    useEffect(() => {
        const svg = select(svgRef.current)
            .attr("width", width)
            .attr("height", height)

        const myLine = line()
            .x((value, index) => index * (width / (data.length -1)))
            .y(value => height - value)
            .curve(curveCardinal)

        svg.selectAll('path')
            .data([data])
            .join('path')
            .attr('d', value => myLine(value))
            .attr('fill', 'none')
            .attr('stroke', 'orange')

        svg
            .selectAll("circle")
            .data(data)
            .join("circle")
                .attr("r", 5)
                .attr("cx", (value, index) => index * (width / (data.length -1)))
                .attr("cy", value => height - value)
                .attr("fill", "orange")
        

        console.log(svg.selectAll("circle").data(data))
    }, [data])

    return (
        <>
            <svg ref={svgRef}>
            </svg>
            <br />
            <button onClick={() => setData(data.map(value => value + 3))}>update data</button>
            <button onClick={() => setData(data.filter(value => value <= 35))}>filter data</button>
        </>
    )
}

export default CurvedLineChart;