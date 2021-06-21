import 'css/main.css';
import {
    axisLeft,
    select,
    scaleLinear,
    scaleTime,
    max,
    scaleOrdinal,
    scaleSequential,
    axisRight,
    axisBottom,
    colo
  } from 'd3'
  
  import d3color, { schemePastel1, schemeSet1,interpolateViridis } from 'd3-scale-chromatic';
  
  import slider2 from "d3-simple-slider"
  import DATA from "./data/JeuxParAnne.json"
  import DATA2 from "./data/TotParAnne.json"
  

var $ = require('jquery');
var countries = require('./data/countries-earnings.geo.json');
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

 //donne de depart à 1998
 const donneStart = DATA["1998"];
 const colors = schemePastel1
 // mise en place graphe
 const WIDTH = 1000
 const HEIGHT = 500
 const MARGIN = 5
 const MARGIN_LEFT = 50
 const MARGIN_BOTTOM = 50
 const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / 5
 
 let nom =[];
 let uniquenom = [];
 let elem = [];
 
 for (let index = 1998; index < 2012; index++) {
   elem = DATA[index];
   elem.forEach(e => {
     nom.push(e.Name);
   });
   
 }
 uniquenom = getUnique(nom);
 
 var myColor = scaleOrdinal().domain(uniquenom)
 .range(schemePastel1)
   
 
 const svg = select("#chart")
   .append('svg')
   .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
 
   ///
 
 
 const yScale = scaleLinear()
   .domain([0, max(donneStart, d => d.Earnings)])
   .range([HEIGHT - MARGIN_BOTTOM, 0])
 
 
 
 const g = svg.append('g')
   .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
 
   const rect = g.selectAll('rect')
   .data(donneStart)
   .enter()
   
   .append('rect')
   .attr('x', (d, i) =>  i * BAR_WIDTH)
   .attr('width', BAR_WIDTH - MARGIN)
   .attr('y', d => yScale(d.Earnings))
   .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.Earnings))
   //.attr('fill', function(d,i){return colors[i]})
 
 
 
 const text = g.selectAll('text')
   .data(donneStart)
   .enter()
   .append('text')
   .text(d => d.Name)
   .attr('x', (d, i) =>  i * BAR_WIDTH + BAR_WIDTH / 2)
   .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
   .attr("font-size","10px")
 
   .attr('text-anchor', 'middle')
 
 const axisY = axisLeft().scale(yScale)
   .tickFormat(d => `${d / 1000}k`)
   .ticks(10)
 
 
 
 
 const axis = svg.append('g')
   .attr('transform', `translate(${MARGIN_LEFT - 3})`)
   .call(axisY)
 
   function getUnique(array){
     var uniqueArray = [];
     
     // Loop through array values
     for(let i=0; i < array.length; i++){
         if(uniqueArray.indexOf(array[i]) === -1) {
             uniqueArray.push(array[i]);
         }
     }
     return uniqueArray;
 }
 
 // gestion slider
 var slider = document.getElementById("myRange");
 var output = document.getElementById("demo");
 var textEplicatif = document.getElementById("textExplicatif")
 
 output.innerHTML = slider.value;
 
 slider.oninput = function() {
   output.innerHTML = this.value;
   
 }
 
 
 // event slider gestion move
 slider.addEventListener("input", e => {
   
  
   const a = e.target.value;
   const donnee = DATA[a];
 
 
 
   uniquenom = getUnique(nom);
   // texte eplicatif pour anne X
   if (a ===  "1998")
   {
       textEplicatif.textContent = "Prémices de l’eSport moderne avec les jeux de tires à la première personne « FPS » comme Quake et création de la Cyber athlète Professional League « CPL » une association pionnière dans l’organisation de tournois de jeux vidéos et plus particulièrement sur les FPS comme Quake et Cunter Strike";
   }else if (a ===  "1999")
   {
     textEplicatif.textContent = "Sortie de Brood War, l’extension du jeu de stratégie en temps réel (RTS) de star Craft";
   } else if (a ===  "2000")
   {
     textEplicatif.textContent = "Sortie de célèbre FPS Counter Strike par l’éditeur valve qui est le jeu qui vas provoquer l’émergence de l’eSport dans le monde car il regroupe toutes les caractéristiques d’un sport traditionnel tel que le travail d’équiper la coopération, les réflexes mais surtout l’égalité des chances car il demande peux de ressources matérielles et possède un principe de jeux simple et prenant mais difficile à maitriser. "
     "Il est encore aujourd’hui le jeu multijoueur en ligne de référence ";
   } else if (a === "2001") 
   {
     textEplicatif.textContent = "Domination des FPS mais surtout de Cunter-Strike dans les différents tournois. Sortie ";
   }else if (a === "2005") 
   {
     textEplicatif.textContent = "Apparition du jeux Painkiller un FPS avec un gameplay similaire à son grand frère Quake et il fera son unique apparition dans ce classement du au choix de ce dernier par la CPL avec un tournois international dont le cahsprizes était de 510,000.00à$";
   }else{
     textEplicatif.textContent = "";
   }
   
 
   yScale.domain([0, max(donnee, d => d.Earnings)])
 
   rect.data(donnee)
   .transition()
   .attr('y', d => yScale(d.Earnings))
   .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.Earnings))
   .attr("fill", function(d){return myColor(d.Name) })
 
   text.data(donnee)
   .text(d => d.Name)
 
 
   axis
     .transition()
     .call(axisY)
 
  
 });
 
 
 
 
 ////-------------------------------------------- second graph ---------------------
 
 const BAR_WIDTH2 = (WIDTH - MARGIN_LEFT) / 24
 
 const svg2 = select("#chart2")
 .append('svg')
 .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
 
 ///
 
 
 const yScale2 = scaleLinear()
 .domain([0, max(DATA2, d => d.Earnings)])
 .range([HEIGHT - MARGIN_BOTTOM, 0])
 
 
 const g2 = svg2.append('g')
 .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
 
 
 const rect2 = g2.selectAll('rect')
 .data(DATA2)
 .enter()
 .append('rect')
 .attr('x', (d, i) =>  i * BAR_WIDTH2)
 .attr('width', BAR_WIDTH2 - MARGIN)
 .attr('y', d => yScale2(d.Earnings))
 .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale2(d.Earnings))
 .attr('fill', function(d,i){return colors[i]})
 
 
 const text2 = g2.selectAll('text')
 .data(DATA2)
 .enter()
 .append('text')
 .text(d => d.Annee)
 .attr('x', (d, i) =>  i * BAR_WIDTH2 + BAR_WIDTH2 / 2)
 .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
 .attr("font-size","10px")
 
 .attr('text-anchor', 'middle')
 
 const axisY2 = axisLeft().scale(yScale2)
 .tickFormat(d => `${d / 1000}k`)
 .ticks(5)
 
 const axis2 = svg2.append('g')
 .attr('transform', `translate(${MARGIN_LEFT - 3})`)
 .call(axisY2)
 