import React from "react";
import { useFetch, useLoader } from "../../hooks";
import { useRecoilValue } from "recoil";
import { Box, Container, Link, Typography } from "@mui/material";
import { Layout } from "../../components";
import { userSelector } from "../../recoil";
import { updateUserActivationLink } from "../../services";

export default function UserActivation() {
  const { request } = useFetch();
  const { id } = useRecoilValue(userSelector);
  const { removeAction, addAction } = useLoader();

  async function onSendLink() {
    addAction("SEND_LINK");
    await request({
      fn: () => updateUserActivationLink({ id }),
      showSuccessAlert: true,
      successMessage:
        "На вашу електронну адресу був відправлений новий лист для активації вашего аккаунту",
    });
    removeAction("SEND_LINK");
  }

  return (
    <Layout isShowContent={false}>
      <Container component="main">
        <Box sx={{ marginTop: 10 }}>
          <Typography align="center" sx={{ my: 2 }}>
            Будь ласка, перевірте електронну пошту та дотримуйтесь інструкцій,
            щоб підтвердити обліковий запис.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography align="center" sx={{ my: 2, marginRight: 1 }}>
              Не отримали лист?
            </Typography>
            <Link
              onClick={onSendLink}
              sx={{ fontSize: 16 }}
              component="button"
              variant="contained"
            >
              Відправити ще раз
            </Link>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
