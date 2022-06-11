import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFetch, useLoader, useValidation } from "../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userSelector } from "../../recoil";
import { updateUserPassword } from "../../services";
import { BackButton, Layout, SearchForm } from "../../components";

const FORM_DATA = {
  password: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("password"),
      required: true,
      fullWidth: true,
      margin: "normal",
      id: "password",
      label: "Старий Пароль",
      error: !!errors.password?.message,
      helperText: errors.password?.message,
      autoComplete: "new-password",
      type: "password",
    },
  }),
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

export default function PasswordChange() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const { request } = useFetch();
  const { addAction, removeAction } = useLoader();
  const navigate = useNavigate();
  const { id } = useRecoilValue(userSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(formData) {
    addAction("UPDATE_PASSWORD");
    await request({
      fn: () => updateUserPassword({ ...formData, id }),
      showSuccessAlert: true,
      resetLoader: () => removeAction("UPDATE_PASSWORD"),
    });
  }

  return (
    <Layout>
      <BackButton onClick={() => navigate(-1)} />
      <SearchForm
        formData={FORM_DATA}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        title="Змінити пароль"
        buttonTitle="Зберегти"
      />
    </Layout>
  );
}
