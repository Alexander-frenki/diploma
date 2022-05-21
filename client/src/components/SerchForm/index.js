import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export function SearchForm({
  formData,
  onChange,
  onSubmit,
  register,
  errors,
  title,
}) {
  return (
    <Grid
      item
      xs={12}
      md={8}
      lg={6}
      xl={4}
      sx={{
        height: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mx: "auto",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
        }}
        align="center"
      >
        {title}
      </Typography>

      <Box
        onChange={onChange}
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ mt: 1, width: 1 }}
      >
        {Object.values(formData).map((field) => {
          const { Component, componentProps } = field(register, errors);
          return <Component key={componentProps.id} {...componentProps} />;
        })}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Пошук
        </Button>
      </Box>
    </Grid>
  );
}

SearchForm.propTypes = {
  formData: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  register: PropTypes.func,
  errors: PropTypes.object,
  title: PropTypes.string,
};
