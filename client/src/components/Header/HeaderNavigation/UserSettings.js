import React from "react";
import PropTypes from "prop-types";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil";
import { IconButton } from "@mui/material";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import { ROUTES } from "../../../router";

export function UserSettingsIcon({ styles }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ isActivated }] = useRecoilState(userState);

  const isSamePage = matchPath(
    { path: ROUTES.userSettings.pathname, exact: true },
    location.pathname
  );

  return (
    !isSamePage &&
    isActivated && (
      <IconButton
        onClick={() => navigate(ROUTES.userSettings.pathname)}
        sx={styles}
      >
        <SettingsOutlined />
      </IconButton>
    )
  );
}

UserSettingsIcon.propTypes = {
  styles: PropTypes.object,
};
