import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetch, useValidation } from "../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { Layout, SearchForm } from "../../components";
import { useRecoilValue } from "recoil";
import { userSelector } from "../../recoil";
import { updateUser } from "../../services";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router";

const FORM_DATA = {
  firstName: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("firstName"),
      required: true,
      fullWidth: true,
      margin: "normal",
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
      margin: "normal",
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
      margin: "normal",
      id: "email",
      label: "Адреса електронної пошти",
      error: !!errors.email?.message,
      helperText: errors.email?.message,
      autoComplete: "email",
    },
  }),
};

export function UserSettings() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const { request } = useFetch();
  const navigate = useNavigate();
  const { firstName, lastName, email, id } = useRecoilValue(userSelector);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName,
      lastName,
      email,
    },
  });

  useEffect(() => {
    reset({ firstName, lastName, email });
  }, [firstName, lastName, email]);

  async function onSubmit(formData) {
    const isEmailChanged = email !== getValues().email;
    await request({
      fn: () => updateUser({ ...formData, id }),
      showSuccessAlert: true,
      shouldUserUpdate: true,
    });

    if (isEmailChanged) {
      navigate(ROUTES.userActivation.pathname);
    }
  }

  return (
    <Layout>
      <SearchForm
        formData={FORM_DATA}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        title="Персональні дані"
        buttonTitle="Зберегти"
        buttonDisabled={!isDirty}
      >
        <Button
          onClick={() => navigate(ROUTES.passwordChange.pathname)}
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
        >
          Змінити пароль
        </Button>
      </SearchForm>
    </Layout>
  );
}
