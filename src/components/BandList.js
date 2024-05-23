import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = ({}) => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      console.log(bands);
      setBands(bands);
    });
    return () => socket.off("current-bands");
  }, [socket]);

  const handleInputChange = (event, id) => {
    const newName = event.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const onBlurBandName = (id, name) => {
    socket.emit("change-band-name", id, name);
  };
  const addVotes = (id) => {
    socket.emit("band-vote", id);
  };

  const removeBand = (id) => {
    socket.emit("remove-band", id);
  };
  const createRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => addVotes(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={band.name}
            onChange={(event) => handleInputChange(event, band.id)}
            onBlur={() => onBlurBandName(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            onClick={() => {
              removeBand(band.id);
            }}
            className="btn btn-danger"
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
