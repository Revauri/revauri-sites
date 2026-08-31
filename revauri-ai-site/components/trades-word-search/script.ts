export const WORD_SEARCH_COLS = 17;

export const TRADE_WORDS = [
  "HVAC",
  "PLUMBING",
  "ROOFING",
  "ELECTRICAL",
  "DENTAL",
  "CLINIC",
  "LANDSCAPE",
  "AUTO",
  "SALON",
  "CONTRACTOR",
] as const;

export type WordDir = "h" | "v";

export interface WordPlacement {
  word: (typeof TRADE_WORDS)[number];
  row: number;
  col: number;
  dir: WordDir;
}

export const WORD_SEARCH_GRID = [
  "HVACKERTOSWIFNBPD",
  "YNBQUXZPLUMBINGME",
  "ROOFINGJVWXYZABCN",
  "MPQRSELECTRICALFT",
  "AUTOFGHIJKSALONQA",
  "WXCLINICPQRSTUVWL",
  "ABCDEFLANDSCAPEYZ",
  "QWERTYUIOPASDFGHJ",
  "XYZCONTRACTORKLMN",
  "BNMKLPQZXCVBNMKLP",
];

export const WORD_PLACEMENTS: WordPlacement[] = [
  { word: "HVAC", row: 0, col: 0, dir: "h" },
  { word: "PLUMBING", row: 1, col: 7, dir: "h" },
  { word: "ROOFING", row: 2, col: 0, dir: "h" },
  { word: "ELECTRICAL", row: 3, col: 5, dir: "h" },
  { word: "DENTAL", row: 0, col: 16, dir: "v" },
  { word: "CLINIC", row: 5, col: 2, dir: "h" },
  { word: "LANDSCAPE", row: 6, col: 6, dir: "h" },
  { word: "AUTO", row: 4, col: 0, dir: "h" },
  { word: "SALON", row: 4, col: 10, dir: "h" },
  { word: "CONTRACTOR", row: 8, col: 3, dir: "h" },
];

export function cellsForPlacement(placement: WordPlacement): string[] {
  const cells: string[] = [];
  for (let i = 0; i < placement.word.length; i += 1) {
    const r = placement.dir === "v" ? placement.row + i : placement.row;
    const c = placement.dir === "h" ? placement.col + i : placement.col;
    cells.push(`${r}:${c}`);
  }
  return cells;
}

export function gridHasWord(word: string, grid = WORD_SEARCH_GRID): boolean {
  const cols = WORD_SEARCH_COLS;
  const rows = grid.length;
  const target = word.toUpperCase();

  for (const row of grid) {
    if (row.includes(target)) return true;
  }

  for (let c = 0; c < cols; c += 1) {
    let column = "";
    for (let r = 0; r < rows; r += 1) {
      column += grid[r][c] ?? "";
    }
    if (column.includes(target)) return true;
  }

  return false;
}

export const WORD_SEARCH_COPY = {
  h3: "Built for local service businesses",
  body: "Roofers, clinics, shops, contractors, and the rest — the hire fits the way the job already runs.",
} as const;
