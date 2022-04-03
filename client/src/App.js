import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { DebugObserver } from "./recoil";
import { RouterSwitch } from "./router";
import CssBaseline from "@mui/material/CssBaseline";
import { Loader, ThemeManager } from "./components";
import "./styles/index.scss";

function App() {
  return (
    <ThemeManager>
      <RecoilRoot>
        <DebugObserver />
        <Loader />
        <BrowserRouter>
          <RouterSwitch />
        </BrowserRouter>
        <CssBaseline enableColorScheme />
      </RecoilRoot>
    </ThemeManager>
  );
}

export default App;
