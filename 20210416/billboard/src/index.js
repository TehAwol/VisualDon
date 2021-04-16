import data from '../data/data.json';
console.log(data)

let noms = data.map(d => d.nom);
let dtv = data.map(d => d.dtv);

console.log(noms)

var chart = bb.generate({
    bindto: "#chart",
    data: {
        type: "bar",
        json: { "dtv": dtv },
        axis: { x: { 
            type: "category",
            categories: noms}}
    }
});