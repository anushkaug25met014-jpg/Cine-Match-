import { createFileRoute } from "@tanstack/react-router";
import { MovieRow } from "@/components/site/MovieRow";
import { GENRES, MOVIES, byGenre, latest, recommend, topRated, trending, upcoming } from "@/lib/mock-movies";
import { useLocalList, useProfile } from "@/lib/storage";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse — CineMatch AI" },
      { name: "description", content: "Personalized rows: recommended, trending, top rated, and by genre." },
    ],
  }),
  component: Browse,
});

function Browse() {
  const { profile } = useProfile();
  const { ids: liked } = useLocalList("liked");
  const { ids: watchlist } = useLocalList("watchlist");
  const { ids: history } = useLocalList("history");
  const recs = recommend(liked, watchlist, 12);
  const recentlyViewed = history.map(id => MOVIES.find(m => m.id === id)).filter(Boolean) as typeof MOVIES;

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-[1600px] px-4 pt-8 md:px-10">
        <h1 className="font-display text-4xl tracking-wide text-white md:text-6xl">
          Good evening, <span className="text-primary">{profile.name}</span>
        </h1>
        <p className="mt-2 text-muted-foreground">Here's what's queued up for you tonight.</p>
      </div>
      {recentlyViewed.length > 0 && <MovieRow title="Continue Watching" movies={recentlyViewed.slice(0, 10)} />}
      <MovieRow title="Recommended for You" movies={recs} />
      <MovieRow title="Trending Today" movies={trending()} />
      <MovieRow title="Latest Releases" movies={latest()} />
      <MovieRow title="Top Rated" movies={topRated()} />
      <MovieRow title="Coming Soon" movies={upcoming().length ? upcoming() : latest().slice(0, 8)} />
      {GENRES.slice(0, 5).map(g => (
        <MovieRow key={g} title={g} movies={byGenre(g)} />
      ))}
    </div>
  );
}
