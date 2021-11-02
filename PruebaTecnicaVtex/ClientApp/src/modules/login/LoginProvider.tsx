import React, { createContext, FC, useEffect, useState } from "react";
import { ILogin } from "../../store/login/Login";

interface IContextLoginState {
  user: ILogin;
  loggedIn: boolean;
  Login: () => void;
  Logout: () => void;
  saveUser: (user: any) => void;
}

const contextValues: IContextLoginState = {
  user: {},
  loggedIn: false,
  Login: () => {},
  Logout: () => {},
  saveUser: (user: any) => {},
};
export const LoginContext = createContext<IContextLoginState>(contextValues);
const LoginProvider: FC = ({ children }) => {
  const [user, setUser] = useState<ILogin>(
    JSON.parse(
      localStorage.getItem("user") ||
        '{"id":"","usuarioIdentificacion":"","nombre":"","token":""}'
    )
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(user.token !== "");
  const Login = () => setLoggedIn(true);
  const Logout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser({
      id: "",
      usuarioIdentificacion: "",
      nombre: "",
      token: "",
    });
  };
  const saveUser = (user: any) => setUser(user);

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <LoginContext.Provider value={{ user, loggedIn, saveUser, Login, Logout }}>
      {children}
    </LoginContext.Provider>
  );
};
export default LoginProvider;
