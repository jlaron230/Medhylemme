import React, { useEffect, useRef, useState } from "react";

// Constantes pour les états de l'animation
const VISIBLE = 1;
const HIDDEN = 2;
const ENTERING = 3;
const LEAVING = 4;

/**
 * Composant Fade pour gérer les animations de fondu
 * @param {boolean} visible - Indique si l'élément est visible ou non
 * @param {React.ReactNode} children - Les enfants du composant
 * @param {number} duration - Durée de l'animation en millisecondes (par défaut: 300ms)
 * @param {boolean} animateEnter - Anime l'arrivée de l'élément (par défaut: false)
 * @param {{opacity?: number, x?: number, y?: number, z?: number}} from - Les styles de départ pour l'animation (par défaut: { opacity: 0 })
 **/
export function Fade({
  visible,
  children,
  duration = 300,
  animateEnter = false,
  from = { opacity: 0 },
}) {
  // Référence à l'enfant pour garder une copie de l'enfant actuel
  const childRef = useRef(children);

  // État de l'animation
  const [state, setState] = useState(
    visible ? (animateEnter ? ENTERING : VISIBLE) : HIDDEN
  );

  // Met à jour la référence de l'enfant lorsque la visibilité change
  if (visible) {
    childRef.current = children;
  }

  // Effet pour gérer le changement de visibilité
  useEffect(() => {
    if (!visible) {
      setState(LEAVING);
    } else {
      setState((s) => (s === HIDDEN ? ENTERING : VISIBLE));
    }
  }, [visible]);

  // Effet pour gérer l'animation de départ ou d'arrivée
  useEffect(() => {
    if (state === LEAVING) {
      const timer = setTimeout(() => {
        setState(HIDDEN);
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    } else if (state === ENTERING) {
      // Force le recalcul du layout pour que l'animation fonctionne correctement
      document.body.offsetHeight;
      setState(VISIBLE);
    }
  }, [state]);

  // Si l'état est HIDDEN, retourne null (aucun rendu)
  if (state === HIDDEN) {
    return null;
  }

  // Style de l'élément en fonction de l'état et des paramètres de départ
  let style = {
    transitionDuration: `${duration}ms`,
    transitionProperty: "opacity transform",
  };
  if (state !== VISIBLE) {
    if (from.opacity !== undefined) {
      style.opacity = from.opacity;
    }
    style.transform = `translate3d(${from.x ?? 0}px, ${from.y ?? 0}px, ${
      from.z ?? 0
    }px)`;
  }

  // Rendu de l'élément avec les styles appropriés
  return <div style={style}>{childRef.current}</div>;
}
