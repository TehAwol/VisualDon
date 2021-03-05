const data = require('./villes.json');

// const find = ville => ville["Canton"] && 
// ville["Scenario1_RoofsOnly_PotentialSolarElectricity_GWh"];

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

const resultat = data
.map(ville => ({canton: ville["Canton"], power: ville["Scenario1_RoofsOnly_PotentialSolarElectricity_GWh"]}))

const resultat2 = groupBy(resultat, 'canton').forEach(canton => canton.reduce(acc, cv))


