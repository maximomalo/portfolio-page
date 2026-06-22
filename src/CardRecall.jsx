import { useState, useEffect } from "react";

const SUITS = [
  { id: "hearts", symbol: "♥", color: "text-rose-600" },
  { id: "diamonds", symbol: "♦", color: "text-rose-600" },
  { id: "clubs", symbol: "♣", color: "text-slate-900" },
  { id: "spades", symbol: "♠", color: "text-slate-900" },
];

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const DIFFICULTY = {
  easy: { memorize: 1, target: 5 },
  medium: { memorize: 2, target: 10 },
  hard: { memorize: 3, target: 20 },
};

const MEMORIZE_SECONDS = 5;

function buildDeck(deckMode, chosenSuit) {
  const suitsToUse =
    deckMode === "full" ? SUITS : SUITS.filter((s) => s.id === chosenSuit);
  return suitsToUse.flatMap((suit) =>
    RANKS.map((rank) => ({
      key: `${rank}-${suit.id}`,
      rank,
      suit: suit.id,
      symbol: suit.symbol,
      color: suit.color,
    }))
  );
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function CardRecall({ onBack = () => {} }) {
  
  const [difficulty, setDifficulty] = useState("easy");
  const [deckMode, setDeckMode] = useState("full");
  const [chosenSuit, setChosenSuit] = useState("hearts");

 
  const [screen, setScreen] = useState("setup"); 
  const [deck, setDeck] = useState([]);
  const [memorizeCount, setMemorizeCount] = useState(1);
  const [targetGoal, setTargetGoal] = useState(5);
  const [streak, setStreak] = useState(0);
  const [bestStreaks, setBestStreaks] = useState({ easy: 0, medium: 0, hard: 0 });

 
  const [targetCards, setTargetCards] = useState([]);
  const [gridCards, setGridCards] = useState([]);
  const [foundKeys, setFoundKeys] = useState(new Set());
  const [wrongKey, setWrongKey] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(MEMORIZE_SECONDS);

  const startRound = (deckArg, countArg) => {
    const shuffled = shuffle(deckArg);
    const targets = shuffled.slice(0, countArg);
    const restPool = shuffled.slice(countArg);
    const gridSize = Math.min(25, deckArg.length);
    const fillCount = gridSize - targets.length;
    const grid = shuffle([...targets, ...restPool.slice(0, fillCount)]);

    setTargetCards(targets);
    setGridCards(grid);
    setFoundKeys(new Set());
    setWrongKey(null);
    setSecondsLeft(MEMORIZE_SECONDS);
    setScreen("memorize");
  };

  const handleStart = () => {
    const cfg = DIFFICULTY[difficulty];
    const builtDeck = buildDeck(deckMode, chosenSuit);
    setDeck(builtDeck);
    setMemorizeCount(cfg.memorize);
    setTargetGoal(cfg.target);
    setStreak(0);
    startRound(builtDeck, cfg.memorize);
  };

  const handleCardClick = (card) => {
    if (screen !== "choose") return;
    if (foundKeys.has(card.key) || wrongKey) return;

    const isTarget = targetCards.some((t) => t.key === card.key);

    if (isTarget) {
      const next = new Set(foundKeys);
      next.add(card.key);
      setFoundKeys(next);

      if (next.size === targetCards.length) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setBestStreaks((b) => ({
          ...b,
          [difficulty]: Math.max(b[difficulty], newStreak),
        }));
        setScreen(newStreak >= targetGoal ? "win" : "roundclear");
      }
    } else {
      setBestStreaks((b) => ({
        ...b,
        [difficulty]: Math.max(b[difficulty], streak),
      }));
      setWrongKey(card.key);
    }
  };

  
  useEffect(() => {
    if (screen !== "memorize") return;
    if (secondsLeft <= 0) {
      setScreen("choose");
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, secondsLeft]);

  
  useEffect(() => {
    if (screen !== "roundclear") return;
    const t = setTimeout(() => startRound(deck, memorizeCount), 800);
    return () => clearTimeout(t);
   
  }, [screen]);

 
  useEffect(() => {
    if (!wrongKey) return;
    const t = setTimeout(() => setScreen("gameover"), 700);
    return () => clearTimeout(t);
  }, [wrongKey]);

  const cardState = (card) => {
    if (wrongKey === card.key) return "wrong";
    if (foundKeys.has(card.key)) return "found";
    if (wrongKey && targetCards.some((t) => t.key === card.key)) return "missed";
    return "default";
  };

  return (
    <div
      className="min-h-screen bg-emerald-900 text-white flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <header className="relative flex items-center justify-center px-6 py-5 border-b border-emerald-800">
        <button
          onClick={onBack}
          className="absolute left-6 text-sm text-emerald-300 hover:text-white transition-colors"
        >
          ← Back to portfolio
        </button>
        <h1 className="text-xl font-semibold tracking-wide">Card Recall</h1>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        {screen === "setup" && (
          <div className="w-full max-w-md bg-emerald-800 rounded-xl p-8 border border-emerald-700">
            <p className="text-emerald-300 text-xs font-mono uppercase tracking-wider mb-2">
              Memory Card Game
            </p>
            <h2 className="text-2xl font-semibold mb-6">Choose Your Settings</h2>

            <p className="text-sm text-emerald-300 mb-2">Difficulty</p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {Object.keys(DIFFICULTY).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`text-left p-3 rounded-lg border transition-colors ${
                    difficulty === level
                      ? "border-amber-400 bg-emerald-700"
                      : "border-emerald-700 bg-emerald-800 hover:bg-emerald-700"
                  }`}
                >
                  <span className="block font-medium capitalize">{level}</span>
                  <span className="block text-xs text-emerald-300 mt-1">
                    {DIFFICULTY[level].memorize} card
                    {DIFFICULTY[level].memorize > 1 ? "s" : ""} · streak of{" "}
                    {DIFFICULTY[level].target}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-sm text-emerald-300 mb-2">Deck</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => setDeckMode("full")}
                className={`p-3 rounded-lg border text-sm transition-colors ${
                  deckMode === "full"
                    ? "border-amber-400 bg-emerald-700"
                    : "border-emerald-700 bg-emerald-800 hover:bg-emerald-700"
                }`}
              >
                Full deck (52 cards)
              </button>
              <button
                onClick={() => setDeckMode("single")}
                className={`p-3 rounded-lg border text-sm transition-colors ${
                  deckMode === "single"
                    ? "border-amber-400 bg-emerald-700"
                    : "border-emerald-700 bg-emerald-800 hover:bg-emerald-700"
                }`}
              >
                Single suit (13 cards)
              </button>
            </div>

            {deckMode === "single" && (
              <div className="flex gap-2 mb-6">
                {SUITS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setChosenSuit(s.id)}
                    className={`w-12 h-12 rounded-lg border flex items-center justify-center text-xl ${s.color} ${
                      chosenSuit === s.id
                        ? "border-amber-400 bg-emerald-700"
                        : "border-emerald-700 bg-emerald-800"
                    }`}
                    aria-label={s.id}
                  >
                    {s.symbol}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleStart}
              className="w-full bg-amber-400 text-emerald-950 font-semibold py-3 rounded-lg hover:bg-amber-300 transition-colors mt-2"
            >
              Start Game
            </button>

            <p className="text-center text-xs text-emerald-400 mt-4">
              Best streak on {difficulty}: {bestStreaks[difficulty]}
            </p>
          </div>
        )}

        {screen === "memorize" && (
          <div className="flex flex-col items-center gap-8">
            <p className="text-emerald-300 text-sm">
              Memorize {memorizeCount > 1 ? "these cards" : "this card"}
            </p>
            <div className="flex gap-4">
              {targetCards.map((card) => (
                <div
                  key={card.key}
                  className="w-24 h-32 bg-white rounded-lg flex flex-col items-center justify-center shadow-sm"
                >
                  <span className="text-2xl font-semibold text-slate-900">
                    {card.rank}
                  </span>
                  <span className={`text-3xl ${card.color}`}>{card.symbol}</span>
                </div>
              ))}
            </div>
            <div className="text-4xl font-semibold text-amber-400">
              {secondsLeft}
            </div>
          </div>
        )}

        {(screen === "choose" || screen === "roundclear") && (
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="flex items-center gap-6 mb-4 text-sm">
              <span className="text-emerald-300">
                Streak: <span className="text-white font-semibold">{streak}</span>
              </span>
              <span className="text-emerald-300">
                Goal: <span className="text-white font-semibold">{targetGoal}</span>
              </span>
              {memorizeCount > 1 && (
                <span className="text-emerald-300">
                  Found:{" "}
                  <span className="text-white font-semibold">
                    {foundKeys.size}/{memorizeCount}
                  </span>
                </span>
              )}
            </div>

            <p className="text-emerald-200 mb-4">
              {screen === "roundclear"
                ? "Nice — on to the next round"
                : `Find ${memorizeCount > 1 ? "the cards" : "the card"} you just saw`}
            </p>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {gridCards.map((card) => {
                const state = cardState(card);
                return (
                  <button
                    key={card.key}
                    onClick={() => handleCardClick(card)}
                    disabled={state === "found" || Boolean(wrongKey)}
                    aria-label={`${card.rank} of ${card.suit}`}
                    className={`w-12 h-16 sm:w-14 sm:h-20 rounded-md flex flex-col items-center justify-center text-xs font-medium transition-colors border ${
                      state === "found"
                        ? "bg-white text-slate-900 ring-2 ring-emerald-400 border-transparent"
                        : state === "wrong"
                        ? "bg-rose-600 text-white border-rose-600"
                        : state === "missed"
                        ? "bg-white text-slate-900 ring-2 ring-amber-400 border-transparent"
                        : "bg-white text-slate-900 border-emerald-700 hover:border-amber-400"
                    }`}
                  >
                    <span>{card.rank}</span>
                    <span className={state === "wrong" ? "text-white" : card.color}>
                      {card.symbol}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {screen === "gameover" && (
          <div className="w-full max-w-sm text-center">
            <p className="text-rose-400 text-sm font-medium mb-2">Game Over</p>
            <h2 className="text-3xl font-semibold mb-4">Streak: {streak}</h2>
            <p className="text-emerald-300 mb-1">Goal for {difficulty}: {targetGoal}</p>
            <p className="text-emerald-400 mb-8">
              Best streak on {difficulty}: {bestStreaks[difficulty]}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleStart}
                className="bg-amber-400 text-emerald-950 font-semibold py-3 rounded-lg hover:bg-amber-300 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={() => setScreen("setup")}
                className="border border-emerald-700 py-3 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                Change Settings
              </button>
            </div>
          </div>
        )}

        {screen === "win" && (
          <div className="w-full max-w-sm text-center">
            <p className="text-amber-400 text-sm font-medium mb-2">Level Complete</p>
            <h2 className="text-3xl font-semibold mb-4">Streak: {streak}</h2>
            <p className="text-emerald-300 mb-8">
              You reached the {difficulty} goal of {targetGoal} in a row.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleStart}
                className="bg-amber-400 text-emerald-950 font-semibold py-3 rounded-lg hover:bg-amber-300 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={() => setScreen("setup")}
                className="border border-emerald-700 py-3 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                Change Settings
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
