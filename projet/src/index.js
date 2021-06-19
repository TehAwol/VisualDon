var $ = require('jquery');
var countries = require('countries-earnings.geo.json');
const {
    map
} = require('jquery');

var myMap = L.map('map').setView([28, 0], 2);
var info = L.control();

L.tileLayer('', {
    // attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 18,
}).addTo(myMap);

var countries = L.geoJson(countries, {
    style: styleEarnings,
    onEachFeature: onEachFeature
}).addTo(myMap);

function getColorEarnings(e) {
    return e > 40000000 ? '#99000d' :
        e > 10000000 ? '#cb181d' :
        e > 7500000 ? '#ef3b2c' :
        e > 5000000 ? '#fb6a4a' :
        e > 2500000 ? '#fc9272' :
        e > 1000000 ? '#fcbba1' :
        e > 500000 ? '#fee5d9' :
        e > 100000 ? '#fff5f0' :
        'white';
}

function getColorEarningsPop(e) {
    return e > 5 ? '#99000d' :
        e > 4.5 ? '#cb181d' :
        e > 3.5 ? '#ef3b2c' :
        e > 2.5 ? '#fb6a4a' :
        e > 1.5 ? '#fc9272' :
        e > 0.5 ? '#fcbba1' :
        e > 0.001 ? '#fee5d9' :
        'white';
};


function styleEarnings(feature) {
    return {
        fillColor: getColorEarnings(feature.properties.earnings),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7,
        color: 'white',
    };
}

function styleEarningsPop(feature) {
    return {
        fillColor: getColorEarningsPop(feature.properties.avgEarnings),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7,
        color: 'white',
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var mapMode = "earnings";

function resetHighlight(e) {
    if (mapMode === "earnings") countries.setStyle(styleEarnings);
    if (mapMode === "avgEarnings") countries.setStyle(styleEarningsPop);
    info.update();
}

function zoomToFeature(e) {
    myMap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    if (mapMode === "earnings") {
        this._div.innerHTML = '<h4>Total Earnings</h4>' + (props ?
            '<b>' + props.ADMIN + '</b><br />' + (props.earnings ? formatter.format(props.earnings) + ' earned total' : 'No data available') :
            'Hover over a country');
    } else if (mapMode === "avgEarnings") {
        this._div.innerHTML = '<h4>Earnings per Capita</h4>' +  (props ?
            '<b>' + props.ADMIN + '</b><br />' + (props.avgEarnings ? formatter.format(props.avgEarnings) + ' per capita' : 'No data available')
            : 'Hover over a country');
    }

};

info.addTo(myMap);

$('#btn-earnings').on('click', () => {
    mapMode = "earnings";
    countries.setStyle(styleEarnings);
    info.update();
})

$('#btn-earnings-avg').on('click', () => {
    mapMode = "avgEarnings";
    countries.setStyle(styleEarningsPop);
    info.update();

})