import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import BotWrapper from "../../Bot/BotWrapper";
import Signup from "../Login/Signup";
import { PrivateRoute } from "../PrivateRoute";
import { AuthProvider } from "../../contexts/Auth"


function Routes() {
  return (
    <Router>
        <AuthProvider>
            <Switch>
            <Route path="/login" component={Login} exact />
            <PrivateRoute path="/chatbot" component={BotWrapper} />
            <Route path="/signup" component={Signup} />
            <Route component={Error} />
      </Switch>

        </AuthProvider>
     
    </Router>
  );
}

export default Routes;
