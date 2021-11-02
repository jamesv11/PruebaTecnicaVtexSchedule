import axios from "axios";
import { RespuestaApi } from "../interfaces/RespuestaApi";

export class httpService {
  static baseUrl: string = "https://localhost:44308/";

  public static post(path: string, obj: any): Promise<any> {
    return axios.post(this.baseUrl + path, obj);
  }
}
