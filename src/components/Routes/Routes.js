import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import BotWrapper from "../../Bot/BotWrapper";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/chatbot" component={BotWrapper} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default Routes;
