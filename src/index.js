import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Authentication from "./Authentication";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
  <Authentication />
  </React.StrictMode>,
  document.getElementById("root")
);