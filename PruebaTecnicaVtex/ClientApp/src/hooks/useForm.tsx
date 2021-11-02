import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const useForm = (initialForm: any, validateForm: any) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const [errores, setErrores] = useState<any>({});
  const [cargando, setCargando] = useState<boolean>(false);
  const [respuesta, setRespuesta] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setErrores(validateForm(form));
  };

  const handleToast = (response: boolean) => {
    response
      ? toast.success("Correcto!")
      : toast.warning("Ups! estas olvidando algo...");
  };
  const handleSubmit = (
    e: React.ChangeEvent<HTMLInputElement>,
    action: any,
    data: any
  ) => {
    e.preventDefault();
    setCargando(true);
    setErrores(validateForm(form));
    if (Object.keys(errores).length === 0) {
      try {
        dispatch(
          action(data, async (respuesta: any) => {
            const res = await respuesta;
            setCargando(false);
            setRespuesta(res);
            handleToast(res.status === 200);
            console.log(res);
          })
        );
      } catch (error) {}
    } else {
    }
  };

  return {
    form,
    errores,
    cargando,
    respuesta,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
