import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch, useValidation } from "../../../../hooks";
import { Button, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BackButton,
  CompanyDetail,
  LinearLoader,
  SearchForm,
  Table,
} from "../../../../components";
import { getCompanyInfo, searchCompany } from "../../../../services";
import { CATEGORIES_PATHS } from "../../../../constants/categories";

const FORM_DATA = {
  companyName: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("companyName"),
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "companyName",
      label: "Назва компанії",
      error: !!errors.companyName?.message,
      helperText: errors.companyName?.message,
    },
  }),
};

export function CompanyInfo() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const [companyListByName, setCompanyListByName] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const { loading, request } = useFetch();
  const { id: companyId } = useParams();
  const navigate = useNavigate();

  const isBackButtonShown = !!companyId || companyListByName;
  const isSearchFormShown = !companyId && !companyListByName;
  const isCompanyListShown = !companyId && !!companyListByName;
  const isCompanyInfoShown = !!companyId && companyInfo;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(formData) {
    setCompanyListByName(await request({ fn: () => searchCompany(formData) }));
  }

  useEffect(async () => {
    if (companyId) {
      setCompanyInfo(
        await request({ fn: () => getCompanyInfo({ companyCode: companyId }) })
      );
    }
  }, [companyId]);

  if (loading) return <LinearLoader />;

  return (
    <>
      {isBackButtonShown && (
        <BackButton
          onClick={
            companyId
              ? () => navigate(-1)
              : () => {
                  setCompanyListByName(null);
                  reset();
                }
          }
        />
      )}

      {isSearchFormShown && (
        <SearchForm
          formData={FORM_DATA}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          title="Пошук інформації по назві компанії"
        />
      )}

      {isCompanyListShown && (
        <>
          <Typography sx={{ my: 2 }} align="center">
            {companyListByName?.length
              ? "Ось що нам вдалось знайти:"
              : "Нажаль по вашому запиту інформацію не знайдено"}
          </Typography>

          <Table
            data={[
              ...companyListByName.map(({ code, value }) => [
                value,
                <Button
                  key={`${code}`}
                  sx={{ flexShrink: 0 }}
                  onClick={() =>
                    navigate(`${CATEGORIES_PATHS.companyInfo}/${code}`)
                  }
                >
                  Детальніше
                </Button>,
              ]),
            ]}
          />
        </>
      )}

      {isCompanyInfoShown && <CompanyDetail {...companyInfo} />}
    </>
  );
}
