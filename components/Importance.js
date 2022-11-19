import React from "react";
import { f2 as ff, f1 } from "../styles/variables.module.scss";

export default function Importance() {
  return (
    <div className="container text-custom-light py-20">
      <div className="flex flex-col items-center">
        <label
          className="text-custom-p6 text-2xl font-bold"
          style={{ fontFamily: ff }}
        >
          Importance of an Agriculture Monitoring
        </label>
        <label className="text-lg " style={{ fontFamily: f1, lineHeight: 1.5 }}>
          As one of the foundational industries of the global economy,
          agriculture has enormous potential for IoT adoption. Farmers may now
          overcome their daily obstacles thanks to a variety of smart farming
          systems. This covers activities including planting, watering,
          harvesting crops, and insect management. Farmers could accomplish even
          more, though, with the installation of agriculture field monitoring
          systems. According to the International Business Machines Corporation
          (IBM), AMSs will assist farmers in increasing their production rates
          by 70% by the year 2050.
        </label>
      </div>
    </div>
  );
}
