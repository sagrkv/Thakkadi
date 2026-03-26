'use client';

import { useCallback, useMemo } from 'react';
import type { ZodSchema } from 'zod';

/**
 * Read URL search params and parse them with a Zod schema.
 * Invalid params are silently dropped.
 *
 * Also exposes `updateUrl` to push params via replaceState (no navigation).
 */
export function useUrlSync<T>(schema: ZodSchema<T>) {
  const parsed = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const raw = Object.fromEntries(new URLSearchParams(window.location.search));
    const result = schema.safeParse(raw);
    return result.success ? result.data : null;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateUrl = useCallback((params: Record<string, string | undefined>) => {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === '') {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    }
    window.history.replaceState(null, '', url.toString());
  }, []);

  return { parsed, updateUrl };
}
