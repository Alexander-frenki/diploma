import React, { useState } from "react";
import { useFetch, useValidation } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Box,
  TextField,
  Typography,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddBox from "@mui/icons-material/AddBox";
import Pageview from "@mui/icons-material/Pageview";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { getCarInfo, updateUserCars } from "../../../../services/api/car";
import {
  BackButton,
  LinearLoader,
  SearchForm,
  Table,
} from "../../../../components";
import { CATEGORIES_PATHS } from "../../../../constants/categories";

const CtaButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  "> *": {
    width: "100%",
  },
}));

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

export function CarInfo() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const [carsByNumber, setCarsByNumber] = useState(null);
  const { cars } = useRecoilValue(userState);
  const { loading, request } = useFetch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(formData) {
    setCarsByNumber(await request({ fn: () => getCarInfo(formData) }));
  }

  function onChange({ target: { value, name } }) {
    setValue(name, value.toUpperCase());
  }

  async function onAddCar(carNumber) {
    await request({
      fn: () => updateUserCars([...cars, carNumber]),
      showSuccessAlert: true,
      shouldUserUpdate: true,
    });
  }

  if (loading) return <LinearLoader />;

  return (
    <>
      {!carsByNumber && (
        <SearchForm
          formData={FORM_DATA}
          onChange={onChange}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          title="Отримання інформації по номеру авто"
        />
      )}
      {carsByNumber && (
        <>
          <BackButton
            onClick={() => {
              setCarsByNumber(null);
              reset();
            }}
          />

          <Typography sx={{ my: 2 }} align="center">
            Ось що нам вдалось знайти:
          </Typography>

          {carsByNumber.map((car, index) => {
            const {
              number,
              brand,
              model,
              color,
              makeYear,
              lastDate,
              kind,
              fuel,
              vin,
            } = car;

            const { carNumber } = getValues();
            return (
              <Accordion
                defaultExpanded={carsByNumber.length === 1}
                key={`${brand}/${model}/${lastDate}`}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>
                    {brand} {model}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Table
                    data={[
                      ["Номер", number],
                      ["Колір", color],
                      ["Рік випуску", makeYear],
                      ["Дата реєстрації", lastDate.split(" ")[0]],
                      ["Тип", kind],
                      ["Пальне", fuel],
                      ["VIN", vin],
                    ]}
                  />
                  {index === 0 && !cars.includes(carNumber) && (
                    <CtaButtonContainer>
                      <Button
                        variant="contained"
                        startIcon={<AddBox />}
                        onClick={() => onAddCar(carNumber)}
                      >
                        Додати в мій автопарк
                      </Button>
                    </CtaButtonContainer>
                  )}
                  {vin && (
                    <CtaButtonContainer>
                      <Button
                        onClick={() =>
                          navigate(CATEGORIES_PATHS.foreignCarInfo, {
                            state: { vin },
                          })
                        }
                        variant="contained"
                        startIcon={<Pageview />}
                      >
                        Пошук на іноземних площадках
                      </Button>
                    </CtaButtonContainer>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </>
      )}
    </>
  );
}
