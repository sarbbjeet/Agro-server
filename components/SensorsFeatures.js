import Image from "next/image";
import React from "react";
import { f2 as ff, f1 } from "../styles/variables.module.scss";
import SensorFeaturesItem from "./SensorFeaturesItem";

export default function SensorsFeatures() {
  return (
    <div className="container text-custom-light py-20">
      <div className="flex flex-col items-center">
        <label
          className="text-custom-p6 text-2xl font-bold"
          style={{ fontFamily: ff }}
        >
          IoT Sensor Features
        </label>
      </div>
      <div className="mt-2 flex flex-wrap justify-between">
        <SensorFeaturesItem
          title="Periodic or Movement-Based"
          body="Set up LoRa agriculture devices to broadcast updates at predetermined
          intervals (1x, 3x, 5x per day, etc.) or whenever there is movement."
          image={require("../public/images/global-network.png")}
        />

        <SensorFeaturesItem
          title="Run Hour Monitoring"
          body="For the purpose of understanding and optimising asset utilisation, smart agricultural technologies like sensors and tracking devices record run hours based on movement."
          image={require("../public/images/time_monitoring.png")}
        />
        <SensorFeaturesItem
          title="Inputs / Outputs"
          body="To meet any application, such door or gate open/close, water metres, pump running/not running, and more, interface a variety of farming devices and switches."
          image={require("../public/images/filter.png")}
        />
        <SensorFeaturesItem
          title="Environmental Monitoring"
          body="For environmental monitoring applications, connect a variety of IoT-based agricultural sensors, including sensors for temperature, moisture, depth, humidity, and more."
          image={require("../public/images/monitoring.png")}
        />
        <SensorFeaturesItem
          title="Rugged & Weatherproof"
          body="Farm monitoring devices are protected by IP67-rated housing, which makes sure they can endure harsh weather conditions, high-pressure spray, immersion in water for 30 minutes, and fine dust."
          image={require("../public/images/waterproof.png")}
        />
        <SensorFeaturesItem
          title="Preventative Maintenance"
          body="Use smart farming IoT solutions to schedule reminders based on usage, distance travelled, run and idling hours, and more to lower maintenance and repair expenses."
          image={require("../public/images/maintenance.png")}
        />

        <SensorFeaturesItem
          title="Easy Install"
          body="There are several installation methods for discretely fastening GPS and agricultural sensors to objects, including screws, bolts, cable ties, and rivets."
          image={require("../public/images/like.png")}
        />
        <SensorFeaturesItem
          title="Flexible Configuration"
          body="App is fully equipped with all kinds of distinctive configuration options to con servers, sensor nodes, and gateways. The title of the dashboard and all other configuration options can be changed manually by the user."
          image={require("../public/images/settings_2.png")}
        />
      </div>
    </div>
  );
}
