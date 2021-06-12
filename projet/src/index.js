var countries = require('countries-earnings.geo.json');
var data = require('dataset.json');

var myMap = L.map('map').setView([28, 0], 2);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
}).addTo(myMap);

L.geoJSON(countries).addTo(myMap);


function getColor(d) {
    return d > 40000000 ? '#800026' :
           d > 10000000 ? '#800026' :
           d > 7500000  ? '#BD0026' :
           d > 5000000 ? '#E31A1C' :
           d > 2500000  ? '#FC4E2A' :
           d > 1000000   ? '#FD8D3C' :
           d > 500000   ? '#FEB24C' :
           d > 100000   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.earnings),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(countries, {style: style}).addTo(myMap);