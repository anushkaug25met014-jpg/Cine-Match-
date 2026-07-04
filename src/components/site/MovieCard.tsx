import { Link } from "@tanstack/react-router";
import type { Movie } from "@/lib/mock-movies";
import { Poster } from "./Poster";
import { Play, Plus, Check } from "lucide-react";
import { useLocalList } from "@/lib/storage";

export function MovieCard({ movie }: { movie: Movie }) {
  const { has, toggle } = useLocalList("watchlist");
  const inList = has(movie.id);
  return (
    <div className="group relative w-40 shrink-0 md:w-52">
      <Link
        to="/movie/$id"
        params={{ id: movie.id }}
        className="block transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.04]"
      >
        <Poster movie={movie} className="aspect-[2/3] shadow-[var(--shadow-card)]" />
      </Link>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center gap-2 p-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <Link
          to="/movie/$id"
          params={{ id: movie.id }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:scale-110"
          aria-label={`Play ${movie.title}`}
        >
          <Play className="h-4 w-4 fill-current" />
        </Link>
        <button
          onClick={(e) => { e.preventDefault(); toggle(movie.id); }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white backdrop-blur transition hover:border-white hover:scale-110"
          aria-label={inList ? "Remove from watchlist" : "Add to watchlist"}
        >
          {inList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
