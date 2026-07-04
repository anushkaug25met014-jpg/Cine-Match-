import { MOVIES, type Movie } from "./mock-movies";

// Simple keyword-based mock chatbot. Real AI wiring is a phase-2 upgrade.
export function askBot(question: string): { text: string; movies: Movie[] } {
  const q = question.toLowerCase();
  const scored = MOVIES.map(m => {
    let s = 0;
    m.genres.forEach(g => { if (q.includes(g.toLowerCase())) s += 5; });
    m.keywords.forEach(k => { if (q.includes(k.toLowerCase())) s += 4; });
    if (q.includes(m.director.toLowerCase())) s += 6;
    if (q.includes(m.title.toLowerCase())) s += 8;
    m.cast.forEach(c => { if (q.includes(c.toLowerCase())) s += 3; });
    // Mood shortcuts
    if (/happy|feel[- ]?good|uplift/.test(q) && (m.genres.includes("Comedy") || m.genres.includes("Family"))) s += 4;
    if (/sad|cry|tearjerker/.test(q) && m.genres.includes("Drama")) s += 3;
    if (/mind[- ]?bend|trippy|puzzle/.test(q) && m.keywords.some(k => /mind|memory|dream|identity/.test(k))) s += 5;
    if (/short|under.*2|under.*hour/.test(q) && m.runtime <= 110) s += 3;
    if (/long|epic/.test(q) && m.runtime >= 140) s += 3;
    if (/scary|horror|creepy/.test(q) && m.genres.includes("Horror")) s += 5;
    if (/romantic|love/.test(q) && m.genres.includes("Romance")) s += 4;
    if (/action|fight|explosion/.test(q) && m.genres.includes("Action")) s += 4;
    return { m, s: s + m.rating * 0.1 };
  }).sort((a, b) => b.s - a.s);
  const top = scored.slice(0, 4).map(x => x.m);
  const reply =
    top.length && scored[0].s > 1
      ? `Here are ${top.length} picks that match "${question.trim()}":`
      : `I couldn't lock onto that exactly — try mentioning a mood, a genre, a director, or a runtime. Meanwhile, here's what's trending:`;
  return { text: reply, movies: top.length ? top : MOVIES.slice(0, 4) };
}
