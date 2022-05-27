import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch, useLoader, useValidation } from "../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, TextField } from "@mui/material";
import { confirmPassword, recoveryPassword } from "../../services";
import { Alerts, Layout, SearchForm } from "../../components";
import { ROUTES } from "../../router";

const EMAIL_FORM_DATA = {
  email: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("email"),
      required: true,
      fullWidth: true,
      margin: "normal",
      id: "email",
      label: "Адреса електронної пошти",
      error: !!errors.email?.message,
      helperText: errors.email?.message,
      autoComplete: "email",
    },
  }),
};

const FORM_DATA = {
  newPassword: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("newPassword"),
      required: true,
      fullWidth: true,
      margin: "normal",
      id: "newPassword",
      label: "Новий пароль",
      error: !!errors.newPassword?.message,
      helperText: errors.newPassword?.message,
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
      margin: "normal",
      id: "repeatPassword",
      label: "Повторіть пароль",
      error: !!errors.repeatPassword?.message,
      helperText: errors.repeatPassword?.message,
      autoComplete: "new-password",
      type: "password",
    },
  }),
};

export function PasswordRecovery() {
  const { token } = useParams();
  const schema = useValidation(
    token ? Object.keys(FORM_DATA) : Object.keys(EMAIL_FORM_DATA)
  );
  const { addAction, removeAction } = useLoader();

  const { request } = useFetch();
  const navigate = useNavigate();

  async function onEmailSend(formData) {
    addAction("RECOVERY");
    await request({
      fn: () => recoveryPassword(formData),
      showSuccessAlert: true,
      successMessage:
        "На вашу електронну адресу був відправлений лист для відновлення паролю",
      resetLoader: () => removeAction("RECOVERY"),
    });
  }

  async function onPasswordConfirm(formData) {
    await request({
      fn: () =>
        confirmPassword({
          ...formData,
          recoveryToken: token,
        }),
      showSuccessAlert: true,
    });
    navigate(ROUTES.signIn.pathname);
  }

  const onSubmit = token ? onPasswordConfirm : onEmailSend;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
          <SearchForm
            formData={token ? FORM_DATA : EMAIL_FORM_DATA}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            title={
              token
                ? "Змінити пароль"
                : "Відправити посилання для відновлення паролю"
            }
            buttonTitle="Зберегти"
          />
        </Box>
      </Container>
    </Layout>
  );
}
