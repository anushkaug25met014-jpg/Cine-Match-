import { Film } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/60 py-10 mt-16">
      <div className="mx-auto max-w-[1600px] px-4 md:px-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Film className="h-5 w-5 text-primary" />
              <span className="font-display text-lg tracking-widest text-white">CINEMATCH</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              AI-powered movie recommendations, tailored to what you actually want to watch tonight.
            </p>
          </div>
          <FooterCol title="Discover" items={["Trending", "Top Rated", "Upcoming", "By Genre"]} />
          <FooterCol title="Company" items={["About", "Careers", "Press", "Contact"]} />
          <FooterCol title="Legal" items={["Terms", "Privacy", "Cookies", "Licenses"]} />
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} CineMatch AI. Movie data is illustrative.</div>
          <div>Built for cinephiles.</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/80">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map(i => (
          <li key={i}><a href="#" className="transition hover:text-white">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
