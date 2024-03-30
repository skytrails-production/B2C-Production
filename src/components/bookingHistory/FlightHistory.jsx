import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./bookingHistory.css";
import { FaUserFriends } from "react-icons/fa";
import { apiURL } from "../../Constants/constant";
import axios from "axios";
import dayjs from "dayjs";
import flightFilter from "../../images/flightFilter.png";
import { FaPlaneDeparture } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SpinnerCircular } from "spinners-react";
import SecureStorage from "react-secure-storage";

const FlightHistory = () => {
  const [flightBookingData, setFlightBookingData] = useState([]);
  const reducerState = useSelector((state) => state);

  const [loading, setLoading] = useState(true);

  const [cancelLoading, setCancelLoading] = useState(false);

  const [responseMessage, setResponseMessage] = useState(false);

  const [cancellationCharges, setCancellationCharges] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    // bgcolor: "background.paper",
    boxShadow: 10,
  };

  const [loadingCancelRequest, setLoadingCancelRequest] = useState(false);

  const [openModalChange, setOpenModalChange] = useState(false);
  const handleModalOpenChange = () => {
    setLoadingCancelRequest(false);
    setOpenModalChange(true);
  };
  const handleModalCloseChange = () => setOpenModalChange(false);
  const [reason, setReason] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  // change flight request

  // cancel flight request

  const [openModalCancelRequest, setOpenModalCancelRequest] = useState(false);

  const handleModalOpenCancelRequest = () => setOpenModalCancelRequest(true);
  const handleModalCloseCancelRequest = () => setOpenModalCancelRequest(false);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const handleModalOpenConfirmation = () => setOpenConfirmationModal(true);
  const handleModalCloseConfirmation = () => setOpenConfirmationModal(false);

  // cancel flight request

  const token = SecureStorage.getItem("jwtToken");

  // fetch api data

  // console.log(flightBookingData, "flight booking")
  // console.log(token, "flight booking")

  const getFlightBooking = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${apiURL.baseURL}/skytrails/api/user/getUserflightBooking`,
        headers: {
          token: token,
        },
      });

      if (response.status === 200) {
        const sortedData = response.data.result.docs.sort((a, b) => {
          const departureA = new Date(
            a.airlineDetails[0].Origin.DepTime
          ).getTime();
          const departureB = new Date(
            b.airlineDetails[0].Origin.DepTime
          ).getTime();
          const currentDate = new Date().getTime();

          const diffA = departureA - currentDate;
          const diffB = departureB - currentDate;

          if (diffA >= 0 && diffB < 0) {
            return -1;
          } else if (diffA < 0 && diffB >= 0) {
            return 1;
          } else {
            return Math.abs(diffA) - Math.abs(diffB);
          }
        });
        setFlightBookingData(sortedData);
        // console.log('Flight History Response', response);
      } else {
        console.error("Request failed with status code:", response.status);
      }
      setLoading(false);
    } catch (error) {
      console.error("An error occurred while fetching flight booking:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlightBooking();
  }, [token, loading]);

  // change request flight

  // console.log(selectedFlight, "selected flight");

  const handleSubmitFlightChange = async (event) => {
    event.preventDefault();

    if (!selectedFlight || loadingCancelRequest) {
      return;
    }

    const selectedReason = document.querySelector("input[type=radio]:checked");
    const selectedCheckboxValue = selectedReason ? selectedReason.value : null;

    const formData = {
      reason: reason,
      bookingId: selectedFlight?.bookingId,
      flightBookingId: selectedFlight?._id,
      contactNumber: selectedFlight?.passengerDetails[0]?.ContactNo,
      changerequest: selectedCheckboxValue,
      // amount: Number(selectedFlight?.totalAmount),
      pnr: selectedFlight?.pnr,
    };

    try {
      setLoadingCancelRequest(true);

      const response = await axios({
        method: "post",
        url: `${apiURL.baseURL}/skyTrails/api/user/changeUserFlightBooking`,
        data: formData,
        headers: {
          token: token,
        },
      });
      setOpenModalChange(false);
      setTimeout(() => {
        handleModalOpenConfirmation();
      }, 1000);
    } catch (error) {
      console.error("Error sending data to the server:", error);
    } finally {
      setLoadingCancelRequest(false); // Reset loading state regardless of success or failure
    }
  };

  // change request flight

  // cancel flight request

  const handleSubmitFlightCancelRequest = async (event) => {
    event.preventDefault();

    if (!selectedFlight || loadingCancelRequest) {
      return;
    }

    const formData = {
      reason: reason,
      bookingId: selectedFlight?.bookingId,
      flightBookingId: selectedFlight?._id,
      pnr: selectedFlight?.pnr,
    };

    try {
      setLoadingCancelRequest(true);

      const response = await axios({
        method: "post",
        url: `${apiURL.baseURL}/skyTrails/api/user/cancelUserFlightBooking`,
        data: formData,
        headers: {
          token: token,
        },
      });
      setOpenModalCancelRequest(false);
      setResponseMessage(response.data.responseMessage);
      setTimeout(() => {
        handleModalOpenConfirmation();
      }, 1000);
    } catch (error) {
      console.error("Error sending data to the server:", error);
    } finally {
      setLoadingCancelRequest(false); // Reset loading state regardless of success or failure
    }
  };

  const currentDate = new Date();

  if (loading) {
    return (
      <div
        className="loaderBoxChangeReq"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <SpinnerCircular size={30} style={{ color: "#d90429" }} />
        {/* mukesh */}
      </div>
    );
  }

  //cancelFlight
  const getCancellationCharges = async (item) => {
    try {
      // setCancelLoading(true);

      setCancelLoading((prevState) => ({
        ...prevState,
        [item._id]: true,
      }));
      const requestData = {
        BookingId: item?.bookingId,
        RequestType: "1",
        BookingMode: "5",
        EndUserIp: reducerState?.ip?.ipData,
        TokenId: reducerState?.ip?.tokenData,
      };

      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/flight/getcancellationcharges`,
        requestData
      );
      // setCancelLoading(false);
      setCancelLoading((prevState) => ({
        ...prevState,
        [item._id]: false,
      }));
      if (response.data.ErrorCode) {
        handleModalOpenCancelRequest();
        setCancellationCharges(response.data.ErrorCode.ErrorMessage);
      } else {
        handleModalOpenCancelRequest();
        setCancellationCharges(response.data);
      }

      console.log("Cancellation charges:", response.data);
    } catch (error) {
      console.error("Error fetching cancellation charges:", error);
    }
  };
  return (
    <>
      {flightBookingData.length == 0 && !loading ? (
        <>
          <div className="filteredNotFound">
            <img src={flightFilter} alt="filter image" />
            <h1>No Booking yet</h1>
          </div>
        </>
      ) : (
        <>
          {flightBookingData.map((item, index) => {
            const departureTime = new Date(
              item?.airlineDetails[0]?.Origin?.DepTime
            );
            const timeDifference =
              departureTime.getTime() - currentDate.getTime();
            const hoursDifference = timeDifference / (1000 * 60 * 60);

            const isCompleted = currentDate > departureTime;
            const isToday =
              currentDate.toDateString() === departureTime.toDateString();
            const isUpcoming = departureTime > currentDate;
            const isWithin24Hours = hoursDifference <= 24;

            let status = "";
            if (isCompleted) {
              status = "Completed";
            } else if (isToday) {
              status = "Today";
            } else if (isUpcoming) {
              status = "Upcoming";
            }

            return (
              <>
                <div className="p-0 row flightHisOuter">
                  <div className="historyTop">
                    <div>
                      <div className="historyTopLeft">
                        <span>{item?.airlineDetails[0]?.Origin?.CityName}</span>
                        <FaLongArrowAltRight />
                        <span>
                          {
                            item?.airlineDetails[
                              item?.airlineDetails.length - 1
                            ]?.Destination?.CityName
                          }
                        </span>
                      </div>

                      <div className="historyStatus">
                        <span>{status}</span>
                        <p>|</p>

                        {item?.oneWay == true ? (
                          <span>One Way Flight</span>
                        ) : (
                          <span>Return Flight</span>
                        )}
                      </div>
                    </div>
                    <div className="historyTopRight">
                      <p>
                        Booking ID : {"  "} {item?.bookingId}
                      </p>
                      <span>
                        PNR : {"  "} {item?.pnr}
                      </span>
                    </div>
                  </div>

                  <div className="historyBottom">
                    <div className="historyBottomOne">
                      <span>From</span>
                      {/* <span>15 Jan, 23{"  "} 08:30 AM</span> */}
                      <span>
                        {dayjs(item?.airlineDetails[0]?.Origin?.DepTime).format(
                          "DD MMM, YY"
                        )}
                        {"  "}
                        {dayjs(item?.airlineDetails[0]?.Origin?.DepTime).format(
                          "hh:mm A"
                        )}
                      </span>
                      <h3>
                        {item?.airlineDetails[0]?.Origin?.AirportCode}-
                        {item?.airlineDetails[0]?.Origin?.CityName}
                      </h3>
                    </div>
                    <div className="historyBottomOne">
                      <span>To</span>
                      <span>
                        {dayjs(
                          item?.airlineDetails[item?.airlineDetails.length - 1]
                            ?.Destination?.ArrTime
                        ).format("DD MMM, YY")}
                        {"  "}
                        {dayjs(
                          item?.airlineDetails[item?.airlineDetails.length - 1]
                            ?.Destination?.ArrTime
                        ).format("hh:mm A")}
                      </span>
                      <h3>
                        {
                          item?.airlineDetails[item?.airlineDetails.length - 1]
                            ?.Destination?.AirportCode
                        }
                        -
                        {
                          item?.airlineDetails[item?.airlineDetails.length - 1]
                            ?.Destination?.CityName
                        }
                      </h3>
                    </div>
                    <div className="historyBottomTwo">
                      <span>
                        <FaPlaneDeparture /> {"  "}
                        {item?.airlineDetails[0]?.Airline?.AirlineName}{" "}
                        {item?.airlineDetails[0]?.Airline?.AirlineCode}{" "}
                        {item?.airlineDetails[0]?.Airline?.FlightNumber}{" "}
                      </span>
                      {/* <span><FaUserFriends /> {"  "} Shaan</span> */}
                      {item?.passengerDetails?.map((passenger, index) => {
                        return (
                          <span key={index}>
                            <FaUserFriends /> {"  "} {passenger?.firstName}
                          </span>
                        );
                      })}
                    </div>

                    {isWithin24Hours ? (
                      <div className="historyBottomThreeDisabled">
                        <button>Change Request</button>
                        <button>Cancel Request</button>
                      </div>
                    ) : (
                      <div className="historyBottomThree">
                        <button
                          onClick={() => {
                            handleModalOpenChange();
                            setSelectedFlight(item);
                          }}
                        >
                          Change Request
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFlight(item);
                            getCancellationCharges(item);
                          }}
                        >
                          {cancelLoading[item._id] ? (
                            <SpinnerCircular size={30} color="#ffffff" />
                          ) : (
                            "Cancel Request"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* change request  */}

                <Modal
                  open={openModalChange}
                  onClose={handleModalCloseChange}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="modal-boxChange">
                      <div className="modal-header">
                        <h2>Change Request</h2>
                        {selectedFlight && (
                          <p>
                            <span>PNR:-</span> {selectedFlight.pnr}
                          </p>
                        )}
                      </div>
                      <form className="cancelForm">
                        <div className="input-text">
                          <p className="bold" htmlFor="reason">
                            Write Your Valid Reason
                          </p>
                          <input
                            type="text"
                            id="reason"
                            onChange={handleReasonChange}
                          />
                        </div>
                        <p className="bold" htmlFor="">
                          Please Select a Valid Reason{" "}
                        </p>
                        <div className="input-check">
                          <div className="formGroup">
                            <input
                              type="radio"
                              name="travel"
                              id="one"
                              value="Change in Travel Plans"
                            />
                            <label>Change in Travel Plans</label>
                          </div>

                          <div className="formGroup">
                            <input
                              type="radio"
                              name="travel"
                              id="two"
                              value="Travel Advisory or Warnings"
                            />
                            <label> Travel Advisory or Warnings</label>
                          </div>

                          <div className="formGroup">
                            <input
                              type="radio"
                              name="travel"
                              id="three"
                              value="Visa or Documentation Problems"
                            />
                            <label>Visa or Documentation Problems</label>
                          </div>

                          <div className="formGroup">
                            <input
                              type="radio"
                              id="four"
                              name="travel"
                              value="Medical Issues"
                            />
                            <label>Medical Issues</label>
                          </div>

                          <div className="formGroup">
                            <input
                              type="radio"
                              id="five"
                              name="travel"
                              value="Other"
                            />
                            <label> Other</label>
                          </div>
                        </div>
                        <div className="historyCancelModal">
                          <button
                            type="button"
                            onClick={handleModalCloseChange}
                          >
                            Cancel
                          </button>
                          <button
                            className="second"
                            type="submit"
                            onClick={handleSubmitFlightChange}
                          >
                            {loadingCancelRequest ? (
                              <SpinnerCircular size={30} сolor="#ffffff" />
                            ) : (
                              "Send Request"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Box>
                </Modal>

                {/* cancel request  */}

                <Modal
                  open={openModalCancelRequest}
                  onClose={handleModalCloseCancelRequest}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="modal-boxChange">
                      <div className="modal-header">
                        <h2>Cancel Request </h2>
                        {selectedFlight && (
                          <p>
                            <span>PNR:-</span> {selectedFlight.pnr}
                          </p>
                        )}
                      </div>
                      {/* <div
                        className="modal-header-cancel"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {cancellationCharges &&
                        cancellationCharges.data &&
                        cancellationCharges.data.Response &&
                        cancellationCharges.data.Response.CancelChargeDetails &&
                        cancellationCharges.data.Response.CancelChargeDetails
                          .length > 0 ? (
                          <div
                           className="cancel-div"
                          >
                           
                            <div>
                            <span className="bold-font">Name:</span>{" "}
                            <p>  {
                                cancellationCharges.data.Response
                                  .CancelChargeDetails[0].FirstName
                              }</p>{" "}
                            <p>  {
                                cancellationCharges.data.Response
                                  .CancelChargeDetails[0].LastName
                              }</p>{" "}
                            </div>
                            <div>
                              <span className="bold-font">
                                Cancellation Charge:
                              </span>{" "}
                              {
                                cancellationCharges.data.Response
                                  .CancellationCharge
                              }
                            </div>
                            <div>
                              <span className="bold-font">Refund Amount:</span>{" "}
                              {
                                cancellationCharges.data.Response
                                  .CancelChargeDetails[0].RefundAmount
                              }
                            </div>
                          </div>
                        ) : (
                          "Unable to Fetch Record"
                        )}
                      </div> */}

                      <div
                        className="modal-header-cancel"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {cancellationCharges &&
                        cancellationCharges.data &&
                        cancellationCharges.data.Response &&
                        cancellationCharges.data.Response.CancelChargeDetails &&
                        cancellationCharges.data.Response.CancelChargeDetails
                          .length > 0 ? (
                          <div className="cancel-div">
                            <div className="div1">
                              <div>
                                {" "}
                                <span className="bold-font">Name</span>{" "}
                              </div>
                              <div
                              
                                className="div2"
                              >
                                {" "}
                                {
                                  cancellationCharges.data.Response
                                    .CancelChargeDetails[0].FirstName
                                }{" "}
                                {
                                  cancellationCharges.data.Response
                                    .CancelChargeDetails[0].LastName
                                }{" "}
                              </div>
                            </div>
                            <div
                             
                              className="div3"
                            >
                              <div>
                                {" "}
                                <span className="bold-font">
                                  Cancellation Charge
                                </span>{" "}
                              </div>
                              <div style={{ textAlign: "center" }}>
                                {" "}
                                {
                                  cancellationCharges.data.Response
                                    .CancellationCharge
                                }
                              </div>
                            </div>
                            <div
                             className="div3"
                            >
                              <div>
                                {" "}
                                <span className="bold-font">
                                  Refund Amount
                                </span>{" "}
                              </div>
                              <div style={{ textAlign: "center" }}>
                                {" "}
                                {
                                  cancellationCharges.data.Response
                                    .CancelChargeDetails[0].RefundAmount
                                }
                              </div>
                            </div>
                          </div>
                        ) : (
                          "Unable to Fetch Record"
                        )}
                      </div>

                      <form className="cancelForm">
                        <div className="input-text">
                          <p className="bold" htmlFor="reason">
                            Write Your Valid Reason
                          </p>
                          <input
                            type="text"
                            id="reason"
                            onChange={handleReasonChange}
                          />
                        </div>

                        <div className="historyCancelModal">
                          <button
                            type="button"
                            onClick={handleModalCloseCancelRequest}
                          >
                            Cancel
                          </button>
                          <button
                            className="second"
                            type="submit"
                            onClick={handleSubmitFlightCancelRequest}
                          >
                            {loadingCancelRequest ? (
                              <SpinnerCircular size={30} сolor="#ffffff" />
                            ) : (
                              "Send Request"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Box>
                </Modal>

                {/* confirmation modal  */}

                <Modal
                  open={openConfirmationModal}
                  onClose={handleModalCloseConfirmation}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="modal-boxChange">
                      <form className="cancelForm">
                        <div className="confirmModal">
                          <h3>Thank You</h3>

                          <span className="response">{responseMessage}</span>
                        </div>
                        <div className="historyCancelModal">
                          <button
                            className="second"
                            type="submit"
                            onClick={handleModalCloseConfirmation}
                          >
                            OK
                          </button>
                        </div>
                      </form>
                    </div>
                  </Box>
                </Modal>
              </>
            );
          })}
        </>
      )}
    </>
  );
};
export default FlightHistory;
