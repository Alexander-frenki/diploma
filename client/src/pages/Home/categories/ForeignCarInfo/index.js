import React, { useState } from "react";
import { useFetch, useValidation } from "../../../../hooks";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { getExternalCarInfo } from "../../../../services/api/car";
import { SearchForm } from "../../../../components/SerchForm";
import { BackButton, LinearLoader, Table } from "../../../../components";
import ExpandMore from "@mui/icons-material/ExpandMore";

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

export default function ForeignCarInfo() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const [externalCarInfo, setExternalCarInfo] = useState(null);
  const [expanded, setExpanded] = useState(false);
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

  function handleChange(panel) {
    return (event, isExpanded) => setExpanded(isExpanded ? panel : false);
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

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              Деталі стану
            </AccordionSummary>
            <AccordionDetails>
              <Table
                data={[
                  ["Ціна лоту", externalCarInfo.price],
                  ...externalCarInfo.conditions,
                ]}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              Деталі автомобіля
            </AccordionSummary>
            <AccordionDetails>
              <Table data={externalCarInfo.details} />
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </>
  );
}
