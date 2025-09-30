"use client"

import React from "react"

import type { CardData } from "./Card"
import PassArea from "./PassArea"
import PlayerArea from "./PlayerArea";

export default function BlueOrFalse({ hands }: {hands: CardData[][]}) {
  const [playerHands, setHands] = React.useState(hands);
  const [currentPlayer, setCurrentPlayer] = React.useState(0);
  const [chosenCard, chooseCard] = React.useState<CardData | null>(null);

  function setHand(hand: CardData[], player: number) {
    setHands(prev => {
      if (player < 0 || player >= prev.length) return prev;
      const next = [...prev];
      next[player] = hand;
      return next;
    });
  }

  return (
    <div className="p-5">
        <PlayerArea
          position={3}
          bank={[]}
          hand={playerHands[2]}
          setHand={setHand}
          chooseCard={chooseCard}
        ></PlayerArea>
        <div className="flex justify-between items-center h-[626px]">
          <PlayerArea
            position={2}
            bank={[]}
            hand={playerHands[1]}
            setHand={setHand}
            chooseCard={chooseCard}
          ></PlayerArea>
          <PassArea
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            chosenCard={chosenCard}
            chooseCard={chooseCard}
          >
          </PassArea>
          <PlayerArea
            position={4}
            bank={[]}
            hand={playerHands[3]}
            setHand={setHand}
            chooseCard={chooseCard}
          ></PlayerArea>
        </div>
        <PlayerArea
          position={1}
          bank={[]}
          hand={playerHands[0]}
          setHand={setHand}
          chooseCard={chooseCard}
        ></PlayerArea>
    </div>
  );
}