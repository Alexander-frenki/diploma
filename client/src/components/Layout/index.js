import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { Alerts, Header, LeftMenu } from "..";
import { Box, Grid } from "@mui/material";
import { userState } from "../../recoil";

export function Layout({ children, isShowContent = true }) {
  const { isLoggedIn, isActivated } = useRecoilValue(userState);

  return (
    <>
      <Header />
      {!isLoggedIn ||
        (!isActivated && !isShowContent && (
          <Box sx={{ position: "relative" }}>
            <Alerts />
          </Box>
        ))}
      {isLoggedIn && isActivated && isShowContent ? (
        <Grid
          container
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            my: [0, 0, 2],
            px: [0, 0, 1],
            "> *": {
              height: [
                "calc(100vh - 56px)",
                "calc(100vh - 56px)",
                "calc(100vh - 56px * 2 + 16px)",
              ],
              padding: [1, 1, 2],
              bgcolor: (theme) => theme.contentBackground,
              borderRadius: [0, 0, 5],
              overflow: "scroll",
            },
          }}
        >
          <Grid
            item
            sx={{
              mx: [0, 0, 1],
              mr: ["2px", "2px", 1],
              flexShrink: 0,
              minWidth: 70,
              py: [0, 0, 2],
            }}
          >
            <LeftMenu />
          </Grid>

          <Grid
            item
            sx={{
              mx: [0, 0, 1],
              position: "relative",
              width: ["calc(100% - 70px)"],
              "> .MuiGrid-root": {
                mt: [1, 1, 0],
                justifyContent: ["flex-start", "flex-start", "center"],
              },
            }}
          >
            <Alerts />
            {children}
          </Grid>
        </Grid>
      ) : (
        children
      )}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  isShowContent: PropTypes.bool,
};
