export type ClientReview = {
  domain: string;
  rating: number;
  ratingMax: 5;
  lastStarFill: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
};

export const CLIENT_REVIEWS: readonly ClientReview[] = [
  {
    domain: "accidentsinjurylawyer.com",
    rating: 4.8,
    ratingMax: 5,
    lastStarFill: 0.75,
    quote:
      "I love it. This is exactly what we wanted and our message comes across perfectly. Simple and clean.",
    author: "Alphonse Petracco",
    role: "Owner",
    company: "Lion Law",
    avatar: "/portfolio/lion-law/testimonial-avatar.jpg",
  },
  {
    domain: "boothlibrary.southeastexhibit.com",
    rating: 5,
    ratingMax: 5,
    lastStarFill: 1,
    quote:
      "Beautiful showcase of exactly what our potential clients need to see. The animations, effects, and simplicity bring everything together so nicely.",
    author: "Brandon Keena",
    role: "Chief Operating Officer",
    company: "Southeast Exhibits & Events",
    avatar: "/reviews/brandon-keena.jpg",
  },
];
