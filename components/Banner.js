import React from "react";

export default function Banner() {
  return (
    <div
      className="container wrapper"
      style={{ display: "flex", flexDirection: "row", backgroundColor: "red" }}
    >
      <div className="flex-1 bg-custom-p1">
        <div className="tagLine">
          Making agriculture easy with IOT technologies
        </div>
        <ul className="features">
          <li>Save Time</li>
          <li>Reduce Cost</li>
          <li>Improve Yields</li>
        </ul>
        <div className="request_events">
          <div className="btn">Try Now</div>
        </div>
      </div>
      <div className="rightSide" style={{ flex: 1 }}>
        right side
      </div>

      <style jsx>
        {`
            .left-side{
            flex:1,
            background: #ff0000,
            }

            `}
      </style>
    </div>
  );
}
