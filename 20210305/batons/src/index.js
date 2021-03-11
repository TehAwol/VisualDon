import {
  axisLeft,
  select,
  scaleLinear,
  max,
} from 'd3'

const villes = require('../data.json');

// const DATA = [
//   { canton: 'Lausanne', power: 138905 },
//   { canton: 'Yverdon-les-Bains', power: 30143 },
//   { canton: 'Montreux', power: 26574 },
//   { canton: 'Renens', power: 21036 },
//   { canton: 'Nyon', power: 20533 },
//   { canton: 'Vevey', power: 19827 },
// ]

const WIDTH = 1000
const HEIGHT = 500
const MARGIN = 5
const MARGIN_LEFT = 50
const MARGIN_BOTTOM = 50
const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / DATA.length

const svg = select('body')
  .append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

const yScale = scaleLinear()
  .domain([0, max(DATA, d => d.power)])
  .range([HEIGHT - MARGIN_BOTTOM, 0])


const g = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)

g.selectAll('rect')
  .data(DATA)
  .enter()
  .append('rect')
  .attr('x', (d, i) =>  i * BAR_WIDTH)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('y', d => yScale(d.power))
  .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.power))
  .attr('fill', 'steelblue')

g.selectAll('text')
  .data(DATA)
  .enter()
  .append('text')
  .text(d => d.canton)
  .attr('x', (d, i) =>  i * BAR_WIDTH + BAR_WIDTH / 2)
  .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
  .attr('text-anchor', 'middle')

const axisY = axisLeft().scale(yScale)
  .tickFormat(d => `${d / 1000}k`)
  .ticks(5)

svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT - 3})`)
  .call(axisY)
