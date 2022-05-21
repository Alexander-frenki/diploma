import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { Alerts, Header, LeftMenu } from "..";
import { Grid } from "@mui/material";
import { userState } from "../../recoil";

export function Layout({ children }) {
  const { isLoggedIn } = useRecoilValue(userState);

  return (
    <>
      <Header />
      {isLoggedIn ? (
        <Grid
          container
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            my: 2,
            px: 1,
            "> *": {
              height: "calc(100vh - 56px * 2 + 16px)",
              padding: 2,
              bgcolor: (theme) => theme.contentBackground,
              borderRadius: 5,
              overflow: "scroll",
            },
          }}
        >
          <Grid item xs={4} sx={{ mx: 1 }}>
            <LeftMenu />
          </Grid>

          <Grid item xs={8} sx={{ mx: 1, position: "relative" }}>
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
};
