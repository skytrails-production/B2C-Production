import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="body">
      <div className="loader">
        <div className="wait"> Please Wait We are Fetching Result !!</div>
        <div className="iata_code departure_city">TRAV</div>
        <div className="plane">
          <img
            src="https://zupimages.net/up/19/34/4820.gif"
            className="plane-img"
          />
        </div>
        <div className="earth-wrapper">
          <div className="earth"></div>
        </div>
        <div className="iata_code arrival_city">VOLT</div>
      </div>
    </div>
  );
}

export default Loader;
