"use client"

import type { CardData } from "./Card"
import PlayerBank from "./PlayerBank"
import PlayerHand from "./PlayerHand"

export default function PlayerArea({ position, bank, cards, players, setPlayers }: {
    position: number,
    bank: CardData[],
    cards: CardData[],
    players: number[],
    setPlayers: React.Dispatch<React.SetStateAction<number[]>>
}) {

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
            <div className={"flex justify-center items-center" + (position % 2 == 0 ? " flex-col" : "")}>
                <span> Hand Count: {cards.length} </span>
                <PlayerHand
                    position={position}
                    cards={cards}
                    players={players}
                    setPlayers={setPlayers}
                ></PlayerHand>
                <div className="flex flex-col justify-center items-center gap-1 w-18">
                    <span> Sort By: </span>
                    <button className="border-2 rounded-md bg-white w-full"> Color </button>
                    <button className="border-2 rounded-md bg-white w-full"> Number </button>
                </div>
            </div>
        </div>
    );  
}