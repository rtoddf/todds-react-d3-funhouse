import React, { Component } from 'react';
import Chart from "./Chart";

export default class ChartWrapper extends Component {
    componentDidMount() {
        new Chart(this.refs.chart)
    }

    render() {
        return <div ref="chart"></div>
    }
}