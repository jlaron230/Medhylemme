import React from "react";
import { useEffect } from "react";

function MentionsLegales() {

  useEffect(() => {
    scrollToAncre();
  }, []);
  
  const scrollToAncre = () => {
    window.scrollTo({
      top: 20,
      behavior: 'smooth' // Optionnel: ajoute un défilement fluide
    });
  };
  return (
    <>
      {/* Conteneur principal */}
      <div class="container text-white p-24">
        {/* Titre principal */}
        <h1 className="text-5xl flex justify-center mb-32">Mentions Légales</h1>

        {/* Section Identification de l'éditeur */}
        <div class="section mb-5">
          <h2>Identification de l'éditeur</h2>
          <p><strong>Nom de l'application</strong> : Medhylemme</p>
          <p><strong>Éditeur</strong> : [Votre Nom ou Raison Sociale]</p>
          <p><strong>Adresse</strong> : [Votre Adresse]</p>
          <p><strong>Téléphone</strong> : [Votre Numéro de Téléphone]</p>
          <p><strong>Email</strong> : [Votre Adresse Email]</p>
          <p><strong>Numéro SIRET</strong> : [Votre Numéro SIRET]</p>
        </div>

        {/* Section Hébergement */}
        <div class="section mb-5">
          <h2>Hébergement</h2>
          <p><strong>Hébergeur</strong> : [Nom de l'Hébergeur]</p>
          <p><strong>Adresse de l'hébergeur</strong> : [Adresse de l'Hébergeur]</p>
          <p><strong>Téléphone de l'hébergeur</strong> : [Numéro de Téléphone de l'Hébergeur]</p>
        </div>

        {/* Section Propriété Intellectuelle */}
        <div class="section mb-5">
          <h2>Propriété Intellectuelle</h2>
          <p>Tous les contenus présents sur l'application Medhylemme, incluant mais non limité aux textes, images, graphismes, logo, icônes, sons, logiciels, sont la propriété exclusive de [Votre Nom ou Raison Sociale], sauf mention contraire. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord écrit de [Votre Nom ou Raison Sociale].</p>
        </div>

        {/* Section Collecte des Données Personnelles */}
        <div class="section mb-5">
          <h2>Collecte des Données Personnelles</h2>
          <p>Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition au traitement de vos données personnelles. Vous pouvez exercer ce droit en nous contactant à l’adresse [Votre Adresse Email].</p>
        </div>

        {/* Section Cookies */}
        <div class="section mb-5">
          <h2>Cookies</h2>
          <p>L'application Medhylemme utilise des cookies pour améliorer l’expérience utilisateur. En naviguant sur l’application, vous acceptez l’utilisation de ces cookies. Vous pouvez désactiver les cookies en configurant votre navigateur, cependant, cette désactivation pourrait empêcher l’accès à certaines fonctionnalités de l'application.</p>
        </div>

        {/* Section Responsabilité */}
        <div class="section mb-5">
          <h2>Responsabilité</h2>
          <p>L’éditeur de l’application Medhylemme ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès à l'application, résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.</p>
        </div>

        {/* Section Droit Applicable */}
        <div class="section mb-5">
          <h2>Droit Applicable</h2>
          <p>Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.</p>
        </div>
      </div>

      {/* Pied de page */}
      <div class="footer">
        <p>Medhylemme - L'application qui vous confronte à des dilemmes amusants et stimulants. Partagez vos choix et découvrez de nouvelles perspectives !</p>
      </div>
    </>
  );
}

export default MentionsLegales;