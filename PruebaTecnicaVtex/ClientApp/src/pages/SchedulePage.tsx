import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import MainSchedule from "../modules/schedule/MainSchedule";
import * as Activity from "../store/actividad/Actividad";

const SchedulePage = () => {
  const dispatch = useDispatch();
  const login = useLogin();
  const [response, setResponse] = useState<boolean>(false);
  const selector = useSelector((state: any) => state.actividad);

  const consultar = () => {
    dispatch(
      Activity.actionCreators.consultarActividad(
        {
          id: login.user.id,
          token: login.user.token,
        },
        async (response: any) => {
          const res = await response;
          if (res.status) {
            setResponse(true);
          }
        }
      )
    );
  };
  useEffect(() => consultar(), []);
  return (
    <>{response ? <MainSchedule todos={selector} /> : <h4>Cargando...</h4>}</>
  );
};

export default SchedulePage;
