import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { z } from "zod";
import { Search as SearchIcon, X } from "lucide-react";
import { GENRES, LANGUAGES, MOVIES, type Movie } from "@/lib/mock-movies";
import { MovieCard } from "@/components/site/MovieCard";

const searchSchema = z.object({
  q: z.string().optional().catch(""),
  genre: z.string().optional().catch(""),
  year: z.coerce.number().optional().catch(undefined),
  minRating: z.coerce.number().optional().catch(undefined),
  language: z.string().optional().catch(""),
  sort: z.enum(["popularity", "newest", "oldest", "rating"]).optional().catch("popularity"),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Search — CineMatch AI" },
      { name: "description", content: "Search across every movie in CineMatch. Filter by genre, year, rating, and language." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [q, setQ] = useState(search.q ?? "");
  useEffect(() => { setQ(search.q ?? ""); }, [search.q]);

  const results = useMemo<Movie[]>(() => {
    const query = (q ?? "").toLowerCase().trim();
    let out = MOVIES.filter(m => {
      if (search.genre && !m.genres.includes(search.genre)) return false;
      if (search.language && m.language !== search.language) return false;
      if (search.year && m.year !== search.year) return false;
      if (search.minRating && m.rating < search.minRating) return false;
      if (query) {
        const hay = `${m.title} ${m.director} ${m.cast.join(" ")} ${m.genres.join(" ")} ${m.keywords.join(" ")}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
    switch (search.sort) {
      case "newest": out = out.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate)); break;
      case "oldest": out = out.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate)); break;
      case "rating": out = out.sort((a, b) => b.rating - a.rating); break;
      default: out = out.sort((a, b) => b.popularity - a.popularity);
    }
    return out;
  }, [q, search]);

  const set = (patch: Partial<typeof search>) => navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });
  const years = Array.from(new Set(MOVIES.map(m => m.year))).sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-10">
      <h1 className="font-display text-4xl tracking-wide text-white md:text-5xl">Search</h1>

      <form
        onSubmit={(e) => { e.preventDefault(); set({ q: q.trim() || undefined }); }}
        className="mt-6 flex overflow-hidden rounded-full border border-border bg-surface"
      >
        <SearchIcon className="ml-4 h-5 w-5 self-center text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyUp={(e) => { if (e.key === "Enter") set({ q: q.trim() || undefined }); }}
          placeholder="Movie, actor, director, keyword..."
          className="flex-1 bg-transparent px-3 py-4 text-white placeholder:text-white/50 outline-none"
        />
        {q && (
          <button type="button" onClick={() => { setQ(""); set({ q: undefined }); }} className="px-3 text-muted-foreground hover:text-white" aria-label="Clear">
            <X className="h-4 w-4" />
          </button>
        )}
        <button type="submit" className="m-1.5 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:opacity-90">Search</button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterSelect label="Genre" value={search.genre ?? ""} onChange={(v) => set({ genre: v || undefined })} options={["", ...GENRES]} />
        <FilterSelect label="Language" value={search.language ?? ""} onChange={(v) => set({ language: v || undefined })} options={["", ...LANGUAGES]} />
        <FilterSelect label="Year" value={search.year ? String(search.year) : ""} onChange={(v) => set({ year: v ? Number(v) : undefined })} options={["", ...years.map(String)]} />
        <FilterSelect label="Min ★" value={search.minRating ? String(search.minRating) : ""} onChange={(v) => set({ minRating: v ? Number(v) : undefined })} options={["", "6", "7", "7.5", "8", "8.5"]} />
        <FilterSelect label="Sort" value={search.sort ?? "popularity"} onChange={(v) => set({ sort: v as "popularity" | "newest" | "oldest" | "rating" })} options={["popularity", "newest", "oldest", "rating"]} labels={{ popularity: "Popularity", newest: "Newest", oldest: "Oldest", rating: "Highest Rated" }} />
      </div>

      <div className="mt-8 text-sm text-muted-foreground">{results.length} result{results.length !== 1 && "s"}</div>

      {results.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-border bg-surface p-16 text-center">
          <div className="font-display text-3xl text-white">Nothing matches — yet.</div>
          <p className="mt-2 text-muted-foreground">Try loosening a filter or searching a broader keyword.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {results.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label, value, onChange, options, labels,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; labels?: Record<string, string>;
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-white">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none"
      >
        {options.map(o => (
          <option key={o || "any"} value={o} className="bg-surface text-white">
            {o === "" ? "Any" : labels?.[o] ?? o}
          </option>
        ))}
      </select>
    </label>
  );
}
