import { useState, useEffect } from "react";
import { Client } from "paho-mqtt";

declare global {
  interface Window {
    ENV: any;
  }
}

function usePozyx() {
  const [pozState, setPozState] = useState([]);

  useEffect(() => {
    // Create a client instance
    let client = new Client(
      window.ENV.POZYX_ENDPOINT,
      Number(443),
      window.ENV.POZYX_CLIENT_ID
    );

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
      onSuccess: onConnect,
      userName: window.ENV.POZYX_CLIENT_ID,
      password: window.ENV.POZYX_PASSWORD,
      useSSL: true,
    });

    // called when the client connects
    function onConnect() {
      console.log("Connected");
      client.subscribe(window.ENV.POZYX_CLIENT_ID);
    }

    // called when the client loses its connection
    function onConnectionLost(responseObject: any) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    // called when a message arrives
    function onMessageArrived(message: any) {
      // console.log("onMessageArrived:" + message.payloadString);
      setPozState(JSON.parse(message.payloadString));
    }

    return () => {
      client.disconnect();
    };
  }, []);

  if (pozState === null) {
    console.log("Pozyx not connected");
    return [];
  }

  return pozState;
}

export default usePozyx;
