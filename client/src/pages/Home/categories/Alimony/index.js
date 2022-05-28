import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch, useValidation } from "../../../../hooks";
import { TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BackButton,
  LinearLoader,
  SearchForm,
  Table,
} from "../../../../components";
import { getAlimony } from "../../../../services";

const FORM_DATA = {
  firstName: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("firstName"),
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "firstName",
      label: "Ім'я",
      error: !!errors.firstName?.message,
      helperText: errors.firstName?.message,
    },
  }),
  lastName: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("lastName"),
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "lastName",
      label: "Прізвище",
      error: !!errors.lastName?.message,
      helperText: errors.lastName?.message,
    },
  }),
  patronymic: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("patronymic"),
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "patronymic",
      label: "По батькові",
      error: !!errors.patronymic?.message,
      helperText: errors.patronymic?.message,
    },
  }),
};

export function Alimony() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const [alimony, setAlimony] = useState(null);
  const { loading, request } = useFetch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(formData) {
    setAlimony(await request({ fn: () => getAlimony(formData) }));
  }

  if (loading) return <LinearLoader />;

  return (
    <>
      {!alimony && (
        <SearchForm
          formData={FORM_DATA}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          title="Отримання інформації по ПІБ"
        />
      )}
      {alimony && (
        <>
          <BackButton
            onClick={() => {
              setAlimony(null);
              reset();
            }}
          />

          <Typography sx={{ my: 2 }} align="center">
            Кількість співпадінь по ПІБ: {alimony.count}
          </Typography>

          <Table
            data={[
              ...alimony.aliments.map(({ full_name, birth_date }) => [
                full_name,
                birth_date,
              ]),
            ]}
          />
        </>
      )}
    </>
  );
}
