# Projet

## 23 Avril

Avec Martin Mertenat, nous allons travailler sur le dataset suivant : https://www.kaggle.com/rankirsh/esports-earnings. Nous cherchons également des données plus granulaires sur les gains dans l'esports. 

# Données

## Choix des données

Pour la mise en place des différents Bart chart nous avons utilisé le datasets de [« Esports Earnings 1998 – 2021 »](https://www.kaggle.com/rankirsh/esports-earnings) et plus particulièrement le fichier HistoricalEsportData.csv qui contient le nombre de gain par mois, joueur et tournois pour chaque jeux .

## Préparation des données

Plusieurs étapes dans la préparation des données, la première est la transformation du fichier CSV en JSON à l'aide de D3 et de la fonction d3.dsvFormat()

Pour la deuxième étape nous avons préparés les données en fonction du type de graphe voulu, il s'agit d'une bart chart représentant pour chaque années le top 5 des jeux avec le plus grand prix. Le graph est interactif  et on peux naviguer d'année en année avec un slider.

Pour ce faire il a fallu regrouper pour les gains par année pour chaque jeux et ensuite pour chaque années sélectionner le top  5 des jeux avec les plus grand gains. le résultat est le suivant :

```
"1998": [
​      {
     	 "Name": "Quake II",
​         "Earnings": 66200,
​         "Annee": "1998"
​      },
​      {
​         "Name": "QuakeWorld",
​         "Earnings": 43500,
​         "Annee": "1998"
​      },
etc......

```
Edit: Afin d'afficher les différentes type de jeux videos nous avons du joindre un autre dataSet "GeneralEsportData" qui provient aussi de [« Esports Earnings 1998 – 2021 »](https://www.kaggle.com/rankirsh/esports-earnings) au dataste HistoricalEsportData le fichier json à cette forme là :

```
 "1998": [
          {
               "Name": "Quake II",
               "Earnings": 66200,
               "Annee": "1998",
               "genre": "First-Person Shooter"
          },
```

Pour le graphe du total des gains par année, il à simplement suffit de regrouper le total des gains pour tous les jeux par année.
