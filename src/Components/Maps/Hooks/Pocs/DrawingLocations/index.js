import React, {useRef, useEffect, useState} from "react";
import { select, event } from "d3";
import * as topojson from "topojson-client";
import { geoAlbersUsa, geoPath } from "d3-geo";
import "./default.css";

import us from '../../../../Data/topology/us.json';
import locations from '../../../../Data/info/us-state-locations.json';

let width, height, vis_group
// aspect

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

let tooltip = select('body').append('div')
    .attrs({
        'class': 'tooltip'
    })
    .style({
        'opacity': 1e-6
    })

function DrawingLocations() {
    const [topology, setTopology] = useState({});
    const [stateInfo, setStateInfo] = useState({});
    const svgRef = useRef();

    useEffect(() => {
        const container_parent = document.querySelector('.display')

        width = container_parent.offsetWidth
        height = width * .5

        Promise.all([us, locations]).then(function(data) {
            setTopology(data[0])

            // figure out how to take this out - it's not needed
            data[1].forEach(function(d){
                stateData[d.id] = {
                    'name': d.name,
                    'code': d.code,
                    'location': d.location,
                    'latitude': d.latitude,
                    'longitude': d.longitude,
                    'displayname': d.displayname
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
                'fill': (d) => stateData[d.id] && stateData[d.id].location ? defaults.colors.location : defaults.colors.land,
                'stroke': defaults.colors.strokeColor,
                'strokeWidth': defaults.colors.strokeWidth
            })

        vis_group.selectAll('circle')
            .data(stateInfo)
                .enter().append('circle')
            .attrs({
                'class': 'marker',
                'cx': (d) => d.longitude !== 0 && d.latitude !== 0 ? projection([ d.longitude, d.latitude ])[0]: '',
                'cy': (d) => d.longitude !== 0 && d.latitude !== 0 ? projection([ d.longitude, d.latitude ])[1]: '',
                'r': 5,
                'stroke': 'white'
            })
            .style('cursor', 'pointer')
            .on('mouseover', function(d){
                select('.tooltip')
                    .html('<span>' + d.displayname + '</span>')
                    .styles({
                        'left': (event.pageX) + 'px',
                        'top': (event.pageY - 35) + 'px'
                    })
                    .transition()
                        .duration(500)
                        .style('opacity', 1) 
            })
            .on('mouseout', function(d){
                select('.tooltip')
                    .transition()
                        .duration(200)
                        .style('opacity', 0) 
            })
            .on('click', function(d){
                select('.location-info-box')
                    .style('display', 'block')
    
                select('.location')
                    .html(d.displayname)
    
                select('.address')
                    .html(d.address)
    
                select('.email')
                    .html(d.email)
    
                select('.phone')
                    .html(d.phone)
            })
    }

    return (
        <div class="flex-container">
			<div class="flex-row">
                <div class="flex-item" data-weight="2">
                    <div className="display">
                        <svg ref={svgRef} />
                    </div>
                </div>
                <div class="flex-item">
                    <div className="location-info-box">
                        <h2 className="location">location</h2>
                        <h3 className="address">address</h3>
                        <h6>e: <span className="email"></span></h6>
                        <h6>p: <span className="phone"></span></h6>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default DrawingLocations;