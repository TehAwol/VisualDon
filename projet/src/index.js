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
    pointer,
  } from 'd3'
  
  import d3color, { schemePastel1, schemeSet1,interpolateViridis } from 'd3-scale-chromatic';
  
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
    minZoom: 2,
    maxZoom: 6,
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
    return e > 4.5 ? '#005824' :
        e > 3 ? '#238b45' :
        e > 3.5 ? '#41ae76' :
        e > 2.5 ? '#66c2a4' :
        e > 1.5 ? '#99d8c9' :
        e > 0.5 ? '#ccece6' :
        e > 0.001 ? '#edf8fb' :
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
 .range(["#00876c","#42977f" ,"#67a793", "#88b8a8","#a8c8bd", "#c8d8d2","#e8e8e8","#eacdcd","#eab3b3","#e79899","#e37c80","#dc5f68","#d43d51"])

 var colorRed = scaleLinear()
 .domain([0,21])
 .range(['white', 'red'])
   
 
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
   .attr("font-size","15px")
 
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
 var textEplicatif2 = document.getElementById("textExplicatif2")
 
 output.innerHTML = slider.value;
 
 slider.oninput = function() {
   output.innerHTML = this.value;
   
 }

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
 .attr('color', '#ffffff')
 
 const text2 = g2.selectAll('text')
 .data(DATA2)
 .enter()
 .append('text')
 .text(d => d.Annee)
 .attr('x', (d, i) =>  i * BAR_WIDTH2 + BAR_WIDTH2 / 2)
 .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
 .attr("font-size","15px")
 .attr('text-anchor', 'middle')
 
 const axisY2 = axisLeft().scale(yScale2)
 .tickFormat(d => `${d / 1000}k`)
 .ticks(8)
 
 const axis2 = svg2.append('g')
 .attr('transform', `translate(${MARGIN_LEFT - 3})`)
 .call(axisY2)

 const label = svg.append('text')
  .attr('text-anchor', 'middle')
  .style("font-size", "15px")
  .attr('stroke', '#264653')
 
  // gestion souris sur rect
 const sourisMove = (e, d) => {
  const [x, y] = pointer(e)
  label
    .attr('x', x)
    .attr('y', y - 20)
    .text("Catégorie : "
    + d.genre)
 }

rect.on('mouseover', sourisMove)
rect.on('mousemove', sourisMove)
rect.on('mouseout', () => label.text(''))
 // event slider gestion move
 slider.addEventListener("input", e => {
   let year = e.target.value;  
    getSliderYear(year);
 });
 
 const getSliderYear = (year) => {
  let a = year; 
  let donnee = DATA[year];



  uniquenom = getUnique(nom);
  // texte eplicatif pour anne X
  if (a ===  "1998")
  {
      textEplicatif.textContent = "Prémices de l’eSport moderne avec les jeux de tire à la première personne « FPS » comme Quake et création de la Cyber athlète Professional League (CPL) une association pionnière dans l’organisation de tournois de jeux vidéo et plus particulièrement sur les FPS ";
  }else if (a ===  "1999")
  {
    textEplicatif.textContent = "Sortie de Brood War, l’extension du jeu de stratégie en temps réel (RTS) de star Craft Et premier grand tournois coréen organisé avec l’approbation de l’éditeur du jeux blizzard.";
  } else if (a ===  "2000")
  {
    textEplicatif.textContent = "Sortie de célèbre FPS Counter Strike par l’éditeur valve qui est le jeu qui vas provoquer l’émergence de l’eSport dans le monde car il regroupe toutes les caractéristiques d’un sport traditionnel tel que le travail d’équiper la coopération, les réflexes mais surtout l’égalité des chances car il demande peux de ressources matérielles et possède un principe de jeux simple et prenant mais difficile à maitriser. "
    "Il est encore aujourd’hui le jeu multijoueur en ligne de type FPS de référence ";
  } else if (a === "2001") 
  {
    textEplicatif.textContent = "Domination des FPS avec Cunter-Strike Quake ou encore Unreal mais aussi des jeux de stratégie de type RTS avec Starcraft et Age of Empire II ";
  }else if (a === "2002") 
  {
    textEplicatif.textContent = "Sortie de Return to Castle Wolfenstein un FPS basé sur le moteur de jeux de Quake 3 et sur le jeu original Wolfenstein 3D";
  }else if (a === "2003") 
  {
    textEplicatif.textContent = "Sortie de Warcraft III un RTS qui est le troisième volet de la série Warcrafr. L’action du jeu se déroule dans un univers fantasy peuplé de différentes factions comme les orcs, les elfes et autre créatures imaginaires.";
    textEplicatif2.textContent ="Sortie du jeux Halo un FPS se déroulant dans un futur proche et mettant en conformation une race alien contre les humains. Le point fort du jeu est qu’il propose un scénario prenant et très poussé pour ce genre de jeu"
  }else if (a === "2005") 
  {
    textEplicatif.textContent = "Apparition du jeux Painkiller un FPS avec un gameplay similaire à son grand frère Quake et il fera son unique apparition dans ce classement du au choix de ce dernier par la CPL avec la mise en place d’un tournois international.";
  }else if (a === "2006") 
  {
    textEplicatif.textContent = "Plusieurs grands tournois se déroulent cette année sur Counter Strike tel que la CPL et les World e-Sports Games";
  }else if (a === "2007") 
  {
    textEplicatif.textContent = "Pas de réel changement jusque dans les années 2010, on retrouve dans le top le même genre de jeux avec leur suite comme Counter Strike : source et Halo 2";
  }else if (a === "2009") 
  {
    textEplicatif.textContent = "Unique apparition du célèbre et plus populaire jeu de rôle en ligne massivement multijoueur (MMORPG) World of Warcraft sortie en 2004 basé sur l’univers fantasy de Warcraft. En cause la BlizzCon 2009 Arena tournement un tournois par Blizzard l’éditeur du jeu";
  } else if (a === "2011") 
  {
    textEplicatif.textContent= "Changement de style de jeux dans le paysage de l’eSport, dès les années 2010 les jeux de type Multiplayer online battle arena 'MOBA' font leur apparition avec Dota 2 et League of Legends tout deux inspirées de « Defense of the Ancients » un mode de jeux de Warcraft 3";
  } else if (a === "2012") 
  {
    textEplicatif.textContent = "Deuxième édition des Championnats du monde de League of Legends avec un total d’'un million de dollars pour le vainqueur. On remarque aussi que les top est composé de trois jeux de type MOBA avec l’arrivé de Heroes of Newerth";
  } else if (a === "2015") 
  {
    textEplicatif.textContent = "Sortie de SMITE un jeux surfant sur la mode des MOBA mais avec cette fois une vue à la première personne";
  }
  else if (a === "2016") 
  {
    textEplicatif.textContent = "L’éditeur blizzard sort lui aussi son jeu de type MOBA réunissant tout les héros de sa franchise comme Warcraft, Diablo ou encore StrarCraft";
  }

  else if (a === "2018") 
  {
    textEplicatif.textContent = "Première apparition d’un nouveau type de jeux le battle royal. Ce sont principalement des jeux de tirs ou les joueurs se battent dans une arène ou le but est de survire le plus longtemps et arrivé à être le dernier en vie à la fin de la partie. Parmi les plus connus on retrouve ici Fortnite et PUBG";
  }

  else if (a === "2020") 
  {
    textEplicatif.textContent = "Sortie de Arena of Valor un MOBA disponible sur mobile IOS et Android";
  }else
  {
    textEplicatif.textContent ="";
    textEplicatif2.textContent="";
  }

  yScale.domain([0, max(donnee, d => d.Earnings)])

  rect.data(donnee)
  .transition()
  .attr('y', d => yScale(d.Earnings))
  .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.Earnings))
  .attr("fill", function(d){return myColor(d.Name) })
  

  text.data(donnee)
  .text(d => d.Name)

  rect2.data(DATA2)
  .transition()
  .attr("fill", function(d){if(d.Annee === a){return "#FF616D"} else {return '#C8D8D2'}})


  axis
    .transition()
    .call(axisY)
 } 
 
 getSliderYear("1998");
 
 