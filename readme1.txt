# K-Drama World

Site web sur les K-dramas réalisé dans le cadre de ma formation. Il présente une sélection de séries coréennes par catégorie, les prochaines sorties avec un compte à rebours, une page de contact, et une recherche de séries connectée à l'API TMDb.

## Fonctionnalités

Le site contient 4 pages, toutes reliées par la même barre de navigation (menu repliable sur mobile) et le même pied de page. Les titres apparaissent progressivement quand on fait défiler la page.

### Accueil (`acceuil.html`)
- Bannière avec un bouton qui mène à la page « À voir »
- Message de bienvenue qui change selon l'heure (bonjour, bon après-midi, bonsoir)
- Carrousel de 3 affiches qui défile automatiquement toutes les 3 secondes
- Formulaire d'inscription à la newsletter avec vérification de l'e-mail

### À voir (`avoir.html`)
- 3 catégories (Romance, Action, Comédie) avec des liens vers chaque section
- Une section « Populaire » avec 2 séries mises en avant
- 21 séries affichées avec leur affiche et leur titre
- Barre de recherche : les séries se filtrent en direct pendant la saisie
- Recherche via l'API TMDb, qui affiche l'affiche, le titre et la note des séries trouvées. J'ai choisi d'interroger la catégorie séries de TMDb (et non films) pour que les résultats correspondent mieux aux K-dramas

### Prochaines sorties (`prochainesortie.html`)
- 5 productions à venir avec affiche, résumé et date de sortie
- Compte à rebours calculé à partir de la date de chaque série
- Étiquettes de couleur selon le temps restant avant la sortie

### Contact (`contact.html`)
- Section « À propos de nous »
- Formulaire (nom, e-mail, message) avec vérification des champs et du format de l'e-mail
- Coordonnées du site

Les formulaires de contact et de newsletter affichent un message de confirmation, mais n'envoient aucune donnée à un serveur.

## Technologies utilisées

- HTML5
- CSS3
- Bootstrap 5.3.2 (CDN)
- Bootstrap Icons 1.11.1 (CDN)
- Google Fonts (Poppins)
- JavaScript
- API TMDb (The Movie Database)

## Design

Le thème est sombre avec des accents rose et violet. Les couleurs sont définies avec des variables CSS dans `styles.css`. Les affiches et les cartes réagissent au survol, et la grille des prochaines sorties s'adapte à la taille de l'écran.

## Structure du projet

```
kdrama-css/
├── acceuil.html
├── avoir.html
├── prochainesortie.html
├── contact.html
├── styles.css
├── script.js
└── *.jpg          (affiches et images)
```

## Installation et lancement

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/barcasara15-max/kdrama-css.git
   ```
2. Ouvrir le dossier du projet.
3. Ouvrir `acceuil.html` dans un navigateur.

Une connexion internet est nécessaire pour charger Bootstrap, la police et l'API TMDb.

## Utiliser l'API TMDb

La recherche utilise l'endpoint de recherche de séries de TMDb (`search/tv`) plutôt que celui des films, afin de cibler les K-dramas. Elle demande une clé API TMDb :

1. Créer un compte sur [themoviedb.org](https://www.themoviedb.org/) et récupérer une clé API.
2. Dans `script.js`, remplacer la valeur de `apiKey` par ta clé.
3. Ouvrir `avoir.html` et écrire un titre dans la barre de recherche.
