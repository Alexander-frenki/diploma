import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Table } from "../Table";
import { format } from "../../utils";

export function CompanyDetail({
  registry: {
    fullName,
    shortName,
    code,
    location,
    ceoName,
    status,
    email,
    registrationDate,
    capital,
    heads,
    activities,
    primaryActivity,
    phones,
    beneficiaries,
  },
  financialStatement,
}) {
  const [expanded, setExpanded] = React.useState(false);

  function handleChange(panel) {
    return (event, isExpanded) => setExpanded(isExpanded ? panel : false);
  }

  return (
    <Box sx={{ my: 2 }}>
      <Typography sx={{ mb: 2 }} align="center">
        {fullName}
      </Typography>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          Основна інформація
        </AccordionSummary>
        <AccordionDetails>
          <Table
            data={[
              ["Повна назва компанії", fullName],
              ["Скорочена назва компанії", shortName],
              ["Код ЄДРПОУ", code],
              ["Юридична адреса компанії", location],
              ["ПІБ керівника", ceoName],
              ["Статус реєстрації", status],
              ["Електронна пошта", email],
              ["Дата реєстрації", registrationDate],
              ["Статутний капітал", format(capital)],
              ["Телефони", phones],
            ]}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          Керівники
        </AccordionSummary>
        <AccordionDetails>
          {heads.map(({ name, role, restriction }) => (
            <Table
              key={name}
              data={[
                ["ПІБ керівника", name],
                ["Роль учасника", role],
                ["Обмеження керівника", restriction],
              ]}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          Види діяльності
        </AccordionSummary>
        <AccordionDetails>
          <Table data={[["Основний вид діяльності", primaryActivity]]} />
          <Table
            data={[
              activities
                .filter(({ isPrimary }) => !isPrimary)
                .reduce(
                  ([title, values], { code, name }) => [
                    title,
                    [...values, `${code} ${name}`],
                  ],
                  ["Інші види діяльності", []]
                ),
            ]}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          Бенефіціари компанії
        </AccordionSummary>
        <AccordionDetails>
          {beneficiaries.map(
            ({ amount, amountPercent, location, name, role }) => (
              <Table
                key={name}
                data={[
                  ["ПІБ учасника", name],
                  ["Роль учасника", role],
                  ["Внесок учасника", `${format(amount)}`],
                  ["Доля учасника", `${amountPercent}%`],
                  ["Юридична адреса компанії", location],
                ]}
              />
            )
          )}
        </AccordionDetails>
      </Accordion>

      {financialStatement && (
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Фінансовий звіт
          </AccordionSummary>
          <AccordionDetails>
            {financialStatement.map(
              ({
                year,
                revenue,
                profit,
                nonCurrentAssets,
                liability,
                expenses,
                currentAssets,
                balance,
              }) => (
                <Table
                  key={name}
                  data={[
                    ["Звітний рік", year],
                    ["Доходи", format(revenue)],
                    ["Витрати", format(expenses)],
                    ["Чистий прибуток", format(profit)],
                    ["Необоротні активи", format(nonCurrentAssets)],
                    ["Оборотні активи", format(currentAssets)],
                    ["Зобов'язання", format(liability)],
                    ["Активи", format(balance)],
                  ]}
                />
              )
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}

CompanyDetail.propTypes = {
  registry: PropTypes.object,
  financialStatement: PropTypes.array,
};
