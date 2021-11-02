import { useContext } from "react";
import { LoginContext } from "../modules/login/LoginProvider";

const useLogin = () => {
  return useContext(LoginContext);
};

export default useLogin;
