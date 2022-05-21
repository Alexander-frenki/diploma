import React from "react";
import PropTypes from "prop-types";
import { Box, styled, Typography } from "@mui/material";

const TableItem = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.borderColor}`,
  paddingBottom: theme.spacing(0.5),
  paddingTop: theme.spacing(0.5),
  "& span": {
    textAlign: "right",
  },
}));

export function Table({ sx, header, data }) {
  return (
    <Box sx={sx}>
      {header && header}
      {data.map(([title, detail]) => (
        <TableItem key={title}>
          {title} <span>{detail}</span>
        </TableItem>
      ))}
    </Box>
  );
}

Table.propTypes = {
  sx: PropTypes.object,
  header: PropTypes.node,
  data: PropTypes.arrayOf(PropTypes.array),
};
