const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { default: axios } = require("axios");
var mqtt = require("mqtt");
const { receivedMqtt } = require("./logic/receivedMqtt");
var admin = require("firebase-admin");
var serviceAccount = require("../agri_app_firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const {
  NEXT_PUBLIC_MQTT_USERNAME: USERNAME,
  NEXT_PUBLIC_MQTT_PASSWORD: PASSWORD,
  NEXT_PUBLIC_MQTT_HOSTNAME: HOSTNAME,
} = process.env;

// For backend only use mqtt and for browser user can use mqtt or ws
const url = `mqtt://${HOSTNAME}:1883`;
const options = {
  clientId: `clientId=${Date.now().toString()}`,
  username: USERNAME,
  password: PASSWORD,
  clean: true,
};
const client = mqtt.connect(url, options);
client.on("connect", function () {
  client.subscribe("/outTopic/#");
  console.log("connected");
});

client.on("message", (topic, payload) =>
  receivedMqtt({ topic, payload, client, admin })
);

client.on("error", function (error) {
  console.log("Can't connect" + error);
});

setInterval(async () => {
  // getdb();
}, 4000);
