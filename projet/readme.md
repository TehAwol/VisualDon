# Projet - https://vestermikk.github.io/

## Introduction 

Projet VisualDon de Martin Mertenant et Mikkel Vestergaard. Nous avons choisi d'explorer les gains dans l'esports, comment ces derniers ont évolués et comment cette industrie se globalise.

# Données

## Choix des données

Pour la mise en place des différents BarCharts nous avons utilisé le dataset de [« Esports Earnings 1998 – 2021 »](https://www.kaggle.com/rankirsh/esports-earnings) et plus particulièrement le fichier HistoricalEsportData.csv qui contient le nombre de gain par moi, joueurs et tournois pour chaque jeux.

Pour la carte nous avons utilisé [eSports Earnings by players][https://www.kaggle.com/jackdaoud/esports-earnings-for-players-teams-by-game] combiné avec le [GeoJSON des pays][https://datahub.io/core/geo-countries]. Nous avons également inséré [la population des pays][https://github.com/samayo/country-json/blob/master/src/country-by-population.json] et les codes ISO 2 et 3 pour faciliter le traitement des données.



## Préparation des données

### Bar charts

Plusieurs étapes dans la préparation des données, la première est la transformation du fichier CSV en JSON à l'aide de D3 et de la fonction d3.dsvFormat()

Pour la deuxième étape nous avons préparés les données en fonction du type de graphe voulu, il s'agit d'un BarChart représentant pour chaque année le top 5 des jeux avec le plus grand prix. Le graphe est interactif  et on peux naviguer d'année en année avec un slider.

Pour ce faire il a fallu regrouper pour les gains par année pour chaque jeu et ensuite pour chaque année sélectionner le top 5 des jeux avec les plus grands gains. le résultat est le suivant :

```json
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
Edit: Afin d'afficher les différents types de jeux vidéos nous avons dû joindre un autre dataset "GeneralEsportData" qui provient aussi de [« Esports Earnings 1998 – 2021 »](https://www.kaggle.com/rankirsh/esports-earnings) au dataset HistoricalEsportData. Le fichier json à cette forme là :

```json
 "1998": [
          {
               "Name": "Quake II",
               "Earnings": 66200,
               "Annee": "1998",
               "genre": "First-Person Shooter"
          },
```

Pour le graphe du total des gains par année, il a simplement suffit de regrouper le total des gains pour tous les jeux par année.

### Cartographie

Premièrement nous avons extrait tous les données pertinentes de highest_earning_players.csv pour combiner les bons pays avec leur code ISO respectif. 

```json
{"name":"United States","code":"US","earnings":43099336}
```

Finalement le jeu de données a été utilisé pour calculer le total de gains par pays et les gains par habitants afin de l'insérer directement dans le GeoJSON du pays en question. Ceci nous permet de générer la carte à partir d'uniquement un seul fichier et en plus sans devoir utiliser un tilelayer de leaflet. 

