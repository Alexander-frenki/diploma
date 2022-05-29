import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoader, useValidation } from "../../hooks";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { alertState, userSelector } from "../../recoil";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { registration } from "../../services";
import { ROUTES } from "../../router";
import { Alerts, Layout } from "../../components";

const FORM_DATA = {
  firstName: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("firstName"),
      required: true,
      fullWidth: true,
      id: "firstName",
      label: "Ім'я",
      error: !!errors.firstName?.message,
      helperText: errors.firstName?.message,
      autoComplete: "given-name",
    },
  }),
  lastName: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("lastName"),
      required: true,
      fullWidth: true,
      id: "lastName",
      label: "Прізвище",
      error: !!errors.lastName?.message,
      helperText: errors.lastName?.message,
      autoComplete: "family-name",
    },
  }),
  email: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("email"),
      required: true,
      fullWidth: true,
      id: "email",
      label: "Адреса електронної пошти",
      error: !!errors.email?.message,
      helperText: errors.email?.message,
      autoComplete: "email",
    },
  }),
  password: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("password"),
      required: true,
      fullWidth: true,
      id: "password",
      label: "Пароль",
      error: !!errors.password?.message,
      helperText: errors.password?.message,
      autoComplete: "new-password",
      type: "password",
    },
  }),
  repeatPassword: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("repeatPassword"),
      required: true,
      fullWidth: true,
      id: "repeatPassword",
      label: "Повторіть пароль",
      error: !!errors.repeatPassword?.message,
      helperText: errors.repeatPassword?.message,
      autoComplete: "new-password",
      type: "password",
    },
  }),
};

export default function SignUp() {
  const navigate = useNavigate();
  const schema = useValidation(Object.keys(FORM_DATA));
  const setUser = useSetRecoilState(userSelector);
  const { addAction, removeAction } = useLoader();
  const setAlert = useSetRecoilState(alertState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(formData) {
    try {
      addAction("REGISTRATION");
      const { user, accessToken } = await registration(formData);
      localStorage.setItem("token", accessToken);
      setUser(user);
      navigate(ROUTES.userActivation.pathname);
    } catch (error) {
      setAlert({
        severity: "error",
        message: error.response.data.message,
      });
    } finally {
      removeAction("REGISTRATION");
    }
  }

  return (
    <Layout>
      <Box sx={{ position: "relative" }}>
        <Alerts />
      </Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Реєстрація
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {Object.values(FORM_DATA).map((field) => {
                const { Component, componentProps } = field(register, errors);
                return (
                  <Grid key={componentProps.id} item xs={12}>
                    <Component {...componentProps} />
                  </Grid>
                );
              })}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зареєструватися
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component="button"
                  onClick={() => navigate(ROUTES.signIn.pathname)}
                  variant="body2"
                >
                  Вже є аккаунт? Увійти
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
