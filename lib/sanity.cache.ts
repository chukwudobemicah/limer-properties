"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";

/**
 * One shared request per query for the whole session.
 *
 * Several components (header, floating button, pages) ask for the same data.
 * Without this, each fired its own request and re-rendered separately — extra
 * main-thread work that made the intro animations stutter. Results are also
 * kept, so navigating back to a page shows content immediately (no skeleton
 * flash and no re-animation).
 */
const values = new Map<string, unknown>();
const requests = new Map<string, Promise<unknown>>();

function fetchOnce<T>(query: string): Promise<T> {
  let request = requests.get(query) as Promise<T> | undefined;
  if (!request) {
    request = client.fetch<T>(query).then((data) => {
      values.set(query, data);
      return data;
    });
    // Allow a retry next time if this one fails.
    request.catch(() => requests.delete(query));
    requests.set(query, request);
  }
  return request;
}

export function useCachedQuery<T>(query: string, fallback: T) {
  const cached = values.has(query) ? (values.get(query) as T) : undefined;
  const [data, setData] = useState<T>(cached ?? fallback);
  const [loading, setLoading] = useState(cached === undefined);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (values.has(query)) return;
    let active = true;
    fetchOnce<T>(query)
      .then((result) => {
        if (active) setData(result ?? fallback);
      })
      .catch((err: Error) => {
        console.error("Sanity query failed:", err);
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // `fallback` is a constant default; only the query identifies the request.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return { data, loading, error };
}
