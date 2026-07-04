import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Film } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { to: "/", label: "Home" },
    { to: "/browse", label: "Browse" },
    { to: "/search", label: "Search" },
    { to: "/watchlist", label: "Watchlist" },
    { to: "/profile", label: "Profile" },
  ] as const;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-4 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-display text-xl tracking-widest text-white">
            CINE<span className="text-primary">MATCH</span>
          </span>
        </Link>
        <ul className="hidden items-center gap-5 md:flex">
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm transition-colors ${
                  pathname === l.to ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => { e.preventDefault(); if (q.trim()) navigate({ to: "/search", search: { q: q.trim() } }); }}
          className="ml-auto flex items-center"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search movies..."
              className="w-40 rounded-md border border-border bg-black/50 py-1.5 pl-8 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:w-64 focus:border-primary md:w-56"
            />
          </div>
        </form>
      </nav>
    </header>
  );
}
