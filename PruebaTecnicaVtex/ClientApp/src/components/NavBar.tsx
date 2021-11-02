import React from "react";
import { NavLink } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import ButtonLoginNavBar from "./ButtonLoginNavBar";

const NavBar = () => {
  const login = useLogin();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink exact to="/" activeClassName="active" className="navbar-brand">
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
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    exact
                    to="/registrar"
                    activeClassName="active"
                  >
                    Register
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
