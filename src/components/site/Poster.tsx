import type { Movie } from "@/lib/mock-movies";

export function Poster({ movie, className = "" }: { movie: Movie; className?: string }) {
  const h1 = Number(movie.poster);
  const h2 = (h1 + 40) % 360;
  const hasImage = Boolean(movie.posterUrl);
  return (
    <div
      className={`relative overflow-hidden rounded-md ${className}`}
      style={
        hasImage
          ? undefined
          : {
              background: `linear-gradient(155deg, oklch(0.35 0.15 ${h1}) 0%, oklch(0.15 0.08 ${h2}) 60%, oklch(0.08 0 0) 100%)`,
            }
      }
      aria-label={movie.title}
    >
      {hasImage ? (
        <img
          src={movie.posterUrl}
          alt={movie.title}
          width={640}
          height={960}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0_/_0.12),transparent_55%)]" />
          <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
            <div className="text-[10px] uppercase tracking-widest text-white/60">{movie.year} · {movie.genres[0]}</div>
            <div className="mt-1 font-display text-xl leading-none text-white drop-shadow-lg md:text-2xl">{movie.title}</div>
          </div>
        </>
      )}
      <div className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
        ★ {movie.rating.toFixed(1)}
      </div>
      {hasImage && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-2 md:p-3">
            <div className="text-[10px] uppercase tracking-widest text-white/80">{movie.year} · {movie.genres[0]}</div>
          </div>
        </>
      )}
    </div>
  );
}

export function Backdrop({ movie, className = "" }: { movie: Movie; className?: string }) {
  const h1 = Number(movie.backdrop);
  const h2 = Number(movie.poster);
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(120deg, oklch(0.4 0.2 ${h1}) 0%, oklch(0.2 0.12 ${h2}) 55%, oklch(0.08 0 0) 100%)`,
      }}
    >
      {movie.posterUrl && (
        <img
          src={movie.posterUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,oklch(1_0_0_/_0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,oklch(0.62_0.24_25_/_0.35),transparent_55%)]" />
    </div>
  );
}
