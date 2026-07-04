import { createFileRoute, Link } from "@tanstack/react-router";
import { MovieCard } from "@/components/site/MovieCard";
import { MOVIES } from "@/lib/mock-movies";
import { useLocalList } from "@/lib/storage";
import { Bookmark } from "lucide-react";

export const Route = createFileRoute("/watchlist")({
  head: () => ({
    meta: [
      { title: "My Watchlist — CineMatch AI" },
      { name: "description", content: "Every movie you've saved to watch later." },
    ],
  }),
  component: Watchlist,
});

function Watchlist() {
  const { ids: watchIds } = useLocalList("watchlist");
  const { ids: likedIds } = useLocalList("liked");
  const watch = watchIds.map(id => MOVIES.find(m => m.id === id)).filter(Boolean) as typeof MOVIES;
  const liked = likedIds.map(id => MOVIES.find(m => m.id === id)).filter(Boolean) as typeof MOVIES;

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-10">
      <h1 className="font-display text-4xl tracking-wide text-white md:text-5xl">Your Watchlist</h1>
      <p className="mt-2 text-muted-foreground">{watch.length} saved · {liked.length} liked</p>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-2xl text-white">To Watch</h2>
        {watch.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-16 text-center">
            <Bookmark className="mx-auto h-8 w-8 text-muted-foreground" />
            <div className="mt-3 font-display text-2xl text-white">Nothing here yet</div>
            <p className="mt-1 text-muted-foreground">Tap the + on any movie to add it here.</p>
            <Link to="/browse" className="mt-5 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white">Browse movies</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {watch.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        )}
      </section>

      {liked.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 font-display text-2xl text-white">Liked</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {liked.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        </section>
      )}
    </div>
  );
}
