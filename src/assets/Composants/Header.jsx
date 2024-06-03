import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Définition du composant Header
function Header() {
  // Utilisation du state pour gérer l'état d'ouverture du menu
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* En-tête */}
      <div className="w-full">
        <header className="flex items-center bg-black dark:bg-dark relative z-10 justify-center">
          <div className="container">
            <div className="relative -mx-4 flex items-center justify-center mx-auto flex-wrap max-sm:mb-8">
              {/* Logo */}
              <div className="max-sm:w-2/6 w-1/5 px-4">
                <a href="/#" className="block w-full py-5">
                  {/* Logo en mode clair */}
                  <img
                    src="Medhylemme-logo (5).png"
                    alt="logo"
                    className="dark:hidden"
                  />
                </a>
              </div>
              {/* Menu de navigation */}
              <div className="flex items-center md:px-4 gap-x-5">
                <div>
                  {/* Menu de navigation */}
                  <nav
                    id="navbarCollapse"
                    className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg px-6 py-5 shadow bg-black dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                      open ? "nav" : "nav1"
                    } lg:block`}
                  >
                    {/* Liste des liens de navigation */}
                    <ul className="nav lg:flex">
                      {/* Lien vers la page d'accueil */}
                      <NavLink to="/">
                        <ListItem NavLink1="/#">
                          <img
                            src="/house-solid.svg"
                            alt="House Icon"
                            className="w-6 h-6"
                          />
                        </ListItem>
                      </NavLink>
                      {/* Lien vers la page Dilemme */}
                      <NavLink to="/dilemme">
                        <ListItem NavLink1="/dilemme">Dilemme</ListItem>
                      </NavLink>
                      {/* Lien vers la page Aléatoire */}
                      <NavLink to="/Aléatoire">
                        <ListItem NavLink1="/Aléatoire">Aléatoire</ListItem>
                      </NavLink>
                      {/* Lien vers la page Contact */}
                      <NavLink to="/Contact">
                        <ListItem NavLink1="/Contact">Contact</ListItem>
                      </NavLink>
                    </ul>
                  </nav>
                </div>
                {/* Liens de connexion */}
                <div className="visible justify-end sm:flex lg:pr-0 md:gap-x-5">
                  <a
                    href="/#"
                    className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white border-blue-600 ring-2 rounded-md"
                  >
                    Sign in
                  </a>
                  <a
                    href="/#"
                    className="rounded-md bg-blue-700 px-7 py-3 text-base font-medium text-white hover:bg-primary/90"
                  >
                    Sign Up
                  </a>
                </div>
                {/* Bouton de menu pour les appareils mobiles */}
                <button
                  onClick={() => setOpen(!open)}
                  id="navbarToggler"
                  className={`${
                    open ? "navbarTogglerActive" : ""
                  } border-blue-600 ring-2 right-4 top-1/2 block  rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                >
                  {/* Icônes de barre de menu */}
                  <span className="bg-white relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="bg-white relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="bg-white relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

// Composant ListItem
const ListItem = ({ children, NavLink1 }) => {
  return (
    <li>
      {/* Lien de navigation */}
      <a
        href={NavLink1}
        className="text-white flex py-2 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
      >
        {/* Contenu du lien */}
        {children}
      </a>
    </li>
  );
};

export default Header;

