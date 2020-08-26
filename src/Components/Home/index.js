import React from "react";
import Navigation from './Navigation';

import "../../css/layouts.css";
import "../../css/displays.css";
import "../../css/visstyles.css";

const Home = () => {
    return (
        <div className="container">
            <header>
				<h2>D3js Map Visualisations</h2>
				<p>"D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML,
					SVG, and CSS. D3’s emphasis on web standards gives you the full capabilities of modern browsers without tying yourself
					to a proprietary framework, combining powerful visualization components and a data-driven approach to DOM
					manipulation." - <a href="http://d3js.org/" target="_blank">d3js.org</a></p>
				
				<h3>Note: D3 is now in version 5. These are my past proof of concepts recoded for the new version.</h3>
			</header>
            <Navigation />
            <header>
				<h2>D3 Map Projections</h2>
				<p>What is a projection?</p>
				<p>Globes are the best representation of the earth because all distance, areas, and shapes are proportionally correct.
					Unfortunately globes of any size are rather inconvenient to tote about and store, and detailed images of even a large
					country would require globes larger than a room. Using portions of a globe would work but they still don't lie down
					flat and would be like trying to store large potato chips (potato crisps) of all different sizes in book form.</p>
				<p>To deal with this problem ancient peoples created maps. The earliest maps only showed very small portions of the
					earth and were very serviceable without worrying about spheres and such nonsense — indeed, they were not made as
					replacements for globes at all. But the Greeks had grander plans and by at latest 600 BC the idea arose of projecting
					the globe onto a developable surface. This launched cartography, the science of mapmaking. A developable surface is a
					surface that is capable of being unrolled onto a plane. Without allowing a surface having ripples, creases, or tears
					(all of which have critical drawbacks), a cylinder; a cone, and a plane (which was 2-dimensional to start with) are
					the only three objects that can be developed.</p>
				<p>These three surfaces give rise to the three natural projection classes that have members — true projections — which
					can be displayed physically by projecting a light source through a transparent globe onto a developable surface used
					as a screen. The classes are called cylindrical, conic, and azimuthal (because all azimuths from the center are
					straight lines and their directions are true).</p>
				<p>Within the natural projection classes are many projections that cannot be projected physically, but rather are
					derived mathematically. They still fit within the three classes because they have similar appearances and obey certain
					critical mathematical rules. Any representation of the globe or part of the globe on a flat surface, such as a sheet
					of paper, can be called a projection.</p>
				
				<p>Several common projections are included with default build of D3. Numerous less-common projections are available in
					the extended geographic projections plugin and the polyhedral projection plugin.</p>
				<p>Most projections provided by D3 are created via d3.geo.projection and are configurable: you can rotate the globe,
					scale or transform the canvas, etc. Unless you’re implementing a new raw projection, you probably won’t use the
					d3.geo.projection constructor, but you are likely to use the configuration methods.</p>
			</header>
        </div>
    )
}

export default Home;