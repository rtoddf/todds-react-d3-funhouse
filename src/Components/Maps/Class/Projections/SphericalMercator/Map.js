import * as d3 from "d3";
// import {selection, select} from "d3-selection";
import * as topojson from "topojson-client";
import "d3-selection-multi";
import world50m from '../../../../Data/topology/world-50m.json';

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
        width = element.offsetWidth - margins.left - margins.right
        height = width * .6

        var projection = d3.geoMercator()
            .scale((width + 1) / 2 / Math.PI)
            .translate([ width / 2, height / 2 ])
            .precision(.1)

        var path = d3.geoPath()
            .projection(projection)

        var graticule = d3.geoGraticule()

        const vis = d3.select(element)
            .append("svg")
                .attrs({
                    'width': width + margins.left + margins.right,
                    'height': height + margins.top + margins.bottom,
                    'preserveAspectRatio': 'xMinYMid',
                    'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
                })

        

        Promise.all([world50m]).then(function(data) {
            const topology = data[0]

            vis_group = vis.append('g')
                .attrs({
                    'transform': 'translate(' + margins.left + ', ' + margins.top + ')'
                })

            vis_group.append('rect')
                .attrs({
                    'width': width + margins.left + margins.right,
                    'height': height + margins.top + margins.bottom,
                    'fill': 'rgba(87,146,174,.5)'
                })
            
            vis_group.append('path')
                .datum(graticule)
                .attrs({
                    'd': path,
                    'fill': defaults.colors.none,
                    'stroke': defaults.colors.stroke,
                    'stroke-width': defaults.colors.strokeWidth,
                    'stroke-opacity': defaults.colors.strokeOpacity
                })

            vis_group.append('path')
                .datum(topojson.feature(topology, topology.objects.land))
                .attrs({
                    'class': 'land',
                    'd': path,
                    'fill': defaults.colors.land
                })
        
            vis_group.append('path')
                .datum(topojson.mesh(topology, topology.objects.countries), function(a, b){
                    return a !== b
                })
                .attrs({
                    'class': 'boundary',
                    'd': path,
                    'stroke': defaults.colors.stroke,
                    'stroke-width': defaults.colors.strokeWidth,
                    'fill': defaults.colors.none
                })
        })
    }
}