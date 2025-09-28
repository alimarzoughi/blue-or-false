    "use client"

    import React from "react"

    import type { CardData } from "./Card"
    import PlayerBank from "./PlayerBank"
    import PlayerHand from "./PlayerHand"

    export default function PlayerArea({ position, bank, cards, setHands, setPlayedCard }: {
        position: number,
        bank: CardData[],
        cards: CardData[],
        setHands: React.Dispatch<React.SetStateAction<CardData[][]>>
        setPlayedCard: React.Dispatch<React.SetStateAction<CardData | null>>
    }) {
        const [mode, setMode] = React.useState("number");

        function sortBank(newMode: string) {
            const idx = position - 1;
            setHands(old =>
                old.map((hand, i) => 
                    i === idx
                    ? newMode === "number"
                        ? hand.toSorted((a, b) => a.value - b.value)
                        : hand.toSorted((a, b) => a.color.id - b.color.id)
                    : hand
                )
            );
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
                        <span> Hand Count: {cards.length} </span>
                    </div>
                    <PlayerHand
                        position={position}
                        cards={cards}
                        setPlayedCard={setPlayedCard}
                    ></PlayerHand>
                    <div className={"flex flex-col justify-center items-center gap-1 w-18" + (position === 1 ? " pb-10" : "")}>
                        <span> Sort By: </span>
                        <button onClick={() => sortBank("color")} className="border-2 rounded-md bg-white w-full"> Color </button>
                        <button onClick={() => sortBank("number")} className="border-2 rounded-md bg-white w-full"> Number </button>
                    </div>
                </div>
            </div>
        );  
    }
