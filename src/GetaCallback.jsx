import React, { useState } from "react";
import axios from "axios";
import { FaPhone } from "react-icons/fa";
import { apiURL } from "./Constants/constant";
import { CheckOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./getpage.css";
function GetaCallback() {
  const [isOpen, setIsOpen] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [page, setPage] = useState(1); // Manage pages
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 5); // Add 5 days to the current date

  const [formData, setFormData] = useState({
    destination: "",
    departureCity: "",
    name: "",
    email: "",
    phone: "",
    consent: true,
    travelDate: "",
    adult: "",
    child: "",
    msg: "",
    budget: "",
    agreeToTerms: true, // Checkbox state
  });

  const [errors, setErrors] = useState({}); // Validation errors
  const [submittedData, setSubmittedData] = useState(null);

  const formatTravelDate = (date) => {
    const options = { year: "numeric", month: "short" }; // Format as Dec, 2024
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear the error as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation for Page 1
  const validatePage1 = () => {
    const newErrors = {};
    if (!formData.destination) newErrors.destination = "Enter Destination";

    if (!formData.name) newErrors.name = "Enter your Name";
    if (!formData.phone) newErrors.phone = "Enter your Phone Number";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms =
        "You must accept the User Agreement and Privacy Policy.";
    return newErrors;
  };

  // Validation for Page 2
  const validatePage2 = () => {
    const newErrors = {};
    if (!formData.travelDate) newErrors.travelDate = "Enter Travel Date";

    return newErrors;
  };

  // Handle form submission for Page 1 (callback request)
  // Handle form submission for Page 1 (callback request)
  const handleGetCallback = async (e) => {
    e.preventDefault();
    const validationErrors = validatePage1();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Make API call for callback request
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/user/callBackRequests/createCallBackRequest`,
        {
          destination: formData.destination,
          departureCity: formData.departureCity,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,

          consent: formData.consent,
        }
      );

      if (response.status === 200) {
        setPage(2); // Move to Page 2 if API call is successful
      }
    } catch (err) {
      console.error("Failed to request callback", err);
    }
  };

  const handleSubmitPage2 = async (e) => {
    e.preventDefault();
    const validationErrors = validatePage2();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/user/callBackRequests/createCallBackRequest`,
        formData
      );

      if (response.status === 200) {
        setSubmittedData({
          name: formData.name,
          destination: formData.destination,
          travelDate: formData.travelDate,
          phone: formData.phone,
        });
        setPage(3);
      }
    } catch (err) {
      console.error("Failed to submit request", err);
    }
  };

  return (
    <div className="fixed right-0 z-50 flex items-center p-2 space-x-2 bg-[#FFF2D1] text-[#0A0908] bottom-44 rounded-s-2xl">
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#FF6C48] to-[#FF7371] rounded-full">
          <FaPhone className="text-xl text-white" />
        </div>
        {/* <span className="text-xs font-semibold text-black">
          <span className="block">Get a</span>
          <span className="block">Callback</span>
        </span> */}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 space-y-4 bg-white rounded-lg">
            <button
              onClick={() => {
                setIsOpen(false);
                setPage(1); // Reset to Page 1
                setErrors({}); // Clear errors
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
                <form onSubmit={handleGetCallback} className="space-y-4 ">
                  {/* Row 1 */}

                  <div style={{ padding: "12px", border: "1px solid #DEE2E6" }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block">
                          Destination <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                        {errors.destination && (
                          <p className="text-sm text-red-500">
                            {errors.destination}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block">Departure City</label>
                        <input
                          type="text"
                          name="departureCity"
                          value={formData.departureCity}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div>
                      <label className="block">Email Id</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  {/* Checkbox for Agreement */}
                  <div className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>
                      I have read and agree to the{" "}
                      <Link
                        to="/termAndCondition"
                        className="text-[#00A9FF] no-underline"
                      >
                       Term & Condition
                      </Link>{" "}
                      &{" "}
                      <Link
                        to="/privacypolicy"
                        className=" text-[#00A9FF] no-underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </div>
                  {errors.isAgreed && (
                    <p className="text-sm text-red-500">{errors.isAgreed}</p>
                  )}
                  <button
                    type="submit"
                    disabled={!formData.agreeToTerms} // Button disabled until checkbox is ticked
                    className={`px-4 py-2 font-bold text-white rounded-full ${
                      formData.agreeToTerms
                        ? "bg-blue-500 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
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
                  <div style={{ padding: "12px", border: "1px solid #DEE2E6" }}>
                    {/* Row 1 */}
                    <div className="grid grid-cols-1">
                      <div>
                        <label className="block">
                          Travel Date<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="travelDate"
                          value={formData.travelDate}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                          min={minDate.toISOString().split("T")[0]} // Set minimum selectable date
                        />
                        {errors.travelDate && (
                          <p className="text-sm text-red-500">
                            {errors.travelDate}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1">
                      <div>
                        <label className="block">Budget</label>
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block">Adults</label>
                        <input
                          type="text"
                          name="adult"
                          value={formData.adult}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block">Children</label>
                        <input
                          type="text"
                          name="child"
                          value={formData.child}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1">
                      <div>
                        <label className="block">Message</label>
                        <textarea
                          name="msg"
                          value={formData.msg}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 font-bold text-white rounded-full"
                    style={{
                      background: "linear-gradient(to right, #4DABFD, #166CF5)",
                    }}
                  >
                    Submit
                  </button>
                </form>
              </>
            )}

            {page === 3 && submittedData && (
              <div className="space-y-4 text-left">
                <h2 className="text-2xl font-semibold text-black-600">
                  Thank You! <strong>{submittedData.name}</strong>
                </h2>
                <div>
                  {" "}
                  <p>
                    Our Holiday Expert will shortly reach out to you with our
                    best quotations on <strong>{submittedData.phone}</strong>.
                  </p>
                </div>
                <div className="p-2.5 rounded-md flex gap-6 border border-red-500 w-[264px]">
                  <div>
                    {" "}
                    <p className="border-b border-#D6D6D6 mb-2.5 pb-1.5 request-received">
                      <strong>Request Received</strong>
                    </p>
                    <span className="text-base font-medium">
                      {`${submittedData.destination} - ${formatTravelDate(
                        submittedData.travelDate
                      )}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    <div className="w-9 h-9 flex items-center justify-center border border-[#4F46E5] rounded-full">
                      <CheckOutlined className="text-[16px] text-[#4F46E5]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GetaCallback;
