import React, { createContext, useCallback, useEffect, useState } from "react";

const defaultState = {
  auto: false,
  dark: false,
  toggleDark: () => {},
  toggleAuto: () => {},
};

const ThemeContext = createContext(defaultState);

const ThemeProvider = ({ children }) => {
  const [auto, setAuto] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (auto) {
      return;
    }

    const lsDark = localStorage.getItem("dark");
    if (lsDark === null) {
      setAuto(true);
      console.log("Follow System");
    } else {
      setDark(JSON.parse(lsDark));
      console.log("Follow lsdark i.e:%s", lsDark);
    }
  }, []);

  const handleMediaQuery = useCallback(
    (e) => {
      const isDark = e.matches;
      console.log("setting theme.. systemPrefersDark:%s", isDark);
      setTheme(isDark);
    },
    [auto]
  );

  useEffect(() => {
    if (!auto) {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeEventListener("change", handleMediaQuery);
  }, [handleMediaQuery]);

  const setTheme = (dMode) => {
    setDark(dMode);
    const d = document.documentElement;
    const themes = ["light", "dark"];
    if (dMode) {
      d.classList.remove(...themes);
      d.classList.add("dark");
    } else {
      d.classList.remove(...themes);
      d.classList.add("light");
    }
  };

  const toggleAuto = () => {
    if (!auto) {
      localStorage.removeItem("dark");
      setAuto(!auto);
    } else {
      localStorage.setItem("dark", dark);
      setAuto(!auto);
    }
  };

  const toggleDark = () => {
    localStorage.setItem("dark", JSON.stringify(!dark));
    console.log("setting theme.. lsDark:%s", !dark);
    setTheme(!dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        auto,
        dark,
        toggleDark,
        toggleAuto,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
export { ThemeProvider };
