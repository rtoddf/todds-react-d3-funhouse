import React from "react";

const Navigation = () => {
    return (
        <div class="grid" data-col="3">
            <article class="panel">
                <h3>Simple</h3>
                <ul>
                    <li><a href="/simple/class/simple01">Simple 01 - Class</a></li>
                    <li><a href="/simple/hooks/simple01">Simple 01 - Hooks</a></li>
                    <li><a href="/simple/hooks/simple02">Simple 02 - Hooks</a></li>
                </ul>
            </article>
            <article class="panel">
                <h3>Maps - Projections</h3>
                <ul>
                    <li><a href="/maps/class/projections/albersusa">Albers USA - Class</a></li>
                    <li><a href="/maps/hooks/projections/albersusa">Albers USA - Hooks</a></li>

                    <li><a href="/maps/class/projections/sphericalmercator">Spherical Mercator - Class</a></li>
                    <li><a href="/maps/class/projections/sphericalmercator">Spherical Mercator - Hooks</a></li>

                    <li><a href="/maps/class/projections/orthographic">Orthographic - Class</a></li>
                    <li><a href="/maps/class/projections/orthographic">Orthographic - Hooks</a></li>
                </ul>

                {/* <h3>Maps - Proof of Concept</h3>
                <ul>
                    <li>Albers USA</li>
                </ul> */}
            </article>
        </div>
       
    )
}

export default Navigation;