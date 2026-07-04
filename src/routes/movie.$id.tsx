import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Play, Plus, Check, Heart, ThumbsDown, Share2, Star, Clock, Calendar, Globe } from "lucide-react";
import { getMovie, similar, type Movie } from "@/lib/mock-movies";
import { Backdrop, Poster } from "@/components/site/Poster";
import { MovieRow } from "@/components/site/MovieRow";
import { useLocalList } from "@/lib/storage";

export const Route = createFileRoute("/movie/$id")({
  loader: ({ params }): { movie: Movie } => {
    const movie = getMovie(params.id);
    if (!movie) throw notFound();
    return { movie };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.movie.title} (${loaderData.movie.year}) — CineMatch AI` },
          { name: "description", content: loaderData.movie.overview },
          { property: "og:title", content: `${loaderData.movie.title} (${loaderData.movie.year})` },
          { property: "og:description", content: loaderData.movie.overview },
        ]
      : [{ title: "Movie not found — CineMatch AI" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-5xl text-primary">Not in our library</h1>
      <p className="mt-3 text-muted-foreground">This title isn't available. It may have been removed.</p>
      <Link to="/browse" className="mt-6 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white">Browse movies</Link>
    </div>
  ),
  component: MovieDetail,
});

function MovieDetail() {
  const { movie } = Route.useLoaderData() as { movie: Movie };
  const watchlist = useLocalList("watchlist");
  const liked = useLocalList("liked");
  const disliked = useLocalList("disliked");
  const history = useLocalList("history");
  useEffect(() => { history.add(movie.id); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [movie.id]);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: movie.title, text: movie.overview, url: location.href });
      else await navigator.clipboard.writeText(location.href);
    } catch {}
  };

  const recs = similar(movie);
  const fmt = (n: number) => n >= 1e9 ? `$${(n/1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n/1e6).toFixed(0)}M` : `$${n.toLocaleString()}`;

  return (
    <div className="pb-16">
      {/* Backdrop */}
      <div className="relative -mt-16 h-[80vh] min-h-[560px] w-full overflow-hidden">
        <Backdrop movie={movie} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-end px-4 pb-12 md:px-10">
          <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-10">
            <Poster movie={movie} className="hidden aspect-[2/3] w-56 shadow-2xl md:block" />
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-white/70">
                {movie.genres.map(g => (
                  <span key={g} className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 backdrop-blur">{g}</span>
                ))}
              </div>
              <h1 className="font-display text-5xl leading-none tracking-wide text-white md:text-7xl">{movie.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" /> {movie.rating.toFixed(1)} IMDb</span>
                <span>TMDB {movie.tmdb.toFixed(1)}</span>
                <span>🍅 {movie.rotten}%</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {movie.runtime}m</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {movie.year}</span>
                <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {movie.language}</span>
              </div>
              <p className="mt-5 max-w-2xl text-base text-white/90 md:text-lg">{movie.overview}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${movie.trailerId}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  <Play className="h-4 w-4 fill-current" /> Watch Trailer
                </a>
                <button onClick={() => watchlist.toggle(movie.id)} className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                  {watchlist.has(movie.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {watchlist.has(movie.id) ? "In Watchlist" : "Add to Watchlist"}
                </button>
                <button
                  onClick={() => { liked.toggle(movie.id); if (disliked.has(movie.id)) disliked.remove(movie.id); }}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/40 backdrop-blur transition ${liked.has(movie.id) ? "bg-primary text-white border-primary" : "bg-white/10 text-white hover:bg-white/20"}`}
                  aria-label="Like"
                >
                  <Heart className={`h-4 w-4 ${liked.has(movie.id) ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={() => { disliked.toggle(movie.id); if (liked.has(movie.id)) liked.remove(movie.id); }}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/40 backdrop-blur transition ${disliked.has(movie.id) ? "bg-secondary text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                  aria-label="Dislike"
                >
                  <ThumbsDown className={`h-4 w-4 ${disliked.has(movie.id) ? "fill-current" : ""}`} />
                </button>
                <button onClick={share} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white/20" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mx-auto max-w-[1600px] px-4 md:px-10">
        <div className="grid gap-10 py-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-3 font-display text-2xl tracking-wide text-white">Trailer</h2>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-border">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${movie.trailerId}`}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className="mt-10 mb-3 font-display text-2xl tracking-wide text-white">Cast</h2>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map(c => (
                <span key={c} className="rounded-full bg-surface px-3 py-1.5 text-sm text-white/90">{c}</span>
              ))}
            </div>
          </div>
          <aside className="space-y-4 rounded-2xl border border-border bg-surface p-6">
            <Row k="Director" v={movie.director} />
            <Row k="Release" v={new Date(movie.releaseDate).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} />
            <Row k="Runtime" v={`${movie.runtime} minutes`} />
            <Row k="Language" v={movie.language} />
            <Row k="Country" v={movie.country} />
            <Row k="Budget" v={movie.budget ? fmt(movie.budget) : "—"} />
            <Row k="Revenue" v={movie.revenue ? fmt(movie.revenue) : "—"} />
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Streaming</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {movie.platforms.map(p => (
                  <span key={p} className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs text-white">{p}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <MovieRow title="More Like This" movies={recs} />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-2 last:border-none">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{k}</div>
      <div className="text-right text-sm text-white">{v}</div>
    </div>
  );
}
