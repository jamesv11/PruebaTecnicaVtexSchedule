import React from "react";
import useLogin from "../hooks/useLogin";

const ButtonLoginNavBar = () => {
  const login = useLogin();
  return (
    <form className="d-flex">
      <button
        onClick={login.Logout}
        type="button"
        className="btn btn-outline-primary"
      >
        Cerrar sesion
      </button>
    </form>
  );
};

export default ButtonLoginNavBar;
