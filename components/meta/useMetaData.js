'use client';
import { useCallback, useEffect, useState } from 'react';

// Fetches /api/meta-ads (admin-gated). Exposes loading/error, a hard reload, and
// a refresh() that clears the server cache first so the Refresh button gets fresh data.
export function useMetaData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isRefresh) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      if (isRefresh) {
        await fetch('/api/meta-ads/refresh', { method: 'POST' });
      }
      const res = await fetch('/api/meta-ads', { cache: 'no-store' });
      if (!res.ok) {
        let body = {};
        try { body = await res.json(); } catch {}
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(false); }, [load]);

  return {
    data,
    loading,
    error,
    refreshing,
    reload: () => load(false),
    refresh: () => load(true),
  };
}
