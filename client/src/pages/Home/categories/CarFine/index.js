import React, { useState } from "react";
import { useFetch, useValidation } from "../../../../hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Typography } from "@mui/material";
import {
  BackButton,
  LinearLoader,
  SearchForm,
  Table,
} from "../../../../components";
import { getCarFines } from "../../../../services";

const FORM_DATA = {
  carNumber: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("carNumber"),
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "carNumber",
      label: "Номер автомобіля",
      error: !!errors.carNumber?.message,
      helperText: errors.carNumber?.message,
      autoFocus: true,
    },
  }),
};

export function CarFine() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const [carFines, setCarFines] = useState(null);
  const { loading, request } = useFetch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(formData) {
    setCarFines(await request(() => getCarFines(formData)));
  }

  function onChange({ target: { value, name } }) {
    setValue(name, value.toUpperCase());
  }

  if (loading) return <LinearLoader />;

  return (
    <>
      {!carFines && (
        <SearchForm
          formData={FORM_DATA}
          onChange={onChange}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          title="Отримання інформації по номеру авто"
        />
      )}
      {carFines && (
        <>
          <BackButton
            onClick={() => {
              setCarFines(null);
              reset();
            }}
          />

          <Typography sx={{ my: 2 }} align="center">
            Ось що нам вдалось знайти:
          </Typography>

          {carFines.map((car) => {
            return (
              <Box sx={{ mb: 4 }} key={car}>
                <Table data={car} />
              </Box>
            );
          })}
        </>
      )}
    </>
  );
}
