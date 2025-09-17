import type { CardData } from "./components/card"
import { colors } from "./components/card"
import PlayerArea from "./components/playerarea";

function drawCards(player: number): CardData[] {
  let numbers: CardData[] = [];

  let number;
  let color;
  for (let i=0; i<16; i++) {
    number = Math.floor(Math.random() * 8) + 1;
    color = colors[Math.floor(Math.random() * 8)];
    numbers.push({value: number, color: color, player: player});
  }
  return numbers;
}

export default function Home() {
  return (
    <div className="p-5">
        <PlayerArea player={1} cards={drawCards(1)}></PlayerArea>
        <div className="flex justify-between">
          <PlayerArea player={2} cards={drawCards(2)}></PlayerArea>
          <PlayerArea player={4} cards={drawCards(4)}></PlayerArea>
        </div>
        <PlayerArea player={3} cards={drawCards(3)}></PlayerArea>
    </div>
  );
}
