import { RespuestaApi } from "../interfaces/RespuestaApi";
import { httpService } from "./httpService";

export class loginService {
  public static async login(obj: any): Promise<RespuestaApi> {
    return (await httpService.post("api/Autenticacion", obj)).data;
  }
}

/*{
            identificacionUsuario: usuarioIdentificacion,
            password: password,
          })
          .then(function (res) {
            dispatch({
              type: "INICIAR_SESION",
              payload: res.data,
            });
          })
          .catch(function (error) {
            console.log(error);
          }); */
