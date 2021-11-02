import axios from "axios";
import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import { ILogin } from "../login/Login";
import {
  RespuestaApi,
  RespuestaApiObject,
} from "../../interfaces/RespuestaApi";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

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

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction =
  | AgregarActividadAction
  | ActualizarActividadAction
  | ConsultarActividadAction
  | EliminarActividadAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

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

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

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
