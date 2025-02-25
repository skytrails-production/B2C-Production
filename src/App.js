import React, { useState, useCallback, useEffect } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import BookWrapper from "./pages/flight/Bookwrapper";
import BookWrapperAmd from "./pages/flight/BookwrapperAmd";
import BookWrapperAmdNew from "./pages/flight/BookwrapperAmdNew";
// import Searchresult from "./pages/flight/Searchresult";
import Searchresult from "./pages/flight/flightResult/FlightMain";
import "./App.css";
import "./index.scss";
import "./styles/index.scss";
import LoginForm from "./components/Login";
import DummyTicketBookingForm from "./components/DummyTicketBookingForm";
// import SignUp from "./components/Signup";
import BookedTicketAmd from "./pages/flight/BookedTicketAmd";
import Hotel from "./pages/Hotel/HotelHome";
// import Payment from "./pages/flight/Payment";

// Bus
import Bus from "./pages/bus/Bus";
import BusBookingConfirmation from "./pages/bus/busbookingconfirmation/BusBookingConfirmation";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "./layouts/Footer";
import TermandCondition from "./layouts/TermandCondition";
import PrivacyPolicy from "./layouts/PrivacyPolicy";
// import { useLocation } from "react-router-dom";
// import ReturnFlight from "./pages/Return/ReturnFlight";
// import PaymentReturn from "./pages/Return/PaymentReturn";
// import Conformation from "./pages/Return/Conformation";
// import NonStopFlight from "./pages/Return/NonStopFlight";
import Download from "./pages/home/Download";

import SsdcForm from "./components/ssdc/SSDClanding";
import Hotelresult from "./pages/Hotel/hotelresult/Hotelresult";
import HotelSearch from "./pages/Hotel/hotelsearch/HotelSearch";
import HotelBooknow from "./pages/Hotel/hotelbokknow/HotelBooknow";
import Reviewbooking from "./pages/Hotel/hotelreviewbooking/Reviewbooking";
import { useDispatch, useSelector } from "react-redux";
import { getMarkUpAction } from "./Redux/markup/markupAction";
import Guestdetail from "./pages/Hotel/guestdetail/Guestdetail";
import HotelTicketGeneration from "./pages/Hotel/HotelTicketGeneration/HotelTicketGeneration";
import RefundPolicy from "./layouts/RefundPolicy";
import AboutUs from "./layouts/AboutUs";
import BookedTicket from "./pages/flight/BookedTicket";
import NewBookedTicket from "./pages/flight/flightResult/NewBookTicket";
import Flighterror from "./pages/flight/Flighterror";
import ContactUs from "./layouts/ContactUs";
import BookingHistory from "./components/bookingHistory/BookingHistory";
// import HolidayCategoryDetails from "./pages/holidaypackages/holidayCategory/HolidayCategoryDetails";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";
import InsideNavbar from "./UI/BigNavbar/InsideNavbar";

import FlightETicket from "../src/components/FlightETicket";
import BusETicket from "../src/components/BusETicket";
import DummyPnrHome from "./components/DummyPnrHome";
// import HolidayCountryDetails from "./pages/holidaypackages/holidayCategory/HolidayCountryDetails";
import Events from "./pages/Event/Events";
import ReturnMain from "./pages/flight/ReturnFlight/ReturnMain";
// import ReturnResult from "./pages/flight/ReturnFlight/ReturnResult";
import ReturnResult from "./pages/flight/ReturnFlight/newRetun/ReturnFlightMain";
import ReturnResultInternational from "./pages/flight/ReturnFlight/ReturnResultInternational";
import BookWrapperReturn from "./components/TailwindSearchComp/heroSection/flightSearchForm/returnSearchForm/NewBookWrapperReturn";

import ReturnPassenger from "./pages/flight/ReturnFlight/ReturnPassenger";

import Whatsapp from "./Whatsapp";
import ReturnReviewBooking from "./pages/flight/ReturnFlight/ReturnReviewBooking";
// import BookedTicketWithReturn from './pages/flight/ReturnFlight/BookedTicketWithReturn';
import BookedTicketWithReturn from "./pages/flight/ReturnFlight/BookTicketWithReturn";

import PassengerInternational from "./pages/flight/ReturnFlight/PassengerInternational";
import ReturnReviewInternational from "./pages/flight/ReturnFlight/ReturnReviewInternational";
import BookedTicketInternationalDB from "./pages/flight/ReturnFlight/BookedTicketInternationalDB";

import { useNetworkState } from "react-use";
import Offline from "./components/Offline";
// import HolidayBudgetDetails from "./pages/holidaypackages/holidayCategory/HolidayBudgetDetails";
import MulticityResult from "./pages/flight/MultiCity/MulticityResult";
import MulticityPassengerDetails from "./pages/flight/MultiCity/MulticityPassengerDetails";
import MulticityReviewBooking from "./pages/flight/MultiCity/MulticityReviewBooking";
import BookedTicketMulticityDB from "./pages/flight/MultiCity/BookedTicketMulticityDB";
import GrmHotelHome from "./pages/GRMHotel/GrmHotelHome";
import HotelResult from "./pages/GRMHotel/HotelResult";
import BookingDetailsGRN from "./pages/GRMHotel/BookingDetailsGRN";
import BookingReviewGRN from "./pages/GRMHotel/BookingReviewGRN";
import HotelTicketDB from "./pages/GRMHotel/HotelTicketDB";
import HotelBookRoomGRN from "./pages/GRMHotel/HotelBookRoomGRN";
import { ipAction, tokenAction } from "./Redux/IP/actionIp";
import BlogDetailsSingle from "./pages/home/BlogDetailsSingle";
import PayLater from "./PayLater";
import PaylaterDetails from "./Mihuru/PaylaterDetails";
import VerifyPayLater from "./Mihuru/VerifyPayLater";

import PayLaterUsereCredential from "./Mihuru/PayLaterUsereCredential";
import TnplGeneratedPlan from "./Mihuru/TnplGeneratedPlan";
import ScrollToTop from "./ScrollToTOp";
import RandomPayment from "./RandomPayment";
import RandomPaymentSuccess from "./RandomPaymentSuccess";
import SkytailsTrendingPackages from "./components/SkytrailsTrendingPackage/SkytailsTrendingPackages";
import AllBlogs from "./pages/home/AllBlogs";
import MihuruPaymentSuccess from "./Mihuru/MihuruPaymentSuccess";

import Logininventory from "./pages/Inventory/Logininventory";
import Registerinventory from "./pages/Inventory/Registerinventory";
import InventoryHotelForm from "./pages/Inventory/InventoryHotelForm";

import HotelResultMain from "./pages/GRMHotel/HotelResultMain";
import Reviews from "./pages/userReview/UserReview";

import "../src/pages/flight/selectflight.css";
import SmallDevice from "./components/SmallDevicePopUp";

import ItenaryDashboard from "./pages/Itenary/ItenaryDashboard";
import ItenaryResult from "./pages/Itenary/ItenaryResult";

import InventoryForgetPassword from "./pages/Inventory/InventoryForgetPassword";
import InventoryDashboard from "./pages/Inventory/InventoryDashboard";

import ItenaryPdfDownloader from "./pages/Itenary/ItenaryPdfDownloader";
import HolidayPackageResultMain from "./pages/NewPackagePages/HolidayPackageSearchResult/HolidayPackageResultMain";
import HolidayDetailsEnquiry from "./pages/NewPackagePages/holidayDetailsEnquiryPages/HolidayDetailsEnquiry";
import PackageHomePage from "./pages/NewPackagePages/PackageHomePage";
import Navbar from "./pages/navbar/Navbar";
import BottomNavbar from "./pages/navbar/BottomNavbar";

import Packageform from "./pages/NewPackagePages/Packageform/Packageform";
import PhoneNumber from "./components/PhoneNumber";
import Career from "./pages/skyTrailsCarrer/Career";
import BusResultMain from "./pages/bus/BusResult/BusResultMain";
import BusPassengerDetail from "./pages/bus/busPassengerDetails/BusPassengerDetails";
import BusFinalReview from "./pages/bus/busFinalReview/BusFinalReview";

// import SectionHero from "./pages/tailwindDesign/SectionHero";
import NewHome from "./pages/tailwindDesign/NewHome";
import MainNav from "./pages/tailwindDesign/MainNav";

import Bookwrapperkafila from "./pages/flight/flightResult/Kafilapi/Bookwrapperkafila";
import Kafilabookingdetails from "./pages/flight/flightResult/Kafilapi/Kafilabookingdetails";
import OfferDetails from "./components/TailwindSearchComp/offerPage/OfferDetails";
import AllOffers from "./components/TailwindSearchComp/offerPage/AllOffers";

import GetaCallback from "./GetaCallback";

import UserProfile from "./components/TailwindSearchComp/profilePage/UserProfile";
import HotelSelectroomMain from "./pages/GRMHotel/tboHotel/hotelselectroom/HotelSelectroomMain";
import TboGuestDetails from "./pages/GRMHotel/tboHotel/tboGuestDetails/TboGuestDetails";
import TboBookingHotel from "./pages/GRMHotel/tboHotel/bookHotel/TboBookingHotel";
import TboTicketGeneration from "./pages/GRMHotel/tboHotel/bookHotel/TboTicketGeneration";
import { faqRatingListReq } from "./Redux/Faq&Rating/actionFaqRating";
import DownloadHotelPdf from "./components/bookingHistory/DownloadHotelPdf";
import ResultOnewayMain from "./pages/flight/Oneway/ResultOneway/ResultOnewayMain";
import OnewayBookingPage from "./pages/flight/Oneway/OnewayPassengerDetails/OnewayBookingPage";
import AllMainPageHoliday from "./pages/NewPackagePages/AllPackage/AllMainPageHoliday";
import PageNotFound from "./PageNotFound";

function App() {
  // const location = useLocation();
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notOnline = useNetworkState();

  useEffect(() => {
    dispatch(ipAction());
    dispatch(faqRatingListReq());
  }, []);

  useEffect(() => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
    };
    dispatch(tokenAction(payload));
  }, [reducerState?.ip?.ipData]);
  // console.log(state, "network state..............")
  useEffect(() => {
    const disableInspect = (e) => {
      if (
        e.shiftKey && e.ctrlKey && e.keyCode === 123 || // F12
        e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74) || // Ctrl + Shift + I/J
        e.ctrlKey && e.keyCode === 85 // Ctrl + U
      ) {
        e.preventDefault();
        return false;
      }
    };

    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', disableInspect);
    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      document.removeEventListener('keydown', disableInspect);
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  useEffect(() => {
    dispatch(getMarkUpAction());
  }, []);

  const [cacheLoader, setCacheLoader] = useState(false);

  useEffect(() => {
    setCacheLoader(true);
    const cacheBuster = new Date().getTime();
    const updateAssetURLs = () => {
      // const links = document.querySelectorAll('link[rel="stylesheet"]');
      // links.forEach(link => {
      //   const href = link.getAttribute('href');
      //   if (href) {
      //     link.setAttribute('href', `${href}?v=${cacheBuster}`);
      //   }
      // });
      const scripts = document.querySelectorAll("script[src]");
      scripts.forEach((script) => {
        const src = script.getAttribute("src");
        if (src) {
          script.setAttribute("src", `${src}?v=${cacheBuster}`);
        }
      });
    };

    updateAssetURLs();
    setCacheLoader(false);
  }, []); // Empty dependency array ensures this runs only on initial load

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
  const location = useLocation();
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

  const handleDownload = () => {
    navigate("/pefaevent");
    setShowPopup(false);
  };
  if (!notOnline.online) {
    return (
      <div>
        <Offline />
      </div>
    );
  }

  // console.log(location.pathname, "location of pathname")
  if (cacheLoader) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "8px solid #f3f3f3",
            borderTop: "8px solid #e73c34",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "rotate 1s linear infinite",
            margin: "0 auto",
          }}
        ></div>
      </div>
    );
  }

  // console.log(reducerState, "reducer state");

  return (
    <div className="background_gradien bg-white">
      {/* <div className="triColorBox">
        
      </div> */}

      {/* <div class="triColorBox">
        <h3>This Independence day get upto 500/- discount !</h3>
      </div> */}

      {/* {location.pathname == "/" &&
        <SmallDevice />} */}

      {location.pathname !== "/inventoryLogin" &&
        location.pathname !== "/inventoryRegister" &&
        location.pathname !== "/phone" &&
        location.pathname !== "/inventoryDashboard" &&
        location.pathname !== "/Package/form" &&
        location.pathname !== "/inventoryhotelform" && (
          // !location.pathname.includes("/holidaypackages") &&
          <MainNav />
        )}
      {/* {location.pathname !== "/inventoryLogin" &&
        location.pathname !== "/inventoryRegister" &&
        location.pathname !== "/phone" &&
        location.pathname !== "/inventoryDashboard" &&
        location.pathname !== "/Package/form" &&
        location.pathname !== "/inventoryhotelform" && <Navbar />} */}
      {location.pathname !== "/inventoryLogin" &&
        location.pathname !== "/inventoryRegister" &&
        location.pathname !== "/phone" &&
        location.pathname !== "/Package/form" &&
        location.pathname !== "/inventoryhotelform" && <BottomNavbar />}

      {/* {(location.pathname.includes("/holidaypackages/c") || location.pathname.includes("/holidaypackages/p") ||  location.pathname.includes("/holidaypackages/b")) &&
          <Navbar />} */}

      {/* 
      {location.pathname == "/" ||
        location.pathname == "/st-hotel" ||
        location.pathname == "/holidaypackages" ||
        location.pathname == "/bus" || <BottomNavbar />} */}

      {/* /Searchresult */}

      {/* {showPopup && (
        <div className="popup-container">
          <div className="popup-content">

            <img onClick={handleDownload} src="https://raw.githubusercontent.com/The-SkyTrails/Images/main/eventBanner.jpeg" alt="Popup" />

            <button className="close-button" onClick={closePopup}>X</button>
          </div>
        </div>
      )} */}

      {/* <InsideNavbar /> */}

      {/* <SmallDevice /> */}

      {/* <BottomNavbar /> */}

      <Routes>
        <Route index element={<Home />}></Route>
        {/* <Route path="/Return" element={<ReturnMain />}></Route> */}
        <Route path="/ReturnResult" element={<ReturnResult />}></Route>
        <Route path="/tailwind" element={<NewHome />}></Route>
        <Route
          path="/ReturnResultInternational"
          element={<ReturnResultInternational />}
        ></Route>
        <Route
          path="/ReturnResultInternational/PassengerDetailsInternational"
          element={<PassengerInternational />}
        ></Route>
        <Route
          path="/ReturnResultNew/PassengerDetails"
          element={<BookWrapperReturn />}
        ></Route>
        <Route
          path="/FlightresultReturn/PassengerDetailsInternational/returnreviewbookingInternational"
          element={<ReturnReviewInternational />}
        ></Route>
        <Route
          path="/FlightresultReturn/PassengerDetailsInternational/returnreviewbookingInternational/bookedTicketWithIntl"
          element={<BookedTicketInternationalDB />}
        ></Route>
        <Route
          path="/newFlight/newBookedTicket"
          element={<NewBookedTicket />}
        ></Route>
        <Route path="/multicityresult" element={<MulticityResult />}></Route>
        <Route
          path="/multicityresult/PassengerDetailsMulticity"
          element={<MulticityPassengerDetails />}
        ></Route>
        <Route
          path="/multicityresult/PassengerDetailsMulticity/multicityreviewbooking"
          element={<MulticityReviewBooking />}
        ></Route>
        <Route
          path="/multicityresult/PassengerDetailsMulticity/multicityreviewbooking/bookedTicketMulticityDB"
          element={<BookedTicketMulticityDB />}
        ></Route>
        <Route
          exact
          path="/FlightresultReturn/Passengerdetail"
          element={<ReturnPassenger />}
        />
        <Route
          exact
          path="/FlightresultReturn/Passengerdetail/returnreviewbooking"
          element={<ReturnReviewBooking />}
        />
        <Route path="login" element={<LoginForm />}></Route>
        <Route path="reviews" element={<Reviews />}></Route>

        {/* new oneway flight paths  */}

        <Route path="flightlist" element={<ResultOnewayMain />}></Route>
        <Route
          path="/flightlist/passengerdetails"
          element={<OnewayBookingPage />}
        ></Route>

        {/* <Route path="signup" element={<SignUp />}></Route> */}
        <Route path="flighterror" element={<Flighterror />}></Route>
        <Route path="Searchresult/booknow" element={<BookWrapper />}>
          {" "}
        </Route>

        <Route path="Searchresult/bookKafila" element={<Bookwrapperkafila />}>
          {" "}
        </Route>
        <Route
          path="/bookedTicketkafila"
          element={<Kafilabookingdetails />}
        ></Route>
        {/* <Route path="Searchresult/booknowAmd" element={<BookWrapperAmd />}> */}
        <Route path="Searchresult/booknowAmd" element={<BookWrapperAmdNew />}>
          {" "}
        </Route>
        <Route path="/Searchresult" element={<Searchresult />} />

        {/* <Route path="/payment" element={<Payment />} /> */}
        <Route path="/download" element={<Download />} />

        {/* new grm hotel routes  */}

        {/* new grm hotel routes  */}

        <Route path="/st-hotel" element={<GrmHotelHome />}></Route>
        <Route path="/st-hotel/hotelresult" element={<HotelResultMain />} />
        <Route
          path="/st-hotel/hotelresult/selectroom"
          element={<HotelBookRoomGRN />}
        />
        <Route path="/bookedTicketSucess/:id" element={<BookedTicketAmd />} />
        <Route
          path="/st-hotel/hotelresult/selectroom/guestDetails"
          element={<BookingDetailsGRN />}
        />
        <Route
          path="/st-hotel/hotelresult/selectroom/guestDetails/review"
          element={<BookingReviewGRN />}
        />

        <Route
          path="/st-hotel/hotelresult/selectroom/guestDetails/review/ticket"
          element={<HotelTicketDB />}
        />

        {/* tbo routes  */}

        <Route
          exact
          path="/st-hotel/hotelresult/HotelBooknow"
          element={<HotelSelectroomMain />}
        />
        <Route
          exact
          path="/st-hotel/hotelresult/HotelBooknow/Reviewbooking"
          element={<TboGuestDetails />}
        />
        <Route
          exact
          path="/st-hotel/hotelresult/HotelBooknow/Reviewbooking/bookhotel"
          element={<TboBookingHotel />}
        />
        <Route
          exact
          path="/st-hotel/hotelresult/HotelBooknow/Reviewbooking/GuestDetail/ticket"
          element={<TboTicketGeneration />}
        />

        {/* tbo routes  */}

        {/* old hotel routes  */}

        {/* <Route path="hotel" element={<Hotel />}></Route>
        <Route exact path="/hotel/hotelsearch" element={<Hotelresult />} />
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
        /> */}

        {/* old hotel routes  */}

        {/* e-ticket route */}
        <Route exact path="/FlightEticket/:id" element={<FlightETicket />} />
        <Route exact path="/busEticket/:id" element={<BusETicket />} />

        {/* new package links  */}

        <Route path="holidaypackages" element={<PackageHomePage />}></Route>

        <Route
          path="/holidaypackages/:type/:keyword"
          element={<HolidayPackageResultMain />}
        />
        <Route
          path="/allpackage/:type/:keyword"
          element={<AllMainPageHoliday />}
        />

        {/* <Route
          path="/holidaypackages/:type/:keyword"
          element={<HolidayPackageResultMain />}
        /> */}

        <Route
          path="/holidaypackages/packagedetails"
          element={<HolidayDetailsEnquiry />}
        />

        {/* new package links  */}

        <Route path="/SSDC/:country" element={<SsdcForm />}></Route>

        {/* Bus */}
        <Route path="bus" element={<Bus />}></Route>
        {/* <Route path="/bussearchresult" element={<BusSearchresult />}></Route> */}
        <Route
          exact
          path="/BusPassengerDetail"
          element={<BusPassengerDetail />}
        />
        <Route path="/BusReviewBooking" element={<BusFinalReview />}></Route>
        <Route
          path="/BusBookingConfirmation"
          element={<BusBookingConfirmation />}
        ></Route>
        <Route path="/busresult" element={<BusResultMain />}></Route>

        <Route path="termAndCondition" element={<TermandCondition />}></Route>
        <Route path="refundPolicy" element={<RefundPolicy />}></Route>
        <Route path="privacypolicy" element={<PrivacyPolicy />}></Route>
        <Route path="aboutus" element={<AboutUs />}></Route>
        <Route path="contactus" element={<ContactUs />}></Route>
        <Route path="/bookedTicket" element={<BookedTicket />}></Route>
        <Route
          path="/bookedTicketWithReturn"
          element={<BookedTicketWithReturn />}
        ></Route>
        <Route path="/bookinghistory" element={<BookingHistory />}></Route>
        <Route
          path="/bookinghistory/hotelPdf"
          element={<DownloadHotelPdf />}
        ></Route>
        {/* <Route
          path="/oneWayDummyPnr"
          element={<DummyTicketBookingForm />}
        ></Route> */}
        {/* <Route path="/oneWayDummyHome" element={<DummyPnrHome />}></Route> */}
        <Route path="/pefaevent" element={<Events />}></Route>

        {/* blog route  */}
        <Route
          path="/blogDetails/:keyword"
          element={<BlogDetailsSingle />}
        ></Route>
        <Route path="/skytrailsblogs" element={<AllBlogs />}></Route>

        <Route path="/payLaterDetails" element={<PaylaterDetails />}></Route>
        <Route
          path="/payLaterDetails/verifyOtp"
          element={<VerifyPayLater />}
        ></Route>
        <Route
          path="/payLaterDetails/verifyOtp/userCredential"
          element={<PayLaterUsereCredential />}
        ></Route>
        <Route
          path="/payLaterDetails/verifyOtp/userCredential/tnplGeneratedplan"
          element={<TnplGeneratedPlan />}
        ></Route>
        <Route
          path="/mihurupaymentsuccess"
          element={<MihuruPaymentSuccess />}
        ></Route>

        {/* random payment  */}
        <Route path="/packagepayment" element={<RandomPayment />}></Route>
        <Route
          path="/packagepayment/packagepaymentsuccess"
          element={<RandomPaymentSuccess />}
        ></Route>
        <Route
          path="/trendingPackage"
          element={<SkytailsTrendingPackages />}
        ></Route>
        <Route path="/my-profile" element={<UserProfile />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* inventory */}
      <Routes>
        {/* <Route path="/inventoryLogin" element={<Logininventory />}></Route> */}
        <Route
          path="/inventoryLogin"
          element={
            <div
              style={{
                backgroundImage: 'url("/bg.png")', // Assuming your image is in the public folder
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh", // Full screen height
                width: "100vw", // Optional: Full screen width
              }}
            >
              <Logininventory />
            </div>
          }
        />
        <Route
          path="/inventoryRegister"
          element={<Registerinventory />}
        ></Route>
        <Route
          path="/inventoryhotelform"
          element={<InventoryHotelForm />}
        ></Route>
        <Route
          path="/inventoryForgetPassword"
          element={<InventoryForgetPassword />}
        ></Route>

        <Route
          path="/inventoryDashboard"
          element={<InventoryDashboard />}
        ></Route>

        {/* <Route path="/inventoryDashboard" element={<InventoryDashboard /></Route>} */}
        {/* inventory */}

        <Route path="/itenarydashboard" element={<ItenaryDashboard />}></Route>
        <Route path="/itenaryresult" element={<ItenaryResult />}></Route>

        <Route
          // path="/itenaryDownload"
          path="/itenaryresult/itenaryDownload/:id"
          element={<ItenaryPdfDownloader />}
        ></Route>

        <Route path="/Package/form" element={<Packageform />}></Route>

        {/* career  */}
        <Route path="/career" element={<Career />}></Route>
        {/* career  */}
        <Route path="/phone" element={<PhoneNumber />}></Route>
        <Route path="/offers" element={<AllOffers />}></Route>
        <Route path="/offerDetail" element={<OfferDetails />}></Route>
      </Routes>

      {/* complete inventory */}

      {/* <Whatsapp /> */}
      {location.pathname.includes("/holidaypackages") ||
        (location.pathname.includes("/allpackage") && <GetaCallback />)}
      {location.pathname !== "/inventoryLogin" &&
        location.pathname !== "/inventoryRegister" &&
        location.pathname !== "/inventoryForgetPassword" &&
        location.pathname !== "/inventoryDashboard" &&
        location.pathname !== "/phone" &&
        location.pathname !== "/Package/form" &&
        location.pathname !== "/inventoryhotelform" &&
        location.pathname !== "/ReturnResult" && (
          // location.pathname !== "/newFlight/newBookedTicket" &&
          <Whatsapp />
        )}

      {location.pathname !== "/inventoryLogin" &&
        location.pathname !== "/inventoryRegister" &&
        location.pathname !== "/inventoryForgetPassword" &&
        location.pathname !== "/inventoryDashboard" &&
        location.pathname !== "/phone" &&
        location.pathname !== "/Package/form" &&
        location.pathname !== "/ReturnResult" &&
        location.pathname !== "/newFlight/newBookedTicket" &&
        location.pathname !== "/inventoryhotelform" && <ScrollToTop />}

      {/* <PayLater /> */}
      {/* <Footer /> */}

      {location.pathname !== "/inventoryLogin" &&
        location.pathname !== "/inventoryRegister" &&
        location.pathname !== "/inventoryForgetPassword" &&
        location.pathname !== "/inventoryDashboard" &&
        location.pathname !== "/phone" &&
        location.pathname !== "/Package/form" &&
        location.pathname !== "/ReturnResult" &&
        location.pathname !== "/newFlight/newBookedTicket" &&
        location.pathname !== "/inventoryhotelform" && <Footer />}
    </div>
  );
}

export default App;
