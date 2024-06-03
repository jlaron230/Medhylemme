import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink } from 'react-router-dom';

// Composant pour afficher les catégories avec des liens de navigation
function Categories() {
  return (
      <div className="flex justify-center text-white flex-wrap">
        <div className="z-10 flex justify-center flex-wrap">
          {/* Liens de navigation vers différentes catégories */}
        <NavLink to={"/dilemme"}>
          <a
            href="#"
            className="flex flex-wrap gap-1  bg-black hover:bg-violet-500 focus:bg-violet-800 border-primary bg-primary hover:border-primary hover:bg-primary inline-flex items-center justify-center border py-[11px] px-[12px] text-center text-base font-medium text-white transition-all hover:text-white sm:px-6"
          >

            Medhy

            <i class="text-red-600 hover:text-white fa-solid fa-temperature-arrow-up"></i>
          </a>
          </NavLink>
    
          <NavLink to={"/AnimauxFantastiques"}>
          <a
    
            href="#"
            className="flex flex-wrap gap-1 bg-black hover:bg-violet-500 focus:bg-violet-800 border-stroke dark:border-dark-3 hover:border-primary hover:bg-primary inline-flex items-center justify-center border py-[11px] px-[12px] text-center text-base font-medium text-dark dark:text-white transition-all hover:text-white sm:px-6 sm:text-base"
          >
            Animaux Fantastiques
            <i class="fa-solid fa-paw text-emerald-600 hover:text-white"></i>
          </a>
          </NavLink>
          
          <NavLink to={"/SuperHeros"}>
          <a
            href="#"
            className="flex flex-wrap gap-1 bg-black hover:bg-violet-500 focus:bg-violet-800 border-stroke dark:border-dark-3 hover:border-primary hover:bg-primary inline-flex items-center justify-center border py-[11px] px-[12px] text-center text-base font-medium text-dark dark:text-white transition-all hover:text-white sm:px-6 sm:text-base"
          >
            SuperHeros
            <i class="fa-solid fa-mask text-sky-500 hover:text-white"></i>
          </a>
          </NavLink>
    
          <NavLink to={"/Horreur"}>
          <a
            href="#"
            className="flex flex-wrap gap-1 bg-black hover:bg-violet-500 focus:bg-violet-800 border-stroke dark:border-dark-3 hover:border-primary hover:bg-primary inline-flex items-center justify-center border py-[11px] px-[12px] text-center text-base font-medium text-dark dark:text-white transition-all hover:text-white sm:px-6 sm:text-base"
          >
            Horreur
            <i class="fa-solid fa-skull text-white hover:text-white"></i>
          </a>
          </NavLink>
    
          <NavLink to={"/Philosophie"}>
          <a
            href="#"
            className=" flex flex-wrap gap-1 bg-black hover:bg-violet-500 focus:bg-violet-800 border-stroke dark:border-dark-3 hover:border-primary hover:bg-primary inline-flex items-center justify-center border py-[11px] px-[12px] text-center text-base font-medium text-dark dark:text-white transition-all hover:text-white sm:px-6 sm:text-base"
          >
            Philosophie
            <i class="fa-solid fa-feather text-amber-800 hover:text-white"></i>
          </a>
          </NavLink>
    
          <NavLink to={"/Cinéma"}>
          <a
            href="#"
            className=" flex flex-wrap gap-1 bg-black hover:bg-violet-500 focus:bg-violet-800 border-stroke dark:border-dark-3 hover:border-primary hover:bg-primary inline-flex items-center justify-center border py-[11px] px-[12px] text-center text-base font-medium text-dark dark:text-white transition-all hover:text-white sm:px-6 sm:text-base"
          >
            Cinéma
            <i class="fa-solid fa-film text-yellow-500 hover:text-white"></i>
          </a>
          </NavLink>
          </div>
          </div>
    )
}

export default Categories;

