import React, { useEffect } from "react";
//import { connect } from "precompiled-mqtt";
import { connect } from "mqtt";
import _ from "lodash";
import { useAuth } from "./AuthProvider";

export const MqttContext = React.createContext(null);

export default function MqttProvider({ brokerConfig, children }) {
  const [client, setClient] = React.useState(null);
  const [messages, setMessages] = React.useState({});
  const [finalData, setFinalData] = React.useState([]);
  const { login, user, isAuthenticated, loading } = useAuth();

  if (client == null && user?.id) {
    const newClient = connect(brokerConfig.url, brokerConfig.options);
    //const newClient = connect(brokerConfig.url);
    newClient.on("connect", () => {
      //subcribe topic
      newClient?.subscribe(`/outTopic/${user?.id}`);
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
        //verify recived data is correct
        const { gateway, node } = json;
        if (gateway == undefined || node == undefined)
          throw new Error("invaild json data received");
        //enter time stamping with received data
        json["time"] = Date.now();
        setMessages(json);
      } catch (err) {
        console.log("data error -> ", err.message);
      }
    });

    setClient(newClient);
  }

  //create timer
  useEffect(() => {
    const currentTime = Date.now().toString();
    const timer = setInterval(() => {
      //remove item from array if time difference is greater than 30s
      if (finalData.length > 0) {
        const itemsLeft = finalData.filter(
          (item) => Date.now() - item?.time < 30000
        );
        setFinalData(itemsLeft);
      }
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, [finalData]);

  //filter and insert received item to final data array
  useEffect(() => {
    const filter = async () => {
      if (messages?.gateway != undefined && messages?.node) {
        if (finalData.length > 0) {
          const filterItems = finalData.filter(
            (item) =>
              !(
                item?.gateway == messages?.gateway &&
                item?.node == messages?.node
              )
          );
          setFinalData([...filterItems, messages]);
        } else setFinalData((currentData) => [...currentData, messages]);
      }
    };
    filter();
  }, [messages]);

  return (
    <MqttContext.Provider value={{ client, finalData }}>
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
