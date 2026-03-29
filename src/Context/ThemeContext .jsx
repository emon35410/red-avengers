// ThemeContext.js
// Alag file e rakha hoyeche karon Fast Refresh only works
// when a file exports components only — context আলাদা রাখা best practice.

import { createContext } from "react";

export const ThemeContext = createContext();