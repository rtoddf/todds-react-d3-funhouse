import React, {useRef, useEffect, useState} from "react";
import { select, tsv } from "d3";
import * as topojson from "topojson-client";
import { geoAlbersUsa, geoPath } from "d3-geo";

import us from '../../../../Data/topology/us.json';
import info from '../../../../Data/info/us-states-locations.tsv';
import locations from '../../../../Data/info/drawing-locations.json';

let width, height, vis_group, aspect

const margins = {top: 0, right: 20, bottom: 20, left: 20}
const defaults = {
    colors: {
        land: '#ababab',
        location: '#00b3f0',
        strokeColor: '#fff',
        strokeWidth: 2,
    }
}

let stateData = {}

function DrawingLocations() {
    const [topology, setTopology] = useState({});
    const [stateInfo, setStateInfo] = useState({});
    const svgRef = useRef();

    function state_location_fill(d){
        if(stateData[d.id]){
            return stateData[d.id].location == 'true' ? defaults.colors.location : defaults.colors.land
        }
    }

    useEffect(() => {
        const container_parent = document.querySelector('.display')

        width = container_parent.offsetWidth
        height = width * .5

        Promise.all([us, tsv(info)]).then(function(data) {
            setTopology(data[0])

            data[1].forEach(function(d, i){
                stateData[d.id] = {
                    'name': d.name,
                    'code': d.code,
                    'location': d.location
                }
            })

            setStateInfo(data[1])
        })

    }, [topology])

    if(topology && topology.objects && stateInfo){
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
        vis_group.selectAll('path')
            .data(topojson.feature(topology, topology.objects.states).features)
            .enter().append('path')
            .attrs({
                'd': path,
                'fill': d => state_location_fill(d),
                'stroke': defaults.colors.strokeColor,
                'strokeWidth': defaults.colors.strokeWidth
            })
    }

    return (
        <div className="display">
            <svg ref={svgRef} />
        </div>
    )
}

export default DrawingLocations;