# Application front récupération de sorties de manga

## Info
- Technology: React

### Description 
Récupère les données depuis une api puis me notifie quand c'est arrivé. 
Marque les mangas déjà lus.

## Fonctionnalités

### PMV

- Créer un compte
- Choisir les mangas que je veux regarder (recherche de manga) et les ajouter à ceux que je suis
- Récupérer les mangas sortis quand je lance l'appli
- Créer un lien vers le reader de préférence (fanfox ou mangarock, etc.) au click
 

### Fonctionnalité ++

- Classer par priorité
- Se souvenir de ceux déjà lus
- Meilleure IHM
- A Voir pour rajouter les animes
- manga scrapper (lecture de scan) - utilisation du module manga-parser 100%

### Serveur node pour scrapper

- module https://github.com/na-ji/node-manga-parser.git
- creation d'un projet node -> creation d'une API avec ce module
- mettre en facade tous les chemin qui exists sur le module

## SETUP

### Dependencies

- Install node
- Install npm `node install npm`
- Install gulp `npm install gulp@3.x`
- Installer l'API mangaApi: '@TODO create git repo'

### Installation
- Clone the project: `git clone 'https://github.com/Oyanel/MangaU.git'`
- run npm install to dl the dependencies: `npm install`
- create a .env.local file from .env.local.default at `mangau/` and modify it (firebase credentials)
- run gulp to compile the .less files: `gulp build` or `gulp prod` for prod



