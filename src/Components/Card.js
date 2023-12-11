import React from "react";

const Card = ({ card, isflipped, handleCard, disabled }) => {
  return (
    <div className={`game-card col ${isflipped ? "flipped" : ""} `}>
      <img src={card.src} className="cardFront" alt="Mystery Card" />
      <img
        src="/img/backside-card.jpg"
        className="cardBack"
        alt="Unsolved Card"
        onClick={() => handleCard(card)}
      />
    </div>
  );
};

export default Card;
