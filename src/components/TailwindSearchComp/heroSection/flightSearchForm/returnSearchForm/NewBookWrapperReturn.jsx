import React, { useCallback, useEffect, useState } from "react";
import FlightDetailBookWraper from "../../../../BookWraperFlight/FlightDetailBookWraper";
import BookWrapperSummary from "../../../../BookWraperFlight/BookWrapperSummary";
import PassengersDetails from "../../../../BookWraperFlight/NewPassengerDetails";
import { useDispatch, useSelector } from "react-redux";

import {
  fareQuateRuleAirsel,
  fareQuateRuleAirselErrorCheck,
  findPrice,
} from "../../../../../utility/flightUtility/BookwarperUtility";
import {
  fetchFlightQuotesAireselRequestOneway,
  fetchFlightQuotesAireselRequestReturn,
} from "../../../../../Redux/FareQuoteRuleAirsel/actionFlightQuoteRuleAirsel";
import { startBookingProcess } from "../../../../../utility/flightUtility/BookwarperUtility";
import { swalModal } from "../../../../../utility/swal";
import { Await, useNavigate } from "react-router-dom";
import Authentic from "../../../../../pages/Auth/Authentic";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { PassengersAction } from "../../../../../Redux/Passengers/passenger";
import SecureStorage from "react-secure-storage";
import { apiURL } from "../../../../../Constants/constant";
import axios from "axios";
import ContinueBtn from "./ContinueBtn";
import ReckeckPayment from "./ReckeckPayment";
import {
  clearAllFlightBookNew,
  fetchFlightBookRequestOneway,
  fetchFlightBookRequestReturn,
} from "../../../../../Redux/newFlightBook/actionNewFlightBook";
import { standardizeFlightFareResponse } from "../../../../../utility/flightUtility/standardizeFlightResponse";
const NewBookWrapperReturn = () => {
  const [sub, setSub] = useState(false);
  const [passengerData, setPassengerData] = useState([]);
  const [V_aliation, set_Validation] = useState(false);
  const [isSeatMapopen, setIsSeatMapOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [finalAmount, setFinalAmount] = useState(1);
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => {
    return state;
  });
  const navigation = useNavigate();
  const fareCode = reducerState?.fareQuoteRuleAirselReducer;
  const authenticUser = reducerState?.logIn?.loginData?.status;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const [isDisableScroll, setIsDisableScroll] = useState(false);
  const [refundTxnId, setRefundTxnId] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState(null);
  const adult = sessionStorage.getItem("adults");
  const child = sessionStorage.getItem("childs");
  const infant = sessionStorage.getItem("infants");
  const [FlightFareOnward, setFlightFareOnward] = useState([]);
  const [FlightFareReturn, setFlightFareReturn] = useState([]);

  const markUP =
    reducerState?.markup?.markUpData?.data?.result?.[0]?.flightMarkup;
  // console.log(markUP, "markUp");

  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
  useEffect(() => {
    if ((Onward, Return)) {
      const onwardData = standardizeFlightFareResponse(
        Onward,
        adult,
        child,
        infant
      ); // Get standardized data
      const returnData = standardizeFlightFareResponse(
        Return,
        adult,
        child,
        infant
      ); // Get standardized data
      setFlightFareOnward(onwardData); // Update state with data
      setFlightFareReturn(returnData); // Update state with data
    }
  }, []);

  const totalBase =
    FlightFareOnward?.Adt?.Basic +
    FlightFareOnward?.Chd?.Basic +
    FlightFareOnward?.Inf?.Basic +
    FlightFareReturn?.Adt?.Basic +
    FlightFareReturn?.Chd?.Basic +
    FlightFareReturn?.Inf?.Basic;
  const totalTax =
    FlightFareOnward?.Adt?.Taxes +
    FlightFareOnward?.Chd?.Taxes +
    FlightFareOnward?.Inf?.Taxes +
    FlightFareReturn?.Adt?.Taxes +
    FlightFareReturn?.Chd?.Taxes +
    FlightFareReturn?.Inf?.Taxes;
  const grandTotal =
    FlightFareOnward?.Adt?.Total +
    FlightFareOnward?.Chd?.Total +
    FlightFareOnward?.Inf?.Total +
    FlightFareReturn?.Adt?.Total +
    FlightFareReturn?.Chd?.Total +
    FlightFareReturn?.Inf?.Total;
  let lastFinalPrice = (grandTotal + grandTotal * markUP)?.toFixed();
  // console.log(lastFinalPrice, "lastFinalPrice");

  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;
  const finalPricee = useCallback(async () => {
    const onwardPrice = await findPrice("onward");
    const returnPrice = await findPrice("return");
    // console.log(onwardPrice, returnPrice, "onwordpricereturnprice");
    return onwardPrice + returnPrice; // Return a computed value if needed
  }, [fareCode]);

  useEffect(() => {
    finalPricee(); // Call the function
    // console.log("Final Price:", price);
  }, [finalPricee]);
  const handleTravelClickOpen = () => {
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    } else {
      dispatch(PassengersAction(passengerData));
      setOpen(true);
      setIsConfirmationModalOpen(true);
      // setOpenTravelModal(true);
    }
  };
  const handleModalClose = () => {
    setIsLoginModalOpen(false);
  };
  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };
  const handlePayment = async () => {
    // console.log(passengerData)
    const token = SecureStorage?.getItem("jwtToken");
    setLoaderPayment1(true);
    setIsDisableScroll(true);
    const payload = {
      firstname: passengerData?.[0]?.firstName,
      phone: passengerData?.[0]?.ContactNo,
      // amount: Number(finalAmount).toFixed(2),
      // transactionAmount ||
      // grandTotal,
      amount: lastFinalPrice,

      // amount: 1,
      email: passengerData?.[0]?.email,
      productinfo: "ticket",
      bookingType: "FLIGHTS",
      surl: `${apiURL.baseURL}/skyTrails/successVerifyApi?merchantTransactionId=`,
      furl: `${apiURL.baseURL}/skyTrails/paymentFailure?merchantTransactionId=`,
    };

    // setToggle(false);
    handleConfirmationModalClose();

    try {
      const response = await fetch(apiUrlPayment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();

        proceedPayment(data.result.access, "prod", data.result.key);
      } else {
        const errorData = await response.json();

        setIsDisableScroll(false);
      }
    } catch (error) {
      // Handle network errors or exceptions

      setIsDisableScroll(false);
    } finally {
      setLoaderPayment1(false);
    }
  };

  const proceedPayment = (accessKey, env, key) => {
    const easebuzzCheckout = new window.EasebuzzCheckout(key, env);
    const options = {
      access_key: `${accessKey}`,
      onResponse: async (response) => {
        if (response.status === "success") {
          try {
            // Make API call if payment status is 'success'
            const easeBuzzPayId = response.easepayid;
            setRefundTxnId(response.easepayid);
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentSuccess?merchantTransactionId=${response.txnid}`,
              { easeBuzzPayId: easeBuzzPayId }
            );
            setLoaderPayment(true);
            dispatch(PassengersAction(passengerData));
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          }

          setIsDisableScroll(false);
        } else {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );

            swalModal("py", verifyResponse.data.responseMessage, false);
            // Handle verifyResponse as needed
            setTransactionAmount(null);
            setIsDisableScroll(false);
            sessionStorage.removeItem("couponCode");
            // setTimer11(false);

            setToggle(false);
          } catch (error) {
            console.error("Error verifying payment:", error);
            setIsDisableScroll(false);
            // Handle error
          }
        }
      },
      theme: "#123456", // Replace with your desired color hex
    };

    // Initiate payment on button click
    easebuzzCheckout.initiatePayment(options);
  };
  const handleBookingProcess = () => {
    // startBookingProcess("onward", passengerData);
    dispatch(fetchFlightBookRequestOneway("onward"));
    dispatch(fetchFlightBookRequestReturn("return"));
    navigation("/newFlight/newBookedTicket");
  };
  useEffect(() => {
    dispatch(clearAllFlightBookNew());
  }, []);
  useEffect(() => {
    if (loaderPayment == true) {
      handleBookingProcess();
      console.log("payment sucessfully completed");
    }
  }, [loaderPayment]);
  useState(() => {
    dispatch(fetchFlightQuotesAireselRequestOneway("onward"));
    dispatch(fetchFlightQuotesAireselRequestReturn("return"));
  }, []);

  useEffect(() => {
    const checkErrors = async () => {
      try {
        // console.log(reducerState, "reducerState");

        const onwardError = await fareQuateRuleAirselErrorCheck("onward");
        const returnError = await fareQuateRuleAirselErrorCheck("return");

        // console.log(onwardError, returnError, "onward error");

        if (
          onwardError?.error == true ||
          // && onwardError?.loading == false

          returnError?.error == true
          // && returnError?.loading == false
        ) {
          swalModal(
            "flight",
            "No Class Available", // Replace with appropriate error message if needed
            false
          );
          navigation(-1);
          // abhi k liye
        }
      } catch (error) {
        console.error("Error checking fare quote rules:", error);
      }
    };

    checkErrors();
  }, [fareCode]);

  // const onwardFare = fareQuateRuleAirsel("onward");

  // const returnFare = fareQuateRuleAirsel("return");
  const FlightItineraryLoader = ({
    message = "We’re booking your flight...",
  }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
        {/* Dots Animation */}
        <div className="flex space-x-4 mb-6">
          <div className="w-6 h-6 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-6 h-6 bg-white rounded-full animate-bounce delay-200"></div>
          <div className="w-6 h-6 bg-white rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-extrabold text-white mt-6">
          Creating Your Itinerary...
        </h1>
        <p className="text-gray-100 mt-2">
          Please wait while we process your request.
        </p>
      </div>
    );
  };

  return (
    <>
      {!lastFinalPrice ? (
        <FlightItineraryLoader />
      ) : (
        <div className="custom-container  flex flex-col sm:flex-row gap-3 mt-3 ">
          <div className="w-full sm:w-8/12">
            <FlightDetailBookWraper />
            <PassengersDetails
              sub={sub}
              passengerDataa={passengerData}
              setPassengerDataa={setPassengerData}
              set_Validation={set_Validation}
              isSeatMapopen={isSeatMapopen}
              setIsDropdown={setIsDropdown}
              setIsSeatMapOpen={setIsSeatMapOpen}
            />
            <ContinueBtn
              valiation={V_aliation}
              setSub={() => setSub(true)}
              handleTravelClickOpen={handleTravelClickOpen}
              // handleTravelClickOpen={handleBookingProcess}
            />
            {/* {!V_aliation ? (
          <button
            className="py-2 px-8 mt-4  bg-indigo-600 font-bold text-center rounded-md text-white "
            // type="submit"
            onClick={() => setSub(true)}
            // onClick={() => handleTravelClickOpen()}
          >
            Continue
          </button>
        ) : (
          <button
            className="py-2 px-8 mt-4  bg-red-600 font-bold text-center rounded-md text-white "
            // type="submit"
            // onClick={() => handleBookingProcess()}
            onClick={() => handleTravelClickOpen()}
          >
            Continue
          </button>
        )} */}
          </div>
          <BookWrapperSummary />
          <Authentic isOpen={isLoginModalOpen} onClose={handleModalClose} />
          <ReckeckPayment
            isConfirmationModalOpen={isConfirmationModalOpen}
            handleConfirmationModalClose={handleConfirmationModalClose}
            handlePayment={handlePayment}
            // handlePayment={handleBookingProcess}
          />
          {/* <Dialog
        sx={{ zIndex: "99999" }}
        disableEscapeKeyDown
        open={isConfirmationModalOpen}
      >
        <DialogContent>Are you Sure Your details are Correct ?</DialogContent>
        <DialogActions>
          <div className="flex w-full justify-center items-center gap-2">
            <button
              className=" bg-white border-2 border-primary-700 text-primary-700 px-[24px] py-[8px] rounded-md font-semibold"
              onClick={handleConfirmationModalClose}
            >
              Re Check
            </button>
            <button
              className=" bg-primary-700 border-2 border-primary-700 text-white  px-[24px] py-[8px] rounded-md font-semibold"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </DialogActions>
      </Dialog> */}
        </div>
      )}
    </>
  );
};

export default NewBookWrapperReturn;
