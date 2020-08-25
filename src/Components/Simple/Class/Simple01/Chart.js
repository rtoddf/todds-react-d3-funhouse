import * as d3 from "d3";

const width = 500,
    height = 300

const colors = {
    gray: "gray",
    orange: "orange"
}
// data = [20, 12, 16, 25, 20];
const dataUrl = "https://udemy-react-d3.firebaseio.com/ages.json";

export default class D3Chart {
    constructor(element) {
        const svg = d3.select(element)
            .append("svg")
                .attr("width", width)
                .attr("height", height)

        d3.json(dataUrl).then(data => {
            console.log("data from class: ", data)

            const rects = svg.selectAll("rect")
                .data(data)

            rects.enter()
                .append("rect")
                    .attr("x", (d, i) => i * 100)
                    .attr("y", (d, i) => height - (d.age * 10))
                    .attr("width", 50)
                    .attr("height", d => (d.age * 10))
                    .attr("fill", (d) => {
                        return d.age > 10 ? colors.gray : colors.orange
                    })
        })
        // console.log(d3.select(element))
    }

    createSomething() {
        
    }
}