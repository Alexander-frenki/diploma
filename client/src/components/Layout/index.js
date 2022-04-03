import React from "react";
import PropTypes from "prop-types";
import { Header } from "..";

export function Layout({ children }) {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
