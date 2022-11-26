const { prisma } = require("../../database/prisma");
// import { prisma } from "../../database/prisma";

const sendNotication = async ({ admin, sendToFb, farmerId, state }) => {
  try {
    const tokens = await prisma?.Fcmtoken?.findMany({
      where: {
        farmerId,
      },
    });
    //send notications to firebase
    if (tokens.length > 0)
      await admin.messaging().sendMulticast({
        tokens: tokens?.map((tokenObj) => tokenObj?.token),
        data: { data: JSON.stringify(sendToFb) },
        //default react native notification
        notification: {
          title: `Sprinker ${
            (sendToFb?.sprinker).toString() == "true" ? "On" : "Off"
          }`,
          body: sendToFb?.addr,
        },
        priority: "high",
        contentAvailable: true,
      });
  } catch (err) {
    console.log(err.message);
  }
};

const readFieldDB = async () => {
  try {
    const fields = await prisma?.field.findMany({
      where: {
        moist_auto: true,
      },
    });
    if (fields.length == 0) throw new Error("no data found");
    return { error: false, fields };
  } catch (err) {
    return { error: true, msg: err?.message };
  }
};

const publishToMqtt = async ({ farmerId, data, client }) => {
  try {
    const topic = `/inTopic/${farmerId}`;
    await client.publish(topic, JSON.stringify(data), {
      retain: true,
      qos: 1,
    });
  } catch (err) {
    console.log("mqtt publish error", err?.message);
  }
};

const applyConditions = ({ objPayload, matchedField }) => {
  const { sensor1: currentMoist, relay0 } = objPayload?.data;
  const { min_moist, max_moist } = matchedField;
  //condition to check moist and change state of sprinker
  if (
    currentMoist != undefined &&
    min_moist != undefined &&
    max_moist != undefined
  ) {
    let sendMsg;
    if (currentMoist <= min_moist && relay0 == false)
      sendMsg = { ...objPayload, data: { ...objPayload?.data, relay0: 1 } };
    else if (currentMoist >= max_moist && relay0)
      sendMsg = { ...objPayload, data: { ...objPayload?.data, relay0: 0 } };
    return sendMsg;
  }
};
//main loop
const receivedMqtt = async ({ topic, payload, client, admin }) => {
  try {
    const response = await readFieldDB();
    if (response?.error) return console.log("error->", response?.msg);
    const { fields } = response;
    const objPayload = JSON.parse(payload);
    //split farmer id from topic
    const farmerId = topic.split("/")[2];
    const matchedField = fields.find(
      (field) =>
        field?.farmerId == farmerId &&
        field?.gateway == objPayload?.gateway &&
        field?.node == objPayload?.node
    );
    if (matchedField) {
      const sendMsg = applyConditions({ matchedField, objPayload });
      if (sendMsg) {
        publishToMqtt({ client, farmerId, data: sendMsg });
        //send notification to the app
        const sendToFb = {
          field_type_id: matchedField?.field_type_id,
          addr: matchedField?.addr,
          sprinker: !objPayload?.data?.relay0,
        };
        sendNotication({
          admin,
          farmerId,
          sendToFb,
        });
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = { receivedMqtt };
