import React from "react";

const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#2f74c0",
        fontFamily: "Neucha, cursive",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <h1 className={"title_item"} style={{ color: "#23A4CA" }}>
        Tu <span style={{ color: "#30C1EC" }}>agenda </span>
      </h1>
      <h3 style={{ borderBottom: "1px solid #000" }}>Haz tu propia agenda!</h3>
    </div>
  );
};

export default HomePage;
