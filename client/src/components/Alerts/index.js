import React, { useEffect } from "react";
import { Alert, Box } from "@mui/material";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { alertState } from "../../recoil";

export function Alerts() {
  const alert = useRecoilValue(alertState);
  const resetAlert = useResetRecoilState(alertState);

  useEffect(() => {
    let timer;
    if (alert) setTimeout(resetAlert, 4000);
    () => clearTimeout(timer);
  }, [alert]);

  return (
    alert && (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1,
          zIndex: 999,
        }}
      >
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Box>
    )
  );
}
