import React, { useState, useEffect } from "react"; // Importation de React et des hooks useState et useEffect

function Countdown(props) {
    // Destructuring des propriétés ou définition de valeurs par défaut
    const { startingHeure = 0, startingMinutes = 111 } = props;

    // Déclaration des états pour les minutes et les heures
    const [mins, setMinutes] = useState(startingMinutes);
    const [heure, setHeures] = useState(startingHeure);
    
    // Effet pour gérer le compte à rebours
    useEffect(() => {
        // Définition de l'intervalle pour mettre à jour les minutes et les heures chaque seconde
        let sampleInterval = setInterval(() => {
            // Décrémentation des minutes si elles sont supérieures à 0
            if (mins > 0) {
                setMinutes(mins - 1);
            }
            // Gestion du passage à une nouvelle heure si les minutes atteignent 0
            if (mins === 0) {
                if (heure === 0) {
                    clearInterval(sampleInterval); // Arrêt de l'intervalle si les heures et les minutes sont à 0
                } else {
                    setMinutes(59); // Réinitialisation des minutes à 59
                    setHeures(heure - 1); // Décrémentation des heures
                }
            }
        }, 1000); // Interval de 1 seconde

        // Nettoyage de l'intervalle lors de la suppression du composant
        return () => {
            clearInterval(sampleInterval);
        };
    }, [mins, heure]); // Déclenchement de l'effet lorsque mins ou heure changent

    // Rendu du composant
    return (
        <div>
            {/* Affichage du temps restant */}
            {!heure && mins} : (
            <p>
                {heure} : {mins < 10 ? `0 ${mins}` : mins}
            </p>
            )
        </div>
    );
}

export default Countdown; // Exportation du composant Countdown