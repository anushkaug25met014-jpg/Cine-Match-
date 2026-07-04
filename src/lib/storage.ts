import { useCallback, useEffect, useState } from "react";

const KEYS = {
  watchlist: "cm.watchlist",
  liked: "cm.liked",
  disliked: "cm.disliked",
  history: "cm.history",
  ratings: "cm.ratings",
  profile: "cm.profile",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("cm:storage", { detail: { key } }));
}

export function useLocalList(key: keyof typeof KEYS) {
  const storageKey = KEYS[key];
  const [ids, setIds] = useState<string[]>(() => read<string[]>(storageKey, []));
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === storageKey) setIds(read<string[]>(storageKey, []));
    };
    window.addEventListener("cm:storage", handler);
    return () => window.removeEventListener("cm:storage", handler);
  }, [storageKey]);
  const toggle = useCallback((id: string) => {
    const current = read<string[]>(storageKey, []);
    const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
    write(storageKey, next);
  }, [storageKey]);
  const add = useCallback((id: string) => {
    const current = read<string[]>(storageKey, []);
    if (!current.includes(id)) write(storageKey, [id, ...current].slice(0, 100));
  }, [storageKey]);
  const remove = useCallback((id: string) => {
    write(storageKey, read<string[]>(storageKey, []).filter(x => x !== id));
  }, [storageKey]);
  return { ids, has: (id: string) => ids.includes(id), toggle, add, remove };
}

export function useProfile() {
  const [profile, setProfile] = useState(() =>
    read(KEYS.profile, { name: "Cinephile", bio: "Movie explorer.", favoriteGenres: [] as string[] })
  );
  useEffect(() => {
    const h = (e: Event) => {
      if ((e as CustomEvent).detail?.key === KEYS.profile) setProfile(read(KEYS.profile, profile));
    };
    window.addEventListener("cm:storage", h);
    return () => window.removeEventListener("cm:storage", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const save = useCallback((p: typeof profile) => write(KEYS.profile, p), []);
  return { profile, save };
}
