# Projet P14: Migration de jQuery vers React

Ce projet est une refonte d'un site existant, initialement construit avec jQuery, en utilisant React. Le but est de moderniser l'application tout en intégrant un nouveau plugin `myModal`.

## Technologies 

- **React** : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- **JavaScript** : Langage principal utilisé pour la logique de l'application.

## Installation et lancement du projet

1. Forkez le repository.
2. Clonez-le sur votre ordinateur.
3. Exécutez la commande `npm install` pour installer les dépendances.
4. Exécutez `npm start` pour lancer l'application en mode développement.

## Dépendances

Voici les dépendances utilisées dans le projet :

- `@emotion/react` : Outils pour la gestion de styles en React.
- `@emotion/styled` : API pour le styling basé sur les composants.
- `@mui/material` et `@mui/icons-material` : Composants Material-UI pour React.
- `react-router-dom` : Bibliothèque pour la gestion des routes dans une application React.
- `react-datepicker` : Composant calendrier pour sélectionner des dates.
- `@noabouskil/p14-modal` : Plugin Modal personnalisé.
- Autres dépendances pour les tests et la gestion des dates.

## Auteurs

Développeur front-end : **Noa Bouskila** - [Profil GitHub](https://github.com/noabouskila)

## Fonctionnalités

Le projet contient deux routes dans `RoutesApp`. Les données des employés sont stockées dans un `createContext` avec `localStorage`. Voici quelques composants utilisés :

- **Composants Ant Design** :
  - `react-datepicker` : Sélecteur de date.
  - `Mui DataGrid` : Table de données.

## Prérequis

- [Node.js](https://nodejs.org/en/) : Assurez-vous que Node.js est installé sur votre machine.
- Familiarité avec les Hooks et `createContext`.

