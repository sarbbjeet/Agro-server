// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "mqtt"; //mqtt client
const client = connect("mqtt://allmotorsltd.co.uk:1883", {
  username: "sarb",
  password: "Shaktiman123",
  //   protocolId: "MQIsdp",
  //   protocolVersion: 3,
  // clean: true,
  clientId: "mqttjs01",
  // port: 1884,
});

client.on("connect", () => {
  console.log("connected with the broker");
  client?.subscribe("presence", function (err) {
    if (!err) {
      console.log("received subscribe ");
    }
  });
});

client.on("message", (topic, payload, packet) => {
  console.log(payload.toString());
});

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
