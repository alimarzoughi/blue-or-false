"use client"

import React from "react"

import type { CardData } from "./Card"
import { colors } from "./Card"
import PlayerBank from "./PlayerBank"
import PlayerHand from "./PlayerHand"

export default function PlayerArea({ position, bank, cards, players, setPlayers, setHands }: {
    position: number,
    bank: CardData[],
    cards: CardData[],
    players: number[],
    setPlayers: React.Dispatch<React.SetStateAction<number[]>>
    setHands: React.Dispatch<React.SetStateAction<CardData[][]>>
}) {
    const [mode, setMode] = React.useState("number");

    function sortBank() {
        let idx = players[position - 1];
        setHands(old =>
            old.map((hand, i) => 
                i === idx
                ? mode === "number"
                    ? hand.toSorted((a, b) => a.value - b.value)
                    : hand.toSorted((a, b) => a.color.id - b.color.id)
                : hand
            )
        );
    }

    let playerAreaStyle;
    if (position === 1) {
        playerAreaStyle = "border rounded-lg flex items-center justify-center flex-col";
    } else if (position === 2) {
        playerAreaStyle = "border rounded-lg flex items-center justify-center flex-row-reverse";
    } else if (position === 3) {
        playerAreaStyle = "border rounded-lg flex items-center justify-center flex-col-reverse";
    } else {
        playerAreaStyle = "border rounded-lg flex items-center justify-center";
    }

    return (
        <div className={playerAreaStyle + (position % 2 == 0 ? " w-100" : "")}>
            <PlayerBank position={position} bank={bank}></PlayerBank>
            <div className={"flex justify-center items-center " + (position % 2 == 0 ? "flex-col" : "h-50 gap-10")}>
                <div className={"w-18" + (position % 2 == 0 ? "" : " pb-6")}>
                    <span> Hand Count: {cards.length} </span>
                </div>
                <PlayerHand
                    position={position}
                    cards={cards}
                    setPlayers={setPlayers}
                ></PlayerHand>
                <div className={"flex flex-col justify-center items-center gap-1 w-18" + (position % 2 == 0 ? "" : " pb-10")}>
                    <span> Sort By: </span>
                    <button onClick={() => setMode("color")} className="border-2 rounded-md bg-white w-full"> Color </button>
                    <button onClick={() => setMode("number")} className="border-2 rounded-md bg-white w-full"> Number </button>
                </div>
            </div>
        </div>
    );  
}