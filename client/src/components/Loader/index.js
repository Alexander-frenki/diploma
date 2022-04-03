import React from "react";
import { useRecoilValue } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { loaderState } from "../../recoil/loader";

export function Loader() {
  const loaderActions = useRecoilValue(loaderState);

  return (
    !!loaderActions.length && (
      <Container
        maxWidth={false}
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          zIndex: 10,
        }}
      >
        <CircularProgress />
      </Container>
    )
  );
}
