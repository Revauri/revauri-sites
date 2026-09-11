export type ReviewBadge = {
  name: string;
  rating: number;
  ratingMax: 5;
  lastStarFill: number;
  reviewCount: number;
};

export type ReviewQuote = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const REVIEW_BADGE: ReviewBadge = {
  name: "Southeast Exhibits & Events",
  rating: 5,
  ratingMax: 5,
  lastStarFill: 1,
  reviewCount: 2,
};

export const REVIEW_QUOTES: readonly ReviewQuote[] = [
  {
    quote:
      "From my perspective as a newer user, it's impressive.\n\nIt will adapt and add new templates and sizes to our library. Templates, proofing process and approvals are streamlined. The big plus is handing files to the vendor knowing we will be approving for print almost immediately is a time saver too. It also outputs nice professional client facing presentations of information.\n\nI'm liking it.",
    author: "Gary Jester",
    role: "Graphic Designer",
    company: "Southeast Exhibits & Events",
  },
  {
    quote:
      "This is awesome man. I can't thank you enough.\n\nI didn't think it was possible, but we've increased volume, quality, and free time.",
    author: "Marc Palumbo",
    role: "Graphics Lead",
    company: "Southeast Exhibits & Events",
  },
];
