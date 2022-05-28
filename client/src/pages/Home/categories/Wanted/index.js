import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch, useValidation } from "../../../../hooks";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { getWanted } from "../../../../services";
import {
  BackButton,
  LinearLoader,
  SearchForm,
  Table,
} from "../../../../components";
import ExpandMore from "@mui/icons-material/ExpandMore";

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

export function Wanted() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const [wanted, setWanted] = useState(null);
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
    setWanted(await request({ fn: () => getWanted(formData) }));
  }

  if (loading) return <LinearLoader />;

  return (
    <>
      {!wanted && (
        <SearchForm
          formData={FORM_DATA}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          title="Отримання інформації по ПІБ"
        />
      )}
      {wanted && (
        <>
          <BackButton
            onClick={() => {
              setWanted(null);
              reset();
            }}
          />

          <Typography sx={{ my: 2 }} align="center">
            Кількість співпадінь по ПІБ: {wanted.count}
          </Typography>

          {wanted.items.map((item) => {
            const {
              full_name,
              birth_date,
              lost_date,
              sex,
              article_crim,
              lost_place,
              ovd,
              category,
              restraint,
              status_text,
            } = item;

            return (
              <Accordion
                defaultExpanded={wanted.items.length === 1}
                key={`${birth_date}/${lost_date}/${lost_place}`}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>
                    {full_name} {birth_date}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Table
                    data={[
                      ["ПІБ", full_name],
                      ["Дата народження", birth_date],
                      ["Дата зникнення", lost_date],
                      ["Стать", sex],
                      ["Стаття", article_crim],
                      ["Місце зникнення", lost_place],
                      ["Регіон (орган внутрішніх справ)", ovd],
                      ["Категорія", category],
                      ["Вирок", restraint],
                      ["Статус", status_text],
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
