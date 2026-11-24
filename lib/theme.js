"use client";

import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "./storage";
import { THEME_KEY as KEY } from "./themeScript";
const EVENT = "reviewer:theme";

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "light" || theme === "dark") root.setAttribute("data-theme", theme);
  else root.removeAttribute("data-theme");
}

export function useTheme() {
  const [theme, setThemeState] = useState("system");
  const [resolved, setResolved] = useState("light");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      const t = readJSON(KEY, "system");
      setThemeState(t);
      setResolved(t === "system" ? (mq.matches ? "dark" : "light") : t);
    };
    sync();
    mq.addEventListener("change", sync);
    window.addEventListener(EVENT, sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener(EVENT, sync);
    };
  }, []);

  const setTheme = (t) => {
    writeJSON(KEY, t);
    applyTheme(t);
    window.dispatchEvent(new Event(EVENT));
  };

  return { theme, resolved, setTheme };
}
