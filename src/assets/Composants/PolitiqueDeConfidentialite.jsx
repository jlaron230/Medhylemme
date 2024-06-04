import React from "react";
import { useEffect } from "react";
// Définition du composant PolitiqueDeConfidentialite
function PolitiqueDeConfidentialite () {

    useEffect(() => {
        scrollToAncre();
      }, []);
      
      const scrollToAncre = () => {
        window.scrollTo({
          top: 20,
          behavior: 'smooth' // Optionnel: ajoute un défilement fluide
        });
      };
    // Rendu JSX du composant
    return (
        <>
        <div class="container text-white p-24">
        <h1 className="text-5xl flex justify-center mb-32">Politique de Confidentialité</h1>

        <div class="section mb-5">
            <h2>Introduction</h2>
            <p>Chez Medhylemme, nous respectons votre vie privée et nous nous engageons à protéger les données personnelles que vous partagez avec nous. Cette politique de confidentialité explique comment nous collectons, utilisons, et protégeons vos informations personnelles.</p>
        </div>

        <div class="section mb-5">
            <h2>Collecte des Informations</h2>
            <p>Nous collectons des informations vous concernant lorsque vous utilisez notre application. Les types d'informations que nous collectons peuvent inclure :</p>
            <ul>
                <li>Informations de contact (nom, adresse e-mail, numéro de téléphone)</li>
                <li>Informations de connexion (adresse IP, type de navigateur, heure de connexion)</li>
                <li>Informations sur l'utilisation de l'application (interactions avec les fonctionnalités de l'application)</li>
            </ul>
        </div>

        <div class="section mb-5">
            <h2>Utilisation des Informations</h2>
            <p>Nous utilisons les informations collectées pour :</p>
            <ul>
                <li>Fournir, exploiter et améliorer notre application</li>
                <li>Répondre à vos demandes et fournir un support client</li>
                <li>Envoyer des communications promotionnelles et informatives, avec votre consentement</li>
                <li>Analyser l'utilisation de l'application et comprendre les tendances des utilisateurs</li>
            </ul>
        </div>

        <div class="section mb-5">
            <h2>Partage des Informations</h2>
            <p>Nous ne partageons pas vos informations personnelles avec des tiers, sauf dans les cas suivants :</p>
            <ul>
                <li>Avec votre consentement explicite</li>
                <li>Pour se conformer à des obligations légales ou répondre à des demandes légitimes des autorités publiques</li>
                <li>Pour protéger et défendre nos droits ou notre propriété</li>
            </ul>
        </div>

        <div class="section mb-5">
            <h2>Protection des Informations</h2>
            <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos informations personnelles contre l'accès non autorisé, la divulgation, la modification ou la destruction.</p>
        </div>

        <div class="section mb-5">
            <h2>Vos Droits</h2>
            <p>Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez des droits suivants :</p>
            <ul>
                <li>Droit d'accès à vos informations personnelles</li>
                <li>Droit de rectification de vos informations personnelles</li>
                <li>Droit à l'effacement de vos informations personnelles</li>
                <li>Droit de limitation du traitement de vos informations personnelles</li>
                <li>Droit d'opposition au traitement de vos informations personnelles</li>
                <li>Droit à la portabilité de vos informations personnelles</li>
            </ul>
            <p>Pour exercer ces droits, vous pouvez nous contacter à l'adresse [Votre Adresse Email].</p>
        </div>

        <div class="section mb-5">
            <h2>Cookies</h2>
            <p>Notre application utilise des cookies pour améliorer votre expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait limiter certaines fonctionnalités de l'application.</p>
        </div>

        <div class="section mb-5">
            <h2>Modifications de cette Politique</h2>
            <p>Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page. Nous vous encourageons à consulter régulièrement cette page pour rester informé des éventuelles modifications.</p>
        </div>
    </div>

    <div class="footer">
        <p>Medhylemme - L'application qui vous confronte à des dilemmes amusants et stimulants. Partagez vos choix et découvrez de nouvelles perspectives !</p>
    </div>
    </>
    )
}
// Exportation du composant PolitiqueDeConfidentialite
export default PolitiqueDeConfidentialite;