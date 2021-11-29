import React from "react";
import "./gameCard.css";

export default function GameCard({ card, clickCard, opened, disable }) {
  return (
    <div
      className="card"
      onClick={() => (disable ? clickCard(disable) : clickCard(card))}
    >
      <img
        draggable="false"
        src="/img/cover.png"
        alt="alt"
        className={opened ? "front front--180" : "front"}
      />
      <img
        draggable="false"
        src={card.path}
        alt="alt"
        className={opened ? "back back--360" : "back"}
      />
    </div>
  );
}
