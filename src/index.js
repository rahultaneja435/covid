import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import LoginButton from "./LoginButton";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  // <Auth0Provider
  //   domain="dev-o2rhjgab.us.auth0.com"
  //   clientId="vdyAPbQaaJU64nLlreRNja8cO0yOJ0sV"
  //   redirectUri={window.location.origin}
  // >
    <App />,
  document.getElementById("root")
);
