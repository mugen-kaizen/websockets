import "@radix-ui/themes/styles.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Theme accentColor="violet" grayColor="slate" radius="large" scaling="95%">
      <App />
    </Theme>
  </React.StrictMode>,
);
