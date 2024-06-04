import { useState, useEffect } from "react";
import anime from 'animejs/lib/anime.es.js'; // Import de la bibliothèque d'animation
import dilemmeAll from '../dilemmeAll.json'; // Import du fichier JSON contenant les données
import { Fade } from "./Fade"; // Import du composant de transition

function APIGpt(props) {
  // Initialisation des états avec useState
  const [data, setData] = useState([]); // État pour stocker les données
  const [count, setCount] = useState(1); // État pour le compteur
  const [hidden, setHidden] = useState(false); // État pour la visibilité des éléments
  const [ResVisibility, setResVisibility] = useState(false); // État pour la visibilité des réponses
  const [animation, setAnimation] = useState(null); // État pour l'animation

  // Initialisation des états pour le temps avec les valeurs par défaut ou celles passées en props
  const { startingHeure = 24, startingMinutes = 60, startingSecondes = 60 } = props;
  const [mins, setMinutes] = useState(startingMinutes);
  const [heure, setHeures] = useState(startingHeure);
  const [seconde, setseconde] = useState(startingSecondes);

  // État pour stocker une catégorie aléatoire
  const [Aleatoire, setAleatoire] = useState("");
  // État pour stocker la catégorie sélectionnée
  const [categorie, setCategorie] = useState(1);
  // État pour contrôler la logique du temps
  const [bool, Setbool] = useState(false);
  // État pour stocker un dilemme défini
  const [Defini, setDefini] = useState("");
  // État pour contrôler si un dilemme est défini ou aléatoire
  const [boolDefini, SetboolDefini] = useState(true);

  // Effet pour initialiser l'animation lors du chargement du composant
  useEffect(() => {
    handleAnimation();
    scrollToAncre();
  }, [data]);

  // Fonction pour gérer le clic sur le bouton "Encore un"
  const Counter = () => {
    toggleVisibility();
  };

  // Fonction pour basculer la visibilité des éléments
  const toggleVisibility = () => {
    setHidden(!hidden);
    reverseAnimation();
    setResVisibility(false);
    if (!hidden) {
      handleReappearanceAnimation();
    }
  };

  // Fonction pour gérer l'animation initiale de fondu
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

  // Fonction pour gérer l'animation de réapparition des nouveaux éléments
  const handleReappearanceAnimation = () => {
    anime({
      targets: '.appear-animation',
      translateX: ['100%', '50%'],
      duration: 1000,
      easing: 'easeInOutQuad'
    });
  };


  const scrollToAncre = () => {
    window.scrollTo({
      top: 20,
      behavior: 'smooth' // Optionnel: ajoute un défilement fluide
    });
  };

  // Fonction pour inverser l'animation
  const reverseAnimation = () => {
    if (animation) {
      handleReappearanceAnimation();
    }
    handleReappearanceAnimation();
  };

  // Effet pour gérer la logique du temps
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      // Décrémenter les secondes
      if (seconde > 0) {
        setseconde(seconde - 1);
        // Décrémenter les minutes si les secondes atteignent 0
        if (seconde === 0 && mins > 0) {
          setMinutes(mins - 1);
        // Décrémenter les heures si les minutes atteignent 0
        } else if (mins === 0 && heure > 0) {
          setHeures(heure - 1);
        }
      } else if (seconde === 0 && heure > 0) {
        // Réinitialiser les secondes et décrémenter les heures
        setseconde(startingSecondes);
        if (mins === 0 && heure > 0) {
          setMinutes(startingMinutes);
        }
      } else if (heure === 0) {
        // Réinitialiser les heures, les minutes et les secondes
        setHeures(startingHeure);
        setMinutes(startingMinutes);
        setseconde(startingSecondes);
      }
    }, 1000);

    // Gérer le changement
    if (seconde === 0 && mins === 0 && heure === 0 && bool) {
      Setbool(false);
      // Sélectionner une catégorie aléatoire
      const categories = ["Philosophique", "Horreur", "Cinéma", "SuperHéros", "Medhylemme", "AnimauxFantastiques"];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setAleatoire(randomCategory);
      // Récupérer les dilemmes correspondants à la catégorie aléatoire
      const dilemmes = dilemmeAll.dilemmes[randomCategory];
      setData(dilemmes);
    } else if (seconde > 0 && !bool) {
      Setbool(true);
      // Si un dilemme prédéfini est spécifié, le charger
      if(boolDefini){
        dilemmePre();
        SetboolDefini(false);
      }
    }

    // Nettoyer l'intervalle de temps
    return () => {
      clearInterval(sampleInterval);
    };
  }, [mins, heure, seconde, bool, boolDefini]);

  // Fonction pour charger un dilemme prédéfini
  const dilemmePre = () => {
    const categories = ["Philosophique", "Horreur", "Cinéma", "SuperHéros", "Medhylemme", "AnimauxFantastiques"];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    setAleatoire(randomCategory);
    const dilemmes = dilemmeAll.dilemmes[randomCategory];
    setData(dilemmes);
  }

  return (
    <>
      <div className={`text-white bg-font xl:p-9 ${hidden ? "full-screen" : ""}`}>
        {/* Titre du dilemme */}
        <h2 className="sm:p-9 md:p-7 xl:p-9 mb-4 font-semibold text-white text-center text-4xl">Le dilemme du moment</h2>
        {/* Affichage du dilemme sélectionné */}
        {data.filter((dilemme) => dilemme.id === count).map((dilemme) => (
          <div key={dilemme.id}>
            <section className="pb-12 pt-20 dark:bg-dark lg:pb-[50px] lg:pt-[50px]">
              <div className="container mx-auto">
                <div className="flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                      {/* Sous-titre */}
                      <span className="mb-2 block text-xl font-semibold text-primary ">
                        {dilemme.sousTitre}
                      </span>
                      {/* Titre */}
                      <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                        {dilemme.Titre}
                      </h2>
                      {/* Question du dilemme */}
                      <p className="text-base text-body-color dark:text-dark-6 fade-animation">
                        {dilemme.question}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center flex-wrap gap-4">
                  {/* Affichage des choix possibles */}
                  <ServiceCard
                    title={dilemme.choix[0]}
                    image={dilemme.idImage[0].imageNbr2[0]}
                    hidden={hidden}
                    toggleVisibility={toggleVisibility}
                    ResVisibility={ResVisibility}
                    setResVisibility={setResVisibility}
                    className={`service-card fade-animation ${hidden ? "hidden" : "Nohidden"}`}
                  />
                  <ServiceCard
                    title={dilemme.choix[1]}
                    image={dilemme.idImage[0].imageNbr1[0]}
                    hidden={hidden}
                    toggleVisibility={toggleVisibility}
                    ResVisibility={!ResVisibility}
                    setResVisibility={setResVisibility}
                    className={`service-card fade-animation ${hidden ? "hidden" : "Nohidden"}`}
                  />
                  {/* Affichage des réponses */}
                  <Fade visible={hidden} duration={500} animateEnter={true} from={{ opacity: 0, x: 0, y: 15}}>
                    <div className={`flex m-2 flex-wrap justify-center flex-col items-center basis-3/5 text-center ${!hidden ? "hidden" : "Nohidden"}`}>  
                      <p className="fade-animation text-lg w-9/12">
                        {ResVisibility ? dilemme.idResponse[0].reponses1[0] : dilemme.idResponse[0].reponses2[0]}
                      </p>
                      {/* Bouton pour afficher un nouveau dilemme */}
                      <button className='hover:scale-110 bg-white mt-8 bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-black hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 fade-animation' onClick={Counter}>Encore un</button>
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

const ServiceCard = ({title, hidden, toggleVisibility, setResVisibility, ResVisibility, image, HandleClick1}) => {
  // Gestion du clic sur la carte de service
  const HandleClick = () => {
    toggleVisibility(); // Inversion de la visibilité des réponses
    setResVisibility(!ResVisibility); // Inversion de la visibilité des réponses
  }

  return (
    <div className={`hover:-translate-y-8 transition duration-500 ${hidden ? "hidden" : "Nohidden"}`}>
      {/* Affichage de l'image */}
      <ImageDisplay HandleClick1={HandleClick} image={image}/>
      <div className={`px-4 service-card text-black className flex justify-center`}>
        {/* Bouton dans la carte de service */}
        <button onClick={HandleClick}>
          {/* Contenu de la carte de service */}
          <div className="mb-9 rounded-[20px] bg-white p-6 hover:shadow-white dark:bg-dark-2 xl:px-10 bg-sky-400">
            {/* Titre de la carte */}
            <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              {title}
            </h4>
            {/* Paragraphe de la carte */}
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
    {/* Image cliquable */}
    <button className="rounded-lg mb-6 w-full m-2" onClick={HandleClick1} >
      <img onClick={HandleClick1} className="max-h-48 object-cover rounded-lg w-full" src={image} alt="Image aléatoire" />
    </button>
  </div>
);

export default APIGpt;
