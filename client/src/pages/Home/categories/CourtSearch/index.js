import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch, useValidation } from "../../../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BackButton,
  CustomSelect,
  LinearLoader,
  SearchForm,
  Table,
} from "../../../../components";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { searchCourtDoc } from "../../../../services/api/court";
import ExpandMore from "@mui/icons-material/ExpandMore";

const FORM_DATA = {
  judgmentCode: (register, errors, watch) => ({
    Component: CustomSelect,
    items: [
      { value: 1, title: "Цивільне" },
      { value: 2, title: "Кримінальне" },
      { value: 3, title: "Господарське" },
      { value: 4, title: "Адміністративне" },
      { value: 5, title: "Адмінправопорушення" },
    ],
    componentProps: {
      ...register("judgmentCode"),
      fullWidth: true,
      margin: "normal",
      id: "judgmentCode",
      label: "Форма судочинства",
      error: !!errors.judgmentCode?.message,
      watch,
    },
  }),
  justiceCode: (register, errors, watch) => ({
    Component: CustomSelect,
    items: [
      { value: 1, title: "Вирок" },
      { value: 2, title: "Постанова" },
      { value: 3, title: "Рішення" },
      { value: 4, title: "Судовий наказ" },
      { value: 5, title: "Ухвала" },
      { value: 6, title: "Окрема ухвала" },
      { value: 10, title: "Окрема думка" },
    ],
    componentProps: {
      ...register("justiceCode"),
      fullWidth: true,
      margin: "normal",
      id: "justiceCode",
      label: "Тип процесуального документа",
      error: !!errors.justiceCode?.message,
      watch,
    },
  }),
  courtCode: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("courtCode"),
      margin: "normal",
      fullWidth: true,
      id: "courtCode",
      label: "Код суду",
      error: !!errors.courtCode?.message,
      helperText: errors.courtCode?.message,
    },
  }),
  companyСode: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("companyСode"),
      margin: "normal",
      fullWidth: true,
      id: "companyСode",
      label: "Код ЄДРПОУ компанії",
      error: !!errors.companyСode?.message,
      helperText: errors.companyСode?.message,
    },
  }),
  stage: (register, errors, watch) => ({
    Component: CustomSelect,
    items: [
      { value: "first", title: "Перша" },
      { value: "appeal", title: "Апеляційна" },
      { value: "cassation", title: "Касаційна" },
    ],
    componentProps: {
      ...register("stage"),
      margin: "normal",
      fullWidth: true,
      id: "stage",
      label: "Тип інстанції",
      error: !!errors.stage?.message,
      watch,
    },
  }),
  number: (register, errors) => ({
    Component: TextField,
    componentProps: {
      ...register("number"),
      margin: "normal",
      fullWidth: true,
      id: "number",
      label: "Номер справи",
      error: !!errors.number?.message,
      helperText: errors.number?.message,
    },
  }),
};

const courtStages = {
  first: "Перша",
  appeal: "Апеляційна",
  cassation: "Касаційна",
};

export default function CourtSearch() {
  const schema = useValidation(Object.keys(FORM_DATA));
  const [expanded, setExpanded] = useState(false);
  const [docList, setDocList] = useState(null);
  const { loading, request } = useFetch();
  const offset = useRef(0);

  useEffect(() => console.log(docList), [docList]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      judgmentCode: "",
      justiceCode: "",
      stage: "",
    },
  });

  async function onSubmit(formData) {
    setDocList(
      await request({
        fn: () => searchCourtDoc({ ...formData, offset: offset.current }),
      })
    );
    offset.current = offset.current + 20;
  }

  function handleChange(panel) {
    return (event, isExpanded) => setExpanded(isExpanded ? panel : false);
  }

  async function onLoadMore() {
    const formData = getValues();
    const loadedData = await searchCourtDoc({
      ...formData,
      offset: offset.current,
    });

    setDocList([...docList, ...loadedData.items]);
  }

  if (loading) return <LinearLoader />;

  return (
    <>
      {!docList && (
        <SearchForm
          formData={FORM_DATA}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          watch={watch}
          errors={errors}
          title="Пошук судових рішень"
        />
      )}
      {docList && (
        <>
          <BackButton
            onClick={() => {
              setDocList(null);
              reset();
            }}
          />

          <Typography sx={{ my: 2 }} align="center">
            Кількість знайдених рішень: {docList.count}
          </Typography>

          {!!docList.items.length &&
            docList.items.map(
              ({
                adjudication_date,
                category_name,
                cause_number,
                court_name,
                date_publ,
                judge,
                judgment_name,
                justice_name,
                link,
                receipt_date,
                doc_id,
                stage,
              }) => (
                <Accordion
                  key={doc_id}
                  expanded={expanded === doc_id}
                  onChange={handleChange(doc_id)}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    Номер справи: {cause_number} / Дата набрання законної сили:{" "}
                    {adjudication_date.split(" ")[0]}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Table
                      data={[
                        ["Назва судової установи", court_name],
                        ["Форма судочинства", judgment_name],
                        ["Тип процесуального документа", justice_name],
                        ["Категорія справи", category_name],
                        ["Тип інстанції", courtStages[stage]],
                        ["Дата публікації", date_publ.split(" ")[0]],
                        ["Дата реєстрації", receipt_date.split(" ")[0]],
                        ["Суддя", judge],
                        [
                          "Посилання на рішення",
                          <Link
                            key={link}
                            href={link}
                            target="_blank"
                            rel="noopener"
                          >
                            Посилання
                          </Link>,
                        ],
                      ]}
                    />
                  </AccordionDetails>
                </Accordion>
              )
            )}

          {offset.current + 20 < docList.count && (
            <Box
              sx={{
                my: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button onClick={onLoadMore}>Показати більше</Button>
            </Box>
          )}
        </>
      )}
    </>
  );
}
