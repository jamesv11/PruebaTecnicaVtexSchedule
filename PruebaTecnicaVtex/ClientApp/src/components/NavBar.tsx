import React from "react";
import { NavLink } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import ButtonLoginNavBar from "./ButtonLoginNavBar";

const NavBar = () => {
  const login = useLogin();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg p-3 mb-2 bg-body rounded">
      <div className="container-fluid">
        <NavLink
          exact
          to="/"
          activeClassName="active "
          className="navbar-brand nav_item_app"
        >
          Tu <span style={{ color: "#30C1EC" }}>agenda </span>
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav  ">
            {!login.loggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    exact
                    to="/login"
                    activeClassName="active"
                  >
                    Iniciar sesión
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    exact
                    to="/registrar"
                    activeClassName="active"
                  >
                    Registrarse
                  </NavLink>
                </li>
              </>
            )}
            {login.loggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    exact
                    to="/agenda"
                    activeClassName="active"
                  >
                    Agendar
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        {login.loggedIn && <ButtonLoginNavBar />}
      </div>
    </nav>
  );
};

export default NavBar;
