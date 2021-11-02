import React from "react";
import { RouteChildrenProps } from "react-router";
import { Route, RouteComponentProps, Redirect } from "react-router-dom";
import useLogin from "../hooks/useLogin";

export interface IRouteProps {
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?:
    | ((props: RouteChildrenProps<any>) => React.ReactNode)
    | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
}

const PrivateRoute = (props: IRouteProps) => {
  const login = useLogin();
  console.log(login);
  return login.loggedIn ? (
    <Route
      exact={props.exact}
      path={props.path}
      component={props.component}
    ></Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
