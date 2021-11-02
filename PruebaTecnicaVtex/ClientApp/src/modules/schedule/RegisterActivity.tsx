import React, { useEffect } from "react";
import { useHistory } from "react-router";
import CardLogin from "../../components/Card";
import Notificacion from "../../components/Notification";
import { useForm } from "../../hooks/useForm";
import useLogin from "../../hooks/useLogin";
import { IActividad } from "../../store/actividad/Actividad";
import * as Activity from "../../store/actividad/Actividad";

const initialForm: IActividad = {
  id: "",
  titulo: "",
  descripcion: "",
};

export interface IErrors {
  titulo?: string;
  descripcion?: string;
}

const RegisterActivity = () => {
  const login = useLogin();
  const history = useHistory();
  const validationsForm = (form: IActividad) => {
    let errors: IErrors = {};
    if (!form.titulo.trim()) {
      errors.titulo = "El campo identificacion es requerido. ";
    }
    if (!form.descripcion.trim()) {
      errors.descripcion = "El campo identificación es requerido. ";
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

  return (
    <>
      <CardLogin titulo="Registrar actividad">
        <form
          onSubmit={(e: any) =>
            handleSubmit(e, Activity.actionCreators.agregarActividad, {
              ...form,
              usuarioIdentificacion: login.user.usuarioIdentificacion,
              token: login.user.token,
            })
          }
        >
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Titulo
            </label>
            <input
              type="text"
              className="form-control"
              name="titulo"
              placeholder="Titulo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.titulo}
            />
            {errores.titulo && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                {errores.titulo}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Descripción
            </label>
            <input
              type="text"
              className="form-control"
              name="descripcion"
              placeholder="Descripción"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.descripcion}
            />
            {errores.descripcion && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                {errores.descripcion}
              </p>
            )}
          </div>

          <button
            style={{ width: "100%" }}
            type="submit"
            className="btn btn-success"
          >
            Guardar
          </button>
        </form>
      </CardLogin>

      {cargando ? (
        <>
          <Notificacion /> <p> Cargando....</p>
        </>
      ) : null}
    </>
  );
};

export default RegisterActivity;
