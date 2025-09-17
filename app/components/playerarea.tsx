"use client"

import React from "react"
import Card from "./card"
import type { CardData } from "./card";

export default function PlayerArea({ player, cards }: { player: number, cards: CardData[] }) {
    const [hovered, setHovered] = React.useState<number | null>(null);
    const playerAreaStyle = "rounded-lg border flex items-center justify-center";

    return (
        <div className={playerAreaStyle + (player % 2 == 0 ? " w-100" : "")}>
            <div className={"items-center justify-center p-6 flex" + (player % 2 == 0 ? "-col" : "")}>
                {cards.map((card, i) => (
                    <div
                        key={i}
                        className={(hovered === i ? "transition hover:scale-105 hover:z-20 " : "") + (
                            i === 0 ? "" : player % 2 == 0 ? "-mt-5" : "-ml-5"
                        )}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <Card
                            key={i}
                            value={card.value}
                            color={card.color}
                            player={card.player}
                        >
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );  
}