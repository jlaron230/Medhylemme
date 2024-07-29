import { useState, useEffect } from "react";
import anime from 'animejs/lib/anime.es.js';
import dilemmeAll from '../dilemmeAll.json';
import { Fade } from "./Fade";
import Categories from "./Categories";
import ApiImage from "./ApiImage"; 

function SuperHeros() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [hidden, setHidden] = useState(false);
  const [ResVisibility, setResVisibility] = useState(false);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    try {
      setData(dilemmeAll.dilemmes.SuperHéros);
      setCount(randomNumberRange(1, data.length));
      scrollToAncre()
      handleAnimation(); // Initialiser l'animation une fois au chargement du composant
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  const randomNumberRange = (min, max) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  const Counter = () => {
    setCount(randomNumberRange(1, data.length));
    toggleVisibility(); // Réinitialiser la visibilité des réponses
  };

  const toggleVisibility = () => {
    setHidden(!hidden);
    reverseAnimation(); // Invoquez la fonction pour inverser l'animation
    setResVisibility(false);
    if (!hidden) {
      handleReappearanceAnimation(); // Lancer l'animation de réapparition si les éléments étaient cachés et sont maintenant visibles
    }
  };

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

  const handleReappearanceAnimation = () => {
    anime({
      targets: '.appear-animation',
      translateX: ['100%', '50%'],
      duration: 1000,
      easing: 'easeInOutQuad'
    });
  };

  const reverseAnimation = () => {
    if (animation) {
        handleReappearanceAnimation(); // Inversez l'animation
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
      <Categories />
      <div className={`text-white bg-font bg-font-hero ${hidden ? "full-screen" : ""}`}>
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
                  <Fade visible={hidden} duration={500} animateEnter={true} from={{ opacity: 0, x: 0, y: 15 }}>
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

const ServiceCard = ({onClick, title, hidden, toggleVisibility, setResVisibility, ResVisibility, image, HandleClick1}) => {
  const HandleClick = () => {
    toggleVisibility();
    setResVisibility(!ResVisibility)
    onClick()
  }

  return (
    <div className={`hover:-translate-y-8 transition z-10 duration-500 ${hidden ? "hidden" : "Nohidden"}`}>
      <ImageDisplay HandleClick1={HandleClick} image={image}/>
      <div className={`px-4 service-card text-black className flex justify-center`}>
        <button onClick={HandleClick}>
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

const ImageDisplay = ({ image , HandleClick1}) => (
  <div className="flex items-center mt-2.5 mb-5 justify-center render">
    <button className="flex justify-center rounded-lg mb-6 w-full" onClick={HandleClick1} >
    <ApiImage onClick={HandleClick1} className=" object-cover rounded-lg w-full" />
    </button>
  </div>
);

export default SuperHeros;