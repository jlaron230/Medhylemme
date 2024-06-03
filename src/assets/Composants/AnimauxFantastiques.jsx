// Importations des hooks et des dépendances nécessaires
import { useState, useEffect } from "react";
import anime from 'animejs/lib/anime.es.js'; // Importation de l'animation
import dilemmeAll from '../dilemmeAll.json'; // Importation des données JSON
import { Fade } from "./Fade"; // Importation du composant Fade pour gérer les transitions
import Categories from "./Categories"; // Importation du composant Categories pour les catégories

// Définition du composant AnimauxFantastiques
function AnimauxFantastiques() {
  // États du composant
  const [data, setData] = useState([]); // Données des dilemmes
  const [count, setCount] = useState(1); // Compteur pour sélectionner un dilemme
  const [hidden, setHidden] = useState(false); // État pour gérer la visibilité des réponses
  const [ResVisibility, setResVisibility] = useState(false); // État pour gérer la visibilité de la réponse sélectionnée
  const [animation, setAnimation] = useState(null); // Animation

  // Effet de chargement des données au montage du composant
  useEffect(() => {
    try {
      // Récupération des données des dilemmes
      setData(dilemmeAll.dilemmes.AnimauxFantastiques);
      // Sélection aléatoire d'un dilemme au chargement
      setCount(randomNumberRange(1, data.length));
      // Initialisation de l'animation
      handleAnimation();
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  // Fonction pour générer un nombre aléatoire dans une plage donnée
  const randomNumberRange = (min, max) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  // Fonction pour sélectionner un nouveau dilemme
  const Counter = () => {
    setCount(randomNumberRange(1, data.length));
    toggleVisibility(); // Réinitialiser la visibilité des réponses
  };

  // Fonction pour basculer la visibilité des réponses
  const toggleVisibility = () => {
    setHidden(!hidden);
    reverseAnimation(); // Inverser l'animation
    setResVisibility(false); // Réinitialiser la visibilité de la réponse sélectionnée
    if (!hidden) {
      handleReappearanceAnimation(); // Lancer l'animation de réapparition si les éléments étaient cachés et sont maintenant visibles
    }
  };

  // Fonction pour gérer l'animation de fondu
  const handleAnimation = () => {
    const anim = anime({
      targets: '.fade-animation', // Cibler les éléments avec la classe fade-animation
      opacity: [0, 1], // Animation de fondu de 0 à 1
      duration: 2000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad', // Type d'interpolation de l'animation
      autoplay: true // Activer l'animation automatiquement
    });
    setAnimation(anim); // Stocker l'objet animation dans l'état
  };

  // Fonction pour gérer l'animation de réapparition
  const handleReappearanceAnimation = () => {
    // Animation pour les nouveaux ServiceCard
    anime({
      targets: '.appear-animation',
      translateX: ['100%', '50%'], // Déplacer la carte de 100% à 50% en X
      duration: 1000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad' // Type d'interpolation de l'animation
    });
  };

  // Fonction pour inverser l'animation
  const reverseAnimation = () => {
    if (animation) {
      handleReappearanceAnimation(); // Inverser l'animation
    }
    handleReappearanceAnimation(); // Lancer l'animation de réapparition
  };

  return (
    <>
    {/* Affichage du composant Categories */}
    <Categories />
      {/* Div principale avec une classe conditionnelle basée sur l'état de visibilité */}
      <div className={`text-white bg-font-Animals bg-font ${hidden ? "full-screen" : ""}`}>
        {/* Mapping des données filtrées en fonction du compteur */}
        {data.filter((dilemme) => dilemme.id === count).map((dilemme) => (
          <div key={dilemme.id}>
            {/* Section contenant les détails du dilemme */}
            <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
              <div className="container mx-auto">
                <div className="flex flex-wrap">
                  <div className="w-full px-4 z-10">
                    {/* Titre et sous-titre du dilemme */}
                    <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                      <span className="mb-2 block text-xl font-semibold text-primary ">
                        {dilemme.sousTitre}
                      </span>
                      <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                        {dilemme.Titre}
                      </h2>
                      {/* Description du dilemme */}
                      <p className="text-lg text-body-color dark:text-dark-6 fade-animation">
                        {dilemme.question}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Affichage des choix et des réponses */}
                <div className="flex justify-center flex-wrap gap-8">
                  {/* Premier choix */}
                  <ServiceCard
                    title={dilemme.choix[0]}
                    image={dilemme.idImage[0].imageNbr1[0]}
                    hidden={hidden}
                    toggleVisibility={toggleVisibility}
                    ResVisibility={ResVisibility}
                    setResVisibility={setResVisibility}
                    className={`service-card fade-animation ${hidden ? "hidden" : "Nohidden"}`}
                  />
                  {/* Deuxième choix */}
                  <ServiceCard
                    title={dilemme.choix[1]}
                    image={dilemme.idImage[0].imageNbr2[0]}
                    hidden={hidden}
                    toggleVisibility={toggleVisibility}
                    ResVisibility={!ResVisibility}
                    setResVisibility={setResVisibility}
                    className={`service-card fade-animation ${hidden ? "hidden" : "Nohidden"}`}
                  />
                  {/* Affichage des réponses */}
                  <Fade visible={hidden} duration={500} animateEnter={true} from={{ opacity: 0, x: 0, y: 15}}>
                    <div className={`flex z-10  m-2 flex-wrap justify-center flex-col items-center basis-3/5 text-center ${!hidden ? "hidden" : "Nohidden"}`}>  
                      <p className="fade-animation text-lg w-9/12">
                        {/* Affichage de la réponse en fonction de l'état de visibilité */}
                        {ResVisibility ? dilemme.idResponse[0].reponses1[0] : dilemme.idResponse[0].reponses2[0]}
                      </p>
                      {/* Bouton pour passer au prochain dilemme */}
                      <button className=' z-10 hover:scale-110 bg-white mt-8 bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-black hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 fade-animation' onClick={Counter}>Encore un</button>
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

const ServiceCard = ({ title, hidden, toggleVisibility, setResVisibility, ResVisibility, image, HandleClick1}) => {
  // Fonction pour gérer le clic sur la carte de service
  const HandleClick = () => {
    // Inversion de la visibilité et de la réponse
    toggleVisibility();
    setResVisibility(!ResVisibility);
  }

  // Rendu de la carte de service avec animation de survol
  return (
    <div className={`hover:-translate-y-8 z-10 transition duration-500 ${hidden ? "hidden" : "Nohidden"}`}>
      {/* Affichage de l'image avec gestion du clic */}
      <ImageDisplay HandleClick1={HandleClick} image={image}/>
      <div className={`px-4 service-card text-black className flex justify-center`}>
        <button onClick={HandleClick}>
          {/* Contenu de la carte de service */}
          <div className="mb-9 rounded-[20px] bg-white p-6 hover:shadow-white dark:bg-dark-2 xl:px-10 bg-sky-400">
            {/* Titre de la carte */}
            <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              {title}
            </h4>
            {/* Placeholder pour d'autres informations si nécessaire */}
            <p className="text-body-color dark:text-dark-6"></p>
          </div>
        </button>
      </div>
    </div>
  );
};

// Composant pour afficher l'image avec gestion du clic
const ImageDisplay = ({ image , HandleClick1}) => (
  <div className="flex items-center mt-2.5 mb-5 justify-center render">
    {/* Image avec gestion du clic */}
    <button className="rounded-lg mb-6 w-full" onClick={HandleClick1} >
      <img onClick={HandleClick1} className="max-h-72 object-cover rounded-lg w-full" src={image} alt="Image aléatoire" />
    </button>
  </div>
);

export default AnimauxFantastiques;