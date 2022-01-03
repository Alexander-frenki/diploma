import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";

export function Button({ text, onClick }) {
  return (
    <button className={styles.root} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
