# Exercice 3

## Préparation des données

1. Téléchargements des données en format .json

2. Préparation des données en plusieurs étapes dans preparer.js  :

   1.  Toutes les informations non pertinentes sont enlevées

       ```js
      // Revelants entries filtered
      const resultat = data
        .map(ville => ({ 
            canton: ville["Canton"], 
            power: ville["Scenario1_RoofsOnly_PotentialSolarElectricity_GWh"] 
        }));
       ```

   2. Calcule la somme pour chaque canton 


      ```js
      // Sums up entries on key match and pushes to holder[]
      
      let holder = [];
      let i = 0;
      
      const resultat.forEach((res) => {
        if (holder.length == 0) {
          holder.push(res);
        }
        if (holder[i].canton === res.canton) {
          holder[i].power += res.power;
        } else {
          i++;
          holder.push(res);
        }
      });
      ```

   3. Le résultat est préparer pour une sortie vers un fichier de type .json

      ```js
      console.log(JSON.stringify(holder));
      ```

      