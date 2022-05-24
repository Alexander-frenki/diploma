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
import { Table } from "../Table";
import { format } from "../../utils";

export function FopDetail({
  registry: {
    code,
    location,
    status,
    email,
    phones,
    birthDate,
    fullName,
    primaryActivity,
    additionallyActivities,
    registrationDate,
    registrationNumber,
  },
  factors = [],
}) {
  const [expanded, setExpanded] = useState(false);
  const { vat, singletax, debt } = factors.reduce(
    (acc, factor) => {
      const { type } = factor;
      return Object.keys(acc).includes(type) ? { ...acc, [type]: factor } : acc;
    },
    { vat: null, singletax: null, debt: null }
  );

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
              ["Повне ім'я", fullName],
              ["Код платника податків (ІПН)", code],
              ["Дата народження", birthDate],
              ["Адреса", location],
              ["Статус реєстрації", status],
              ["Електронна пошта", email],
              ["Дата реєстрації", registrationDate],
              ["Телефони", phones],
              ["Номер реєстрації", registrationNumber],
            ]}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          Види діяльності
        </AccordionSummary>
        <AccordionDetails>
          <Table data={[["Основний вид діяльності", primaryActivity]]} />
          <Table data={[["Інші види діяльності", additionallyActivities]]} />
        </AccordionDetails>
      </Accordion>

      {vat && (
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
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
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
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
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
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
    </Box>
  );
}

FopDetail.propTypes = {
  registry: PropTypes.object,
  factors: PropTypes.array,
};
