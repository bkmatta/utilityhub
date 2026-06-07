import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pinned_tools';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const toggle = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [slug, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites]);

  return { favorites, toggle, isFavorite };
}
