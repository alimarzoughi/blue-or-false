"use client"

import React from "react"

import Card from "./Card"
import { CardBack } from "./Card"
import type { CardData } from "./Card";

function cardPadding(i: number, position: number) {
    if (position % 2 == 0) {
        return i === 0 ? "" : "-mt-5";
    } else if (position === 3) {
        return i === 0 ? "pt-8" : "pt-8 -ml-5";
    } else {
        return i === 0 ? "pb-8" : "pb-8 -ml-5";
    }
}

export default function PlayerHand({ position, cards, players, setPlayers }: {
    position: number,
    cards: CardData[]
    players: number[],
    setPlayers: React.Dispatch<React.SetStateAction<number[]>>
}) {
    const [hovered, setHovered] = React.useState<number | null>(null);
    
    return (
        <div className={"items-center justify-center p-6 flex " + (position % 2 == 0 ? "flex-col" : "")}>
            {(position === 1 ? cards : cards.slice(0, 8)).map((card, i) => (
                <div key={i}
                    className={"group relative justify-center flex flex-col " + cardPadding(i, position)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <button
                        className={
                            position === 1 && hovered === i ? "absolute bottom-0 border-2 rounded-md bg-white w-full z-20" : "hidden"
                        }
                        onClick={() => setPlayers(old => [...old.slice(1), old[0]])}
                    > Play </button>
                    <div className={hovered === i ? "transition group-hover:scale-105 group-hover:z-20 " : ""}>
                        {position === 1 ? <Card card={card} position={position}></Card> : <CardBack position={position}></CardBack>}
                    </div>
                </div>
            ))}
        </div>
    )
}