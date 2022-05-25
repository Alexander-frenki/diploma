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
import { login } from "../../services";
import { ROUTES } from "../../router";
import { Layout } from "../../components";

const FORM_DATA = {
  email: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("email"),
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "email",
      label: "Адреса електронної пошти",
      error: !!errors.email?.message,
      helperText: errors.email?.message,
      autoComplete: "email",
      autoFocus: true,
    },
  }),
  password: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("password"),
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "password",
      label: "Пароль",
      error: !!errors.password?.message,
      helperText: errors.password?.message,
      autoComplete: "current-password",
      type: "password",
    },
  }),
};

export function SignIn() {
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
      addAction("LOGIN");
      const { user, accessToken } = await login(formData);
      localStorage.setItem("token", accessToken);
      setUser(user);
      navigate(ROUTES.home.pathname);
    } catch (error) {
      setAlert({
        severity: "error",
        message: error.response.data.message,
      });
    } finally {
      removeAction("LOGIN");
    }
  }

  return (
    <Layout>
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
            Вхід
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            {Object.values(FORM_DATA).map((field) => {
              const { Component, componentProps } = field(register, errors);
              return <Component key={componentProps.id} {...componentProps} />;
            })}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Увійти
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component="button" variant="body2">
                  Забули пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  onClick={() => navigate(ROUTES.signOut.pathname)}
                  variant="body2"
                >
                  {"Зареєструватися"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
