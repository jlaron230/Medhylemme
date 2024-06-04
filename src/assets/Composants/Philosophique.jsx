import { useState, useEffect } from "react"; // Importation des hooks useState et useEffect depuis React
import anime from 'animejs/lib/anime.es.js'; // Importation de la bibliothèque d'animation anime.js
import dilemmeAll from '../dilemmeAll.json'; // Importation des données de dilemmes depuis un fichier JSON
import { Fade } from "./Fade"; // Importation du composant Fade
import Categories from "./Categories"; // Importation du composant Categories

function Philosophique() {
  // Déclaration des états du composant
  const [data, setData] = useState([]); // État pour stocker les données de dilemmes
  const [count, setCount] = useState(1); // État pour stocker le numéro du dilemme actuel
  const [hidden, setHidden] = useState(false); // État pour gérer la visibilité des réponses
  const [ResVisibility, setResVisibility] = useState(false); // État pour gérer la visibilité des résultats
  const [animation, setAnimation] = useState(null); // État pour stocker l'animation

  // Effet de chargement initial pour initialiser les données de dilemmes et l'animation
  useEffect(() => {
    try {
      setData(dilemmeAll.dilemmes.Philosophique); // Initialisation des données de dilemmes
      setCount(randomNumberRange(1, data.length)); // Initialisation du numéro de dilemme
      handleAnimation(); // Initialisation de l'animation une fois au chargement du composant
      scrollToAncre()
    } catch (error) {
      console.log(error);
    }
  }, [data]); // Déclenché lorsque les données de dilemmes sont mises à jour

  // Fonction utilitaire pour générer un nombre aléatoire dans une plage donnée
  const randomNumberRange = (min, max) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  // Fonction pour changer de dilemme
  const Counter = () => {
    setCount(randomNumberRange(1, data.length)); // Générer un nouveau numéro de dilemme
    toggleVisibility(); // Réinitialiser la visibilité des réponses
  };

  // Fonction pour basculer la visibilité des réponses
  const toggleVisibility = () => {
    setHidden(!hidden); // Inverser la visibilité des réponses
    reverseAnimation(); // Invoquer la fonction pour inverser l'animation
    setResVisibility(false); // Réinitialiser la visibilité des résultats
    if (!hidden) {
      handleReappearanceAnimation(); // Lancer l'animation de réapparition si les éléments étaient cachés et sont maintenant visibles
    }
  };

  // Fonction pour initialiser l'animation
  const handleAnimation = () => {
    const anim = anime({
      targets: '.fade-animation', // Cibler tous les éléments avec l'animation de fondu
      opacity: [0, 1], // Animation de fondu de 0 (invisible) à 1 (complètement visible)
      duration: 2000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad', // Type d'interpolation de l'animation
      autoplay: true // Désactiver la lecture automatique pour l'animation initiale
    });
    setAnimation(anim); // Stocker l'objet animation dans l'état
  };

  // Fonction pour gérer l'animation de réapparition des éléments
  const handleReappearanceAnimation = () => {
    // Animation pour les nouvelles ServiceCard
    anime({
      targets: '.appear-animation',
      translateX: ['100%', '50%'], // Déplacer la carte de 100% à 0% en X
      duration: 1000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad' // Type d'interpolation de l'animation
    });
  };

  // Fonction pour inverser l'animation
  const reverseAnimation = () => {
    if (animation) {
        handleReappearanceAnimation() // Inverser l'animation
    }
    handleReappearanceAnimation(); // Lancer l'animation de réapparition
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

  // Rendu du composant Philosophique
return (
  <>
    {/* Composant Categories */}
    <Categories />

    {/* Contenu principal */}
    <div className={`text-white bg-font-philosophie bg-font ${hidden ? "full-screen" : ""}`}>
      {/* Mapping des données de dilemmes */}
      {data.filter((dilemme) => dilemme.id === count).map((dilemme) => (
        <div key={dilemme.id}>
          <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
            <div className="container mx-auto">
              <div className="flex flex-wrap">
                <div className="w-full px-4 z-10">
                  <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                    <span className="mb-2 block text-xl font-semibold text-primary ">
                      {dilemme.sousTitre}
                    </span>
                    <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                      {dilemme.Titre}
                    </h2>
                    <p className="text-lg text-body-color dark:text-dark-6 fade-animation">
                      {dilemme.question}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-wrap gap-8">
                {/* Composant ServiceCard avec les données du dilemme */}
                <ServiceCard
                  title={dilemme.choix[0]}
                  image={dilemme.idImage[0].imageNbr1[0]}
                  hidden={hidden}
                  toggleVisibility={toggleVisibility}
                  ResVisibility={ResVisibility}
                  setResVisibility={setResVisibility}
                  className={`service-card fade-animation ${hidden ? "hidden" : "Nohidden"}`}
                  onClick={scrollToTop}
                />
                <ServiceCard
                  title={dilemme.choix[1]}
                  image={dilemme.idImage[0].imageNbr2[0]}
                  hidden={hidden}
                  toggleVisibility={toggleVisibility}
                  ResVisibility={!ResVisibility}
                  setResVisibility={setResVisibility}
                  className={`service-card fade-animation ${hidden ? "hidden" : "Nohidden"}`}
                  onClick={scrollToTop}
                />
                {/* Composant Fade pour les résultats */}
                <Fade visible={hidden} duration={500} animateEnter={true} from={{ opacity: 0, x: 0, y: 15}}>
                  <div className={`flex m-2 flex-wrap justify-center flex-col items-center basis-3/5 text-center ${!hidden ? "hidden" : "Nohidden"}`}>  
                    <p className="fade-animation text-lg w-9/12">
                      {ResVisibility ? dilemme.idResponse[0].reponses1[0] : dilemme.idResponse[0].reponses2[0]}
                    </p>
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

// Ce composant représente une carte de service avec une image et un titre.
const ServiceCard = ({onClick, title, hidden, toggleVisibility, setResVisibility, ResVisibility, image, HandleClick1}) => {

  // Fonction pour gérer le clic sur la carte de service
  const HandleClick = () => {
    // Inverser la visibilité de la carte et des réponses associées
    toggleVisibility();
    setResVisibility(!ResVisibility);
    onClick()
  }

  // Rendu de la carte de service
  return (
    <div className={`hover:-translate-y-8 transition z-10 duration-500 ${hidden ? "hidden" : "Nohidden"}`}>
      {/* Affichage de l'image à l'aide du composant ImageDisplay */}
      <ImageDisplay HandleClick1={HandleClick} image={image}/>
      {/* Contenu de la carte de service */}
      <div className={`px-4 service-card text-black className flex justify-center`}>
        <button onClick={HandleClick}>
          {/* Contenu de la carte avec un titre */}
          <div className="mb-9 rounded-[20px] bg-white p-6 hover:shadow-white dark:bg-dark-2 xl:px-10 bg-sky-400">
            <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              {title}
            </h4>
            <p className="text-body-color dark:text-dark-6"></p>
          </div>
        </button>
      </div>
    </div>
  );
};

// Composant fonctionnel pour afficher une image
const ImageDisplay = ({ image , HandleClick1}) => (
  <div className="flex items-center mt-2.5 mb-5 justify-center render">
    {/* Image affichée dans un bouton avec gestionnaire de clic */}
    <button className="rounded-lg mb-6 w-full" onClick={HandleClick1} >
      <img onClick={HandleClick1} className="max-h-72 object-cover rounded-lg w-full" src={image} alt="Image aléatoire" />
    </button>
  </div>
);

// Exportation par défaut du composant ServiceCard pour être utilisé ailleurs
export default Philosophique;
