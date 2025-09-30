"use client"

import React from "react"

import type { CardData } from "./Card"
import Card from "./Card"
import type { CardClaim } from "./CardSelector"
import CardSelector from "./CardSelector"
import GameLog from "./GameLog"


export default function PassArea({ currentPlayer, setCurrentPlayer, chosenCard, chooseCard }: {
    currentPlayer: number,
    setCurrentPlayer: React.Dispatch<React.SetStateAction<number>>,
    chosenCard: CardData | null,
    chooseCard: React.Dispatch<React.SetStateAction<CardData | null>>
}) {
    const [claim, setClaim] = React.useState<CardClaim | null>(null);
    const [passedClaim, passClaim] = React.useState<CardClaim | null>(null);
    const [passedCard, passCard] = React.useState<CardData | null>(null);
    const [remainingPlayers, setRemainingPlayers] = React.useState<number[]>([0, 1, 2, 3].filter(p => p != currentPlayer));

    function nextPlayer(player: number) {
        setRemainingPlayers(remainingPlayers.filter(p => p != currentPlayer));
        passClaim(claim);
        setClaim(null);
        setCurrentPlayer(player);
    }

    return (
        <div className="w-full h-full flex flex-col items-center p-1">
            <Card card={passedCard} position={3} className={currentPlayer === 2 ? "" : "hidden"}></Card>
            <div className="relative flex justify-center items-center w-full flex-1">
                <div className="absolute left-0">
                    <Card card={passedCard} position={2} className={currentPlayer === 1 ? "" : "hidden"}></Card>
                </div>
                {claim
                    ? <div className="flex flex-col">
                        <span>Pass to:</span>
                        {remainingPlayers.map(player => (
                            <button key={player} className="border-2 rounded-md w-20" onClick={() => nextPlayer(player)}>
                                Player {player + 1}
                            </button>
                        ))}
                    </div>
                    : <GameLog currentPlayer={currentPlayer} passedClaim={passedClaim}></GameLog>
                }
                <div className="absolute right-0">
                    <Card card={passedCard} position={4} className={currentPlayer === 3 ? "" : "hidden"}></Card>
                </div>

            </div>
            {chosenCard
                ? <CardSelector
                    currentPlayer={currentPlayer}
                    card={chosenCard}
                    chooseCard={chooseCard}
                    passCard={passCard}
                    setClaim={setClaim}
                ></CardSelector>
                : <></>
            }
        </div>
    );
}