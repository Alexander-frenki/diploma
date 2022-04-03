import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material";

const COMPONENT_OVERRIDES = {
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: "10px",
      },
    },
    defaultProps: {
      size: "small",
      color: "primary",
    },
  },
};

// const PALLETE_COLORS = {
//   primary: {
//     main: "#00e676",
//     light: "#66ffa6",
//     dark: "#00b248",
//   },
//   secondary: {
//     main: "#ff7043",
//     light: "#ffa270",
//     dark: "#c63f17",
//   },
// };

const themes = {
  light: createTheme({
    palette: {
      mode: "light",
      // ...PALLETE_COLORS,
    },
    components: COMPONENT_OVERRIDES,
  }),
  dark: createTheme({
    palette: {
      mode: "dark",
      // ...PALLETE_COLORS,
      background: {
        default: "#000",
      },
    },
    components: COMPONENT_OVERRIDES,
  }),
};
export const ThemeContext = React.createContext();

export function ThemeManager({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeManager.propTypes = {
  children: PropTypes.node,
};
