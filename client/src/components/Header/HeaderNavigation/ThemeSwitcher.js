import React, { useContext } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import { ThemeContext } from "../..";

export function ThemeSwitcherIcon({ styles }) {
  const { theme, setTheme } = useContext(ThemeContext);

  function onThemeChange() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  const themeIcon =
    theme === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />;

  return (
    <IconButton sx={styles} onClick={onThemeChange}>
      {themeIcon}
    </IconButton>
  );
}

ThemeSwitcherIcon.propTypes = {
  styles: PropTypes.object,
};
