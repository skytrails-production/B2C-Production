import React from "react";
import "./Loader.css";
import logo from "../../src/images/ST-Main-Logo.png"

function Loader() {
  // Retrieve data from sessionStorage
  const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));
  const data = storedFormData?.dynamicFormData[0]; // Assuming dynamicFormData is an array with at least one element

  // Calculate total number of guests
  const totalAdults = data?.NoOfAdults || 0;
  const totalChildren = data?.NoOfChild || 0;

  return (
    <div className="body">
      <div className="loader">
        <div className="box">
          <div className="logo-bx">
            <img src={logo} alt="logo" />
          </div>
          <div className="bottom-box">
            <div className="loader-content">
              <h2>Please Wait</h2>
              <p>We are Searching For the best hotels in</p>
              <h3>{storedFormData?.city}</h3>
            </div>
            <div className="loader-details">
              <div>
                <p><b>Check In:</b>{storedFormData?.checkIn}</p>
                <p><b>Check Out:</b>{storedFormData?.checkOut}</p>
                <p><b>Guest(s):</b> {totalAdults} Adults {totalChildren} Children</p>
                <p><b>Rooms:</b>{storedFormData?.room}</p>
                <p><b>Rating:</b>{storedFormData?.star} Star</p>
                <p><b>Night(s):</b>{storedFormData?.night}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;