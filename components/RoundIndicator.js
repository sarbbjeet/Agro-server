import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { f2 as ff } from "../styles/variables.module.scss";

export default function RoundIndicator({
  title = "Temerature",
  value = 100,
  minValue = -50,
  maxValue = 150,
  valueSuffix = "°C",
  activeStrokeColor = "red",
  isFloatValue = true,
}) {
  return (
    <div
      className="flex w-3/6 flex-col items-center border-custom-p4 rounded-sm py-2"
      style={{ borderWidth: 1 / 2 }}
    >
      <div
        className="text-xl"
        style={{
          color: isFloatValue ? `rgba(62, 152, 255, 1)` : `#D1630E`,
          fontFamily: ff,
          fontWeight: 600,
          paddingHorizontal: "2px",
        }}
      >
        {title}
      </div>
      <div style={{ width: 100, height: 100 }}>
        <CircularProgressbar
          minValue={minValue}
          maxValue={maxValue}
          value={value}
          text={`${value}${valueSuffix}`}
          styles={buildStyles({
            // Text size
            textSize: "20px",
            fontFamily: ff,
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: isFloatValue ? `rgba(62, 152, 255, 1)` : `#D1630E`,
            textColor: isFloatValue ? `rgba(62, 152, 255, 1)` : `#D1630E`,
            //trailColor: "#d6d6d6",
          })}
        />
      </div>
    </div>
  );
}
