import axios from "axios";
import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";

export interface IUser {
  nombre: string;
  usuarioIdentificacion: string;
  password: string;
}
export interface IUserState {
  user: IUser;
}

export interface UserAction {
  type: "REGISTRAR_USUARIO";
  payload: IUser;
}

export type KnownAction = UserAction;

export const actionCreators = {
  registrarUsuario:
    (user: IUser, responseCallBack: any): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      const appState = getState();
      if (appState && appState.login) {
        axios
          .post("https://localhost:44308/api/Usuario", {
            nombre: user.nombre,
            identificacionUsuario: user.usuarioIdentificacion,
            password: user.password,
          })
          .then(function (response) {
            responseCallBack(response);
            if (response.status === 200) {
              dispatch({
                type: "REGISTRAR_USUARIO",
                payload: { ...response.data, password: "" },
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
};

export const reducer: Reducer<IUserState> = (
  state: IUserState | undefined,
  incomingAction: Action
): IUserState => {
  if (state === undefined) {
    return {
      user: { nombre: "", usuarioIdentificacion: "", password: "" },
    };
  }
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REGISTRAR_USUARIO":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
