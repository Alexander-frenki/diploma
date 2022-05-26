import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import { Box, Button, Container, Typography } from "@mui/material";
import { Layout } from "../../components";
import { userSelector } from "../../recoil";
import { activateUser } from "../../services";
import { ROUTES } from "../../router";

export function ActivateAccount() {
  const { isActivated } = useRecoilValue(userSelector);
  const isFirstMount = useRef(true);
  const { request } = useFetch();
  const { activationLink } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    if (!isActivated && request && isFirstMount.current) {
      isFirstMount.current = false;
      await request({ fn: () => activateUser(activationLink) });
    }
  }, [isActivated, request, activationLink]);

  return (
    <Layout isShowContent={false}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isActivated && (
            <>
              <Typography align="center" sx={{ marginBottom: 4 }}>
                Вітаємо, ваш обліковий запис успішно активовано
              </Typography>

              <Button
                onClick={() => navigate(ROUTES.home.pathname)}
                variant="contained"
              >
                Перейти на головну
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Layout>
  );
}
