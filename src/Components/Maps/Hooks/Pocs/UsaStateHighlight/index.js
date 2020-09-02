import React, {useRef, useEffect, useState} from "react";
import { select} from "d3";
import * as topojson from "topojson-client";
import { geoAlbersUsa, geoPath } from "d3-geo";

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

function AlbersUsa02() {
    const [topology, setTopology] = useState({});
    const svgRef = useRef();

    useEffect(() => {
        const container_parent = document.querySelector('.display')

        width = container_parent.offsetWidth
        height = width * .5

        Promise.all([us]).then(function(data) {
            setTopology(data[0])
        })

    }, [topology])

    if(topology && topology.objects){
        const svg = select(svgRef.current)
            .attrs({
                'width': width + margins.left + margins.right,
                'height': height + margins.top + margins.bottom,
                'preserveAspectRatio': 'xMinYMid',
                'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
            })

        const projection = geoAlbersUsa()
            .scale(width)
            .translate([ width/2, height/2 ]);

        const path = geoPath()
            .projection(projection);

        vis_group = svg.append('g')
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
    }

    return (
        <div className="display">
            <svg ref={svgRef} />
        </div>
    )
}

export default AlbersUsa02;