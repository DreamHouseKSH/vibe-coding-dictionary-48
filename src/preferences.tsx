import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
export type Preferences = { motion: "system" | "reduce"; autoLoop: boolean; speed: number; theme: "system" | "light" | "dark"; accent: "violet" | "blue" | "green" };
export const defaults: Preferences = { motion: "system", autoLoop: true, speed: 1, theme: "system", accent: "violet" };
const key = "vibe48.preferences.v1";
function read(): Preferences {
  try {
    const p = JSON.parse(localStorage.getItem(key) ?? "null");
    return { motion: p?.motion === "reduce" ? "reduce" : "system", autoLoop: typeof p?.autoLoop === "boolean" ? p.autoLoop : true, speed: [0.25, 0.5, 1, 1.5, 2].includes(p?.speed) ? p.speed : 1, theme: ["light", "dark"].includes(p?.theme) ? p.theme : "system", accent: ["blue", "green"].includes(p?.accent) ? p.accent : "violet" };
  } catch { return defaults; }
}
const Context = createContext({ preferences: defaults, reduced: false, systemReduced: false, storageAvailable: true, update: (_: Partial<Preferences>) => {}, reset: () => {} });
export function PreferencesProvider({children}: {children: ReactNode}) {
  const [preferences, setPreferences] = useState(read);
  const [systemReduced, setSystemReduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [systemDark, setSystemDark] = useState(() => matchMedia("(prefers-color-scheme: dark)").matches);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const reduced = systemReduced || preferences.motion === "reduce";
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)"), color = matchMedia("(prefers-color-scheme: dark)");
    const onMotion = () => setSystemReduced(motion.matches), onColor = () => setSystemDark(color.matches);
    motion.addEventListener("change", onMotion); color.addEventListener("change", onColor);
    return () => { motion.removeEventListener("change", onMotion); color.removeEventListener("change", onColor); };
  }, []);
  useEffect(() => {
    const dark = preferences.theme === "dark" || (preferences.theme === "system" && systemDark);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.dataset.accent = preferences.accent;
    document.documentElement.dataset.motion = reduced ? "reduce" : "full";
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    try { localStorage.setItem(key, JSON.stringify(preferences)); setStorageAvailable(true); } catch { setStorageAvailable(false); }
  }, [preferences, systemDark, reduced]);
  return <Context.Provider value={{preferences, reduced, systemReduced, storageAvailable, update: (patch) => setPreferences(p => ({...p, ...patch})), reset: () => setPreferences({...defaults})}}>{children}</Context.Provider>;
}
export const usePreferences = () => useContext(Context);
