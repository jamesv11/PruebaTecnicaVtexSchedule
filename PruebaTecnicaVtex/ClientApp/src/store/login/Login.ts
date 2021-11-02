import axios from "axios";
import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ILogin {
  id?: string;
  usuarioIdentificacion?: string;
  nombre?: string;
  token?: string;
}
export interface LoginState {
  login: ILogin;
}

export interface ILoginInput {
  usuarioIdentificacion: string;
  password: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface IniciarSesionAction {
  type: "INICIAR_SESION";
  payload: ILogin;
}
export interface CerrarSesionAction {
  type: "CERRAR_SESION";
  payload: ILogin;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = IniciarSesionAction | CerrarSesionAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  iniciarSesion:
    (
      usuarioLoginInput: ILoginInput,
      responseCallBack: any
    ): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      const appState = getState();
      if (appState && appState.login) {
        axios
          .post("https://localhost:44308/api/Autenticacion", {
            identificacionUsuario: usuarioLoginInput.usuarioIdentificacion,
            password: usuarioLoginInput.password,
          })
          .then(function (response) {
            responseCallBack(response);
            if (response.status === 200) {
              dispatch({
                type: "INICIAR_SESION",
                payload: response.data,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  cerrarSesion: () => ({ type: "CERRAR_SESION" } as CerrarSesionAction),
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<LoginState> = (
  state: LoginState | undefined,
  incomingAction: Action
): LoginState => {
  if (state === undefined) {
    return {
      login: { id: "", usuarioIdentificacion: "", nombre: "", token: "" },
    };
  }
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "INICIAR_SESION":
      return { ...state, login: action.payload };
    case "CERRAR_SESION":
      return { ...state, login: action.payload };
    default:
      return state;
  }
};
