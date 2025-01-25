import React, { useCallback, useEffect, useRef, useState } from "react";
import FlightDetailBookWraper from "../../../../BookWraperFlight/FlightDetailBookWraper";
import BookWrapperSummary from "../../../../BookWraperFlight/BookWrapperSummary";
import PassengersDetails from "../../../../BookWraperFlight/NewPassengerDetails";
import { useDispatch, useSelector } from "react-redux";

import {
  fareQuateRuleAirsel,
  fareQuateRuleAirselErrorCheck,
  findPrice,
  findSeatMealBaggagePrice,
  flightSeatMap,
} from "../../../../../utility/flightUtility/BookwarperUtility";
import {
  fetchFlightQuotesAireselRequestOneway,
  fetchFlightQuotesAireselRequestReturn,
} from "../../../../../Redux/FareQuoteRuleAirsel/actionFlightQuoteRuleAirsel";
// import { startBookingProcess } from "../../../../../utility/flightUtility/BookwarperUtility";
import { swalModal } from "../../../../../utility/swal";
import { Await, useNavigate } from "react-router-dom";
import Authentic from "../../../../../pages/Auth/Authentic";
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
import ReviewTravellerFlight from "./ReviewTravellerFlight";
// import { setSelectedFlightRequest } from "../../../../../Redux/Itenary/itenary";
import {
  flightSeatRequestOnward,
  flightSeatRequestReturn,
} from "../../../../../Redux/AirlineSeatMapNew/actionAirlineSeatMap";
import AirSeatMapModal from "./AirSeatMapModal";
const NewBookWrapperReturn = () => {
  const [sub, setSub] = useState(false);
  const [passengerData, setPassengerData] = useState([]);
  const [V_aliation, set_Validation] = useState(false);
  const [isSeatMapopen, setIsSeatMapOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = React.useState(false);
  // const [finalAmount, setFinalAmount] = useState(1);
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => {
    return state;
  });

  // console.log(V_aliation, "V_aliationV_aliationV_aliation");
  // console.log(reducerState, "reducerState in book wrapper");
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
  const [airSeatMapModal, SetAirSeatMapModal] = useState(false);
  const [reviewTravellerModal, setReviewTravellerModal] = useState(false);
  const [openSSR, setOpenSSR] = useState(false);

  const markUP =
    reducerState?.markup?.markUpData?.data?.result?.[0]?.flightMarkup;
  // console.log(markUP, "markUp");

  const seatbaggagePrice = findSeatMealBaggagePrice();
  const combinedAddOnPrice =
    (seatbaggagePrice?.seatPrice > 0 ? seatbaggagePrice?.seatPrice : 0) +
    (seatbaggagePrice?.mealPrice > 0 ? seatbaggagePrice?.mealPrice : 0) +
    (seatbaggagePrice?.baggagePrice > 0 ? seatbaggagePrice?.baggagePrice : 0);

  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
  const farequoteOnward = reducerState?.fareQuoteRuleAirselReducer?.oneway;
  const farequoteReturn = reducerState?.fareQuoteRuleAirselReducer?.return;

  const formRef = useRef(null);

  const handleFocusForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
      formRef.current.getElementsByTagName("div")[0].classList.add("mt-20");
      // console.log(
      //   formRef.current,
      //   "form formRef.current.getElementsByClassname"
      // );
    }
  };
  const handleTravelClickYes = () => {
    setReviewTravellerModal(false);
    // console.log(Onward, "onward97");
    if (
      (Onward?.type == "KAFILA" && Return?.type == "KAFILA") ||
      (!Return && Onward?.type == "KAFILA")
    ) {
      setIsConfirmationModalOpen(true);
    } else {
      SetAirSeatMapModal(true);
    }
  };
  const handleSkipToPayment = () => {
    SetAirSeatMapModal(false);
    setIsConfirmationModalOpen(true);
  };

  // console.log("Onward", Onward, Return, reducerState, "ReturnSelected");

  useEffect(() => {
    if (Onward) {
      const onwardData = standardizeFlightFareResponse(
        Onward,
        adult,
        child,
        infant
      ); // Get standardized data
      setFlightFareOnward(onwardData); // Update state with data
    }
    if (Return) {
      const returnData = standardizeFlightFareResponse(
        Return,
        adult,
        child,
        infant
      ); // Get standardized data

      setFlightFareReturn(returnData); // Update state with data
    }
  }, []);

  const totalOnward =
    FlightFareOnward?.Adt?.Total +
    FlightFareOnward?.Chd?.Total +
    FlightFareOnward?.Inf?.Total;

  const totalReturn =
    FlightFareReturn?.Adt?.Total +
    FlightFareReturn?.Chd?.Total +
    FlightFareReturn?.Inf?.Total;

  const grandTotal = Number(totalOnward + (Return ? totalReturn : 0));
  const newGrandTotal = (grandTotal + grandTotal * markUP)?.toFixed();
  // console.log(grandTotal, "grand total");
  let lastFinalPrice = (
    Number(newGrandTotal) + Number(combinedAddOnPrice)
  )?.toFixed();
  // console.log(lastFinalPrice, "lastFinalPrice");

  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  const finalPricee = useCallback(async () => {
    if (Return && Onward) {
      const onwardPrice = await findPrice("onward");
      const returnPrice = await findPrice("return");
      return onwardPrice + returnPrice;
    } else if (Onward) {
      const onwardPrice = await findPrice("onward");
      return onwardPrice;
    }
  }, [fareCode]);

  useEffect(() => {
    finalPricee();
  }, [finalPricee]);

  const handleTravelClickOpen = () => {
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    } else {
      dispatch(PassengersAction(passengerData));
      setOpen(true);
      setReviewTravellerModal(true);
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
      // ye wala hai
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
    dispatch(fetchFlightBookRequestOneway("onward"));
    if (Return) {
      dispatch(fetchFlightBookRequestReturn("return"));
    }
    navigation("/newFlight/newBookedTicket");
  };
  useEffect(() => {
    dispatch(clearAllFlightBookNew());
  }, []);

  useEffect(() => {
    if (loaderPayment == true) {
      handleBookingProcess();
      // console.log("payment sucessfully completed");
    }
  }, [loaderPayment]);
  useState(() => {
    // console.log(Onward, Return, "onwardReturn");
    if (Onward && Return) {
      dispatch(fetchFlightQuotesAireselRequestOneway("onward"));
      dispatch(fetchFlightQuotesAireselRequestReturn("return"));

      // dispatch(flightSeatRequestOnward("onward"));
      // dispatch(flightSeatRequestReturn("return"));
    } else if (Onward) {
      dispatch(fetchFlightQuotesAireselRequestOneway("onward"));
      // dispatch(flightSeatRequestOnward("onward"));
    }
  }, []);

  useEffect(() => {
    const checkErrors = async () => {
      try {
        const onwardError = await fareQuateRuleAirselErrorCheck("onward");
        // console.log(Return, "return308", farequoteOnward);
        // console.log(
        //   onwardError,
        //   // returnError,
        //   "onwardErroronwardError",
        //   onwardError?.error,
        //   !onwardError?.loading,
        //   Object.keys(farequoteOnward).length > 0
        // );
        const returnError =
          Return && (await fareQuateRuleAirselErrorCheck("return"));

        !onwardError?.error &&
          !onwardError?.loading &&
          Object.keys(farequoteOnward).length > 0 &&
          dispatch(flightSeatRequestOnward("onward"));

        Return &&
          !returnError?.error &&
          !returnError?.loading &&
          Object.keys(farequoteReturn).length > 0 &&
          dispatch(flightSeatRequestReturn("return"));

        if (onwardError?.error == true || returnError?.error == true) {
          swalModal("flight", "Selected flight not available", false);
          navigation(-1);
        }
      } catch (error) {
        console.error("Error checking fare quote rules:", error);
      }
    };

    checkErrors();
  }, [fareCode]);

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
        <div className="container  flex flex-col sm:flex-row gap-3 mt-3 ">
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
              ref={formRef}
            />
            <ContinueBtn
              valiation={V_aliation}
              setSub={() => setSub(true)}
              setReviewTravellerModal={() => setReviewTravellerModal(true)}
              handleTravelClickOpen={handleTravelClickOpen}
              handleFocus={handleFocusForm}
            />
          </div>
          <BookWrapperSummary widdthh={"w-full sm:w-4/12"} />
          <Authentic isOpen={isLoginModalOpen} onClose={handleModalClose} />
          <ReckeckPayment
            isConfirmationModalOpen={isConfirmationModalOpen}
            handleConfirmationModalClose={handleConfirmationModalClose}
            handlePayment={handlePayment}
            // handlePayment={handleBookingProcess}
          />
          <ReviewTravellerFlight
            passengerData={passengerData}
            isModal={reviewTravellerModal}
            closeModal={() => setReviewTravellerModal(false)}
            closeModalWithYes={() => handleTravelClickYes()}
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
          <AirSeatMapModal
            passengerData={passengerData}
            isSeatModal={airSeatMapModal}
            closeSeatModal={() => SetAirSeatMapModal(false)}
            handleSkipToPayment={() => handleSkipToPayment()}
          />
        </div>
      )}
    </>
  );
};

export default NewBookWrapperReturn;
