import { useState, useMemo } from "react";

const GAMES = [
  {
    id: "cs2", name: "Counter-Strike 2", genre: "shooter", color: "#f0a83c",
    current: 629703, peak: 1818368,
    monthly: [920070, 928429, 925940, 948244, 981482, 991177, 1070444, 1084095, 1069173, 974786, 932721, 916655],
  },
  {
    id: "palworld", name: "Palworld", genre: "survival", color: "#7fd1ae",
    current: 555483, peak: 2101535,
    monthly: [50987, 32059, 24290, 27564, 29711, 35921, 43392, 34625, 29214, 23375, 16308, 26856],
  },
  {
    id: "dota2", name: "Dota 2", genre: "moba", color: "#e0607e",
    current: 394969, peak: 1291328,
    monthly: [426673, 532355, 580821, 538998, 583744, 594290, 569324, 597010, 477856, 425919, 422693, 466002],
  },
  {
    id: "pubg", name: "PUBG: BATTLEGROUNDS", genre: "battleroyale", color: "#4fb8b0",
    current: 108845, peak: 3236027,
    monthly: [303261, 295504, 278096, 266559, 277985, 279406, 290397, 267135, 327213, 353167, 321602, 317120],
  },
  {
    id: "rust", name: "Rust", genre: "survival", color: "#c98a4b",
    current: 100743, peak: 259646,
    monthly: [102159, 103018, 85515, 97411, 98213, 105484, 121003, 122377, 106570, 103352, 102508, 104083],
  },
  {
    id: "bg3", name: "Baldur's Gate 3", genre: "rpg", color: "#9b8cf2",
    current: 44383, peak: 875343,
    monthly: [51306, 53730, 48176, 46881, 45399, 52246, 67684, 51140, 44383, 40041, 41482, 39517],
  },
];


const MONTH_META = [
  {m:6,y:2025},{m:7,y:2025},{m:8,y:2025},{m:9,y:2025},{m:10,y:2025},{m:11,y:2025},
  {m:0,y:2026},{m:1,y:2026},{m:2,y:2026},{m:3,y:2026},{m:4,y:2026},{m:5,y:2026},
];

const MONTHS_SHORT = {
  en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  fr: ["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"],
};

const GENRE_LABELS = {
  en: { shooter:"Shooter", survival:"Survival", moba:"MOBA", battleroyale:"Battle Royale", rpg:"RPG" },
  fr: { shooter:"Tireur", survival:"Survie", moba:"MOBA", battleroyale:"Battle Royale", rpg:"RPG" },
};

const GENRE_ORDER = ["shooter", "survival", "moba", "battleroyale", "rpg"];

const T = {
  en: {
    kicker: "Player data snapshot",
    title: "Now Playing",
    subtitle: "How many people are playing the biggest games on Steam right now — and how that's shifted over the past year.",
    tickerHint: "Tap a game to add or remove it from the chart below.",
    genreHint: "Filter by genre:",
    genreAll: "All",
    barTitle: "Who's playing right now",
    barSubtitle: "Concurrent players on Steam, snapshot from July 19, 2026.",
    lineTitle: "12-month trend",
    lineSubtitle: "Average concurrent players per month, in the game's own colour.",
    selectLabel: "Game:",
    current: "Current players",
    allTimePeak: "All-time peak",
    genre: "Genre",
    empty: "Select at least one game above to build the comparison.",
    footer: "Data pulled from SteamCharts.com, a third-party tracker built on Steam's own public player-count figures. Numbers reflect a single snapshot taken July 19, 2026 — Steam's live counts change minute to minute, so the site itself will show different figures by the time you read this.",
  },
  fr: {
    kicker: "Instantané des données",
    title: "Now Playing",
    subtitle: "Combien de personnes jouent en ce moment aux plus grands jeux sur Steam — et comment ce chiffre a évolué au cours de la dernière année.",
    tickerHint: "Touchez un jeu pour l'ajouter ou le retirer du graphique ci-dessous.",
    genreHint: "Filtrer par genre :",
    genreAll: "Tous",
    barTitle: "Qui joue en ce moment",
    barSubtitle: "Joueurs simultanés sur Steam, instantané du 19 juillet 2026.",
    lineTitle: "Tendance sur 12 mois",
    lineSubtitle: "Nombre moyen de joueurs simultanés par mois, dans la couleur du jeu.",
    selectLabel: "Jeu :",
    current: "Joueurs actuels",
    allTimePeak: "Record absolu",
    genre: "Genre",
    empty: "Sélectionnez au moins un jeu ci-dessus pour créer la comparaison.",
    footer: "Données tirées de SteamCharts.com, un outil tiers construit à partir des chiffres publics de Steam. Les nombres reflètent un instantané pris le 19 juillet 2026 — les chiffres en direct de Steam changent à chaque minute, donc le site affichera des valeurs différentes au moment où vous lisez ceci.",
  },
};

function formatNumber(n, lang) {
  return n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US");
}

function formatCompact(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
  if (n >= 1000) return Math.round(n / 1000) + "K";
  return String(n);
}



function BarChart({ games, lang }) {
  const t = T[lang];
  if (games.length === 0) {
    return <div className="np-empty-state">{t.empty}</div>;
  }

  const globalMax = Math.max(...GAMES.map(g => g.current));
  const scaleMax = Math.ceil(globalMax / 100000) * 100000;

  const sorted = [...games].sort((a, b) => b.current - a.current);

  return (
    <div>
      {sorted.map(g => {
        const pct = (g.current / scaleMax) * 100;
        return (
          <div className="np-bar-row" key={g.id}>
            <div className="np-bar-label">{g.name}</div>
            <div className="np-bar-track">
              <div
                className="np-bar-fill"
                style={{ width: pct + "%", background: g.color }}
              />
            </div>
            <div className="np-bar-value">{formatNumber(g.current, lang)}</div>
          </div>
        );
      })}
    </div>
  );
}



function LineChart({ game, lang }) {
  const months = MONTHS_SHORT[lang];

  const W = 640, H = 260;
  const padL = 46, padR = 16, padT = 16, padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const globalMax = Math.max(...GAMES.flatMap(g => g.monthly));
  const yMax = Math.ceil(globalMax / 100000) * 100000;

  const points = game.monthly.map((v, i) => {
    const x = padL + (i / (game.monthly.length - 1)) * plotW;
    const y = padT + plotH - (v / yMax) * plotH;
    return [x, y];
  });

  const linePath = points.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const areaPath = linePath + ` L${points[points.length-1][0].toFixed(1)},${(padT+plotH).toFixed(1)} L${points[0][0].toFixed(1)},${(padT+plotH).toFixed(1)} Z`;

  const gridCount = 4;
  const gridLines = Array.from({ length: gridCount + 1 }, (_, i) => {
    const y = padT + (plotH / gridCount) * i;
    const val = yMax - (yMax / gridCount) * i;
    return { y, val };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" style={{ overflow: "visible" }}>
      {gridLines.map((g, i) => (
        <g key={i}>
          <line x1={padL} x2={W - padR} y1={g.y} y2={g.y} className="np-grid-line" />
          <text x={padL - 10} y={g.y + 4} fontSize="11" textAnchor="end">{formatCompact(g.val)}</text>
        </g>
      ))}
      <line x1={padL} x2={padL} y1={padT} y2={padT + plotH} className="np-axis-line" />
      <line x1={padL} x2={W - padR} y1={padT + plotH} y2={padT + plotH} className="np-axis-line" />

      <path d={areaPath} fill={game.color} opacity="0.12" stroke="none" />
      <path d={linePath} fill="none" stroke={game.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={game.color} />
      ))}

      {MONTH_META.map((meta, i) => {
        if (i % 2 !== 0) return null; 
        const x = padL + (i / (MONTH_META.length - 1)) * plotW;
        return (
          <text key={i} x={x} y={H - 8} fontSize="11" textAnchor="middle">
            {months[meta.m]}
          </text>
        );
      })}
    </svg>
  );
}



export default function NowPlaying({ onBack }) {
  const [lang, setLang] = useState("en");
  const [activeIds, setActiveIds] = useState(new Set(["cs2", "palworld", "dota2", "bg3"]));
  const [selectedGameId, setSelectedGameId] = useState("cs2");
  const [genreFilter, setGenreFilter] = useState("all");

  const t = T[lang];
  const genreLabels = GENRE_LABELS[lang];

  const toggleGame = (id) => {
    setActiveIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const visibleGames = genreFilter === "all" ? GAMES : GAMES.filter(g => g.genre === genreFilter);

  const handleGenreClick = (genre) => {
    setGenreFilter(genre);
    const games = genre === "all" ? GAMES : GAMES.filter(g => g.genre === genre);
    setActiveIds(new Set(games.map(g => g.id)));
  };

  const activeGames = useMemo(
    () => GAMES.filter(g => activeIds.has(g.id)),
    [activeIds]
  );

  const selectedGame = GAMES.find(g => g.id === selectedGameId);

  return (
    <div className="now-playing">
      <style>{`
        .now-playing{
          --np-bg: #10151c;
          --np-panel: #1a2230;
          --np-panel-2: #1f2937;
          --np-border: #2b3547;
          --np-text: #e9edf2;
          --np-text-muted: #8a95a6;
          --np-text-faint: #5c6779;
          --np-amber: #f0a83c;

          background: var(--np-bg);
          color: var(--np-text);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .now-playing *{ box-sizing: border-box; }

        .now-playing .np-wrap{
          max-width: 1080px;
          margin: 0 auto;
          padding: 40px 24px 64px;
        }

        .now-playing .np-back{
          background: transparent;
          border: 1px solid var(--np-border);
          color: var(--np-text-muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 28px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .now-playing .np-back:hover{
          color: var(--np-text);
          border-color: var(--np-text-muted);
        }

        .now-playing .np-topbar{
          display:flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: 36px;
        }

        .now-playing .np-kicker{
          display:flex;
          align-items:center;
          gap: 8px;
          font-family:'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.12em;
          color: var(--np-text-faint);
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .now-playing h1{
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.05;
          margin: 0 0 12px;
          letter-spacing: -0.01em;
          color: var(--np-text);
        }

        .now-playing .np-subtitle{
          color: var(--np-text-muted);
          font-size: 15px;
          max-width: 520px;
          line-height: 1.55;
          margin: 0;
        }

        .now-playing .np-lang-toggle{
          flex-shrink: 0;
          display:flex;
          background: var(--np-panel);
          border: 1px solid var(--np-border);
          border-radius: 999px;
          padding: 3px;
          font-family:'JetBrains Mono', monospace;
          font-size: 12px;
        }

        .now-playing .np-lang-toggle button{
          border:none;
          background:transparent;
          color: var(--np-text-faint);
          padding: 7px 14px;
          border-radius: 999px;
          cursor:pointer;
          font-family: inherit;
          font-size: inherit;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .now-playing .np-lang-toggle button.active{
          background: var(--np-amber);
          color: #241705;
        }

        .now-playing .np-ticker-hint{
          color: var(--np-text-faint);
          font-size: 12.5px;
          margin: 0 0 10px 2px;
          font-family:'JetBrains Mono', monospace;
          letter-spacing: 0.02em;
        }

        .now-playing .np-ticker{
          display:flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 6px;
          margin-bottom: 40px;
        }

        .now-playing .np-ticker::-webkit-scrollbar{ height: 5px; }
        .now-playing .np-ticker::-webkit-scrollbar-thumb{ background: var(--np-border); border-radius: 4px; }

        .now-playing .np-chip{
          flex: 0 0 auto;
          display:flex;
          align-items:center;
          gap: 9px;
          background: var(--np-panel);
          border: 1px solid var(--np-border);
          border-radius: 10px;
          padding: 10px 14px;
          cursor: pointer;
          transition: border-color 0.15s ease, opacity 0.15s ease, transform 0.1s ease;
          opacity: 0.45;
        }

        .now-playing .np-chip:hover{ transform: translateY(-1px); }

        .now-playing .np-chip.active{
          opacity: 1;
          border-color: var(--chip-color, var(--np-border));
        }

        .now-playing .np-chip-dot{
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--chip-color);
          flex-shrink:0;
        }

        .now-playing .np-chip-name{
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          color: var(--np-text);
        }

        .now-playing .np-chip-count{
          font-family:'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--np-text-muted);
          white-space: nowrap;
        }

        .now-playing .np-panel{
          background: var(--np-panel);
          border: 1px solid var(--np-border);
          border-radius: 16px;
          padding: 28px 28px 24px;
          margin-bottom: 24px;
        }

        .now-playing .np-panel-head{
          display:flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 22px;
        }

        .now-playing .np-panel-title{
          font-family: 'Space Grotesk', sans-serif;
          font-size: 19px;
          font-weight: 600;
          margin: 0 0 4px;
          color: var(--np-text);
        }

        .now-playing .np-panel-subtitle{
          color: var(--np-text-faint);
          font-size: 13px;
          margin: 0;
        }

        .now-playing select.np-game-select{
          background: var(--np-panel-2);
          border: 1px solid var(--np-border);
          color: var(--np-text);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
        }

        .now-playing .np-empty-state{
          color: var(--np-text-faint);
          font-size: 14px;
          padding: 40px 0;
          text-align: center;
          font-family:'JetBrains Mono', monospace;
        }

        .now-playing .np-bar-row{
          display:flex;
          align-items:center;
          gap: 14px;
          margin-bottom: 14px;
        }
        .now-playing .np-bar-row:last-child{ margin-bottom: 0; }

        .now-playing .np-bar-label{
          width: 150px;
          flex-shrink:0;
          font-size: 13px;
          font-weight: 500;
          text-align: right;
          color: var(--np-text);
        }

        .now-playing .np-bar-track{
          flex:1;
          position: relative;
          height: 26px;
          background: var(--np-panel-2);
          border-radius: 6px;
          overflow: hidden;
        }

        .now-playing .np-bar-fill{
          height: 100%;
          border-radius: 6px;
          transition: width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .now-playing .np-bar-value{
          width: 92px;
          flex-shrink:0;
          font-family:'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--np-text-muted);
        }

        .now-playing .np-stat-row{
          display:flex;
          gap: 28px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .now-playing .np-stat{
          display:flex;
          flex-direction: column;
          gap: 3px;
        }

        .now-playing .np-stat-label{
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--np-text-faint);
        }

        .now-playing .np-stat-value{
          font-family:'JetBrains Mono', monospace;
          font-size: 20px;
          font-weight: 500;
          color: var(--np-text);
        }

        .now-playing .np-genre-tag{
          display:inline-block;
          font-family:'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 3px 9px;
          border-radius: 999px;
          border: 1px solid var(--np-border);
          color: var(--np-text-muted);
          width: fit-content;
        }

        .now-playing svg text{
          font-family: 'JetBrains Mono', monospace;
          fill: var(--np-text-faint);
        }

        .now-playing .np-axis-line{ stroke: var(--np-border); stroke-width: 1; }
        .now-playing .np-grid-line{ stroke: var(--np-border); stroke-width: 1; stroke-dasharray: 3 4; opacity: 0.6; }

        .now-playing footer{
          color: var(--np-text-faint);
          font-size: 12.5px;
          line-height: 1.6;
          border-top: 1px solid var(--np-border);
          padding-top: 20px;
          margin-top: 12px;
        }

        @media (max-width: 640px){
          .now-playing .np-topbar{ flex-direction: column; }
          .now-playing .np-bar-label{ width: 100px; font-size: 12px; }
        }
      `}</style>

      <div className="np-wrap">
        <button className="np-back" onClick={onBack}>← Back to portfolio</button>

        <div className="np-topbar">
          <div>
            <div className="np-kicker">{t.kicker}</div>
            <h1>{t.title}</h1>
            <p className="np-subtitle">{t.subtitle}</p>
          </div>
          <div className="np-lang-toggle">
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "fr" ? "active" : ""} onClick={() => setLang("fr")}>FR</button>
          </div>
        </div>

        <p className="np-ticker-hint">{t.genreHint}</p>
        <div className="np-ticker" style={{ marginBottom: 16 }}>
          <div
            className={"np-chip" + (genreFilter === "all" ? " active" : "")}
            style={{ "--chip-color": "#8a95a6" }}
            onClick={() => handleGenreClick("all")}
          >
            <span className="np-chip-name">{t.genreAll}</span>
          </div>
          {GENRE_ORDER.map(genre => (
            <div
              key={genre}
              className={"np-chip" + (genreFilter === genre ? " active" : "")}
              style={{ "--chip-color": "#8a95a6" }}
              onClick={() => handleGenreClick(genre)}
            >
              <span className="np-chip-name">{genreLabels[genre]}</span>
            </div>
          ))}
        </div>

        <p className="np-ticker-hint">{t.tickerHint}</p>
        <div className="np-ticker">
          {visibleGames.map(g => (
            <div
              key={g.id}
              className={"np-chip" + (activeIds.has(g.id) ? " active" : "")}
              style={{ "--chip-color": g.color }}
              onClick={() => toggleGame(g.id)}
            >
              <span className="np-chip-dot"></span>
              <span className="np-chip-name">{g.name}</span>
              <span className="np-chip-count">{formatNumber(g.current, lang)}</span>
            </div>
          ))}
        </div>

        <div className="np-panel">
          <div className="np-panel-head">
            <div>
              <p className="np-panel-title">{t.barTitle}</p>
              <p className="np-panel-subtitle">{t.barSubtitle}</p>
            </div>
          </div>
          <BarChart games={activeGames} lang={lang} />
        </div>

        <div className="np-panel">
          <div className="np-panel-head">
            <div>
              <p className="np-panel-title">{t.lineTitle}</p>
              <p className="np-panel-subtitle">{t.lineSubtitle}</p>
            </div>
            <div>
              <label className="np-panel-subtitle" style={{ marginRight: 8 }}>{t.selectLabel}</label>
              <select
                className="np-game-select"
                value={selectedGameId}
                onChange={(e) => setSelectedGameId(e.target.value)}
              >
                {GAMES.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="np-stat-row">
            <div className="np-stat">
              <span className="np-stat-label">{t.current}</span>
              <span className="np-stat-value" style={{ color: selectedGame.color }}>
                {formatNumber(selectedGame.current, lang)}
              </span>
            </div>
            <div className="np-stat">
              <span className="np-stat-label">{t.allTimePeak}</span>
              <span className="np-stat-value">{formatNumber(selectedGame.peak, lang)}</span>
            </div>
            <div className="np-stat">
              <span className="np-stat-label">{t.genre}</span>
              <span className="np-genre-tag">{genreLabels[selectedGame.genre]}</span>
            </div>
          </div>

          <LineChart game={selectedGame} lang={lang} />
        </div>

        <footer>{t.footer}</footer>
      </div>
    </div>
  );
}
