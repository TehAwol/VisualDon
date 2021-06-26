var fs = require('fs');

var countries = require('./countries.geo.json');
var iso3 = require('./iso3.json');
var pop = require('./countries-population.json');
var data = require('./dataset.json');

iso3.forEach(c => {
    data.forEach(d => {
        if (d.code === c.iso2) {
            d["iso3"] = c.iso3;
            d["code"] = d["iso2"];
            d["iso2"] = c["iso2"];
            d["population"] = pop[d.iso2];
        };
    });
});

data.forEach(d => {
    countries.features.forEach(c => {
        if (d.iso3 === c.properties.ISO_A3) {
            c.properties["earnings"] = d.earnings;
            c.properties["population"] = d.population;
            c.properties["avgEarnings"] = d.earnings / d.population;
        };
    });
});



fs.writeFile('countries-earnings.geo.json', JSON.stringify(countries), (err, res) => {
    if (err) console.log("error : " + err);
});