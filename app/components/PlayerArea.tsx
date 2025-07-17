"use client";

import React, { useState } from "react";
import CardView from "./CardView";
import { Player, Card } from "../types";

export default function PlayerArea({
  position,
  player,
  isCurrent,
  showHand,
  selectedCard,
  onSelectCard,
  bankSortOptions = [],
}: {
  position: "top"|"left"|"right"|"bottom",
  player: Player,
  isCurrent: boolean,
  showHand: boolean,
  selectedCard?: Card|null,
  onSelectCard?: (card: Card) => void,
  bankSortOptions?: ("number"|"color")[]
}) {
  const [bankCollapsed, setBankCollapsed] = useState(false);
  const [bankSort, setBankSort] = useState<"number"|"color"|null>(null);

  let bank = [...player.bank];
  if (bankSort === "number") bank.sort((a,b) => a.number - b.number);
  if (bankSort === "color") bank.sort((a,b) => a.color.localeCompare(b.color));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <strong>
        {player.name} {isCurrent ? "(Current turn)" : ""}
        {!showHand && <span style={{marginLeft:8, fontSize:12}}>({player.hand.length})</span>}
      </strong>
      {showHand ? (
        <div style={{ display: "flex" }}>
          {player.hand.map((card, i) =>
            <CardView
              key={i}
              card={card}
              selected={selectedCard === card}
              onClick={onSelectCard ? () => onSelectCard(card) : undefined}
            />
          )}
        </div>
      ) : null}
      <div style={{ marginTop: 2 }}>
        <button style={{ fontSize: 10, marginRight: 4 }} onClick={() => setBankCollapsed(b => !b)}>
          {bankCollapsed ? "Show Bank" : "Hide Bank"}
        </button>
        {bankSortOptions.map(opt => (
          <button key={opt} style={{ fontSize: 10, marginRight: 2 }} onClick={() => setBankSort(opt)}>
            Sort by {opt}
          </button>
        ))}
      </div>
      {!bankCollapsed && (
        <div style={{ display: "flex", marginTop: 2 }}>
          {bank.map((card, i) =>
            <CardView key={i} card={card} />
          )}
        </div>
      )}
    </div>
  );
}
