    "use client"

    import React from "react"

    import type { CardData } from "./Card"
    import PlayerBank from "./PlayerBank"
    import PlayerHand from "./PlayerHand"

    export default function PlayerArea({ position, bank, hand, setHand, chooseCard }: {
        position: number,
        bank: CardData[],
        hand: CardData[],
        setHand: (hand: CardData[], player: number) => void
        chooseCard: React.Dispatch<React.SetStateAction<CardData | null>>
    }) {
        const [mode, setMode] = React.useState("number");

        function sortBank(newMode: string) {
            const newHand = newMode === "number"
                ? hand.toSorted((a, b) => a.value - b.value)
                : hand.toSorted((a, b) => a.color.id - b.color.id)
            setHand(newHand, position - 1);
            setMode(newMode);
        }

        let playerAreaStyle = "border rounded-lg flex items-center justify-end ";
        if (position === 1) {
            playerAreaStyle += "flex-col min-h-[300px] max-h-[500px]";
        } else if (position === 2) {
            playerAreaStyle += "flex-row-reverse h-full w-[500px]";
        } else if (position === 3) {
            playerAreaStyle += "flex-col-reverse min-h-[300px] max-h-[500px]";
        } else {
            playerAreaStyle += "h-full w-[500px]";
        }

        return (
            <div className={playerAreaStyle}>
                <PlayerBank position={position} mode={mode} bank={bank}></PlayerBank>
                <div className={"flex justify-center items-center " + (position % 2 == 0 ? "flex-col" : "gap-10")}>
                    <div className={"w-18" + (position % 2 == 0 ? "" : " pb-6")}>
                        <span> Hand Count: {hand.length} </span>
                    </div>
                    <PlayerHand
                        position={position}
                        hand={hand}
                        setHand={setHand}
                        chooseCard={chooseCard}
                    ></PlayerHand>
                    <div className={"flex flex-col justify-center items-center gap-1 w-18" + (position === 1 ? " pb-10" : "")}>
                        <span> Sort By: </span>
                        <button onClick={() => sortBank("color")} className="border-2 rounded-md w-full"> Color </button>
                        <button onClick={() => sortBank("number")} className="border-2 rounded-md w-full"> Number </button>
                    </div>
                </div>
            </div>
        );  
    }
