import React, { useEffect, useState, useRef } from "react";
import Download from "./Download";
import "./home.scss";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import homeBG from "../../images/homeBG.jpg";
import "./home.css";
import FlightSearchForm from "../../components/TailwindSearchComp/heroSection/flightSearchForm/FlightSearchForm";
import OfferMain from "../../components/TailwindSearchComp/offerPage/OfferMain";
import FlightSuggestion from "../../components/TailwindSearchComp/flightSuggestion/FlightSuggestion";
import TrendingPackageHome from "../../components/TailwindSearchComp/trendingPackage/TrendingPackageHome";
import Testimonials from "../../components/TailwindSearchComp/testimonials/Testimonials";
import RecentSearches from "../../components/TailwindSearchComp/heroSection/flightSearchForm/FlightRecentSearch";
import Faq from "../../components/TailwindSearchComp/Faq";
import FooterNavigation from "../../components/footerNavigate/FooterNavigation";
import { useDispatch } from "react-redux";
import { clearHotelAll } from "../../Redux/HotelGRN/hotel";
import { returnActionClear } from "../../Redux/FlightSearch/Return/return";
import Pefa from "./Pefa";

const Home = () => {
  const [activeTab, setActiveTab] = useState("oneway");
  const dispatch = useDispatch();

  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
  };

  useEffect(() => {
    sessionStorage.setItem("hdhhfb7383__3u8748", false);
    dispatch(clearHotelAll());
    dispatch(returnActionClear());
  }, []);

  const downloadRef = useRef(null);
  const flightBottomLink = true;

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

      {/* <div className="heroBannerFlight flex md:hidden lg:hidden">
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
      <div
        className="flightMainBox relative py-16 pt-44 bg-[radial-gradient(circle,_rgba(189,22,15,1)_0%,_rgba(214,74,80,1)_100%)] hidden md:flex bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${homeBG})` }}
      >
        <FlightSearchForm />
      </div>  */}

      <div className="flightMainBox relative py-16 pt-44 flex md:flex justify-center bg-cover bg-top bg-no-repeat">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          poster={homeBG}
          loop
          autoPlay
          muted
        >
          {/* <source src={hotelBeach} type="video/mp4" /> */}
          Your browser does not support the video tag.
        </video>
        <FlightSearchForm />
      </div>

      <div>
        <RecentSearches />
      </div>
      <div>
        <Pefa />
      </div>

      <div>
        <OfferMain active={"FLIGHTS"} />
      </div>

      <div>
        <FlightSuggestion />
      </div>

      <div>
        {/* <NewHolidayTrending /> */}
        <TrendingPackageHome />
      </div>

      <div>
        <WhyChooseUs />
      </div>

      <div>
        <Testimonials />
      </div>

      <div>
        <Download downloadRef={downloadRef} />
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <FooterNavigation visible={flightBottomLink} />
      </div>
    </div>
  );
};
export default Home;
