import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

export function Input({
  value,
  name,
  type,
  focused,
  touched,
  placeholder,
  onChange,
  onFocus,
  onBlur,
}) {
  return (
    <div
      className={classnames(styles.root, {
        [styles.focus]: focused,
        [styles.empty]: !value.length,
        [styles.touched]: touched,
      })}
    >
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
      />
      <label>{placeholder}</label>
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  focused: PropTypes.bool,
  touched: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};
