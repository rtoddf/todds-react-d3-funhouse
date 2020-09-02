import React, {useRef, useEffect, useState} from "react";
import { select, tsv } from "d3";
import * as topojson from "topojson-client";
import { geoAlbersUsa, geoPath } from "d3-geo";

import us from '../../../../Data/topology/us.json';
import info from '../../../../Data/info/us-states-locations.tsv';

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

let stateData = {}
// var data_set
// var party_map = true,
//     same_sex_map = false,
//     age_of_consent_map = false

function AlbersUsa02() {
    const [topology, setTopology] = useState({});
    const [stateInfo, setStateInfo] = useState({});
    const svgRef = useRef();

    function state_party_fill(d){
        console.log('d.id: ', d)
        // console.log('stateData: ', stateData)
        // var location = stateData[d.id].location
        // if(location == 'true'){
        //     return '#e91d0e'
        // } else {
        //     return 'white'
        // }
        return 'red'
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
                    'party': d.location
                }
            })

            setStateInfo(data[1])
        })

    }, [topology])

    if(topology && topology.objects && stateInfo){
        console.log('stateInfo: ', stateInfo)


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
            .datum(topojson.feature(topology, topology.objects.states, function(a, b){
                return a !== b
            }))
            .attrs({
                'd': path,
                'fill': function(d){
                    console.log('d in function: ', d)
                    return state_party_fill(d.features)
                },
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