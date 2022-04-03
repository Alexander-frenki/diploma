import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Layout } from "../../components";

export function UserActivation() {
  return (
    <Layout>
      <Container component="main">
        <Box>
          <Typography sx={{ my: 2 }}>
            Будь ласка, перевірте електронну пошту та дотримуйтесь інструкцій,
            щоб підтвердити обліковий запис.
          </Typography>
          <Button variant="contained">Надіслати наново</Button>
        </Box>
      </Container>
    </Layout>
  );
}
