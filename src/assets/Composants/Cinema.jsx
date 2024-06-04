import { useState, useEffect } from "react";
import anime from 'animejs/lib/anime.es.js';
import dilemmeAll from '../dilemmeAll.json';
import { Fade } from "./Fade";
import Categories from "./Categories";

// Composant pour la catégorie Cinéma
function Cinema() {
  // État pour stocker les données des dilemmes
  const [data, setData] = useState([]);
  // État pour suivre le numéro de dilemme actuel
  const [count, setCount] = useState(1);
  // État pour gérer la visibilité des réponses
  const [hidden, setHidden] = useState(false);
  // État pour gérer la visibilité de la réponse sélectionnée
  const [ResVisibility, setResVisibility] = useState(false);
  // État pour gérer l'animation
  const [animation, setAnimation] = useState(null);

  // Effet pour initialiser les données et l'animation au chargement du composant
  useEffect(() => {
    try {
      // Récupérer les données des dilemmes pour la catégorie Cinéma
      setData(dilemmeAll.dilemmes.Cinéma);
      // Générer un numéro de dilemme aléatoire
      setCount(randomNumberRange(1, data.length));
      scrollToAncre()
      // Initialiser l'animation
      handleAnimation();
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  // Fonction pour générer un nombre aléatoire dans une plage donnée
  const randomNumberRange = (min, max) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  // Fonction pour sélectionner un nouveau dilemme et réinitialiser la visibilité des réponses
  const Counter = () => {
    setCount(randomNumberRange(1, data.length));
    toggleVisibility();
  };

  // Fonction pour basculer la visibilité des réponses
  const toggleVisibility = () => {
    setHidden(!hidden);
    // Inverser l'animation
    reverseAnimation();
    // Réinitialiser la visibilité de la réponse sélectionnée
    setResVisibility(false);
    if (!hidden) {
      // Lancer l'animation de réapparition si les éléments étaient cachés et sont maintenant visibles
      handleReappearanceAnimation();
    }
  };

  // Fonction pour gérer l'animation de fondu au chargement du composant
  const handleAnimation = () => {
    const anim = anime({
      targets: '.fade-animation',
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeInOutQuad',
      autoplay: true
    });
    setAnimation(anim);
  };

  // Fonction pour gérer l'animation de réapparition des éléments
  const handleReappearanceAnimation = () => {
    anime({
      targets: '.appear-animation',
      translateX: ['100%', '50%'],
      duration: 1000,
      easing: 'easeInOutQuad'
    });
  };

  // Fonction pour inverser l'animation
  const reverseAnimation = () => {
    if (animation) {
        handleReappearanceAnimation();
    }
    handleReappearanceAnimation();
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
      {/* Affichage des catégories */}
      <Categories />
      {/* Contenu du composant */}
      <div className={`text-white bg-font-cinema ${hidden ? "full-screen" : ""}`}>
        {/* Mapping des données pour afficher le dilemme actuel */}
        {data.filter((dilemme) => dilemme.id === count).map((dilemme) => (
          <div key={dilemme.id}>
            <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
              <div className="container mx-auto">
                <div className="flex flex-wrap">
                  <div className="w-full px-4 z-10">
                    <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                      {/* Affichage du sous-titre */}
                      <span className="mb-2 block text-xl font-semibold text-primary ">
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
                <div className="flex justify-center flex-wrap gap-8">
                  {/* Affichage des choix */}
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
                  {/* Affichage de la réponse */}
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

const ServiceCard = ({ onClick, title, hidden, toggleVisibility, setResVisibility, ResVisibility, image, HandleClick1}) => {

const HandleClick = () => {
  toggleVisibility();
  setResVisibility(!ResVisibility)
  onClick()
}

return (
  <div className={`hover:-translate-y-8 transition z-10 duration-500 ${hidden ? "hidden" : "Nohidden"}`}>
    {/* Affichage de l'image */}
    <ImageDisplay HandleClick1={HandleClick} image={image}/>
    <div className={`px-4 service-card text-black className basis-3/5 flex justify-center`}>
      <button onClick={HandleClick}>
        <div className="mb-9 rounded-[20px] bg-white p-6 hover:shadow-white dark:bg-dark-2 xl:px-10 bg-sky-400">
          {/* Affichage du titre */}
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

// Composant pour afficher l'image
const ImageDisplay = ({ image , HandleClick1}) => (
  <div className="flex items-center mt-2.5 mb-5 justify-center render">
    <button className="rounded-lg mb-6 w-full" onClick={HandleClick1} >
      <img onClick={HandleClick1} className="max-h-72 object-cover rounded-lg w-full" src={image} alt="Image aléatoire" />
    </button>
  </div>
);

export default Cinema;
