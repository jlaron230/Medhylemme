import "./App.css";
import Dilemme from "./assets/Composants/Dilemme";
import AnimauxFantastiques from "./assets/Composants/AnimauxFantastiques";
import SuperHeros from "./assets/Composants/SuperHeros";
import Footer from "./assets/Composants/footer";
import Horreur from "./assets/Composants/Horreur";
import Philosophique from "./assets/Composants/Philosophique";
import Cinema from "./assets/Composants/Cinema";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accueil from "./assets/Composants/Accueil";
import Header from "./assets/Composants/Header";
import APIGpt from "./assets/Composants/APIGpt";
import Contact from "./assets/Composants/Contact";
import MentionsLegales from "./assets/Composants/MentionsLegales";
import PolitiqueDeConfidentialite from "./assets/Composants/PolitiqueDeConfidentialite";

function App() {
  return (
    <>
      {/* Configuration de la navigation avec React Router */}
      <Router>
        <div className="bg-black">
          {/* En-tête */}
          <div className="flex before::bg-black justify-center text-white flex-wrap">
            <Header />
          </div>
          {/* Section principale pour le contenu */}
          <main>
            {/* Routes pour les différentes pages */}
            <Routes>
              {/* Route pour la page de dilemme */}
              <Route path="/dilemme" element={<Dilemme />} />
              {/* Route pour la page d'animaux fantastiques */}
              <Route path="/AnimauxFantastiques" element={<AnimauxFantastiques />} />
              {/* Route pour la page de contact */}
              <Route path="/Contact" element={<Contact />} /> 
              {/* Route par défaut pour la page d'accueil */}
              <Route path="/" element={<Accueil />} />
              {/* Route pour la page de génération de texte aléatoire */}
              <Route path="/Aléatoire" element={<APIGpt />} /> 
              {/* Route pour la page de super héros */}
              <Route path="/SuperHeros" element={<SuperHeros />} />
              {/* Route pour la page d'horreur */}
              <Route path="/Horreur" element={<Horreur />} />
              {/* Route pour la page philosophique */}
              <Route path="/Philosophie" element={<Philosophique />} />
              {/* Route pour la page de cinéma */}
              <Route path="/Cinéma" element={<Cinema />} />
              {/* Route pour la page de mentions légales */}
              <Route path="/Mentions-legales" element={<MentionsLegales />} />
              {/* Route pour la page de politique de confidentialité */}
              <Route path="/Politique-de-confidentialite" element={<PolitiqueDeConfidentialite />} />
            </Routes>
          </main>
        </div>
      </Router>
      {/* Pied de page */}
      <Footer level={4} />
    </>
  );
}

export default App;