import { useRef } from "react";
import type { Movie } from "@/lib/mock-movies";
import { MovieCard } from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MovieRow({ title, movies }: { title: string; movies: Movie[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  if (!movies.length) return null;
  return (
    <section className="group/row relative py-5">
      <h2 className="mb-3 px-4 font-display text-2xl tracking-wide text-white md:px-10 md:text-3xl">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-1 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/70 p-2 text-white opacity-0 backdrop-blur transition hover:bg-primary group-hover/row:opacity-100 md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div
          ref={scroller}
          className="hide-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-4 pb-2 md:px-10"
        >
          {movies.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
        <button
          onClick={() => scroll(1)}
          className="absolute right-1 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/70 p-2 text-white opacity-0 backdrop-blur transition hover:bg-primary group-hover/row:opacity-100 md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
