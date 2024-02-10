import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import BookWrapper from "./pages/flight/Bookwrapper";
import Searchresult from "./pages/flight/Searchresult";
import "./App.css";
import LoginForm from "./components/Login";
import DummyTicketBookingForm from "./components/DummyTicketBookingForm"
import SignUp from "./components/Signup";
import Hotel from "./pages/Hotel/HotelHome";
import HolidayPackageSearchResult from "./pages/holidaypackages/holidaypackagesearchresult/HolidayPackageSearchResult";
// import HolidaypackageInfo from "./pages/holidaypackages/holidaypackageInfo/HolidaypackageInfo";
// import HolidayPassengerDetail from "./pages/holidaypackages/holidaypassengerdetail/HolidayPassengerDetail";
import Holidaypackages from "./pages/holidaypackages/Holidaypackages";
import Payment from "./pages/flight/Payment";
// import Booking from "./pages/Return/Booking";
// import CompleteBooking from "./pages/Return/CompleteBooking";
// Forex
import Forex from "./pages/forex/Forex";
// Bus
import Bus from "./pages/bus/Bus";
import BusReviewBooking from "./pages/bus/busreviewbooking/BusReviewBooking";
import BusPassengerDetail from "./pages/bus/bussearchresult/BusPassengerDetails";
import BusBookingConfirmation from "./pages/bus/busbookingconfirmation/BusBookingConfirmation";
import BusSearchresult from "./pages/bus/bussearchresult/BusSearchresult";
// Taxi
import Taxi from "./pages/taxi/Taxi";
import SeatLayout from "./pages/bus/bussearchresult/SeatLayout";
import Footer from "./layouts/Footer";
import TermandCondition from "./layouts/TermandCondition"
import PrivacyPolicy from "./layouts/PrivacyPolicy"
// import { useLocation } from "react-router-dom";
// import ReturnFlight from "./pages/Return/ReturnFlight";
// import PaymentReturn from "./pages/Return/PaymentReturn";
// import Conformation from "./pages/Return/Conformation";
// import NonStopFlight from "./pages/Return/NonStopFlight";
import BusResult from "./pages/bus/bussearchresult/BusResult";
import Download from "./pages/home/Download";
import Holidayinfo from "./pages/holidaypackages/holidaypackagesearchresult/Holidayinfo";

import SsdcForm from './components/ssdc/SSDClanding'
import HotelSearch from './pages/Hotel/hotelsearch/HotelSearch';
import HotelBooknow from './pages/Hotel/hotelbokknow/HotelBooknow'
import Reviewbooking from './pages/Hotel/hotelreviewbooking/Reviewbooking'
import { useDispatch } from 'react-redux';
import { getMarkUpAction } from './Redux/markup/markupAction';
import Guestdetail from "./pages/Hotel/guestdetail/Guestdetail";
import HotelTicketGeneration from "./pages/Hotel/HotelTicketGeneration/HotelTicketGeneration";
import RefundPolicy from "./layouts/RefundPolicy";
import AboutUs from "./layouts/AboutUs";
import BookedTicket from "./pages/flight/BookedTicket";
import Flighterror from "./pages/flight/Flighterror";
import ContactUs from "./layouts/ContactUs";
import BookingHistory from "./components/bookingHistory/BookingHistory"
import HolidayCategoryDetails from "./pages/holidaypackages/holidayCategory/HolidayCategoryDetails";
import { debounce } from 'lodash';
import { useLocation } from 'react-router-dom';
// import InsideNavbar from "./UI/BigNavbar/InsideNavbar"

import FlightETicket from "../src/components/FlightETicket"
import DummyPnrHome from "./components/DummyPnrHome"
import HolidayCountryDetails from './pages/holidaypackages/holidayCategory/HolidayCountryDetails';




function App() {
  // const location = useLocation();
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getMarkUpAction())
  }, [])

  // const isSearchResult = location.pathname.includes("/Searchresult");
  // const isPayment = location.pathname.includes("/payment");


  // const [windowWidth, setWindowWidth] = useState(window.innerWidth > 750);

  // const updateDimensions = useCallback(
  //   debounce(() => {
  //     setWindowWidth(window.innerWidth > 750);
  //   }, 200),
  //   []
  // );

  // useEffect(() => {
  //   const handleResizeScroll = () => {
  //     updateDimensions();
  //   };

  //   window.addEventListener('resize', handleResizeScroll);
  //   window.addEventListener('scroll', handleResizeScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener('resize', handleResizeScroll);
  //     window.removeEventListener('scroll', handleResizeScroll);
  //   };
  // }, [updateDimensions]);

  // useEffect(() => {
  //   if (!windowWidth) {
  //     // window.location.href = 'https://play.google.com/store/apps/details?id=com.skytrails';
  //     return (
  //       <Download />
  //     )
  //   }
  // }, [windowWidth]);



  // if (!windowWidth) {
  //   return (

  //     // <Download />
  //     <Home />

  //   )
  // }






  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);





  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };






  return (
    <div className="background_gradient">
      {/* /Searchresult */}


      {showPopup && (
        <div className="popup-container">
          {/* Popup content, e.g., image and close button */}
          <div className="popup-content">
            <img src="https://raw.githubusercontent.com/The-SkyTrails/Images/main/eventBanner.jpeg" alt="Popup" />
            <button className="close-button" onClick={closePopup}>X</button>
          </div>
        </div>
      )}

      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="login" element={<LoginForm />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="flighterror" element={<Flighterror />}></Route>
        <Route path="Searchresult/booknow" element={<BookWrapper />}>
          {" "}
        </Route>
        <Route path="/Searchresult" element={<Searchresult />} />

        <Route path="/payment" element={<Payment />} />
        {/* <Route path="/returnflight" element={<ReturnFlight />} /> */}
        {/* <Route path="/booking" element={<Booking />} /> */}
        {/* <Route path="/completebooking" element={<CompleteBooking />} /> */}
        {/* <Route path="/paymentReturn" element={<PaymentReturn />} /> */}
        {/* <Route path="/conformation" element={<Conformation />} /> */}
        {/* <Route path="/nonstopflight" element={<NonStopFlight />} /> */}

        <Route path="hotel" element={<Hotel />}></Route>
        {/* <Route path="/hotelLoader" element={<HotelHomeResult />} /> */}
        <Route path="/hotel/hotelsearch" element={<HotelSearch />} />
        <Route
          exact
          path="/hotel/hotelsearch/HotelBooknow"
          element={<HotelBooknow />}
        />
        <Route
          exact
          path="/hotel/hotelsearch/HotelBooknow/Reviewbooking"
          element={<Reviewbooking />}
        />
        <Route
          exact
          path="/hotel/hotelsearch/HotelBooknow/Reviewbooking/GuestDetail"
          element={<Guestdetail />}
        />
        <Route
          exact
          path="/hotel/hotelsearch/HotelBooknow/Reviewbooking/GuestDetail/ticket"
          element={<HotelTicketGeneration />}
        />
        <Route exact path="/FlightEticket/:id" element={<FlightETicket />} />


        {/* Holiday packages routes */}
        <Route path="holidaypackages" element={<Holidaypackages />}></Route>

        {/* <Route path="/HolidayInfo" element={<Holidayinfo />} /> */}

        <Route exact path="/HolidayInfo/:id" element={<Holidayinfo />} />

        <Route
          path="/holidaycategorydetails/:keyword"
          element={<HolidayCategoryDetails />}
        ></Route>
        <Route
          path="/holidaycountrydetails/:keyword"
          element={<HolidayCountryDetails />}
        ></Route>

        {/* <Route path="/HolidaypackageInfo" element={<HolidaypackageInfo />} /> */}

        {/* <Route
          path="/holidaypassengerdetail"
          element={<HolidayPassengerDetail />}
        ></Route> */}
        <Route
          path="/HolidayPackageSearchResult/:keyword"
          element={<HolidayPackageSearchResult />}
        />

        <Route
          path="/SSDC/:country"
          element={<SsdcForm />}
        ></Route>

        {/* Bus */}
        <Route path="bus" element={<Bus />}></Route>
        <Route path="/bussearchresult" element={<BusSearchresult />}></Route>
        <Route
          exact
          path="/BusPassengerDetail"
          element={<BusPassengerDetail />}
        />
        <Route path="/BusReviewBooking" element={<BusReviewBooking />}></Route>
        <Route
          path="/BusBookingConfirmation"
          element={<BusBookingConfirmation />}
        ></Route>
        <Route path="/SelectBusSeat" element={<SeatLayout />}></Route>
        <Route path="/busresult" element={<BusResult />}></Route>

        {/* Forex */}
        <Route path="/forex" element={<Forex />} />

        {/* Taxi */}
        <Route path="taxi" element={<Taxi />}></Route>
        <Route path="termAndCondition" element={<TermandCondition />}></Route>
        <Route path="refundPolicy" element={<RefundPolicy />}></Route>
        <Route path="privacypolicy" element={<PrivacyPolicy />}></Route>
        <Route path="aboutus" element={<AboutUs />}></Route>
        <Route path="contactus" element={<ContactUs />}></Route>
        <Route path="/bookedTicket" element={<BookedTicket />}></Route>
        <Route path="/bookinghistory" element={<BookingHistory />}></Route>
        <Route path="/oneWayDummyPnr" element={<DummyTicketBookingForm />}></Route>
        <Route path="/oneWayDummyHome" element={<DummyPnrHome />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
