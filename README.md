# Medhylemme
https://medhylemme.vercel.app/
Medhylemme est une application React développée avec Vite, permettant de générer des dilemmes aléatoires. Ce manuel d'utilisation vous guidera à travers les étapes de lancement et les fonctionnalités principales de l'application.

## Installation

### Méthode 1 : Décompression

1. Téléchargez et dézippez le projet.
2. Ouvrez un terminal de commande Bash dans le répertoire du projet décompressé.

### Méthode 2 : Clonage via GitHub

1. Clonez le projet depuis GitHub :
   ```bash
   git clone <URL_DU_PROJET>
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd nom_du_repertoire
   ```

## Lancement du Projet en Local

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Lancez le projet en mode développement :
   ```bash
   npm run dev
   ```

## Dépendances

Le projet utilise les dépendances suivantes :
- **Axios** : Pour les appels API
- **React Router DOM** : Pour la gestion des routes
- **Yup** : Pour la validation des formulaires
- **Anime.js** : Pour les animations
- **FontAwesome** : Pour les icônes
- **Tailwind CSS** : Pour les styles CSS

## Fonctionnalités

### Gestion des Images

Les images sont récupérées de manière aléatoire depuis Unsplash et sont actualisées à chaque rafraîchissement de la page.

### Composants

L'application est structurée avec des composants React. Chaque catégorie de dilemmes dispose de son propre composant, contenant des fonctions d'animation, des fonctions conditionnelles, et une fonction de génération de nombres aléatoires basée sur les identifiants des tableaux d'objets.

#### Exemple de Composant

```jsx
import React, { useState, useEffect } from 'react';
import { getRandomImage } from './utils';

const DilemmaComponent = () => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const newImage = getRandomImage();
    setImage(newImage);
  }, []);

  return (
    <div>
      <img src={image} alt="Random from Unsplash" />
      {/* Autres éléments du composant */}
    </div>
  );
};

export default DilemmaComponent;
```

### Gestion des Dilemmes

Un composant spécifique génère un dilemme aléatoire chaque jour, avec une fonction de compte à rebours.

#### Exemple de Génération de Dilemme

```jsx
const generateRandomDilemma = (dilemmas) => {
  const randomIndex = Math.floor(Math.random() * dilemmas.length);
  return dilemmas[randomIndex];
};

// Utilisation dans un composant
const dailyDilemma = generateRandomDilemma(dilemmas);
```

### Formulaire de Contact

Le formulaire de contact utilise Yup pour la validation et la gestion du schéma de formulaire.

#### Exemple de Schéma de Formulaire avec Yup

```jsx
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Nom requis'),
  email: Yup.string().email('Email invalide').required('Email requis'),
  message: Yup.string().required('Message requis'),
});
```

## Cycle de Vie des Composants

Les hooks `useEffect` et `useState` sont utilisés pour gérer le cycle de vie des valeurs récupérées.

#### Exemple d'Utilisation de useEffect

```jsx
useEffect(() => {
  // Code à exécuter lors du montage ou de la mise à jour
  return () => {
    // Code à exécuter lors du démontage
  };
}, [dependency]);
```

## Gestion des Props

L'application utilise des composants parents et enfants, ainsi que des props pour gérer et afficher dynamiquement les éléments du DOM.

#### Exemple de Transmission de Props

```jsx
const ParentComponent = () => {
  const data = "Données à transmettre";

  return <ChildComponent data={data} />;
};

const ChildComponent = ({ data }) => {
  return <div>{data}</div>;
};
```

## Conclusion

Medhylemme est une application interactive et dynamique qui génère des dilemmes quotidiens, utilisant des technologies modernes et des pratiques de développement avancées. Suivez les instructions ci-dessus pour installer et explorer le projet.



