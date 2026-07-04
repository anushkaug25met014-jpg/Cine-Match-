import posterNeonHorizon from "@/assets/posters/neon-horizon.jpg";
import posterLastCartographer from "@/assets/posters/the-last-cartographer.jpg";
import posterMidnightProtocol from "@/assets/posters/midnight-protocol.jpg";
import posterGardenInWinter from "@/assets/posters/a-garden-in-winter.jpg";
import posterIronhold from "@/assets/posters/ironhold.jpg";
import posterSmallHours from "@/assets/posters/small-hours.jpg";
import posterSolarWinds from "@/assets/posters/solar-winds.jpg";
import posterDebtCollector from "@/assets/posters/the-debt-collector.jpg";
import posterHowToFallSlowly from "@/assets/posters/how-to-fall-slowly.jpg";
import posterVantablack from "@/assets/posters/vantablack.jpg";
import posterPaperKites from "@/assets/posters/paper-kites.jpg";
import posterLongWayNorth from "@/assets/posters/the-long-way-north.jpg";
import posterOverclock from "@/assets/posters/overclock.jpg";
import posterSundayBest from "@/assets/posters/sunday-best.jpg";
import posterSilentSignal from "@/assets/posters/the-silent-signal.jpg";
import posterHalcyon from "@/assets/posters/halcyon.jpg";

export type Movie = {
  id: string;
  title: string;
  year: number;
  runtime: number; // minutes
  genres: string[];
  rating: number; // IMDb 0-10
  tmdb: number;
  rotten: number;
  language: string;
  country: string;
  director: string;
  cast: string[];
  overview: string;
  poster: string; // hue for gradient fallback
  backdrop: string;
  posterUrl?: string; // real poster image
  trailerId: string; // youtube id
  budget: number;
  revenue: number;
  releaseDate: string;
  platforms: string[];
  keywords: string[];
  popularity: number;
};

const POSTERS: Record<string, string> = {
  m1: posterNeonHorizon,
  m2: posterLastCartographer,
  m3: posterMidnightProtocol,
  m4: posterGardenInWinter,
  m5: posterIronhold,
  m6: posterSmallHours,
  m7: posterSolarWinds,
  m8: posterDebtCollector,
  m9: posterHowToFallSlowly,
  m10: posterVantablack,
  m11: posterPaperKites,
  m12: posterLongWayNorth,
  m13: posterOverclock,
  m14: posterSundayBest,
  m15: posterSilentSignal,
  m16: posterHalcyon,
};

// Poster generation via gradient + title as fallback; posterUrl attaches real art.
const mk = (m: Omit<Movie, "poster" | "backdrop"> & Partial<Pick<Movie, "poster" | "backdrop">>): Movie => ({
  poster: `${(m.id.charCodeAt(0) * 37) % 360}`,
  backdrop: `${(m.id.charCodeAt(1) * 53) % 360}`,
  posterUrl: POSTERS[m.id],
  ...m,
});

export const MOVIES: Movie[] = [
  mk({
    id: "m1", title: "Neon Horizon", year: 2024, runtime: 142,
    genres: ["Sci-Fi", "Thriller"], rating: 8.4, tmdb: 8.2, rotten: 92,
    language: "English", country: "USA", director: "Ava Kobayashi",
    cast: ["Idris Vance", "Mira Chen", "Leo Park", "Sofia Ramírez"],
    overview: "A neural cartographer discovers that the city's dreams are being harvested — and only she can trace the signal back to its source before consciousness collapses into static.",
    trailerId: "dQw4w9WgXcQ", budget: 120_000_000, revenue: 480_000_000,
    releaseDate: "2024-07-19", platforms: ["Netflix", "Prime Video"],
    keywords: ["dreams", "cyberpunk", "identity", "AI"], popularity: 98,
  }),
  mk({
    id: "m2", title: "The Last Cartographer", year: 2023, runtime: 128,
    genres: ["Drama", "Adventure"], rating: 8.1, tmdb: 7.9, rotten: 88,
    language: "English", country: "UK", director: "Rhys Callahan",
    cast: ["Tom Bramwell", "Lena Osei", "Ravi Khatri"],
    overview: "In the age before satellites, a mapmaker walks the unmarked coasts of a dying empire — and inks a country that no ruler will admit exists.",
    trailerId: "dQw4w9WgXcQ", budget: 45_000_000, revenue: 190_000_000,
    releaseDate: "2023-11-03", platforms: ["Apple TV+"],
    keywords: ["exploration", "empire", "quiet", "period"], popularity: 76,
  }),
  mk({
    id: "m3", title: "Midnight Protocol", year: 2024, runtime: 118,
    genres: ["Action", "Thriller"], rating: 7.8, tmdb: 7.6, rotten: 81,
    language: "English", country: "USA", director: "Marcus Vale",
    cast: ["Jordan Reyes", "Anya Volkov", "Kenji Watanabe"],
    overview: "A retired hacker is pulled back in when a rogue AI starts issuing kill orders through the city's traffic lights.",
    trailerId: "dQw4w9WgXcQ", budget: 85_000_000, revenue: 310_000_000,
    releaseDate: "2024-03-22", platforms: ["Netflix"],
    keywords: ["hacker", "AI", "chase", "night"], popularity: 91,
  }),
  mk({
    id: "m4", title: "A Garden in Winter", year: 2022, runtime: 106,
    genres: ["Romance", "Drama"], rating: 7.6, tmdb: 7.5, rotten: 90,
    language: "French", country: "France", director: "Camille Doré",
    cast: ["Élodie Marchand", "Julien Faure", "Nora Benali"],
    overview: "Two strangers agree to write letters for one year — and never meet — while the city outside their windows changes seasons three times over.",
    trailerId: "dQw4w9WgXcQ", budget: 8_000_000, revenue: 42_000_000,
    releaseDate: "2022-12-09", platforms: ["Mubi", "Criterion"],
    keywords: ["letters", "romance", "slow", "seasons"], popularity: 58,
  }),
  mk({
    id: "m5", title: "Ironhold", year: 2023, runtime: 149,
    genres: ["Action", "Fantasy"], rating: 8.0, tmdb: 8.1, rotten: 85,
    language: "English", country: "New Zealand", director: "Priya Anand",
    cast: ["Callum West", "Zainab Idris", "Marta Kowalski"],
    overview: "A siege that lasted a hundred days. A wall that was never meant to hold. A blacksmith's daughter who is not who anyone thinks she is.",
    trailerId: "dQw4w9WgXcQ", budget: 175_000_000, revenue: 620_000_000,
    releaseDate: "2023-08-11", platforms: ["HBO Max"],
    keywords: ["siege", "medieval", "epic", "battle"], popularity: 88,
  }),
  mk({
    id: "m6", title: "Small Hours", year: 2024, runtime: 94,
    genres: ["Comedy", "Drama"], rating: 7.9, tmdb: 7.7, rotten: 94,
    language: "English", country: "Ireland", director: "Siobhán Hayes",
    cast: ["Declan O'Rourke", "Áine Byrne", "Colin Murphy"],
    overview: "A 24-hour diner. Four regulars. One night the coffee machine breaks and every conversation everyone has been avoiding finally happens.",
    trailerId: "dQw4w9WgXcQ", budget: 5_000_000, revenue: 28_000_000,
    releaseDate: "2024-02-16", platforms: ["A24 Screen"],
    keywords: ["diner", "one location", "dialogue", "ensemble"], popularity: 64,
  }),
  mk({
    id: "m7", title: "Solar Winds", year: 2024, runtime: 137,
    genres: ["Sci-Fi", "Adventure"], rating: 8.3, tmdb: 8.4, rotten: 89,
    language: "English", country: "USA", director: "Ava Kobayashi",
    cast: ["Idris Vance", "Nia Adebayo", "Tomás Herrera"],
    overview: "The first crewed mission to Mercury discovers something under the shadow of the terminator line — and the transmissions stop coming home.",
    trailerId: "dQw4w9WgXcQ", budget: 200_000_000, revenue: 710_000_000,
    releaseDate: "2024-10-04", platforms: ["Prime Video"],
    keywords: ["space", "first contact", "mercury", "isolation"], popularity: 95,
  }),
  mk({
    id: "m8", title: "The Debt Collector", year: 2023, runtime: 111,
    genres: ["Crime", "Thriller"], rating: 7.5, tmdb: 7.4, rotten: 78,
    language: "Spanish", country: "Mexico", director: "Diego Fuentes",
    cast: ["Rosa Delgado", "Emilio Cruz", "Valeria Ríos"],
    overview: "She collects what men owe. Not money — the other kind of debt. And tonight the ledger points at the mayor.",
    trailerId: "dQw4w9WgXcQ", budget: 12_000_000, revenue: 68_000_000,
    releaseDate: "2023-06-23", platforms: ["Netflix"],
    keywords: ["revenge", "noir", "corruption"], popularity: 72,
  }),
  mk({
    id: "m9", title: "How to Fall Slowly", year: 2022, runtime: 99,
    genres: ["Romance", "Comedy"], rating: 7.3, tmdb: 7.2, rotten: 82,
    language: "English", country: "Canada", director: "Nora Whitfield",
    cast: ["Sam Bennett", "Priya Rao", "Jules Tremblay"],
    overview: "A wedding planner who has never been to a wedding meets a groom who has been to seventeen.",
    trailerId: "dQw4w9WgXcQ", budget: 15_000_000, revenue: 88_000_000,
    releaseDate: "2022-05-13", platforms: ["Hulu"],
    keywords: ["wedding", "meet-cute", "warm"], popularity: 55,
  }),
  mk({
    id: "m10", title: "Vantablack", year: 2024, runtime: 124,
    genres: ["Horror", "Mystery"], rating: 7.7, tmdb: 7.5, rotten: 84,
    language: "English", country: "USA", director: "Grant Ellison",
    cast: ["Willa Frost", "Andre Sinclair", "Meiko Tanaka"],
    overview: "An art restorer accepts a job cleaning a painting so dark it absorbs all light. By the third night, it has started absorbing other things.",
    trailerId: "dQw4w9WgXcQ", budget: 22_000_000, revenue: 145_000_000,
    releaseDate: "2024-10-25", platforms: ["Shudder"],
    keywords: ["haunting", "art", "slow burn"], popularity: 79,
  }),
  mk({
    id: "m11", title: "Paper Kites", year: 2023, runtime: 108,
    genres: ["Animation", "Family"], rating: 8.2, tmdb: 8.3, rotten: 96,
    language: "Japanese", country: "Japan", director: "Hana Miyazawa",
    cast: ["Ren Tanaka", "Sakura Ito", "Kenta Fujimoto"],
    overview: "A grandmother teaches her grandson to fold the sky into wings — and the wings, it turns out, remember every hand that ever held them.",
    trailerId: "dQw4w9WgXcQ", budget: 30_000_000, revenue: 180_000_000,
    releaseDate: "2023-04-07", platforms: ["Netflix"],
    keywords: ["animation", "family", "grief", "beautiful"], popularity: 83,
  }),
  mk({
    id: "m12", title: "The Long Way North", year: 2024, runtime: 132,
    genres: ["Drama", "Adventure"], rating: 8.0, tmdb: 7.9, rotten: 91,
    language: "Icelandic", country: "Iceland", director: "Björn Sigurdsson",
    cast: ["Ingrid Halldór", "Magnús Þór", "Elin Jonsdóttir"],
    overview: "A geologist follows her father's last field notes across a glacier that is disappearing faster than the map can track it.",
    trailerId: "dQw4w9WgXcQ", budget: 18_000_000, revenue: 55_000_000,
    releaseDate: "2024-09-14", platforms: ["Mubi"],
    keywords: ["glacier", "father", "cold", "quiet"], popularity: 61,
  }),
  mk({
    id: "m13", title: "Overclock", year: 2025, runtime: 121,
    genres: ["Action", "Sci-Fi"], rating: 7.4, tmdb: 7.5, rotten: 75,
    language: "English", country: "USA", director: "Marcus Vale",
    cast: ["Jordan Reyes", "Kai Nakamura", "Lena Osei"],
    overview: "A courier who can perceive time at 4x speed finds out her employers have been slowing down everyone else.",
    trailerId: "dQw4w9WgXcQ", budget: 95_000_000, revenue: 0,
    releaseDate: "2025-06-27", platforms: ["Prime Video"],
    keywords: ["time", "chase", "action"], popularity: 87,
  }),
  mk({
    id: "m14", title: "Sunday Best", year: 2023, runtime: 88,
    genres: ["Comedy"], rating: 7.1, tmdb: 7.0, rotten: 79,
    language: "English", country: "USA", director: "Elena Ford",
    cast: ["Kelly Ann Brooks", "Marcus Fine", "Dee Nakamura"],
    overview: "Three sisters, one funeral, zero shared childhoods that agree on what actually happened.",
    trailerId: "dQw4w9WgXcQ", budget: 6_000_000, revenue: 34_000_000,
    releaseDate: "2023-09-01", platforms: ["Hulu"],
    keywords: ["family", "funeral", "warm comedy"], popularity: 52,
  }),
  mk({
    id: "m15", title: "The Silent Signal", year: 2022, runtime: 115,
    genres: ["Mystery", "Thriller"], rating: 7.8, tmdb: 7.7, rotten: 86,
    language: "German", country: "Germany", director: "Klaus Bergmann",
    cast: ["Anja Weiss", "Mateo Krüger", "Sophie Lang"],
    overview: "A radio astronomer picks up the same 11-second broadcast every night. Nobody else can hear it. The neighbors are starting to notice her lights.",
    trailerId: "dQw4w9WgXcQ", budget: 14_000_000, revenue: 62_000_000,
    releaseDate: "2022-10-14", platforms: ["Netflix"],
    keywords: ["paranoia", "radio", "isolation"], popularity: 68,
  }),
  mk({
    id: "m16", title: "Halcyon", year: 2025, runtime: 156,
    genres: ["Drama", "Sci-Fi"], rating: 8.6, tmdb: 8.5, rotten: 95,
    language: "English", country: "USA", director: "Ava Kobayashi",
    cast: ["Mira Chen", "Idris Vance", "Sofia Ramírez", "Tom Bramwell"],
    overview: "In a small town where memory can be traded like currency, a woman spends her last remaining year to remember one afternoon perfectly.",
    trailerId: "dQw4w9WgXcQ", budget: 90_000_000, revenue: 0,
    releaseDate: "2025-12-12", platforms: ["A24 Screen"],
    keywords: ["memory", "melancholy", "philosophical", "mind-bending"], popularity: 92,
  }),
];

export const GENRES = Array.from(new Set(MOVIES.flatMap(m => m.genres))).sort();
export const LANGUAGES = Array.from(new Set(MOVIES.map(m => m.language))).sort();

export const getMovie = (id: string) => MOVIES.find(m => m.id === id);
export const byGenre = (g: string) => MOVIES.filter(m => m.genres.includes(g));
export const trending = () => [...MOVIES].sort((a, b) => b.popularity - a.popularity).slice(0, 10);
export const topRated = () => [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 10);
export const upcoming = () => MOVIES.filter(m => new Date(m.releaseDate) > new Date()).sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
export const latest = () => [...MOVIES].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate)).slice(0, 12);

// Simple content-based similarity: shared genres + shared keywords + same director
export function similar(movie: Movie, count = 8): Movie[] {
  return MOVIES
    .filter(m => m.id !== movie.id)
    .map(m => {
      const gs = m.genres.filter(g => movie.genres.includes(g)).length;
      const ks = m.keywords.filter(k => movie.keywords.includes(k)).length;
      const dir = m.director === movie.director ? 2 : 0;
      return { m, score: gs * 2 + ks * 3 + dir };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(x => x.m);
}

// Recommendation engine: score against liked list + watchlist
export function recommend(likedIds: string[], watchlistIds: string[], count = 12): Movie[] {
  const seed = [...likedIds, ...watchlistIds].map(getMovie).filter(Boolean) as Movie[];
  if (seed.length === 0) return trending().slice(0, count);
  const genreScore: Record<string, number> = {};
  const keywordScore: Record<string, number> = {};
  const directorScore: Record<string, number> = {};
  seed.forEach(s => {
    s.genres.forEach(g => (genreScore[g] = (genreScore[g] || 0) + 1));
    s.keywords.forEach(k => (keywordScore[k] = (keywordScore[k] || 0) + 1));
    directorScore[s.director] = (directorScore[s.director] || 0) + 1;
  });
  const seedIds = new Set(seed.map(s => s.id));
  return MOVIES
    .filter(m => !seedIds.has(m.id))
    .map(m => {
      const gs = m.genres.reduce((n, g) => n + (genreScore[g] || 0), 0);
      const ks = m.keywords.reduce((n, k) => n + (keywordScore[k] || 0), 0);
      const ds = directorScore[m.director] || 0;
      return { m, score: gs * 2 + ks * 3 + ds * 4 + m.rating * 0.5 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(x => x.m);
}
