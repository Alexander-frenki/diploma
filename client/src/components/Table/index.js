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
  fontSize: 14,
  "& span": {
    marginLeft: theme.spacing(1),
    textAlign: "right",
    whiteSpace: "break-spaces",
  },
}));

function renderItem(title, detail) {
  if (typeof detail === "string" || typeof detail === "number") {
    return (
      <TableItem key={title}>
        {title} <span>{detail}</span>
      </TableItem>
    );
  }

  if (Array.isArray(detail)) {
    return renderItem(title, detail.join("\r\n"));
  }

  if (React.isValidElement(detail)) {
    return (
      <TableItem key={title}>
        {title} {detail}
      </TableItem>
    );
  }
}

export function Table({ sx, header, data }) {
  return (
    <Box sx={sx}>
      {header && header}
      {data.map(([title, detail]) => {
        return renderItem(title, detail);
      })}
    </Box>
  );
}

Table.propTypes = {
  sx: PropTypes.object,
  header: PropTypes.node,
  data: PropTypes.arrayOf(PropTypes.array),
};
