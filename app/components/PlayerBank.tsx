"use client"

import React from "react"

import type { CardData } from "./Card"
import Card from "./Card"

function stack(bank: CardData[], mode: string): CardData[][] {
    let stacked: CardData[][] = [];
    let stack: CardData[] = [];
    let modeCheck: boolean;
    for (let i = 0; i < bank.length; i++) {
        if (stack.length != 0) {
            modeCheck = mode === "number" ? bank[i].value == stack[0].value : bank[i].color == stack[0].color;
            if (!modeCheck) {
                stacked.push(stack);
                stack = [];
            }
        }
        stack.push(bank[i]);
    }
    stacked.push(stack);
    return stacked
}

export default function PlayerBank({ position, mode, bank }: {position: number, mode: string, bank: CardData[]}) {
    const [hovered, setHovered] = React.useState<number | null>(null);

    let stackStyle = "p-1 flex ";
    if (position === 1) {
        stackStyle += "flex-col justify-end pt-8";
    } else if (position === 2) {
        stackStyle += "justify-start";
    } else if (position === 3) {
        stackStyle += "flex-col justify-start";
    } else {
        stackStyle += "justify-end";
    }

    return (
        <div className={bank.length == 0 ? "hidden" : "p-6 flex" + (position % 2 == 0 ? " flex-col" : "")}>
            {stack(bank, mode).map((stack, i) => (
                <div key={i} className={stackStyle}>
                    {stack.map((card, j) => (
                        <div
                            key={j}
                            className={j != 0 ? (position % 2 == 0 ? "-ml-5" : "-mt-5") : ""}
                            onMouseEnter={() => setHovered(j)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div className={hovered === j ? "transition hover:scale-105 hover:z-20 " : ""}>
                                <Card card={card} position={position}></Card>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}            
