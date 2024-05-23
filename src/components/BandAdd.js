import React, { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const [inputAddBand, setInputAddBand] = useState();
  const { socket } = useContext(SocketContext);

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (inputAddBand.trim().length > 0) {
      socket.emit("add-band", { name: inputAddBand });

      setInputAddBand("");
    }
  };
  return (
    <>
      <h3>Agregar Bandas</h3>
      <form action="" onSubmit={onSubmit}>
        <input
          value={inputAddBand}
          onChange={(ev) => setInputAddBand(ev.target.value)}
          type="text"
          className="form-control"
          placeholder="Nuevo nombre de banda"
        />
      </form>
    </>
  );
};
