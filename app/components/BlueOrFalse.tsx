"use client"

import React from "react"

import type { CardData } from "./Card"
import PassArea from "./PassArea"
import PlayerArea from "./PlayerArea";

export default function BlueOrFalse({ hands }: {hands: CardData[][]}) {
  const [playerHands, setHands] = React.useState(hands);
  const [currentPlayer, setCurrentPlayer] = React.useState(0);
  const [playedCard, setPlayedCard] = React.useState<CardData | null>(null);

  return (
    <div className="p-5">
        <PlayerArea
          position={3}
          bank={[]}
          cards={playerHands[2]}
          setHands={setHands}
          setPlayedCard={setPlayedCard}
        ></PlayerArea>
        <div className="flex justify-between items-center h-[626px]">
          <PlayerArea
            position={2}
            bank={[]}
            cards={playerHands[1]}
            setHands={setHands}
            setPlayedCard={setPlayedCard}
          ></PlayerArea>
          <PassArea currentPlayer={currentPlayer} playedCard={playedCard}></PassArea>
          <PlayerArea
            position={4}
            bank={[]}
            cards={playerHands[3]}
            setHands={setHands}
            setPlayedCard={setPlayedCard}
          ></PlayerArea>
        </div>
        <PlayerArea
          position={1}
          bank={[]}
          cards={playerHands[0]}
          setHands={setHands}
          setPlayedCard={setPlayedCard}
        ></PlayerArea>
    </div>
  );
}