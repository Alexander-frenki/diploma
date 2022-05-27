import React, { useState } from "react";
import { useFetch, useValidation } from "../../../../hooks";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, styled, TextField, Typography } from "@mui/material";
import CarCrash from "@mui/icons-material/CarCrash";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import AttachMoney from "@mui/icons-material/AttachMoney";
import { getExternalCarInfo } from "../../../../services/api/car";
import { SearchForm } from "../../../../components/SerchForm";
import { BackButton, LinearLoader, Table } from "../../../../components";

const TableHeader = styled(Typography)(() => ({
  display: "flex",
  alignItems: "center",
  marginTop: 16,
  marginBottom: 16,
  fontSize: 20,
  fontWeight: 600,
  "& svg": {
    marginRight: 16,
  },
  "& > *": {
    fontSize: 20,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    marginRight: "auto",
  },
}));

const FORM_DATA = {
  carVin: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("carVin"),
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "carVin",
      label: "VIN код автомобіля",
      error: !!errors.carVin?.message,
      helperText: errors.carVin?.message,
    },
  }),
};

export function ForeignCarInfo() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const [externalCarInfo, setExternalCarInfo] = useState(null);
  const { loading, request } = useFetch();
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      carVin: state?.vin || "",
    },
    resolver: yupResolver(schema),
  });

  function onChange({ target: { value, name } }) {
    setValue(name, value.toUpperCase());
  }

  async function onSubmit(formData) {
    setExternalCarInfo(
      await request({
        fn: () => getExternalCarInfo(formData),
      })
    );
  }

  if (loading) return <LinearLoader />;

  return (
    <>
      {!externalCarInfo && (
        <SearchForm
          formData={FORM_DATA}
          onChange={onChange}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          title="Отримання інформації по VIN коду авто*"
        >
          <Typography sx={{ fontSize: 10 }}>
            * Пошук інформації про автомобіль відбувається на ресурсах
            Американських аукціонів
          </Typography>
        </SearchForm>
      )}
      {externalCarInfo && (
        <>
          <BackButton
            onClick={() => {
              setExternalCarInfo(null);
              reset();
            }}
          />

          <Typography sx={{ my: 2 }} align="center">
            Ось що нам вдалось знайти:
          </Typography>

          <Box>
            <Slider
              dots
              fade
              autoplay
              autoplaySpeed={3000}
              slidesToShow={1}
              slidesToScroll={1}
              infinite
              arrows={false}
            >
              {externalCarInfo.images.map((img) => (
                <img key={img} src={img} />
              ))}
            </Slider>
          </Box>

          <TableHeader variant="h6">
            <Box>
              <AttachMoney />
              Ціна лоту
            </Box>

            <Box sx={{ marginLeft: "auto", marginRight: 0 }}>
              {externalCarInfo.price}
            </Box>
          </TableHeader>

          <Table
            header={
              <TableHeader variant="h6">
                <CarCrash />
                Деталі стану
              </TableHeader>
            }
            data={externalCarInfo.conditions}
          />

          <Table
            header={
              <TableHeader variant="h6">
                <DirectionsCar />
                Деталі автомобіля
              </TableHeader>
            }
            data={externalCarInfo.details}
          />
        </>
      )}
    </>
  );
}
