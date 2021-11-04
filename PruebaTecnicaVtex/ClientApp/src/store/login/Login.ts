import axios from "axios";
import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";

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

export interface IniciarSesionAction {
  type: "INICIAR_SESION";
  payload: ILogin;
}
export interface CerrarSesionAction {
  type: "CERRAR_SESION";
  payload: ILogin;
}

export type KnownAction = IniciarSesionAction | CerrarSesionAction;

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
