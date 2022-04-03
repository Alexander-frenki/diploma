import React from "react";
import PropTypes from "prop-types";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil";
import { IconButton } from "@mui/material";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import { ROUTES } from "../../../router";

export function HomeIcon({ styles }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ isActivated }] = useRecoilState(userState);
  const isSamePage = matchPath(
    { path: ROUTES.home.pathname, exact: true },
    location.pathname
  );

  return (
    !isSamePage &&
    isActivated && (
      <IconButton sx={styles} onClick={() => navigate(ROUTES.home.pathname)}>
        <HomeOutlined />
      </IconButton>
    )
  );
}

HomeIcon.propTypes = {
  styles: PropTypes.object,
};
