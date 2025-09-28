import type { CardData } from "./Card"
import Card from "./Card"
import CardSelector from "./CardSelector"

export default function PassArea({ currentPlayer, playedCard }: { currentPlayer: number, playedCard: CardData | null }) {
    return (
        <div className="w-full h-full flex flex-col items-center gap-2">
            <Card card={playedCard} position={3} className={playedCard && currentPlayer === 2 ? "" : "hidden"}></Card>
            <div className="flex justify-center items-center w-full flex-1">
                <Card card={playedCard} position={2} className={playedCard && currentPlayer === 1 ? "" : "hidden"}></Card>
                <span>Player {currentPlayer + 1}'s turn</span>
                <Card card={playedCard} position={4} className={playedCard && currentPlayer === 3 ? "" : "hidden"}></Card>
            </div>
            {playedCard ? <CardSelector></CardSelector> : <></>}
            <Card card={playedCard} position={1} className={playedCard && currentPlayer === 0 ? "" : "hidden"}></Card>
        </div>
    );
}