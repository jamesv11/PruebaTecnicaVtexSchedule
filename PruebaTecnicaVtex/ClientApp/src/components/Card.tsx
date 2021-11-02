import React from "react";

const CardLogin = (Props: any) => {
  return (
    <div
      className="card shadow p-3 mb-5 bg-body rounded"
      style={{ width: "18rem", marginTop: "2rem" }}
    >
      <div className="card-body">
        <h5 className="card-title">
          <b>{Props.titulo}</b>
        </h5>
        {Props.children}
        <a href={Props.href} className="card-link">
          {Props.enlace}
        </a>
      </div>
    </div>
  );
};

export default CardLogin;
