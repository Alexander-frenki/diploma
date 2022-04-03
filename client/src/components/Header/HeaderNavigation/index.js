import React from "react";
import { alpha, Box } from "@mui/material";
import { HomeIcon } from "./Home";
import { ThemeSwitcherIcon } from "./ThemeSwitcher";
import { UserSettingsIcon } from "./UserSettings";
import { LogoutIcon } from "./Logout";

const iconStyles = {
  ml: 2,
  border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
};

export function HeaderNavigation() {
  return (
    <Box>
      <ThemeSwitcherIcon styles={iconStyles} />
      <HomeIcon styles={iconStyles} />
      <UserSettingsIcon styles={iconStyles} />
      <LogoutIcon styles={iconStyles} />
    </Box>
  );
}
