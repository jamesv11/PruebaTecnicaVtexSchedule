import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import CardLogin from "../../components/Card";
import Notificacion from "../../components/Notification";
import { useForm } from "../../hooks/useForm";
import useLogin from "../../hooks/useLogin";
import * as Login from "../../store/login/Login";
import { ILoginInput } from "../../store/login/Login";

export interface IActividado {
  actividado: boolean;
  titulo: string;
  mensaje: string;
}

const initialForm: ILoginInput = {
  usuarioIdentificacion: "",
  password: "",
};

export interface IErrors {
  usuarioIdentificacion?: string;
  contraseña?: string;
}

const LoginForm = () => {
  const login = useLogin();
  const history = useHistory();
  const validationsForm = (form: ILoginInput) => {
    let regexName: any = /^[0-9]+$/;
    let errors: IErrors = {};
    if (!form.usuarioIdentificacion.trim()) {
      errors.usuarioIdentificacion = "El campo identificacion es requerido. ";
    } else if (!regexName.test(form.usuarioIdentificacion.trim())) {
      errors.usuarioIdentificacion =
        "El campo identificacion solo acepta numeros.";
    }
    if (!form.password.trim()) {
      errors.contraseña = "El campo contraseña es requerido. ";
    }
    return errors;
  };

  const {
    form,
    errores,
    cargando,
    respuesta,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  useEffect(() => {
    if (respuesta.status === 200) {
      login.Login();
      login.saveUser(respuesta.data);
      history.push("/agenda");
    }
  }, [respuesta]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
      className="App"
    >
      <div>
        <h1 style={{ fontSize: "4rem", color: "#23A4CA" }}>
          Tu <span style={{ color: "#30C1EC" }}>agenda </span>
        </h1>
        <CardLogin titulo="Iniciar sesion">
          <form
            onSubmit={(e: any) =>
              handleSubmit(e, Login.actionCreators.iniciarSesion, form)
            }
          >
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Identificación
              </label>
              <input
                type="text"
                className="form-control"
                name="usuarioIdentificacion"
                placeholder="Identificación"
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.name}
              />
              {errores.usuarioIdentificacion && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {errores.usuarioIdentificacion}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="contraseña"
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.name}
              />
              {errores.contraseña && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {errores.contraseña}
                </p>
              )}
            </div>

            <button
              style={{ width: "100%" }}
              type="submit"
              className="btn btn-success"
            >
              Logearse
            </button>
          </form>
        </CardLogin>
      </div>
      <Notificacion />
      {cargando ? <p>Cargando....</p> : null}
    </div>
  );
};

export default LoginForm;
