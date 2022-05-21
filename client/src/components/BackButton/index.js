import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";

export function BackButton({ onClick }) {
  return (
    <Box>
      <IconButton onClick={onClick}>
        <KeyboardBackspace />
      </IconButton>
    </Box>
  );
}

BackButton.propTypes = {
  onClick: PropTypes.func,
};
