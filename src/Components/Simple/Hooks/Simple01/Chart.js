import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

const width = 500,
    height = 300

const colors = {
    gray: "gray",
    orange: "orange"
}

const dataUrl = "https://udemy-react-d3.firebaseio.com/ages.json";

const Chart = () => {
    const ref = useRef()

    useEffect(() => {
        const svg = d3.select(ref.current)
            .append("svg")
                .attr("width", width)
                .attr("height", height)

        d3.json(dataUrl).then(data => {
            console.log("data from hooks: ", data)

            const rects = svg.selectAll("rect")
                .data(data)

            rects.enter()
                .append("rect")
                    .attr("x", (d, i) => i * 100)
                    .attr("y", (d, i) => height - (d.age * 10))
                    .attr("width", 50)
                    .attr("height", d => (d.age * 10))
                    .attr("fill", (d) => {
                        return d.age > 10 ? colors.gray : colors.orange
                    })
        })
    }, [])

    return (<div ref={ref} />)
}

export default Chart;