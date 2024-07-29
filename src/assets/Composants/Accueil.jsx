import React, { useState, useEffect } from "react";
import anime from 'animejs/lib/anime.es.js'; // Import de la bibliothèque d'animation animejs
import { NavLink } from "react-router-dom"; // Import de NavLink pour la navigation
import dilemmeAll from '../dilemmeAll.json'; // Import des données de dilemmes depuis un fichier JSON local
import APIGpt from "./APIGpt"; // Import du composant APIGpt
import ApiImage from "./ApiImage"; 

function Accueil() {
  // États pour stocker les données des dilemmes, les catégories, l'animation et les données API
  const [categories, setCategories] = useState("");
  const [categories2, setCategories2] = useState("");
  const [categories3, setCategories3] = useState("");
  const [animation, setAnimation] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      handleAnimation(); // Initialiser l'animation une fois au chargement du composant
      reverseAnimation(); // Inverser l'animation
      setData(dilemmeAll.dilemmes.Cinéma); // Initialiser les données des dilemmes
      setCategories(dilemmeAll.dilemmes.Cinéma.imageTitle1); // Initialiser les catégories
      setCategories2(dilemmeAll.dilemmes.SuperHéros.imageTitle2);
      setCategories3(dilemmeAll.dilemmes.Philosophique.imageTitle2);
    } catch (e) {
      console.log(e);
    }
  }, [data]); // Déclencher useEffect lorsque les données des dilemmes changent

  // Fonction pour initialiser l'animation
  const handleAnimation = () => {
    const anim = anime({
      targets: '.fade-animation', // Cibler tous les éléments avec la classe 'fade-animation'
      opacity: [0, 1], // Animation de fondu de 0 à 1
      duration: 2000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad', // Type d'interpolation de l'animation
      autoplay: true, // Démarrer l'animation automatiquement
      translateY: 30, // Translation en Y
    });
    setAnimation(anim); // Stocker l'objet animation dans l'état
  };

  // Fonction pour animer l'apparition des nouvelles cartes
  const handleReappearanceAnimation = () => {
    anime({
      targets: '.appear-animation',
      translateX: ['100%', '50%'], // Animation de translation en X
      duration: 1000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad' // Type d'interpolation de l'animation
    });
  };

  // Fonction pour inverser l'animation
  const reverseAnimation = () => {
    if (animation) {
      handleReappearanceAnimation(); // Inverser l'animation si elle existe
    }
    handleReappearanceAnimation(); // Lancer l'animation de réapparition
  };

  return (
    <>
      {/* Section du héros */}
      <div className="hero min-h-screen flex justify-center bg-cover bg-center bg-color relative fade-animation">
        <div className="hero-overlay bg-opacity-60 "></div>
        <div className="hero-content text-center text-neutral-content flex items-center">
          <div className="max-w-md text-white relative z-10 fade-animation ">
            <h1 className="mb-5 text-5xl font-bold">Medhylemme</h1>
            <p className="mb-5 text-base">
              Bienvenue sur Medhylemme, votre application dédiée aux dilemmes ! Découvrez une vaste collection de dilemmes classés par catégories et plongez dans des choix fascinants.
            </p>
            <NavLink to="/dilemme"> {/* Lien de navigation vers la page de dilemmes */}
              <button className="py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">voir les dilemmes </button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Section des catégories de dilemmes */}
      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark  flex justify-center">
        <div className=" sm:w-3/3 md:w-10/12 lg:w-10/12">
          <h2 className="sm:p-9 md:p-7 xl:p-9 mb-4 font-semibold text-white text-center text-4xl">Nos dilemmes</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 flex justify-center m-8">
            {/* Affichage des cartes de catégories de dilemmes */}
            <NavLink to="/Cinéma">
            <SingleCard
              CardTitle="Cinéma"
              titleHref="/#"
              btnHref="/Cinéma"
              CardDescription="Découvrez tout plein de dilemmes sur la culture cinématographique"
              Button="Voir plus"
            />
            </NavLink>
            <NavLink to="/SuperHeros">
            <SingleCard
              CardTitle="Super Héros"
              CardDescription="Que choisirez-vous entre devenir Superman où Spider-man ?"
              Button="Voir plus"
            />
            </NavLink>
            <NavLink to="/Philosophie">
            <SingleCard
              CardTitle="Philosophie"
              CardDescription="Être ou ne pas être, telle est la question ?"
              Button="Voir plus"
            />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Section 'À propos' */}
      <section className="flex justify-center">
        <About1 />
      </section>

      {/* Section pour le composant APIGpt */}
      <section>
        <APIGpt />
      </section>
    </>
  );
};

export default Accueil;

// Composant pour afficher une seule carte de dilemme
const SingleCard = ({
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <>
      {/* Conteneur de la carte */}
      <div className=" lg:hover:scale-110 mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        {/* Image de la carte */}
        <ApiImage className=" object-cover rounded-lg w-full" />
        {/* Contenu de la carte */}
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          {/* Titre de la carte */}
          <h3>
            {/* Lien vers la page de la carte, s'il existe */}
            <a
              href={titleHref ? titleHref : "/#"}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h3>
          {/* Description de la carte */}
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {CardDescription}
          </p>

          {/* Bouton de la carte, s'il existe */}
          {Button && (
            <a
              href={btnHref ? btnHref : "#"}
              className="text-white bg-violet-500 hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75 inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
            >
              {Button}
            </a>
          )}
        </div>
      </div>
    </>
  );
};

// Composant pour afficher la section "À propos"
const About1 = () => {
  return (
    <>
      <section className="overflow-hidden pt-20 pb-12 lg:pb-[90px] dark:bg-dark  sm:w-3/3 md:w-10/12 lg:w-10/12 pt-4 px-8">
        {/* Titre de la section "À propos" */}
        <h2 className="sm:p-9 md:p-7 xl:p-9 mb-4 font-semibold text-white text-center sm:text-[35px]  lg:text-[35px] 2xl:text-[45px]">À propos</h2>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  {/* Images de la section "À propos" */}
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://i.ibb.co/gFb3ns6/image-1.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://i.ibb.co/rfHFq15/image-2.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  {/* Image principale de la section "À propos" */}
                  <div className="relative z-10 my-4">
                    <img
                      src="https://i.ibb.co/9y7nYCD/image-3.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12 text-white">
              <div className="mt-10 lg:mt-0">
                {/* Sous-titre de la section "À propos" */}
                <span className="block mb-4 text-lg font-semibold text-primary">
                  Pourquoi des dilemmes ?
                </span>
                {/* Titre principal de la section "À propos" */}
                <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                  Medhylemme - L'Art de Choisir
                </h2>
                {/* Texte descriptif de la section "À propos" */}
                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                  Medhylemme est née d'une idée ingénieuse et amusante dans un centre de formation, 
                  inspirée par un passionné des dilemmes. Ce qui a commencé comme un simple jeu humoristique entre 
                  collègues s'est transformé en une application sérieuse et fonctionnelle dédiée à l'exploration des choix difficiles.
                </p>
                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                  Notre plateforme offre une variété de dilemmes captivants, organisés en différentes catégories, 
                  pour stimuler votre esprit et vous divertir. Que vous soyez à la recherche de réflexion profonde ou simplement 
                  d'un moment ludique, Medhylemme est l'endroit idéal pour explorer les diverses facettes de la prise de décision.
                </p>
                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                  Rejoignez-nous dans cette aventure et découvrez comment un simple dilemme peut devenir 
                  une source d'inspiration et de discussion enrichissante. Choisir n'a jamais été aussi divertissant !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};