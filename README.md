#Application front récupération de sorties de manga

Description: Récupère les données depuis une api puis me notifie quand c'est arrivé. 
Marque les mangas déjà lus.

##Fonctionnalité

##PMV

- Créer un compte
- Choisir les mangas que je veux regarder (recherche de manga) et les ajouter à ceux que je suis
- Récupérer les mangas sortis quand je lance l'appli
- Créer un lien vers le reader de préférence (fanfox ou mangarock, etc.) au click
 

##Fonctionnalité ++

- Classer par priorité
- Se souvenir de ceux déjà lus
- Meilleure IHM
- A Voir pour rajouter les animes
- manga scrapper (lecture de scan) - utilisation du module manga-parser 100%

##Serveur node pour scrapper

- module https://github.com/na-ji/node-manga-parser.git
- creation d'un projet node -> creation d'une API avec ce module
- mettre en facade tous les chemin qui exists sur le module