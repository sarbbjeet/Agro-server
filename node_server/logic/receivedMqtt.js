const { prisma } = require("../../database/prisma");
// import { prisma } from "../../database/prisma";
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
        await admin.messaging().sendMulticast({
          tokens: [
            "fWaSxP_GQRKHOfb3JUHe2t:APA91bEG3PfDIfxAjfRHQThScDc_n8K96YtfqoIcvdPEsKFTzudaA1BoxbKNP9O2p5GHIdo0ZaCUrYk9XhJnVVZT39zSg612IWiLCLGePog1YHuKkbM06BWnqic22inzPdQ3eDgjlRAZ",
          ],
          notification: {
            title: "Sprinker State",
            body: "Power On",
            //   imageUrl,
          },
        });
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = { receivedMqtt };
