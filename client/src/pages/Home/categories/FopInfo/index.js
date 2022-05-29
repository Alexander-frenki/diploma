import React, { useState } from "react";
import { useFetch, useValidation } from "../../../../hooks";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFopInfo } from "../../../../services";
import {
  BackButton,
  FopDetail,
  LinearLoader,
  SearchForm,
} from "../../../../components";

const FORM_DATA = {
  fopCode: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("fopCode"),
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "fopCode",
      label: "Ідентифікаційний код",
      error: !!errors.fopCode?.message,
      helperText: errors.fopCode?.message,
    },
  }),
};

export default function FopInfo() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const [fopInfo, setFopInfo] = useState(null);
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
    setFopInfo(await request({ fn: () => getFopInfo(formData) }));
  }

  if (loading) return <LinearLoader />;

  return (
    <>
      {!fopInfo && (
        <SearchForm
          formData={FORM_DATA}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          title="Отримання інформації по індентифікаційному коду"
        />
      )}
      {fopInfo && (
        <>
          <BackButton
            onClick={() => {
              setFopInfo(null);
              reset();
            }}
          />

          <FopDetail {...fopInfo} />
        </>
      )}
    </>
  );
}
