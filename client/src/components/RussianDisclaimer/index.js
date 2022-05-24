import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import image from "../../assets/russian_warship.webp";

export function RussianDisclaimer({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: "center" }}>
        Компанія має власників з Російської Федерації
      </DialogTitle>
      <img src={image} />
    </Dialog>
  );
}

RussianDisclaimer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
