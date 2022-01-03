import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp } from "../pages";

const ROUTES = [
  {
    pathname: "/",
    Component: Home,
  },
  {
    pathname: "/signin",
    Component: SignIn,
  },
  {
    pathname: "/signup",
    Component: SignUp,
  },
];

export function RouterSwitch() {
  return (
    <Routes>
      {ROUTES.map(({ pathname, Component }) => (
        <Route key={pathname} path={pathname} element={<Component />} />
      ))}
    </Routes>
  );
}
