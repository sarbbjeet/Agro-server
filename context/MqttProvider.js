import React, { useEffect, useRef } from "react";
//import { connect } from "precompiled-mqtt";
import { connect } from "mqtt";
import _ from "lodash";
import { useAuth } from "./AuthProvider";

export const MqttContext = React.createContext(null);

export default function MqttProvider({ brokerConfig, children }) {
  const [client, setClient] = React.useState(null);
  const [messages, setMessages] = React.useState({});
  const [allReceived, setAllReceived] = React.useState([]);
  const [scannedList, setScannedList] = React.useState([]);
  const [reconnect, setReconnect] = React.useState("");
  const [notify, setNotify] = React.useState(""); //event when new messsge arrived

  const { login, user, isAuthenticated, loading } = useAuth();
  const ref_client = useRef();

  //mqtt connection request
  const connectionRequest = () => {
    if (user?.id && !client?.connected) {
      const newClient = connect(brokerConfig.url, brokerConfig.options);
      //const newClient = connect(brokerConfig.url);
      newClient.on("connect", () => {
        //subcribe topic
        newClient?.subscribe(`/outTopic/${user?.id}`);
        newClient?.subscribe(`/chatNotify/${user?.id}`); //event when new message received
        newClient?.subscribe(`/chatNotify/group`); //when group message received
        console.log("user id=", `/outTopic/${user?.id}`);
        console.log("new client connected");
        setClient(newClient);
      });
      newClient.on("disconnect", () => {
        console.log("new client disconnected");
        setClient(null);
      });

      newClient.on("error", (err) => {
        setClient(null);
        console.log("error in connection", err);
      });
      newClient.on("close", () => {
        newClient?.end();
        setClient(null);
        console.log("close connection");
      });
      newClient.on("message", (topic, message, packet) => {
        try {
          const json = JSON.parse(new TextDecoder("utf-8").decode(message));
          //verify recived data is correct
          const { gateway, node, notifyId } = json;
          if (notifyId) setNotify(Date.now().toString()); //just event to notify new message arrived
          if (gateway == undefined || node == undefined)
            throw new Error("invaild json data received");
          //enter time stamping with received data
          json["time"] = Date.now();
          setMessages(json);
        } catch (err) {
          console.log("data error -> ", err.message);
        }
      });
    }
  };
  useEffect(() => {
    if (client != null) {
      ref_client.current = client;
    }
  }, [client]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!client?.connected)
        //just randomly change the reconnect string value to enable to run loop again
        setReconnect(Date.now().toString());
    }, 1000);
    return () => clearInterval(timer);
  }, [client]);

  useEffect(() => {
    connectionRequest();
  }, [reconnect]);

  //create timer
  useEffect(() => {
    const timer = setInterval(() => {
      //remove item from array if time difference is greater than 30s
      if (allReceived.length > 0) {
        const itemsLeft = allReceived.filter(
          (item) => Date.now() - item?.time < 30000
        );
        setAllReceived(itemsLeft);
      }
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, [allReceived]);

  //filter and insert received item to final data array
  useEffect(() => {
    const filter = async () => {
      if (messages?.gateway != undefined && messages?.node) {
        if (allReceived.length > 0) {
          const filterItems = allReceived.filter(
            (item) =>
              !(
                item?.gateway == messages?.gateway &&
                item?.node == messages?.node
              )
          );
          setAllReceived([...filterItems, messages]);
        } else setAllReceived((currentData) => [...currentData, messages]);
      }
    };
    filter();
  }, [messages]);

  useEffect(() => {
    setScannedList(
      allReceived?.filter(
        (f) =>
          !user?.fields.find(
            (e) => e?.gateway == f?.gateway && e?.node == f?.node
          )
      )
    );
  }, [allReceived]);
  //notify group if group true
  const chatNotifyPub = ({ notifyId, group }) => {
    try {
      ref_client?.current?.publish(
        `/chatNotify/${group ? "group" : notifyId}`,
        JSON.stringify({ notifyId })
      );
    } catch (err) {
      console.log("error to publish mqtt", err.message);
    }
  };

  const publish_data = (msg) => {
    try {
      ref_client?.current?.publish(
        `/inTopic/${user?.id}`,
        JSON.stringify(msg),
        0,
        false
      );
    } catch (err) {
      console.log("error to publish mqtt", err.message);
    }
  };

  return (
    <MqttContext.Provider
      value={{
        client,
        allReceived,
        publish_data,
        scannedList,
        notify,
        chatNotifyPub,
      }}
    >
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
