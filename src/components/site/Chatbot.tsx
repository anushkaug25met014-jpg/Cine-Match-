import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { askBot } from "@/lib/chatbot-mock";
import type { Movie } from "@/lib/mock-movies";

type Msg = { role: "user" | "bot"; text: string; movies?: Movie[] };

const PROMPTS = [
  "A thriller under 2 hours",
  "Mind-bending sci-fi",
  "Movies like Interstellar",
  "Something feel-good tonight",
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi — I'm CineBot. Tell me a mood, a genre, or a runtime and I'll match you with something to watch." },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { listRef.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, [msgs, open]);
  const send = (text: string) => {
    if (!text.trim()) return;
    const { text: reply, movies } = askBot(text);
    setMsgs(m => [...m, { role: "user", text }, { role: "bot", text: reply, movies }]);
    setInput("");
  };
  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Open CineBot"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[var(--shadow-red)] transition hover:scale-110"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[560px] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl glass shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2 border-b border-border bg-black/40 px-4 py-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-semibold text-white">CineBot</div>
              <div className="text-[10px] text-muted-foreground">AI recommendation assistant</div>
            </div>
          </div>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                <div className={m.role === "user"
                  ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                  : "max-w-[90%] text-sm text-foreground"}>
                  <p>{m.text}</p>
                  {m.movies && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {m.movies.map(mo => (
                        <Link
                          key={mo.id}
                          to="/movie/$id"
                          params={{ id: mo.id }}
                          onClick={() => setOpen(false)}
                          className="rounded-lg border border-border bg-surface p-2 transition hover:border-primary"
                        >
                          <div className="text-xs font-semibold text-white line-clamp-1">{mo.title}</div>
                          <div className="mt-0.5 text-[10px] text-muted-foreground">★ {mo.rating.toFixed(1)} · {mo.genres[0]} · {mo.runtime}m</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-border px-3 pt-3">
            {PROMPTS.map(p => (
              <button
                key={p}
                onClick={() => send(p)}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-primary hover:text-white"
              >{p}</button>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask CineBot..."
              className="flex-1 rounded-md border border-border bg-black/50 px-3 py-2 text-sm text-white outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-white transition hover:opacity-90"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
