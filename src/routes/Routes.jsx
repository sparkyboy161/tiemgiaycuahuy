import React from "react";

import { Switch, Route } from "react-router-dom";

import Customer from "../pages/Customer";
import Dashboard from "../pages/Dashboard";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/customer">
        <Customer />
      </Route>
    </Switch>
  );
}

export default Routes;
