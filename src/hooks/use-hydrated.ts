'use client';

import { useEffect, useState } from 'react';

/**
 * `false` during SSR and the first client render, `true` from the next render
 * on. Use it to gate output that depends on data the client fetches, so the
 * hydrated markup always matches what the server sent.
 */
export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};
