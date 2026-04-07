import { useState, useEffect, useCallback } from 'react';

/**
 * Cycles through an array of strings with crossfade transitions.
 *
 * @param items   Strings to cycle through
 * @param visibleMs  How long each string stays fully visible (default 5000)
 * @param fadeMs     Duration of each fade-out / fade-in half (default 500)
 * @returns { text, opacity } — bind opacity to a CSS-transitioned element
 */
export function useCyclingText(
  items: string[],
  visibleMs = 5000,
  fadeMs = 500,
) {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * items.length),
  );
  const [opacity, setOpacity] = useState(1);

  const pickNext = useCallback(
    (prev: number) => {
      if (items.length <= 1) return 0;
      let next: number;
      do {
        next = Math.floor(Math.random() * items.length);
      } while (next === prev);
      return next;
    },
    [items.length],
  );

  useEffect(() => {
    if (items.length <= 1) return;

    let timer: ReturnType<typeof setTimeout>;

    function cycle() {
      // 1. Stay visible
      timer = setTimeout(() => {
        // 2. Fade out
        setOpacity(0);
        timer = setTimeout(() => {
          // 3. Swap text + fade in
          setIndex((prev) => pickNext(prev));
          setOpacity(1);
          // 4. Wait for fade-in to finish, then restart
          timer = setTimeout(cycle, fadeMs);
        }, fadeMs);
      }, visibleMs);
    }

    cycle();
    return () => clearTimeout(timer);
  }, [items.length, visibleMs, fadeMs, pickNext]);

  return { text: items[index] ?? items[0] ?? '', opacity };
}
