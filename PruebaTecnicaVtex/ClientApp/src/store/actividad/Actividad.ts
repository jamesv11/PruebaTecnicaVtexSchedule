import axios from "axios";
import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import { ILogin } from "../login/Login";
import {
  RespuestaApi,
  RespuestaApiObject,
} from "../../interfaces/RespuestaApi";

export interface IActividad {
  id: string;
  titulo: string;
  descripcion: string;
  estado?: string;
  usuarioIdentificacion?: string;
  token?: string;
}
export interface ActividadState {
  actividad: IActividad[];
}

export interface AgregarActividadAction {
  type: "AGREGAR_ACTIVIDAD";
  payload: RespuestaApiObject;
}
export interface ActualizarActividadAction {
  type: "ACTUALIZAR_ACTIVIDAD";
  payload: RespuestaApiObject;
}
export interface ConsultarActividadAction {
  type: "CONSULTAR_ACTIVIDAD";
  payload: RespuestaApi;
}
export interface EliminarActividadAction {
  type: "ELIMINAR_ACTIVIDAD";
  payload: RespuestaApiObject;
}

export type KnownAction =
  | AgregarActividadAction
  | ActualizarActividadAction
  | ConsultarActividadAction
  | EliminarActividadAction;

export const actionCreators = {
  agregarActividad:
    (
      activity: IActividad,
      responseCallBack: any
    ): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      const appState = getState();
      if (appState && appState.login) {
        axios.defaults.headers.common = {
          Authorization: `Bearer ${activity.token}`,
        };
        axios
          .post("https://localhost:44308/api/Actividad", {
            titulo: activity.titulo,
            descripcion: activity.descripcion,
            identificacionUsuario: activity.usuarioIdentificacion,
          })
          .then(function (response) {
            responseCallBack(response);
            if (response.status === 200) {
              dispatch({
                type: "AGREGAR_ACTIVIDAD",
                payload: response.data,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  consultarActividad:
    (userLogin: ILogin, responseCallBack: any): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      const appState = getState();
      if (appState && appState.login) {
        axios.defaults.headers.common = {
          Authorization: `Bearer ${userLogin.token}`,
        };
        axios
          .get(`https://localhost:44308/api/Actividad/${userLogin.id}`)
          .then(function (response) {
            responseCallBack(response);
            if (response.status === 200) {
              dispatch({
                type: "CONSULTAR_ACTIVIDAD",
                payload: response.data,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  eliminarActividad:
    (
      activity: IActividad,
      responseCallBack: any
    ): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      const appState = getState();
      if (appState && appState.login) {
        axios.defaults.headers.common = {
          Authorization: `Bearer ${activity.token}`,
        };
        axios
          .delete(`https://localhost:44308/api/Actividad/${activity.id}`)
          .then(function (response) {
            responseCallBack(response);
            if (response.status === 200) {
              dispatch({
                type: "ELIMINAR_ACTIVIDAD",
                payload: response.data,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  actualizarActividad:
    (
      activity: IActividad,
      responseCallBack: any
    ): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      const appState = getState();
      if (appState && appState.login) {
        axios.defaults.headers.common = {
          Authorization: `Bearer ${activity.token}`,
        };
        axios
          .patch(
            `https://localhost:44308/api/Actividad/${activity.id}/${activity.estado}`
          )
          .then(function (response) {
            responseCallBack(response);
            if (response.status === 200) {
              dispatch({
                type: "ACTUALIZAR_ACTIVIDAD",
                payload: response.data,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
};

export const reducer: Reducer<ActividadState> = (
  state: ActividadState | undefined,
  incomingAction: Action
): ActividadState => {
  if (state === undefined) {
    return { actividad: [] };
  }
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "AGREGAR_ACTIVIDAD":
      return {
        ...state,
        actividad: [...state.actividad, action.payload.datos || {}],
      };
    case "ACTUALIZAR_ACTIVIDAD":
      const actualizarActividad: IActividad[] = state.actividad.map(
        (actividad) => {
          if (actividad.id === action.payload.datos.id) {
            actividad = action.payload.datos;
          }
          return actividad;
        }
      );
      return { ...state, actividad: actualizarActividad };
    case "CONSULTAR_ACTIVIDAD":
      return { ...state, actividad: action.payload.datos || [] };
    case "ELIMINAR_ACTIVIDAD":
      const eliminarActividad: IActividad[] = state.actividad.filter(
        (actividad) => actividad.id !== action.payload.datos.id
      );
      return { ...state, actividad: eliminarActividad };
    default:
      return state;
  }
};
