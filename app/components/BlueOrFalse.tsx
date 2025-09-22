"use client"

import React from "react"

import type { CardData } from "./Card"
import PlayerArea from "./PlayerArea";

export default function BlueOrFalse({ hands }: {hands: CardData[][]}) {
  const [players, setPlayers] = React.useState([0, 1, 2, 3]);
  const [playerHands, setHands] = React.useState(hands);

  return (
    <div className="p-5">
        <PlayerArea
          position={3}
          bank={playerHands[players[2]]}
          cards={playerHands[players[2]]}
          players={players}
          setPlayers={setPlayers}
        ></PlayerArea>
        <div className="flex justify-between items-center">
          <PlayerArea
            position={2}
            bank={playerHands[players[1]]}
            cards={playerHands[players[1]]}
            players={players}
            setPlayers={setPlayers}
          ></PlayerArea>
          <span>Player {players[0] + 1}'s turn</span>
          <PlayerArea
            position={4}
            bank={playerHands[players[3]]}
            cards={playerHands[players[3]]}
            players={players}
            setPlayers={setPlayers}
          ></PlayerArea>
        </div>
        <PlayerArea
          position={1}
          bank={playerHands[players[0]]}
          cards={playerHands[players[0]]}
          players={players}
          setPlayers={setPlayers}
        ></PlayerArea>
    </div>
  );
}