import type { CardClaim } from "./CardSelector"

export default function GameLog({currentPlayer, passedClaim}: {currentPlayer: number, passedClaim: CardClaim | null}) {
    return (
        passedClaim 
            ? <div className="flex flex-col items-center">
                <span>Player {passedClaim.player + 1} Claims</span>
                <div className="flex gap-1">
                    <div
                        className="flex justify-center border-2 rounded-md w-15"
                        style={{ backgroundColor: passedClaim.claim.color.bgColor }}
                    >
                        <span style={{ color: passedClaim.claim.color.txtColor }}>
                            {passedClaim.claim.color.name}
                        </span>
                    </div>
                    <div className="flex justify-center border-2 rounded-md w-15" >
                        {passedClaim.claim.value}
                    </div>
                </div>
            </div>
            : <span>Player {currentPlayer + 1}'s turn</span>
    );
}