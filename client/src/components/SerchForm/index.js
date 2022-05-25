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
  watch,
  title,
  buttonTitle,
  buttonDisabled,
  children,
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
          const { Component, componentProps, items } = field(
            register,
            errors,
            watch
          );
          return (
            <Component
              key={componentProps.id}
              {...componentProps}
              items={items}
            />
          );
        })}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          disabled={buttonDisabled}
        >
          {buttonTitle ? buttonTitle : "Пошук"}
        </Button>

        {children}
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
  watch: PropTypes.func,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  children: PropTypes.node,
};
