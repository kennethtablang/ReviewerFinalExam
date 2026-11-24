"use client";

import { useCallback, useEffect, useState } from "react";
import { readJSON, writeJSON } from "./storage";

const EVENT = "reviewer:flags";
const keyFor = (slug) => `reviewer:flags:${slug}`;

export function getFlags(slug) {
  const v = readJSON(keyFor(slug), []);
  return Array.isArray(v) ? v : [];
}

export function setFlags(slug, ids) {
  writeJSON(keyFor(slug), ids);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { slug } }));
}

// Flags are saved per subject on this device and shared live across components.
export function useFlags(slug) {
  const [flags, setState] = useState([]);

  useEffect(() => {
    const sync = () => setState(getFlags(slug));
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);

  const toggle = useCallback(
    (id) => {
      const current = new Set(getFlags(slug));
      if (current.has(id)) current.delete(id);
      else current.add(id);
      setFlags(slug, [...current]);
    },
    [slug]
  );

  const clear = useCallback(() => setFlags(slug, []), [slug]);

  return { flags, toggle, clear, has: (id) => flags.includes(id) };
}
