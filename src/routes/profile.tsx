import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GENRES, MOVIES } from "@/lib/mock-movies";
import { useLocalList, useProfile } from "@/lib/storage";
import { User } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — CineMatch AI" },
      { name: "description", content: "Your CineMatch profile, favorites, and watch statistics." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, save } = useProfile();
  const { ids: watch } = useLocalList("watchlist");
  const { ids: liked } = useLocalList("liked");
  const { ids: history } = useLocalList("history");
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [favs, setFavs] = useState<string[]>(profile.favoriteGenres);

  const watched = history.map(id => MOVIES.find(m => m.id === id)).filter(Boolean) as typeof MOVIES;
  const hours = Math.round(watched.reduce((n, m) => n + m.runtime, 0) / 60);
  const avgRating = liked.length
    ? (liked.map(id => MOVIES.find(m => m.id === id)?.rating || 0).reduce((a, b) => a + b, 0) / liked.length).toFixed(1)
    : "—";

  const toggleFav = (g: string) => setFavs(f => f.includes(g) ? f.filter(x => x !== g) : [...f, g]);
  const submit = () => save({ name: name.trim() || "Cinephile", bio, favoriteGenres: favs });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--gradient-red)] text-white shadow-[var(--shadow-red)]">
          <User className="h-10 w-10" />
        </div>
        <div>
          <h1 className="font-display text-4xl tracking-wide text-white">{profile.name}</h1>
          <p className="text-muted-foreground">{profile.bio}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Watched" value={watched.length} />
        <Stat label="Hours" value={hours} />
        <Stat label="Liked" value={liked.length} />
        <Stat label="Avg ★" value={avgRating} />
      </div>

      <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-2xl text-white">Edit Profile</h2>
        <div className="mt-4 grid gap-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-white outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="mt-1 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-white outline-none focus:border-primary" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Favorite Genres</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {GENRES.map(g => (
                <button
                  key={g}
                  onClick={() => toggleFav(g)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${favs.includes(g) ? "border-primary bg-primary text-white" : "border-border text-white/70 hover:text-white"}`}
                >{g}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={submit} className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90">Save</button>
            <span className="text-xs text-muted-foreground">{watch.length} on your watchlist</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 text-center">
      <div className="font-display text-4xl text-primary">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
