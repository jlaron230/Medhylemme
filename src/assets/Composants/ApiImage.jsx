import { useState, useEffect } from "react";
import axios from 'axios';

function ApiImage({categorie1}) {
    // État pour stocker les données de l'image
    const [data, setData] = useState([]);
    // État pour stocker la catégorie de l'image
    const [categorie, setCategorie] = useState();
    // Clé API pour l'authentification
    const API_KEY = '0jRT9n1NQWQVNgrNlgArSw==aibVYZvicJHtrjds';

    // Appelé lorsqu'il y a un changement dans la catégorie
    useEffect(() => {
        fetchData(); // Appel de la fonction pour récupérer les données de l'image
        setCategorie(categorie1); // Mise à jour de la catégorie
    }, [categorie]);

    // Fonction pour récupérer les données de l'image
    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.api-ninjas.com/v1/randomimage', {
                headers: { 'X-Api-Key': API_KEY },
                params: { category: categorie }
            });
            const data = response.data;
            setData(data); // Mise à jour des données de l'image
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {/* Affichage de l'image */}
            {data.length > 0 && (
                <img className="min-w-9 object-contain rounded-lg" src={`data:image/jpeg;base64,${data}`} alt="Random" />
            )}
        </div>
    );
}

export default ApiImage;