import React, { useEffect, useState, useRef } from "react";
import Download from "./Download";
import "./home.scss";
import Advertise from "./Advertise";
import Topflightroute from "../flight/Topflightroute";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import Partners from "./Partners";
import MulticityForm from "../flight/MultiCity/MulticityForm";
import Blog from "./Blog";
import ReturnFormNew from "../flight/ReturnFlight/ReturnFornNew";
import homeBG from "../../images/homeBG.jpg";
import OnewayNew from "../../components/OnewayNew";
import NewHolidayCategory from "../NewPackagePages/holidayCategory/NewHolidayCategory";
import NewHolidayTrending from "../NewPackagePages/holidayTrending/NewHolidayTrending";
import HolidayTopCountries from "../NewPackagePages/holidayCountries/HolidayTopCountries";
import "./home.css";
import Img from "../../LazyLoading/Img";
import FlightSearchForm from "../../components/TailwindSearchComp/heroSection/flightSearchForm/FlightSearchForm";
import OfferMain from "../../components/TailwindSearchComp/offerPage/OfferMain";
import FlightSuggestion from "../../components/TailwindSearchComp/flightSuggestion/FlightSuggestion";
import TrendingPackageHome from "../../components/TailwindSearchComp/trendingPackage/TrendingPackageHome";
import Testimonials from "../../components/TailwindSearchComp/testimonials/Testimonials";
import RecentSearches from "../../components/TailwindSearchComp/heroSection/flightSearchForm/FlightRecentSearch";
import diwali from "../../images/diwali.png";
import Faq from "../../components/TailwindSearchComp/Faq";
import FooterNavigation from "../../components/footerNavigate/FooterNavigation";
import { useDispatch } from "react-redux";
import { clearHotelAll } from "../../Redux/HotelGRN/hotel";

const Home = () => {
  const [activeTab, setActiveTab] = useState("oneway");
  const dispatch = useDispatch();

  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
  };

  useEffect(() => {
    sessionStorage.setItem("hdhhfb7383__3u8748", false);
    dispatch(clearHotelAll());
  }, []);

  const downloadRef = useRef(null);

  // const focusDownload = () => {
  //   if (downloadRef.current) {
  //     downloadRef.current.focus();
  //   }
  // };

  return (
    <div className="">
      <Helmet>
        <title>The Skytrails</title>
        <link rel="canonical" href="/" />
        <meta name="description" content="one way flight" />
        <meta
          name="keywords"
          content="
Theskytrails - #1 Travel Website 50% OFF on Hotels, Flights, Bus Booking at Lowest Fare | The SkyTrails"
        />
      </Helmet>

      <div className="heroBannerFlight flex md:hidden lg:hidden">
        <div className="backdrop-img">
          <Img src={homeBG} />
        </div>
        <div className="opacity-layer"></div>
        <div className="heroBannerContent  container">
          <span className="headingTitle">
            Find Flights , book your tickets with us
          </span>
          <div className="transParentBGFlight">
            <div className="buttonTabs">
              <div className="container">
                <div className="tabBox">
                  <div className={activeTab === "oneway" ? "selectedTabs" : ""}>
                    <input
                      type="radio"
                      id="oneway"
                      name="tab"
                      value="oneway"
                      checked={activeTab === "oneway"}
                      onChange={handleTabChange}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="oneway">Oneway</label>
                  </div>
                  <div className={activeTab === "return" ? "selectedTabs" : ""}>
                    <input
                      type="radio"
                      id="return"
                      name="tab"
                      value="return"
                      checked={activeTab === "return"}
                      onChange={handleTabChange}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="return">Return</label>
                  </div>
                  <div
                    className={
                      activeTab === "multicity"
                        ? "d-none d-sm-flex selectedTabs"
                        : "d-none d-sm-block "
                    }
                  >
                    <input
                      type="radio"
                      id="multicity"
                      name="tab"
                      value="multicity"
                      checked={activeTab === "multicity"}
                      onChange={handleTabChange}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="multicity">Multicity</label>
                  </div>
                </div>
              </div>
            </div>
            {activeTab === "oneway" && <OnewayNew />}
            {activeTab === "return" && <ReturnFormNew />}
            {activeTab === "multicity" && <MulticityForm />}
          </div>
        </div>
      </div>
      <div className="flightMainBox relative py-16 pt-44 bg-[radial-gradient(circle,_rgba(63,196,251,1)_0%,_rgba(70,153,252,1)_100%)] hidden md:flex">
        <img
          src={diwali}
          className="absolute top-0 left-0  h-full object-fill w-full"
          alt="Diwali Background"
        />
        <FlightSearchForm />
      </div>

      <div>
        <RecentSearches />
      </div>

      <div>
        <OfferMain />
      </div>

      <div>
        {/* <Topflightroute /> */}
        <FlightSuggestion />
      </div>

      {/* <div className="mt-3">
        <NewHolidayCategory />
      </div> */}
      <div>
        {/* <NewHolidayTrending /> */}
        <TrendingPackageHome />
      </div>

      {/* <div>
        <Advertise />
      </div>

      <div>
        <HolidayTopCountries />
      </div> */}

      <div>
        <WhyChooseUs />
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <FooterNavigation />
      </div>

      {/* <div>
        <Download downloadRef={downloadRef} />
      </div> */}
      {/* <div>
        <Partners />
      </div>

      <div>
        <Blog />
      </div> */}
    </div>
  );
};
export default Home;
