import { useState, useEffect } from "react";
import anime from 'animejs/lib/anime.es.js'; // Importation de la bibliothèque Anime.js
import dilemmeAll from '../dilemmeAll.json'; // Importation des données des dilemmes depuis un fichier JSON
import { Fade } from "./Fade"; // Importation du composant Fade depuis un fichier local
import Categories from "./Categories"; // Importation du composant Categories depuis un fichier local

// Définition du composant Horreur
function Horreur() {
  // Utilisation du state pour gérer les données des dilemmes, le compteur, la visibilité des réponses, etc.
  const [data, setData] = useState([]); // Données des dilemmes
  const [count, setCount] = useState(1); // Compteur
  const [hidden, setHidden] = useState(false); // Visibilité des réponses
  const [ResVisibility, setResVisibility] = useState(false); // Visibilité des réponses (Changement ici)
  const [animation, setAnimation] = useState(null); // Animation

  // Effet qui se déclenche lorsque les données des dilemmes sont modifiées
  useEffect(() => {
    try {
      setData(dilemmeAll.dilemmes.Horreur); // Mise à jour des données des dilemmes
      setCount(randomNumberRange(1, data.length)); // Sélection aléatoire d'un dilemme
      handleAnimation(); // Initialisation de l'animation une fois au chargement du composant
      scrollToAncre()
    } catch (error) {
      console.log(error); // Gestion des erreurs
    }
  }, [data]);

  // Fonction pour générer un nombre aléatoire dans une plage donnée
  const randomNumberRange = (min, max) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  // Fonction pour gérer le compteur et réinitialiser la visibilité des réponses
  const Counter = () => {
    setCount(randomNumberRange(1, data.length)); // Sélection aléatoire d'un nouveau dilemme
    toggleVisibility(); // Réinitialisation de la visibilité des réponses
  };

  // Fonction pour basculer la visibilité des réponses
  const toggleVisibility = () => {
    setHidden(!hidden); // Inversion de la visibilité des réponses
    reverseAnimation(); // Inversion de l'animation
    setResVisibility(false); // Réinitialisation de la visibilité des réponses à false
    if (!hidden) {
      handleReappearanceAnimation(); // Lancement de l'animation de réapparition si les éléments étaient cachés et sont maintenant visibles
    }
  };

  // Fonction pour gérer l'animation
  const handleAnimation = () => {
    const anim = anime({
      targets: '.fade-animation', // Sélection de tous les éléments avec la classe 'fade-animation'
      opacity: [0, 1], // Animation de l'opacité de 0 (invisible) à 1 (complètement visible)
      duration: 2000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad', // Type d'interpolation de l'animation
      autoplay: true // Lecture automatique de l'animation
    });
    setAnimation(anim); // Stockage de l'objet d'animation dans le state
  };

  // Fonction pour gérer l'animation de réapparition
  const handleReappearanceAnimation = () => {
    anime({
      targets: '.appear-animation', // Sélection de tous les éléments avec la classe 'appear-animation'
      translateX: ['100%', '50%'], // Animation du déplacement de la carte de 100% à 0% en X
      duration: 1000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad' // Type d'interpolation de l'animation
    });
  };

  // Fonction pour inverser l'animation
  const reverseAnimation = () => {
    if (animation) {
      handleReappearanceAnimation(); // Inversion de l'animation
    }
    handleReappearanceAnimation(); // Lancement de l'animation de réapparition
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 350,
      behavior: 'smooth' // Optionnel: ajoute un défilement fluide
    });
  };

  const scrollToAncre = () => {
    window.scrollTo({
      top: 20,
      behavior: 'smooth' // Optionnel: ajoute un défilement fluide
    });
  };

  return (
    <>
      <Categories /> {/* Affichage du composant Categories */}
      <div className={`text-white bg-font-horreur ${hidden ? "full-screen" : ""}`}>
        {/* Affichage des dilemmes filtrés */}
        {data.filter((dilemme) => dilemme.id === count).map((dilemme) => (
          <div key={dilemme.id}>
            {/* Section pour chaque dilemme */}
            <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
              <div className="container mx-auto">
                <div className="flex flex-wrap">
                  <div className="w-full px-4 z-10">
                    <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                      {/* Affichage du sous-titre du dilemme */}
                      <span className="mb-2 block text-xl font-semibold text-primary">
                        {dilemme.sousTitre}
                      </span>
                      {/* Affichage du titre du dilemme */}
                      <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                        {dilemme.Titre}
                      </h2>
                      {/* Affichage de la question du dilemme */}
                      <p className="text-lg text-body-color dark:text-dark-6 fade-animation">
                        {dilemme.question}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center flex-wrap gap-8">
                  {/* Affichage de la première carte de service */}
                  <ServiceCard
                    title={dilemme.choix[0]}
                    image={dilemme.idImage[0].imageNbr2[0]}
                    hidden={hidden}
                    toggleVisibility={toggleVisibility}
                    ResVisibility={ResVisibility}
                    setResVisibility={setResVisibility}
                    className={`service-card fade-animation ${hidden ? "hidden" : "Nohidden"}`}
                    onClick={scrollToTop}
                  />
                  {/* Affichage de la deuxième carte de service */}
                  <ServiceCard
                    title={dilemme.choix[1]}
                    image={dilemme.idImage[0].imageNbr1[0]}
                    hidden={hidden}
                    toggleVisibility={toggleVisibility}
                    ResVisibility={!ResVisibility}
                    setResVisibility={setResVisibility}
                    className={`service-card fade-animation ${hidden ? "hidden" : "Nohidden"}`}
                    onClick={scrollToTop}
                  />
                  {/* Affichage de la transition fade pour les réponses */}
                  <Fade visible={hidden} duration={500} animateEnter={true} from={{ opacity: 0, x: 0, y: 15}}>
                    <div className={`flex m-2 flex-wrap justify-center flex-col items-center basis-3/5 text-center ${!hidden ? "hidden" : "Nohidden"}`}>  
                      {/* Affichage de la réponse */}
                      <p className="fade-animation text-lg w-9/12">
                        {ResVisibility ? dilemme.idResponse[0].reponses1[0] : dilemme.idResponse[0].reponses2[0]}
                      </p>
                      {/* Bouton pour afficher un autre dilemme */}
                      <button className='z-10 hover:scale-110 bg-white mt-8 bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-black hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 fade-animation' onClick={Counter}>Encore un</button>
                    </div>
                  </Fade>
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </>
  );
}

const ServiceCard = ({onClick, title, hidden, toggleVisibility, setResVisibility, ResVisibility, image, HandleClick1}) => {
  // Fonction HandleClick appelée lorsqu'on clique sur la carte
  const HandleClick = () => {
    toggleVisibility(); // Inverse la visibilité de la carte
    setResVisibility(!ResVisibility); // Inverse la visibilité de la réponse
    onClick()
  }

  return (
    // Div contenant la carte de service, avec une classe conditionnelle pour gérer la transition de sortie
    <div className={`hover:-translate-y-8 z-10 transition duration-500 ${hidden ? "hidden" : "Nohidden"}`}>
      {/* Composant ImageDisplay pour afficher l'image de la carte */}
      <ImageDisplay HandleClick1={HandleClick} image={image}/>
      <div className={`px-4 service-card text-black className flex justify-center`}>
        {/* Bouton pour gérer le clic sur la carte */}
        <button onClick={HandleClick}>
          <div className="mb-9 rounded-[20px] bg-white p-6 hover:shadow-white dark:bg-dark-2 xl:px-10 bg-sky-400">
            <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              {title} {/* Affichage du titre de la carte */}
            </h4>
            <p className="text-body-color dark:text-dark-6"></p>
          </div>
        </button>
      </div>
    </div>
  );
};

const ImageDisplay = ({ image , HandleClick1}) => (
  // Div pour afficher l'image de la carte
  <div className="flex items-center mt-2.5 mb-5 justify-center render">
    {/* Bouton contenant l'image de la carte */}
    <button className="rounded-lg mb-6 w-full" onClick={HandleClick1} >
      <img onClick={HandleClick1} className="max-h-72 object-cover rounded-lg w-full" src={image} alt="Image aléatoire" />
    </button>
  </div>
);

export default Horreur; // Export du composant ServiceCard
