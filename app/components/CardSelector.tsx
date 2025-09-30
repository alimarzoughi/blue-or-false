"use client"

import React from "react"
import { FaCheck } from "react-icons/fa"

import Card, { colors } from "./Card"
import type { CardColor, CardData } from "./Card"

export type CardClaim = {
    player: number,
    claim: CardData
};

export default function CardSelector({ currentPlayer, card, chooseCard, passCard, setClaim }: {
    currentPlayer: number,
    card: CardData | null,
    chooseCard: React.Dispatch<React.SetStateAction<CardData | null>>,
    passCard: React.Dispatch<React.SetStateAction<CardData | null>>,
    setClaim: React.Dispatch<React.SetStateAction<CardClaim | null>>
}) {
    const [selectedColor, selectColor] = React.useState<CardColor | null>(null);
    const [selectedNumber, selectNumber] = React.useState<number | null>(null);

    const colorCols = [colors.slice(0, 4), colors.slice(4, 8)];
    const numberCols = [[1, 2, 3, 4], [5, 6, 7, 8]];

    function clickColor(color: CardColor) {
        if (selectedColor && selectedColor.name == color.name) {
            selectColor(null);
        } else {
            selectColor(color);
        }
    }

    function clickNumber(n: number) {
        if (selectedNumber == n) {
            selectNumber(null);
        } else {
            selectNumber(n);
        }
    }

    function makeClaim(player: number, value: number, color: CardColor) {
        const claim: CardClaim = {player: player, claim: {id: -1, value: value, color: color}};
        selectNumber(null);
        selectColor(null);
        passCard(card);
        chooseCard(null);
        setClaim(claim);
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex">
                {colorCols.map((col, i) => 
                    <div key={i} className="flex flex-col w-16">
                        {col.map((color) => (
                            <button 
                                key={color.id}
                                className={"border-2 rounded-md transition transform hover:scale-110 hover:ring-2 hover:z-20" + (
                                    selectedColor && selectedColor.name === color.name
                                    ? " scale-110 z-20 ring-2"
                                    : ""
                                )}
                                style={{ backgroundColor: color.bgColor }}
                                onClick={() => clickColor(color)}
                            >
                                <span style={{ color: color.txtColor }}>
                                    {color.name}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
                {numberCols.map((col, i) =>
                    <div key={i} className="flex flex-col w-16">
                        {col.map((n) => (
                            <button
                                key={n}
                                className={"border-2 rounded-md transition transform hover:scale-110 hover:ring-2 hover:z-20" + (
                                    selectedNumber === n
                                    ? " scale-110 z-20 ring-2"
                                    : ""
                                )}
                                onClick={() => clickNumber(n)}
                            >{n}</button>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-center items-center gap-4">
                <Card card={card} position={1} className={card && currentPlayer === 0 ? "" : "hidden"}></Card>
                <div className={selectedColor || selectedNumber ? "flex flex-col justify-center items-center" : "hidden"}>
                    <span>Make this claim?</span>
                    <div className="flex gap-1">
                        {selectedColor
                            ? <div
                                className="flex justify-center border-2 rounded-md w-15"
                                style={{ backgroundColor: selectedColor.bgColor }}
                            >
                                <span style={{ color: selectedColor.txtColor }}>
                                    {selectedColor.name}
                                </span>
                            </div>
                            : <></>
                        }
                        <div className={"flex justify-center border-2 rounded-md w-15" + (selectedNumber ? "" : " hidden")}>
                            {selectedNumber}
                        </div>
                    </div>
                </div>
                {selectedColor && selectedNumber
                    ? <button
                        className="bg-[#20e344ff] border-2 rounded-md"
                        onClick={() => makeClaim(currentPlayer, selectedNumber, selectedColor)}
                    >
                        <FaCheck className="text-white w-6 h-6 p-1"/>
                    </button>
                    : <></> 
                }
            </div>
        </div>
    );
}