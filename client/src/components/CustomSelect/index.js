import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const CustomSelect = React.forwardRef(function CustomSelect(
  { watch, items, margin, ...otherProps },
  ref
) {
  return (
    <FormControl margin={margin} ref={ref} fullWidth>
      <InputLabel>{otherProps.label}</InputLabel>
      <Select {...otherProps} value={watch(otherProps.name)}>
        {items.map(({ value, title }) => (
          <MenuItem key={value} value={value}>
            {title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

CustomSelect.propTypes = {
  watch: PropTypes.func,
  items: PropTypes.array,
  margin: PropTypes.string,
};
