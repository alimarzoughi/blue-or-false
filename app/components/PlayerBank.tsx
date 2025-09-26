"use client"

import React from "react"

import type { CardData } from "./Card"
import Card from "./Card"

function cardPadding(i: number, position: number) {
    if (position % 2 == 0) {
        return i === 0 ? "" : "-mt-5";
    } else if (position === 3) {
        return i === 0 ? "pb-8" : "pb-8 -ml-5";
    } else {
        return i === 0 ? "pt-8" : "pt-8 -ml-5";
    }
}

export default function PlayerBank({ position, bank }: {position: number, bank: CardData[]}) {
    const [hovered, setHovered] = React.useState<number | null>(null);

    return (
        <div className={bank.length == 0 ? "hidden" : "items-center justify-center p-6 flex " + (position % 2 == 0 ? "flex-col" : "")}>
            {bank.map((card, i) => (
                <div key={i}
                    className={cardPadding(i, position)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <div className={hovered === i ? "transition hover:scale-105 hover:z-20 " : ""}>
                        <Card card={card} position={position}></Card>
                    </div>
                </div>
            ))}
        </div>
    )
}            
