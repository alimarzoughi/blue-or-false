export type Color = "red" | "blue" | "yellow" | "green" | "orange" | "purple" | "pink" | "black";
export type Number = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Card = { color: Color; number: Number };
export type Player = {
  name: string;
  hand: Card[];
  bank: Card[];
  isAI: boolean;
};
