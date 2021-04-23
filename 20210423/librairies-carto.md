# Librairies Carto

1. Pourquoi doit-on projeter des données cartographiques?
   Les données cartographiques doivent être projetés car elle sont tiré d'un globe. Un globe ne pouvant être déconstruit de manière cohésive sur une surface 2D, nous utilisons des projections pour "projeter" un globe en 2D.

2. Qu'est ce qu'Open street map?

   OSM est une sorte de wikipedia géographique qui permet aux contributeurs d'ajouter des informations géographiques telles que des routes, arbres, bars, etc...

   Étant Open Source, toutes ces données sont rendu disponible au grand public.

3. Quelles fonctions D3 sont spécifiques à la cartographie?

   geoPath, projection, geoNaturalEarth

4. À quoi sert le format topojson? En quoi est-il différent du geojson?

   topojson est une extension de geojson qui sert a cartographier/encoder la topologie. Les fichiers topojson sont également optimisés (évite la redondance de la géométrie discrète de geojson), parfois jusqu'à 80%. 

5. À quoi sert `turf`? Décrivez ce que font trois fonctions de cette libraire

   turf est une librairie js qui permet d'utiliser de manière modulaire plusieurs algorithmes lié à la cartographie (l'analyse cartographique). Voici 3 fonctoins aléatoires :

   1. explode : Prend une série de features et retourne tout les positions comme des points
   2. centroid : Prend une série de features et retourne le centre (centroide) comme un point
   3. intersect : Prend 2 polygônes et retourne leur intersection si elle existe