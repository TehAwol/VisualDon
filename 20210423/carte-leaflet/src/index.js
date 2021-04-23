import L, { Icon } from 'leaflet';
import atm from './atms.json';

const map = L.map('mapid').setView([46.78104, 6.64707], 17);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 20,
    minZoom: 0,
    subdomains: 'abcd'
}).addTo(map);

const icon = L.icon({
    iconUrl: './atm-icon.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })

atm.map(d => {
    const [lon, lat] = d;
    L.marker([lat, lon], { icon } ).addTo(map);
});

console.log(icon)


