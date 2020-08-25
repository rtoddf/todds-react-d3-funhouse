import React, { Component } from 'react';
import Map from "./Map";

export default class MapWrapper extends Component {
    componentDidMount() {
        new Map(this.refs.map)
    }

    render() {
        return <div ref="map"></div>
    }
}