import React, { useState } from "react";
import { useFetch, useValidation } from "../../../../hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Report from "@mui/icons-material/Report";
import {
  BackButton,
  LinearLoader,
  SearchForm,
  Table,
} from "../../../../components";
import { getCarFines } from "../../../../services";
import { format } from "../../../../utils";

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
    },
  }),
};

export default function CarFine() {
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
    setCarFines(await request({ fn: () => getCarFines(formData) }));
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
            {carFines?.length
              ? "Ось що нам вдалось знайти:"
              : "Штрафів не знайдено"}
          </Typography>

          {carFines.map((fine) => {
            const {
              fineStatus,
              docId,
              department,
              fab,
              kupap,
              region,
              district,
              street,
              send,
              roadKm,
              consider,
              decision,
              penalty,
              sumPenalty,
              paidPenalty,
              brand,
              pdd,
              dperpetration,
              dpaid,
              nprotocol,
              sprotocol,
              status,
              mark,
            } = fine;
            const statusIcon = (sx) =>
              fineStatus === "paid" ? (
                <CheckCircle sx={sx} color="success" />
              ) : (
                <Report sx={sx} color="error" />
              );
            return (
              <Accordion
                key={docId}
                defaultExpanded={carFines.length === 1}
                sx={{ mb: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  {statusIcon({ mr: 1 })}
                  <Typography>
                    {brand} - {format(sumPenalty)}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Table
                    data={[
                      ["Ідентифікатор штрафу", docId],
                      ["Департамент поліції", department],
                      ["Фабула правопорушення", fab],
                      ["Порушена стаття КУПАП", kupap],
                      ["Область", region],
                      ["Район", district],
                      ["Вулиця", street],
                      ["Куди направлений протокол для розгляду", send],
                      ["Кілометр дороги, де створено правопорушення", roadKm],
                      ["Хто розглянув", consider],
                      ["Рішення", decision],
                      ["Вид покарання", penalty],
                      ["Сума штрафу", format(sumPenalty)],
                      ["Сплачена сума штрафу", format(paidPenalty)],
                      ["Порушена стаття правил дорожнього руху", pdd],
                      ["Дата вчинення правопорушення", dperpetration],
                      ["Дата сплати", dpaid],
                      ["Номер протоколу", nprotocol],
                      ["Серія протоколу", sprotocol],
                      ["Статус", status],
                      ["Примітки до протоколу", mark],
                    ]}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </>
      )}
    </>
  );
}
