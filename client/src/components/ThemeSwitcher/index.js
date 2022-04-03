import React, { useContext } from "react";
import { alpha, IconButton } from "@mui/material";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import { ThemeContext } from "..";

export function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  function onThemeChange() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  const themeIcon =
    theme === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />;

  return (
    <IconButton
      sx={{
        border: (theme) =>
          `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
      }}
      onClick={onThemeChange}
    >
      {themeIcon}
    </IconButton>
  );
}
