import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Report from "@mui/icons-material/Report";
import { Table } from "../Table";
import { format } from "../../utils";
import { RussianDisclaimer } from "../RussianDisclaimer";

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
  factors = [],
}) {
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  console.log(beneficiaries);
  const { vat, singletax, debt, wagedebt, audit, ruFounders } = factors.reduce(
    (acc, factor) =>
      Object.keys(acc).includes(factor.type)
        ? { ...acc, [factor.type]: factor }
        : acc,
    {
      vat: null,
      singletax: null,
      debt: null,
      wagedebt: null,
      audit: null,
      ruFounders: null,
    }
  );

  function handleChange(panel) {
    return (event, isExpanded) => setExpanded(isExpanded ? panel : false);
  }

  return (
    <Box sx={{ my: 2 }}>
      {ruFounders && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            svg: {
              width: "40px",
              height: "40px",
              cursor: "pointer",
            },
          }}
        >
          <Report color="error" onClick={() => setDialogOpen(true)} />
          <RussianDisclaimer
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        </Box>
      )}
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
              key={`${name}/${role}`}
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
                  ["Внесок учасника", amount && `${format(amount)}`],
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

      {vat && (
        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>ПДВ</AccordionSummary>
          <AccordionDetails>
            <Table
              data={[
                ["Текстова інформація щодо фактору", vat.text],
                ["Номер свідоцтва", vat.number],
                [
                  "Статус платника ПДВ",
                  vat.status === "active" ? "Активний" : "Не активний",
                ],
                ["Дата анулювання реєстрації", vat.dateCancellation],
                ["Причина анулювання реєстрації", vat.reasonCancellation],
                ["Підстава анулювання реєстраці", vat.agencyCancellation],
                ["Дата активациї свідоцтва", vat.dateStart],
                ["Дата оновлення у базі", vat.databaseDate],
              ]}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {singletax && (
        <Accordion
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Єдиний податок
          </AccordionSummary>
          <AccordionDetails>
            <Table
              data={[
                ["Текстова інформація щодо фактору", singletax.text],
                [
                  "Стан єдиного податку",
                  singletax.status === "active" ? "Активний" : "Не активний",
                ],
                ["Група єдиного податку", singletax.group],
                ["Ставка єдиного податку", `${singletax.rate}%`],
                [
                  "Дата обрання або переходу на єдиний податок",
                  singletax.dateStart,
                ],
                ["Дата втрати або ануляції єдиного податку", singletax.dateEnd],
              ]}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {debt && (
        <Accordion
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Податковий борг
          </AccordionSummary>
          <AccordionDetails>
            <Table
              data={[
                ["Текстова інформація щодо фактору", debt.text],
                ["Загальний податковий борг", format(debt.total)],
                ["Місцевий податковий борг", format(debt.local)],
                ["Державний податковий борг", format(debt.government)],
              ]}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {wagedebt && (
        <Accordion
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Борг по заробітній платі
          </AccordionSummary>
          <AccordionDetails>
            <Table
              data={[
                ["Текстова інформація щодо фактору", wagedebt.text],
                ["Сумма заборгованості", format(wagedebt.debt)],
                ["Кількість виконавчіх проваджень", wagedebt.penaltiesCount],
              ]}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {audit && (
        <Accordion
          expanded={expanded === "panel9"}
          onChange={handleChange("panel9")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Публічна інформація щодо проведення планових перевірок
          </AccordionSummary>
          <AccordionDetails>
            <Table data={[["Текстова інформація щодо фактору", audit.text]]} />
            {audit.items.map((item) => (
              <Table
                key={item.agency}
                data={[
                  ["Дата проведення перевірки", item.date],
                  ["Виконавчий орган", item.agency],
                ]}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}

CompanyDetail.propTypes = {
  registry: PropTypes.object,
  financialStatement: PropTypes.array,
  factors: PropTypes.array,
};
