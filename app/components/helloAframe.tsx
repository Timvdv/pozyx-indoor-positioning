import { Entity, Scene } from "aframe-react";

export const HelloAframe = () => {
  // This needs to be loaded in the browser, not in the server
  require("aframe");
  require("aframe-particle-system-component");

  return (
    <Scene>
      <Entity text={{ text: 'hello', color: "green" }} />
    </Scene>
  );
};
