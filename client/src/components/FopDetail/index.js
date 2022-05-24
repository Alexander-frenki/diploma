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
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          Види діяльності
        </AccordionSummary>
        <AccordionDetails>
          <Table data={[["Основний вид діяльності", primaryActivity]]} />
          <Table data={[["Інші види діяльності", additionallyActivities]]} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

FopDetail.propTypes = {
  registry: PropTypes.object,
};
