import React, { useEffect } from "react";
//import { connect } from "precompiled-mqtt";
import { connect } from "mqtt";
import _ from "lodash";

export const MqttContext = React.createContext(null);

export default function MqttProvider({ brokerConfig, children }) {
  const [client, setClient] = React.useState(null);
  const [messages, setMessages] = React.useState({});

  if (client == null) {
    const newClient = connect(brokerConfig.url, brokerConfig.options);
    //const newClient = connect(brokerConfig.url);
    newClient.on("connect", () => {
      //   newClient.subscribe("presence");
      console.log("new client connected");
    });

    newClient.on("disconnect", () => {
      console.log("new client disconnected");
      setClient(null);
    });

    newClient.on("error", (err) => {
      console.log("error in connection", err);
    });
    newClient.on("close", () => {
      newClient?.end();
      console.log("close connection");
    });
    //   client?.removeAllListeners();
    //   newClient?.removeAllListeners();
    //   newClient?.end();
    //   console.log("close connection", err);
    // });
    newClient.on("message", (topic, message, packet) => {
      try {
        const json = JSON.parse(new TextDecoder("utf-8").decode(message));
        console.log("json data->", json);
        setMessages(json);
        // setMessages(_.set(messages, topic, json));
      } catch (err) {
        console.log("data error -> ", err.message);
      }
    });

    setClient(newClient);
  }
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <MqttContext.Provider value={{ client, messages }}>
      {children}
    </MqttContext.Provider>
  );
}
export const useMqtt = () => React.useContext(MqttContext);

// export const useMqtt = ({ topic, field }) => {
//   const mqttContext = React.useContext(MqttContext);
//   const [value, setValue] = React.useState(null);
//   mqttContext.client?.subscribe(topic);
//   React.useEffect(() => {
//     console.log("use effect");
//     setValue(_.get(mqttContext.messages, [topic, field]));
//   });
//   return value;
// };
