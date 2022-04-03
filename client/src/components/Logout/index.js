import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useLoader } from "../../hooks";
import { userState } from "../../recoil";
import { alpha, IconButton } from "@mui/material";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { logout } from "../../services";
import { ROUTES } from "../../router";

export function Logout() {
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
      <IconButton
        sx={{
          ml: 2,
          border: (theme) =>
            `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
        }}
        onClick={onLogout}
      >
        <LogoutOutlined />
      </IconButton>
    )
  );
}
