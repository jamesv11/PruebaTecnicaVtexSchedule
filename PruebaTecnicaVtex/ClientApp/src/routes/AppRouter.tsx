import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../components/NavBar";
import Error404Page from "../pages/Error404Page";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SchedulePage from "../pages/SchedulePage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PublicRoute exact path="/login" component={LoginPage} />
        <Route path="/registrar" component={RegisterPage} />
        <PrivateRoute exact path="/agenda" component={SchedulePage} />
        <Route path="*" component={Error404Page} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
