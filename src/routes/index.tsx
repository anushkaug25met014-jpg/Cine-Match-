import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, Play, Info, Star } from "lucide-react";
import heroImg from "@/assets/hero-collage.jpg";
import { MovieRow } from "@/components/site/MovieRow";
import { GENRES, MOVIES, byGenre, latest, topRated, trending, upcoming } from "@/lib/mock-movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineMatch AI — Find Your Next Favorite Movie" },
      { name: "description", content: "Explore trending, top-rated, and upcoming films. AI recommendations tuned to your taste." },
      { property: "og:title", content: "CineMatch AI — Find Your Next Favorite Movie" },
      { property: "og:description", content: "Explore trending, top-rated, and upcoming films. AI recommendations tuned to your taste." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const featured = MOVIES[0];
  return (
    <div>
      {/* Hero */}
      <section className="relative -mt-16 h-[92vh] min-h-[620px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-24 md:px-10 md:pb-32">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Powered by AI recommendations
            </div>
            <h1 className="font-display text-5xl leading-none tracking-wide text-white md:text-7xl lg:text-8xl">
              Find Your Next<br />
              Favorite <span className="text-primary">Movie</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
              CineMatch learns what you love — genres, directors, moods — and quietly assembles a queue you'll actually watch. No more scrolling. Just watch.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); if (q.trim()) navigate({ to: "/search", search: { q: q.trim() } }); }}
              className="mt-8 flex w-full max-w-xl overflow-hidden rounded-full border border-white/20 bg-black/50 backdrop-blur-xl"
            >
              <Search className="ml-4 h-5 w-5 self-center text-white/60" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a title, actor, or vibe..."
                className="flex-1 bg-transparent px-3 py-4 text-white placeholder:text-white/50 outline-none"
              />
              <button type="submit" className="m-1.5 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:opacity-90">Search</button>
            </form>
            <div className="mt-6 flex gap-3">
              <Link to="/movie/$id" params={{ id: featured.id }} className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90">
                <Play className="h-4 w-4 fill-current" /> Watch Featured
              </Link>
              <Link to="/browse" className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                <Info className="h-4 w-4" /> Browse All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rows */}
      <div className="relative -mt-24 space-y-2">
        <MovieRow title="Trending Now" movies={trending()} />
        <MovieRow title="Top Rated" movies={topRated()} />
        <MovieRow title="Coming Soon" movies={upcoming().length ? upcoming() : latest()} />
      </div>

      {/* Genres */}
      <section className="mx-auto max-w-[1600px] px-4 py-14 md:px-10">
        <h2 className="mb-6 font-display text-3xl tracking-wide text-white md:text-4xl">Popular Genres</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {GENRES.map((g, i) => (
            <Link
              key={g}
              to="/search"
              search={{ genre: g }}
              className="group relative overflow-hidden rounded-xl border border-border p-5 transition hover:border-primary hover:shadow-[var(--shadow-red)]"
              style={{ background: `linear-gradient(135deg, oklch(0.2 0.1 ${(i * 47) % 360}), oklch(0.1 0.05 ${(i * 47 + 60) % 360}))` }}
            >
              <div className="font-display text-xl text-white transition group-hover:translate-x-1">{g}</div>
              <div className="mt-1 text-xs text-white/60">{byGenre(g).length} films</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1600px] px-4 py-14 md:px-10">
        <div className="mb-10 text-center">
          <div className="text-xs uppercase tracking-widest text-primary">Why CineMatch</div>
          <h2 className="mt-2 font-display text-3xl tracking-wide text-white md:text-5xl">Built for the way you actually watch</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Taste-Aware AI", body: "Content-based filtering across genres, directors, and mood keywords means the more you rate, the sharper it gets." },
            { title: "Beyond the Algorithm", body: "Curated rows for top-rated, upcoming, and hidden gems — because the algorithm shouldn't be the only voice at the party." },
            { title: "Ask CineBot Anything", body: "Tell it 'a thriller under two hours' or 'something like Interstellar'. It answers with a shortlist, not a lecture." },
          ].map(f => (
            <div key={f.title} className="glass rounded-2xl p-6 transition hover:border-primary/50">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-[1600px] px-4 py-14 md:px-10">
        <h2 className="mb-8 text-center font-display text-3xl tracking-wide text-white md:text-4xl">Loved by cinephiles</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { q: "It knew I'd like Halcyon before I did. Uncanny.", by: "— Priya, Toronto" },
            { q: "The mood filter alone is worth it. 'Rainy Sunday' delivered.", by: "— Marco, Lisbon" },
            { q: "Finally something that doesn't just push new releases at me.", by: "— Alex, Berlin" },
          ].map(t => (
            <div key={t.by} className="glass rounded-2xl p-6">
              <div className="mb-3 flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-lg text-white/90">"{t.q}"</p>
              <div className="mt-3 text-sm text-muted-foreground">{t.by}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
