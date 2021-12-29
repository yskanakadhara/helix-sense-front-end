/* eslint-disable no-undef */
// recommended by webpacker
import "core-js/stable";
import "regenerator-runtime/runtime";

// Import dependencies
import React from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./app";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.scss";
import "./index.less";

// mocking api
import "./app/util/axios/fakeApi/index";

// Import media
require.context("./app/images", true);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("react-container");

  render(
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>,
    container
  );
});

serviceWorker.unregister();
