import React from "react";

/** Displays individual card image
 * 
 * Props:
 * - card: image URL
 * 
 * States:
 * - none
 * 
 * DeckApp -> Card
 * 
 */
function Card({ card }) {
  return (
      <img src={card} alt='playing card' />
  );
}

export default Card;