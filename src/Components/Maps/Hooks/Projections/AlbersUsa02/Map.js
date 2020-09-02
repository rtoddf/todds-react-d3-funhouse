import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import "d3-selection-multi";
import us from '../../../../Data/topology/us.json';

let width, height, vis_group, aspect

const margins = {top: 0, right: 20, bottom: 20, left: 20}
const defaults = {
    colors: {
        none: 'none',
        land: '#baba71',
        water: '#a8e1f8',
        stroke: '#333',
        strokeWidth: .5,
        strokeOpacity: .5
    }
}

const Chart = () => {
    const ref = useRef()
    // const [states, setStates] = useState({})
    useEffect(() => {
        console.log('ref.current: ', ref.current.offsetWidth)

        width = ref.current.offsetWidth - margins.left - margins.right
        height = width * .6

        var projection = d3.geoAlbersUsa()
            .scale(width)
            .translate([ width/2, height/2 ]);

        var path = d3.geoPath()
            .projection(projection);


        const vis = d3.select(ref.current)
            .append("svg")
                .attrs({
                    'width': width + margins.left + margins.right,
                    'height': height + margins.top + margins.bottom,
                    'preserveAspectRatio': 'xMinYMid',
                    'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
                })

        Promise.all([us]).then(function(data) {
            const topology = data[0]
            console.log('topology: ', topology)

            vis_group = vis.append('g')
            vis_group.append('path')
                .datum(topojson.feature(topology, topology.objects.land))
                .attrs({
                    'd': path,
                    'fill': defaults.colors.land,
                    'stroke': defaults.colors.stroke,
                    'stroke-width': defaults.colors.strokeWidth
                })

            vis_group.append('path')
                .datum(topojson.mesh(topology, topology.objects.states, function(a, b){
                    return a !== b
                }))
                .attrs({
                    'd': path,
                    'fill': 'none',
                    'stroke': defaults.colors.stroke,
                    'stroke-width': defaults.colors.strokeWidth
                })

        })


        // put all the d3 svg in a var and use that in te return
        // const svg = d3.select(ref.current)
        //     .append("svg")
        //         .attr("width", width)
        //         .attr("height", height)

        // d3.json(dataUrl).then(data => {
        //     console.log("data from hooks: ", data)

        //     const rects = svg.selectAll("rect")
        //         .data(data)

        //     rects.enter()
        //         .append("rect")
        //             .attr("x", (d, i) => i * 100)
        //             .attr("y", (d, i) => height - (d.age * 10))
        //             .attr("width", 50)
        //             .attr("height", d => (d.age * 10))
        //             .attr("fill", (d) => {
        //                 return d.age > 10 ? colors.gray : colors.orange
        //             })
        // })
    }, [])
    
    return (<div ref={ref} />)
}

export default Chart;