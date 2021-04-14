/* Module imports */
import * as d3 from 'd3';

/* Json imports */
import data from './data/graph.json';

// DATA STRUCTURE
// {
//     "indicator": {
//         "id": "SP.POP.TOTL",
//         "value": "Population, total"
//     },
//     "country": {
//         "id": "CN",
//         "value": "China"
//     },
//     "countryiso3code": "CHN",
//     "date": "2020",
//     "value": null,
//     "unit": "",
//     "obs_status": "",
//     "decimal": 0
// }

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 100},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#dataviz") // Select element
    .append("svg") // Append svg element
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g") // Append g element (chart)
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// parce date format
const formatDate = d3.timeParse('%Y');
const DATA = data.map(d => ({...d, date: formatDate(d.date)}));

// define timescale for year axis
const scaleX = d3.scaleTime()
    .range([0, width])
    .domain(d3.extent(DATA, d => d.date))

// define linear scale for population axis
const scaleY = d3.scaleLinear()
    .range([height, 0])
    .domain(d3.extent(DATA, d => d.value))


const linePathCreator = d3.line()
    .x(d => scaleX(d.date))
    .y(d => scaleY(d.value))
    .curve(d3.curveBasis)

const line = svg.append('path')
    .attr('d', linePathCreator(DATA))
    .attr('fill', 'none')
    .attr('stroke', 'red')

const legend = svg.selectAll('text')
    .data(DATA)
    .enter()
    .append('text')
    .attr('x', (d, i) => width / i) // DEBUG LINE
    .attr('y', height - margin.bottom + 50)
    .attr('text-anchor', 'middle')
    .text(function(d) { return d.date.getFullYear()})
    .style('font-family', 'arial')
    .style('font-size', '10')

const axisY = d3.axisLeft().scale(scaleY);

const axisX = d3.axisBottom().scale(scaleX);

svg.append('g')
    .attr('transform', `translate(${-margin.top})`) // Move margin along x axis
    .call(axisY)

