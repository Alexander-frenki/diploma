import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useLoader } from "../../../hooks";
import { userState } from "../../../recoil";
import { IconButton } from "@mui/material";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { logout } from "../../../services";
import { ROUTES } from "../../../router";

export function LogoutIcon({ styles }) {
  const navigate = useNavigate();
  const [{ isLoggedIn }] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const { addAction, removeAction } = useLoader();

  async function onLogout() {
    try {
      addAction("LOGOUT");
      await logout();
      resetUser();
      navigate(ROUTES.signIn.pathname);
    } catch (error) {
      console.log(error);
    } finally {
      removeAction("LOGOUT");
    }
  }

  return (
    isLoggedIn && (
      <IconButton sx={styles} onClick={onLogout}>
        <LogoutOutlined />
      </IconButton>
    )
  );
}

LogoutIcon.propTypes = {
  styles: PropTypes.object,
};
