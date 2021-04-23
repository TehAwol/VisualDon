const data = require('./data.json');

const result = data.features
    .filter( d => d.geometry.type === 'Point' && d.properties.amenity === 'atm')
    .map(d => d.geometry.coordinates);

console.log(JSON.stringify(result))



// {
//     "type": "Feature",
//     "properties": {
//       "@id": "node/275006782",
//       "alt_name": "Postomat",
//       "amenity": "atm",
//       "cash_in": "no",
//       "currency:CHF": "yes",
//       "currency:EUR": "yes",
//       "drive_through": "yes",
//       "operator": "Postfinance"
//     },
//     "geometry": {
//       "type": "Point",
//       "coordinates": [
//         6.622356,
//         46.7896198
//       ]
//     },
//     "id": "node/275006782"
//   },