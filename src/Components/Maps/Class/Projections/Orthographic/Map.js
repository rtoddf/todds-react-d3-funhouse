import * as d3 from "d3";
// import {selection, select} from "d3-selection";
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

export default class Map {
    constructor(element) {
        console.log('element: ', element.offsetWidth)

        width = element.offsetWidth - margins.left - margins.right
        height = width * .6

        var projection = d3.geoAlbersUsa()
            .scale(width)
            .translate([ width/2, height/2 ]);

        var path = d3.geoPath()
            .projection(projection);

        const vis = d3.select(element)
            .append("svg")
                .attrs({
                    'width': width + margins.left + margins.right,
                    'height': height + margins.top + margins.bottom,
                    'preserveAspectRatio': 'xMinYMid',
                    'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
                })

        Promise.all([us]).then(function(data) {
            const topology = data[0]

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
    }
}