import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import RegisterActivity from "./RegisterActivity";

const InputField = () => {
  const [modal, setModal] = useState<any>(false);

  const handleModal = () => setModal(!modal);
  return (
    <>
      <button onClick={handleModal} type="submit" className="input_submit">
        Crear nota
      </button>
      <Modal isOpen={modal} toggle={handleModal}>
        <ModalBody className="modal_app">
          <RegisterActivity />
        </ModalBody>
      </Modal>
    </>
  );
};

export default InputField;
