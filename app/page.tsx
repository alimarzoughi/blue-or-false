import BlueOrFalse from "./components/BlueOrFalse";
import type { CardColor, CardData } from "./components/Card"
import { colors } from "./components/Card"

function drawCards(): CardData[][] {
  const hands: CardData[][] = [];
  let hand: CardData[];
  let num: number;
  let color: CardColor;
  for (let i = 1; i <= 4; i++) {
    hand = [];
    for (let j = 0; j < 16; j++) {
      num = Math.floor(Math.random() * 8) + 1;
      color = colors[Math.floor(Math.random() * 8)];
      hand.push({id: i * 16 + j, value: num, color: color});
    }
    hands.push(hand)
  }
  return hands;
}

export default function Home() {
  return (
    <div className="p-5">
      <BlueOrFalse hands={drawCards()}></BlueOrFalse>
    </div>
  );
}
