import { useState, useEffect } from "react";

/**
 * usePersistentState
 * A hook that syncs state with localStorage
 *
 * @param key string - The localStorage key
 * @param defaultValue T - The fallback value if nothing is stored
 */
export function usePersistentState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T | null>(null);

  // Load value from localStorage once
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      } else {
        setValue(defaultValue);
      }
    } catch {
      setValue(defaultValue);
    }
  }, [key, defaultValue]);

  // Save value to localStorage whenever it changes
  useEffect(() => {
    if (value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}
