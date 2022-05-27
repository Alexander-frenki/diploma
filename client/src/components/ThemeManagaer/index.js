import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material";

const alertSuccessColor = "#00b248";

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
  MuiAlert: {
    styleOverrides: {
      standardSuccess: {
        backgroundColor: alertSuccessColor,
        color: "#fff",
        "& .MuiAlert-icon": {
          color: "#fff",
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
          width: 0,
          height: 0,
        },
      },
    },
  },
};

const BREAKPOINTS = {
  values: {
    xs: 0,
    sm: 576,
    md: 992,
    lg: 1200,
    xl: 1536,
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
    contentBackground: "#e3e3e3",
    borderColor: "#BABABA",
    components: COMPONENT_OVERRIDES,
    breakpoints: BREAKPOINTS,
  }),
  dark: createTheme({
    palette: {
      mode: "dark",
      // ...PALLETE_COLORS,
      background: {
        // default: "#000",
      },
    },
    contentBackground: "#000",
    borderColor: "#666",
    components: COMPONENT_OVERRIDES,
    breakpoints: BREAKPOINTS,
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
