# Exercice 3 data.md
1. Téléchargement des données en format .js
2. Création du fichier preparer.js qui enlève les informations non nécessaire et additionne les valeurs d'énergies par Cantons
`js 
const resultat = data
.map(ville => ({canton: ville["Canton"], power: ville["Scenario1_RoofsOnly_PotentialSolarElectricity_GWh"]}))
`