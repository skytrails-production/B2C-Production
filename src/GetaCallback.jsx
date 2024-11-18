import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "./Constants/constant";
import { FaPhone } from "react-icons/fa";

function GetaCallback() {
  const [isOpen, setIsOpen] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [page, setPage] = useState(1); // State to manage pages
  const [formData, setFormData] = useState({
    destination: "",
    departureCity: "",
    name: "",
    email: "",
    phone: "",
    consent: true,
    adult: "",
    child: "",
    budget: "",
    travelDate: "",
    msg: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGetCallback = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Make the API call
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/user/callBackRequests/createCallBackRequest`,
        formData
      );

      if (response.status === 200) {
        setPage(2); // Navigate to Page 2 on success
      }
    } catch (err) {
      setError("Failed to submit request. Please try again.");
    }
  };

  const handleSubmitPage2 = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/user/callBackRequests/createCallBackRequest`,
        formData
      );

      if (response.status === 200) {
        setThankYouOpen(true);
        setFormData({
          destination: "",
          departureCity: "",
          name: "",
          email: "",
          phone: "",
          consent: true,
          adult: "",
          child: "",
          budget: "",
          travelDate: "",
          msg: "",
        });
        setPage(1); // Reset to Page 1
      }
    } catch (err) {
      setError("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="fixed right-0 z-50 flex items-center p-2 space-x-2 transition-all duration-500 ease-in-out bg-[#FFF2D1] text-[#0A0908] bottom-24 rounded-s-2xl">
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full">
          <FaPhone className="text-xl text-white" />
        </div>
        <span className="text-xs font-semibold text-black">Get a Callback</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 space-y-4 bg-white rounded-lg">
            <button
              onClick={() => {
                setIsOpen(false);
                setPage(1); // Reset to Page 1
              }}
              className="absolute text-2xl text-gray-600 top-2 right-2 hover:text-black"
            >
              &times;
            </button>

            {page === 1 && (
              <>
                <h2 className="text-xl font-semibold text-center">
                  Need Assistance?
                </h2>
                <form onSubmit={handleGetCallback} className="space-y-4">
                  {error && (
                    <p className="text-sm text-center text-red-500">{error}</p>
                  )}
                  <div>
                    <label className="block">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block">Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block">Destination:</label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block">Departure City:</label>
                    <input
                      type="text"
                      name="departureCity"
                      value={formData.departureCity}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                  >
                    Get a Callback
                  </button>
                </form>
              </>
            )}

            {page === 2 && (
              <>
                <h2 className="text-xl font-semibold text-center">
                  Trip Details
                </h2>
                <form onSubmit={handleSubmitPage2} className="space-y-4">
                  {error && (
                    <p className="text-sm text-center text-red-500">{error}</p>
                  )}
                  <div>
                    <label className="block">Adult:</label>
                    <input
                      type="number"
                      name="adult"
                      value={formData.adult}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block">Child:</label>
                    <input
                      type="number"
                      name="child"
                      value={formData.child}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block">Budget:</label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block">Travel Date:</label>
                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block">Message:</label>
                    <textarea
                      name="msg"
                      value={formData.msg}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                  >
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GetaCallback;
