# Exercice 2

## Réactivité

La programmation réactive est une programmation qui permet de répondre à un changement dynamiquement au lieu de répondre à un évènement. Par exemple "a = b + c" : En programmation normale "a" ne changerai pas après avoir été instancié malgrès des changements à "b" ou "c" plus loin dans le programme. La programmation réactive permet de mettre à jour "a" à chaque fois qu'une changement est apporté à "b" ou "c" (le calcul est rexécuté à chaque modification)

Pour utiliser ceci en javascript nous pouvons nous tourner vers des framework tel que svelte qui permet un tel intégration ou tout simplement le codé de manière pseudo-réactive avec de l'évènementiel

