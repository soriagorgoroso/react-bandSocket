import React from "react";
import { SocketProvider } from "./context/SocketContext";
import HomePage from "./Pages/HomePage";

export const BandNameApp = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
};
