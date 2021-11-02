import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Notificacion = (props: any) => {
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Notificacion;
