import { useState, useEffect } from "react"; // Importation des hooks useState et useEffect
import anime from 'animejs/lib/anime.es.js'; // Importation de la bibliothèque anime.js
import dilemmeAll from '../dilemmeAll.json'; // Importation des données dilemmeAll.json
import { Fade } from "./Fade"; // Importation du composant Fade
import Categories from "./Categories"; // Importation du composant Categories
import ApiImage from "./ApiImage"; 

function Dilemme() {
  // Déclaration des états
  const [data, setData] = useState([]); // État pour les données des dilemmes
  const [count, setCount] = useState(1); // État pour le compteur
  const [hidden, setHidden] = useState(false); // État pour la visibilité cachée
  const [ResVisibility, setResVisibility] = useState(false); // État pour la visibilité des résultats
  const [animation, setAnimation] = useState(null); // État pour l'animation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // État pour la position de la souris

  // Fonction pour mettre à jour la position de la souris
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  // Effet pour charger les données dilemmeAll.dilemmes.Medhylemme
  useEffect(() => {
    try {
      setData(dilemmeAll.dilemmes.Medhylemme);
      setCount(randomNumberRange(1, data.length)); // Génération d'un nombre aléatoire pour count
      handleAnimation(); // Initialisation de l'animation une fois au chargement du composant
      scrollToAncre();
    } catch (error) {
      console.log(error);
    }
  }, [data]); // Déclenchement de l'effet lorsque data change

  // Fonction pour générer un nombre aléatoire dans une plage donnée
  const randomNumberRange = (min, max) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  const Counter = () => {
    setCount(randomNumberRange(1, data.length));
    toggleVisibility();// Réinitialiser la visibilité des réponses
  };

  const toggleVisibility = () => {
    setHidden(!hidden);
    reverseAnimation(); // Invoquez la fonction pour inverser l'animation
    setResVisibility(false)
    if (!hidden) {
      handleReappearanceAnimation(); // Lancer l'animation de réapparition si les éléments étaient cachés et sont maintenant visibles
    }
  };

  const handleAnimation = () => {
    const anim = anime({
      targets: '.fade-animation', // Utilisez une classe pour cibler tous les éléments avec l'animation de fondu
      opacity: [0, 1], // Animation de fondu de 0 (invisible) à 1 (complètement visible)
      duration: 2000, // Durée de l'animation en millisecondes
      easing: 'easeInOutQuad', // Type d'interpolation de l'animation
      autoplay: true // Désactiver la lecture automatique pour l'animation initiale
    });
    setAnimation(anim); // Stockez l'objet animation dans l'état
  };

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
        handleReappearanceAnimation() // Inversez l'animation
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

  return (
    <>
      {/* Composant Categories */}
      <Categories />
      
      {/* Conteneur principal avec gestion de la position de la souris */}
      <div onMouseMove={handleMouseMove} style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }} className="bg-font-color">
      
        {/* Contenu principal */}
        <div className={`text-white bg-font ${hidden ? "full-screen" : ""}`}>
          
          {/* Filtrage des données des dilemmes pour afficher uniquement celui correspondant au compteur */}
          {data.filter((dilemme) => dilemme.id === count).map((dilemme) => (
            <div key={dilemme.id}>
              <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
                <div className="container mx-auto">
                  <div className="flex flex-wrap">
                    <div className="w-full px-4 z-10">
                      <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20 z-10">
                        {/* Affichage du sous-titre */}
                        <span className="mb-2 block text-xl font-semibold text-primary">
                          {dilemme.sousTitre}
                        </span>
                        {/* Affichage du titre */}
                        <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                          {dilemme.Titre}
                        </h2>
                        {/* Affichage de la question */}
                        <p className="text-lg text-body-color dark:text-dark-6 fade-animation">
                          {dilemme.question}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Affichage des cartes de service */}
                  <div className="flex justify-center flex-wrap gap-8">
                    {/* Carte de service 1 */}
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
                    
                    {/* Carte de service 2 */}
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
                    
                    {/* Affichage du résultat */}
                    <Fade visible={hidden} duration={500} animateEnter={true} from={{ opacity: 0, x: 0, y: 15 }}>
                      <div className={`flex m-2 flex-wrap justify-center flex-col items-center basis-3/5 text-center ${!hidden ? "hidden" : "Nohidden"}`}>
                        <p className="fade-animation text-lg w-9/12 z-10">
                          {ResVisibility ? dilemme.idResponse[0].reponses1[0] : dilemme.idResponse[0].reponses2[0]}
                        </p>
                        <button className=' z-10 hover:scale-110 bg-white mt-8 bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-black hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 fade-animation' onClick={Counter}>Encore un</button>
                      </div>
                    </Fade>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Composant ServiceCard
const ServiceCard = ({onClick, title, hidden, toggleVisibility, setResVisibility, ResVisibility, image, HandleClick1}) => {
  // Gestion du clic sur la carte de service
  const HandleClick = () => {
    toggleVisibility(); // Toggle de la visibilité
    setResVisibility(!ResVisibility); 
    onClick()
  }

  return (
    <div className={`hover:-translate-y-8 z-10 transition duration-500 ${hidden ? "hidden" : "Nohidden"}`}>
      {/* Composant ImageDisplay */}
      <ImageDisplay HandleClick1={HandleClick} image={image}/>
      <div className={`px-4 service-card text-black className flex justify-center`}>
        <button onClick={HandleClick}>
          {/* Contenu de la carte de service */}
          <div className="mb-9 rounded-[20px] bg-white p-6 hover:shadow-white dark:bg-dark-2 xl:px-10 bg-sky-400">
            <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              {title} {/* Titre */}
            </h4>
            <p className="text-body-color dark:text-dark-6"></p> {/* Contenu (vide ici) */}
          </div>
        </button>
      </div>
    </div>
  );
};

// Composant ImageDisplay
const ImageDisplay = ({ image , HandleClick1}) => (
  <div className="flex items-center mt-2.5 mb-5 justify-center render">
    {/* Bouton contenant l'image */}
    <button className="flex justify-center rounded-lg mb-6 w-full" onClick={HandleClick1} >
    <ApiImage onClick={HandleClick1} className=" object-cover rounded-lg w-full" />
    </button>
  </div>
);

export default Dilemme;