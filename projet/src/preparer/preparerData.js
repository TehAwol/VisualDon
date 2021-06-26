
const data2 = require('./barrace.json');
const data = require('./mixdata.json');
const fs = require('fs');


// plus utiliser
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const result = data2
    .map(d => ({ date: d.date, nom: d.jeu, totGain: d.totaldesGains}))
   .sort((a, b) => a.date > b.date ? -1 : 1);



const result2 = data

.map(d => ({nom: d.jeu, genre: d.genre}))





  let annee = [];
  let names = [];
  let earnings = [];
  let player =[];



  result.forEach((e) => {
       
       if (!annee.includes(e.date)) annee.push(e.date);
   });

   result.forEach((e) => {

    if (!names.includes(e.nom)) names.push(e.nom);
});




    // mise en place nom et date et total gain

    names.forEach(n => {

      annee.forEach(element => {

        let total = 0;
        let color =0;

        result.forEach(e => {
          if (n === e.nom && element === e.date) {
            total += parseInt(e.totGain);

          }
      })
  
      earnings.push({ Name: n, Earnings: total, Annee: element});
        
      });

  });




  // ajout du  genre en fonction de l'autre dataset
earnings.forEach(function(d) {
  var result = result2.filter(function(genre) {
      return genre.nom === d.Name;
  });
  d.genre = (result[0] !== undefined) ? result[0].genre : null;
});

  function recupAnne (Anne)
  {
    return earnings.filter(d=>d.Annee === Anne && d.Earnings >= 1000).sort((a, b) => a.Earnings > b.Earnings ? -1 : 1)
    .filter((d,i)=> i < 5);
  }



const toutAnnee = Array.from(new Set(earnings.map(d => d.Annee))).sort();



//iteration pour chaque annee
const resultat = toutAnnee.reduce( (r,d) => ({...r,[d]:recupAnne(d)}),({}));




// total par anne
let gainAnne = [];
annee.forEach(element => {

  let total = 0;

  result.forEach(e => {
    if (element === e.date) total += parseInt(e.totGain);
})

gainAnne.push({Earnings: total, Annee: element });

  
});


  //top 5 cashprize jeux par annee 
 fs.writeFileSync("JeuxParAnne",JSON.stringify(resultat,null,4), "utf-8")

 //tot par annee
 //const filterAnne= gainAnne.sort((a, b) => a.Anne > b.Anne ? 1 : -1);

// total cashprize par anne
//fs.writeFileSync("TotParAnne",JSON.stringify(filterAnne,null,3), "utf-8")