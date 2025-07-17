"use client";

import React, { useState, useEffect } from "react";
import CardView from "./components/CardView";
import PlayerArea from "./components/PlayerArea";
import MovingCard from "./components/MovingCard";

// Card and Player types
type Color = "red" | "blue" | "yellow" | "green" | "orange" | "purple" | "pink" | "black";
type Number = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Card = { color: Color; number: Number };
type Player = {
  name: string;
  hand: Card[];
  bank: Card[];
  isAI: boolean;
};

const COLORS: Color[] = ["red", "blue", "yellow", "green", "orange", "purple", "pink", "black"];
const NUMBERS: Number[] = [1,2,3,4,5,6,7,8];

// Utility to shuffle array
function shuffle<T>(arr: T[]): T[] {
  return arr.slice().sort(() => Math.random() - 0.5);
}

// Generate deck
function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const color of COLORS) {
    for (const number of NUMBERS) {
      deck.push({ color, number });
    }
  }
  return deck;
}

// AI bluff logic
function aiChooseCard(ai: Player): Card {
  // Pick random card from hand
  return ai.hand[Math.floor(Math.random() * ai.hand.length)];
}
function aiBluff(card: Card, isFirst: boolean, prevBluff?: { color: Color; number: Number }): { color: Color; number: Number } {
  const rand = Math.random();
  if (isFirst) {
    if (rand < 0.5) return { ...card }; // 50% truth
    if (rand < 0.85) {
      // 35% lie about one attribute
      if (Math.random() < 0.5) {
        // Lie about color
        const fakeColor = COLORS.filter(c => c !== card.color)[Math.floor(Math.random() * 7)];
        return { color: fakeColor, number: card.number };
      } else {
        // Lie about number
        const fakeNumber = NUMBERS.filter(n => n !== card.number)[Math.floor(Math.random() * 7)];
        return { color: card.color, number: fakeNumber };
      }
    }
    // 15% lie about both
    const fakeColor = COLORS.filter(c => c !== card.color)[Math.floor(Math.random() * 7)];
    const fakeNumber = NUMBERS.filter(n => n !== card.number)[Math.floor(Math.random() * 7)];
    return { color: fakeColor, number: fakeNumber };
  } else {
    if (rand < 0.25 && prevBluff) return { ...prevBluff }; // 25% repeat previous
    if (rand < 0.5) return { ...card }; // 25% truth
    if (rand < 0.85) {
      // 35% lie about one
      if (Math.random() < 0.5) {
        const fakeColor = COLORS.filter(c => c !== card.color)[Math.floor(Math.random() * 7)];
        return { color: fakeColor, number: card.number };
      } else {
        const fakeNumber = NUMBERS.filter(n => n !== card.number)[Math.floor(Math.random() * 7)];
        return { color: card.color, number: fakeNumber };
      }
    }
    // 15% lie about both
    const fakeColor = COLORS.filter(c => c !== card.color)[Math.floor(Math.random() * 7)];
    const fakeNumber = NUMBERS.filter(n => n !== card.number)[Math.floor(Math.random() * 7)];
    return { color: fakeColor, number: fakeNumber };
  }
}

// Initial game setup
function initPlayers(): Player[] {
  return [
    { name: "You", hand: [], bank: [], isAI: false },
    { name: "AI 1", hand: [], bank: [], isAI: true },
    { name: "AI 2", hand: [], bank: [], isAI: true },
    { name: "AI 3", hand: [], bank: [], isAI: true },
  ];
}
function dealCards(deck: Card[]): Player[] {
  const players = initPlayers();
  for (let i = 0; i < 16; i++) {
    for (let p = 0; p < 4; p++) {
      players[p].hand.push(deck[i*4 + p]);
    }
  }
  return players;
}

// Win condition check
function checkWin(bank: Card[]): boolean {
  // 4 of same color or number
  const colorCount: Record<Color, number> = Object.fromEntries(COLORS.map(c => [c,0])) as any;
  const numberCount: Record<Number, number> = Object.fromEntries(NUMBERS.map(n => [n,0])) as any;
  for (const card of bank) {
    colorCount[card.color]++;
    numberCount[card.number]++;
  }
  return Object.values(colorCount).some(v => v >= 4) || Object.values(numberCount).some(v => v >= 4);
}

// Main React component
export default function GamePage() {
  // Game state
  const [players, setPlayers] = useState<Player[]|null>(null);
  const [turn, setTurn] = useState<number|null>(null);
  const [phase, setPhase] = useState<"choose"|"give"|"receive"|"peek"|"contest"|"end">("choose");
  const [selectedCard, setSelectedCard] = useState<Card|null>(null);
  const [targetPlayer, setTargetPlayer] = useState<number|null>(null);
  const [bluff, setBluff] = useState<{color:Color,number:Number}|null>(null);
  const [bluffHistory, setBluffHistory] = useState<{color:Color,number:Number}[]>([]);
  const [message, setMessage] = useState<string>("");

  // Card movement state
  const [movingCard, setMovingCard] = useState<{from: number, to: number, card: Card|null}|null>(null);

  // Bluff log for current card
  const [bluffLog, setBluffLog] = useState<{player: string, text: string}[]>([]);

  // Reset bluff log when a new card is selected/given
  useEffect(() => {
    if (phase === "choose" || phase === "give") {
      setBluffLog([]);
    }
  }, [phase, selectedCard]);

  // Add to bluff log when a player says something about the card
  useEffect(() => {
    if (
      (phase === "receive" && bluff && targetPlayer !== null && players)
    ) {
      const speaker = players[turn!].name;
      setBluffLog(log => [...log, { player: speaker, text: `${bluff.color} ${bluff.number}` }]);
    }
  }, [phase, bluff, targetPlayer, players, turn]);

  // Initialize players and turn on client only
  useEffect(() => {
    if (!players) {
      const deck = shuffle(createDeck());
      setPlayers(dealCards(deck));
    }
  }, [players]);

  useEffect(() => {
    if (players && turn === null) {
      setTurn(Math.floor(Math.random() * 4));
    }
  }, [players, turn]);

  // When a card is given, animate movement
  useEffect(() => {
    if (phase === "give" && selectedCard && targetPlayer !== null) {
      setMovingCard({ from: turn!, to: targetPlayer, card: selectedCard });
      setTimeout(() => setMovingCard(null), 3000);
    }
  }, [phase, selectedCard, targetPlayer, turn]);

  // AI receive logic
  useEffect(() => {
    if (
      phase === "receive" &&
      targetPlayer !== null &&
      players &&
      players[targetPlayer].isAI &&
      turn !== null
    ) {
      // AI peeks at the card, then passes to another player and bluffs
      setTimeout(() => {
        // AI peeks
        setPhase("give");
        setSelectedCard(selectedCard);
        setTargetPlayer(null);
        setBluff(null);

        // Pick a new target (not self, not previous giver, must have cards)
        const aiIdx = targetPlayer;
        const possibleTargets = [0, 1, 2, 3].filter(
          i => i !== aiIdx && players[i].hand.length > 0
        );
        const newTarget = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
        const cardToGive = selectedCard;

        // AI bluff
        const prevBluff = bluffHistory.length ? bluffHistory[bluffHistory.length - 1] : undefined;
        const isFirst = bluffHistory.length === 0;
        const aiBluffCard = aiBluff(cardToGive!, isFirst, prevBluff);

        setTimeout(() => {
          setSelectedCard(cardToGive);
          setTargetPlayer(newTarget);
          setBluff(aiBluffCard);
          setPhase("receive");
          setBluffHistory([...bluffHistory, aiBluffCard]);
          setMessage(
            `${players[aiIdx].name} gives a card to ${players[newTarget].name} and says: ${aiBluffCard.color} ${aiBluffCard.number}`
          );
        }, 3000);
      }, 3000);
    }
  }, [phase, targetPlayer, players, selectedCard, bluffHistory, turn]);

  // Start new round
  function startRound(loserIdx: number) {
    if (!players) return;
    setTurn(loserIdx);
    setPhase("choose");
    setSelectedCard(null);
    setTargetPlayer(null);
    setBluff(null);
    setMessage("");
  }

  // Handle player choosing card and target
  function handleChooseCard(card: Card, targetIdx: number) {
    if (!players) return;
    setSelectedCard(card);
    setTargetPlayer(targetIdx);
    setPhase("give");
  }

  // Handle bluff (user input)
  function handleBluff(color: Color, number: Number) {
    if (!players) return;
    setBluff({ color, number });
    setPhase("receive");
  }

  // Handle AI turn
  function aiTurn(aiIdx: number) {
    if (!players || turn === null) return;
    const ai = players[aiIdx];
    const card = aiChooseCard(ai);
    // Pick a random target (not self)
    const targets = [0,1,2,3].filter(i => i !== aiIdx && players[i].hand.length > 0);
    const targetIdx = targets[Math.floor(Math.random() * targets.length)];
    setSelectedCard(card);
    setTargetPlayer(targetIdx);
    // AI bluff
    const prevBluff = bluffHistory.length ? bluffHistory[bluffHistory.length-1] : undefined;
    const isFirst = bluffHistory.length === 0;
    const aiBluffCard = aiBluff(card, isFirst, prevBluff);
    setBluff(aiBluffCard);
    setPhase("receive");
    setBluffHistory([...bluffHistory, aiBluffCard]);
    setMessage(`${ai.name} gives a card to ${players[targetIdx].name} and says: ${aiBluffCard.color} ${aiBluffCard.number}`);
  }

  // Handle receiving card (peek/contest)
  function handleReceive(action: "peek"|"contest"|"believe"|"accuse-color"|"accuse-number") {
    if (!players || turn === null || targetPlayer === null || selectedCard === null || bluff === null) return;
    const receiver = players[targetPlayer];
    const giver = players[turn];
    let loserIdx = -1;
    let contestResult = "";
    if (action === "peek") {
      setMessage(`You peeked: ${selectedCard.color} ${selectedCard.number}. Now pass to another player and bluff.`);
      setPhase("give");
      return;
    }
    if (action === "believe") {
      // If bluff matches actual card, receiver wins, else giver wins
      if (selectedCard.color === bluff.color && selectedCard.number === bluff.number) {
        contestResult = `${receiver.name} was correct! ${giver.name} loses the contest.`;
        loserIdx = turn;
      } else {
        contestResult = `${receiver.name} was wrong! ${receiver.name} loses the contest.`;
        loserIdx = targetPlayer;
      }
    }
    if (action === "accuse-color") {
      if (selectedCard.color !== bluff.color) {
        contestResult = `${receiver.name} was correct! ${giver.name} loses the contest.`;
        loserIdx = turn;
      } else {
        contestResult = `${receiver.name} was wrong! ${receiver.name} loses the contest.`;
        loserIdx = targetPlayer;
      }
    }
    if (action === "accuse-number") {
      if (selectedCard.number !== bluff.number) {
        contestResult = `${receiver.name} was correct! ${giver.name} loses the contest.`;
        loserIdx = turn;
      } else {
        contestResult = `${receiver.name} was wrong! ${receiver.name} loses the contest.`;
        loserIdx = targetPlayer;
      }
    }
    // Move card to bank of loser
    const newPlayers = players.map((p,i) => {
      if (i === loserIdx && i !== -1) {
        return { ...p, bank: [...p.bank, selectedCard], hand: p.hand.filter(c => c !== selectedCard) };
      }
      if (i === turn) {
        return { ...p, hand: p.hand.filter(c => c !== selectedCard) };
      }
      return p;
    });
    // Defensive: If loserIdx is invalid, abort further logic
    if (loserIdx === -1 || !newPlayers[loserIdx]) {
      setMessage("Error: Could not determine loser of contest.");
      return;
    }
    setPlayers(newPlayers);
    setMessage(contestResult);
    // Check win
    if (checkWin(newPlayers[loserIdx].bank) || newPlayers[loserIdx].hand.length === 0) {
      setPhase("end");
      setMessage(`${newPlayers[loserIdx].name} loses! Game over.`);
      return;
    }
    // Next round
    setTimeout(() => startRound(loserIdx), 3000);
  }

  // Guard: wait for client-side state
  if (!players || turn === null) {
    return <div style={{ fontFamily: "sans-serif", padding: 20 }}>Loading...</div>;
  }

  // Table positions: [top, left, right, bottom]
  // Always put "You" at the bottom
  const youIdx = players?.findIndex(p => p.name === "You") ?? 0;
  const positions = [
    { idx: (youIdx + 1) % 4, label: "Top" },
    { idx: (youIdx + 2) % 4, label: "Left" },
    { idx: (youIdx + 3) % 4, label: "Right" },
    { idx: youIdx, label: "Bottom" },
  ];

  // Render UI
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>Blue or False</h1>
      <div style={{
        display: "grid",
        gridTemplateAreas: `
          ". top ."
          "left center right"
          ". bottom ."
        `,
        gridTemplateRows: "80px 1fr 140px",
        gridTemplateColumns: "120px 1fr 120px",
        gap: "8px",
        minHeight: 400,
        marginBottom: 24,
        position: "relative"
      }}>
        {/* Top player */}
        <PlayerArea
          position="top"
          player={players[positions[0].idx]}
          isCurrent={turn === positions[0].idx && phase !== "end"}
          showHand={false}
        />
        {/* Left player */}
        <PlayerArea
          position="left"
          player={players[positions[1].idx]}
          isCurrent={turn === positions[1].idx && phase !== "end"}
          showHand={false}
        />
        {/* Right player */}
        <PlayerArea
          position="right"
          player={players[positions[2].idx]}
          isCurrent={turn === positions[2].idx && phase !== "end"}
          showHand={false}
        />
        {/* Bottom player (You) */}
        <div style={{
          gridArea: "bottom",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <PlayerArea
            position="bottom"
            player={players[positions[3].idx]}
            isCurrent={turn === positions[3].idx && phase !== "end"}
            showHand={true}
            selectedCard={selectedCard}
            onSelectCard={phase === "choose" && turn === positions[3].idx ? setSelectedCard : undefined}
            bankSortOptions={["number", "color"]}
          />
        </div>
        {/* Center area for actions and bluff log */}
        <div style={{
          gridArea: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 120
        }}>
          {/* Bluff log */}
          <div style={{ marginBottom: 12 }}>
            {bluffLog.length > 0 && (
              <div>
                <strong>Card claims:</strong>
                <ul style={{ paddingLeft: 16 }}>
                  {bluffLog.map((entry, i) => (
                    <li key={i}><b>{entry.player}:</b> {entry.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Card movement animation */}
          {movingCard && (
            <div style={{
              position: "absolute",
              left: "50%",
              bottom: 40,
              transform: "translateX(-50%)",
              zIndex: 10
            }}>
              <MovingCard from={movingCard.from} to={movingCard.to} />
            </div>
          )}
          {/* Actions */}
          {phase === "choose" && turn === positions[3].idx && (
            <div>
              <h3>Your turn: Choose a card and a player to give it to</h3>
              <div>
                {selectedCard && (
                  <div>
                    <span>Selected: </span>
                    <CardView card={selectedCard} />
                    <div style={{ marginTop: 8 }}>
                      {positions.slice(0, 3).map((pos, idx) => (
                        <button
                          key={players[pos.idx].name}
                          onClick={() => handleChooseCard(selectedCard, pos.idx)}
                          disabled={players[pos.idx].hand.length === 0}
                          style={{ margin: 2 }}
                        >
                          Give to {players[pos.idx].name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {phase === "give" && turn === positions[3].idx && targetPlayer !== null && (
            <div>
              <h3>Bluff: What do you say this card is?</h3>
              <div>
                <select onChange={e => setBluff(b => ({...b!, color: e.target.value as Color}))} value={bluff?.color || COLORS[0]}>
                  {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select onChange={e => setBluff(b => ({...b!, number: Number(e.target.value) as Number}))} value={bluff?.number || NUMBERS[0]}>
                  {NUMBERS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <button onClick={() => handleBluff(bluff?.color || COLORS[0], bluff?.number || NUMBERS[0])}>Say it!</button>
              </div>
            </div>
          )}
          {/* Always show peek/contest if you receive a card */}
          {phase === "receive" && targetPlayer === positions[3].idx && (
            <div>
              <h3>You received a card: {bluff?.color} {bluff?.number}</h3>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => handleReceive("peek")}>Peek</button>
                <button type="button" onClick={() => handleReceive("contest")}>Contest</button>
              </div>
            </div>
          )}
          {phase === "receive" && targetPlayer !== null && targetPlayer !== positions[3].idx && (
            <div>
              {/* No text, just animation */}
            </div>
          )}
          {phase === "end" && (
            <div>
              <h2>{message}</h2>
              <button onClick={() => window.location.reload()}>Restart</button>
            </div>
          )}
          {/* AI turn automation */}
          {phase === "choose" && turn !== positions[3].idx && (
            <div>
              <button onClick={() => aiTurn(turn!)}>Let AI play turn</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
