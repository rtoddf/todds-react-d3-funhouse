import React, {useRef, useEffect, useState} from "react";
import { select } from "d3";

// const data = [20, 25, 30, 45, 60];

function Simple02() {
    const [data, setData] = useState([20, 25, 30, 45, 60]);
    const svgRef = useRef();

    const width = 500,
    height = 300

    useEffect(() => {
        // console.log("svgRef: ", svgRef)

        // with the line below, we now have access to D3 to do dom maniluplation
        const svg = select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
        
        svg
            .selectAll("circle")
            .data(data)
            // general udpate pattern - we can control what happens with enter, udpate, and exit
            //default
            // .join(
            //     enter => enter.append("circle"),
            //     udpate => udpate.attr("class", "updated"),
            //     exit => exit.remove()
            // )

            // concise way
            .join("circle")
                .attr("r", value => value)
                .attr("cx", (value, index) => index * (width / (data.length -1)))
                .attr("cy", (value, index) => index * (height / (data.length -1)))
                .attr("stroke", "orange")

        // console.log(svg.selectAll("circle").data(data))
    }, [data])

    return (
        <>
            <svg ref={svgRef}>
                {/* to test update */}
                {/* <circle /> */}

                {/* to test remove */}
                {/* <circle />
                <circle />
                <circle />
                <circle />
                <circle />
                <circle /> */}
            </svg>
            <br />
            <button onClick={() => setData(data.map(value => value + 3))}>update data</button>
            <button onClick={() => setData(data.filter(value => value <= 35))}>filter data</button>
            {/* the non-d3 way
            <svg>
                {data.map(value => (
                    <circle r={value}></circle>
                ))}
            </svg> */}
        </>
    )
}

export default Simple02;