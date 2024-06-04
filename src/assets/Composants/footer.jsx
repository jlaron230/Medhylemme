import React from "react";
import { NavLink } from "react-router-dom";
// Footer Component
const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-black pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center flex-col">
        <div className="container mr-auto ml-auto">
          <div className=" flex flex-wrap text-white justify-center gap-3.5 ">
            {/* Logo et description */}
            <div className="w-full px-4 sm:w-1/3 lg:w-3/12">
              <div className="mb-10 w-full flex-col flex items-center text-center ">
                <a href="/#" className="mb-6 inline-block max-w-[160px]">
                  {/* Logo */}
                  <img
                    src="Medhylemme-logo (5).png"
                    alt="logo"
                    className="max-w-full dark:hidden"
                  />
                </a>
                {/* Description de l'application */}
                <p className="mb-7 text-base text-body-color dark:text-dark-6">
                  Medhylemme est une application interactive qui propose des dilemmes amusants et stimulants,
                  vous invitant à explorer vos choix et à découvrir de nouvelles perspectives.
                </p>
              </div>
            </div>

            {/* Groupe de liens vers des ressources */}

            <LinkGroup header="Ressources">
              <NavLink1 to="https://unsplash.com/fr" label="Unsplash" />
              <NavLink1 to="https://fr.legacy.reactjs.org/" label="React" />
              <NavLink1 to="https://grafikart.fr/" label="Graphikart" />
              <NavLink1 to="https://www.fotor.com/fr/ai-image-generator/" label="Fotor" />
            </LinkGroup>

            {/* Liens vers les différentes sections de l'application */}
            <LinkGroup header="Medhylemme">
              <NavLink1 to="/dilemme" label="Dilemme" />
              <NavLink1 to="/Aléatoire" label="Aléatoire" />
              <NavLink1 to="/Contact" label="Contact" />
            </LinkGroup>
          </div>
        </div>
        {/* Liens légaux */}
        <div className="text-white flex justify-center my-16 list-none gap-3.5">
          {/* Lien vers les mentions légales */}
          <p className="hover:text-violet-600"><NavLink1 to="/Mentions-legales" label="Mentions légales" /> </p>
          {/* Lien vers la politique de confidentialité */}
          <p className="hover:text-violet-600"><NavLink1 to="/Politique-de-confidentialite" label="Politique de confidentialité" /></p>
        </div>
      </footer>
    </>
  );
};

// Composant LinkGroup
const LinkGroup = ({ children, header }) => {
  return (
    <>
      <div className="w-full px-4 sm:w-1/3 lg:w-3/12 ">
        <div className="mb-10 w-full flex-col flex items-center text-center">
          {/* En-tête du groupe de liens */}
          <h4 className="mb-9 text-lg font-semibold text-dark dark:text-white">
            {header}
          </h4>
          {/* Liste des liens */}
          <ul className="space-y-3">{children}</ul>
        </div>
      </div>
    </>
  );
};

// Composant NavLink1
const NavLink1 = ({ to, label }) => {
  return (
    <li>
      {/* Lien */}
      <a
        href={`${to}#`}
        className=" hover:text-violet-600 inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
      >
        {/* Texte du lien */}
        {label}
      </a>
    </li>
  );
};

export default Footer;