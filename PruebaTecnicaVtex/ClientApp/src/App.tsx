import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";

import "./custom.css";
import LoginProvider from "./modules/login/LoginProvider";
import AppRouter from "./routes/AppRouter";

const App = () => {
  const selectorUser = useSelector((state: any) => state.login);

  console.log(selectorUser);
  return (
    <LoginProvider>
      <AppRouter />
    </LoginProvider>
  );
};

export default App;
