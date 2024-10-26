import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import stopImg from "../flightStop.svg";
import KafilaDetails from "./KafilaDetails";

const Kafila = ({ flight }) => {
  const [isShow, setIsShow] = useState(false);
  const flightList = useSelector((state) => state?.flightList);

  const FCode = flight?.FCode;
  const flightcode = FCode.split(",")[0];
  const flightnumber = (flight?.FNo).split(",")[0];

  const dateTime = new Date(flight?.DDate);
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const departuretime = `${hours}:${minutes}`;

  const dateTimearrival = new Date(flight?.ADate);
  const hoursarrival = dateTimearrival.getHours().toString().padStart(2, "0");
  const minutesarrival = dateTimearrival
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const departuretimearrival = `${hoursarrival}:${minutesarrival}`;
  // console.log(departuretime);

  const duration = flight?.Dur;
  const parts = duration.split(":");
  const durationhours = parts[1].replace("h", "");
  const durationminutes = parts[2].replace("m", "");
  const totalduration = `${durationhours}h:${durationminutes}m`;

  return (
    <div className="card-flight">
      <div className="card-box-1">
        <div>
          <div className="detail">
            <div className="flight-box-img">
              <div className="air-img">
                <img
                  src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightcode}.png`}
                  alt="flight"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div className="code-name">
                <p style={{ color: "#071C2C" }}>{flight?.FName}</p>
                <p style={{ color: "#E73C348F" }}>{flightnumber}</p>
              </div>
            </div>
            <div className="detail-box-right">
              <div className="flight-box-2">
                <div className="flight-time-1">
                  <p>{flight?.Itinerary?.[0]?.SrcName}</p>
                  <p>{departuretime}</p>

                  <span>Terminal {flight?.Itinerary?.[0]?.DTrmnl}</span>
                </div>
                <div className="flight-time-2">
                  <p>{totalduration}</p>
                  <img src={stopImg} alt="" />
                  <span>
                    {flight?.Itinerary?.length == 1
                      ? "non-stop"
                      : `${flight?.Itinerary?.length - 1} stops`}
                  </span>
                </div>
                <div className="flight-time-1">
                  <p>
                    {
                      flight?.Itinerary?.[flight?.Itinerary?.length - 1]
                        ?.DesName
                    }
                  </p>
                  <p>{departuretimearrival}</p>

                  <span>
                    Terminal{" "}
                    {flight?.Itinerary?.[flight?.Itinerary?.length - 1]?.ATrmnl}
                  </span>
                </div>
              </div>
              <div className="flight-box-3">
                <p>₹ {Number(Number(flight?.Fare?.BasicTotal)).toFixed(0)}</p>
                <button
                  onClick={() => {
                    setIsShow((pre) => !pre);
                    // console.log(flight);
                  }}
                >
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShow && <KafilaDetails flight={flight} />}
      {/* <button>kafila</button> */}
      {/* <p>kafila</p> */}
    </div>
  );
};

export default Kafila;
