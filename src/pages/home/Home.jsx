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
import homeBG from "../../images/homeBG.jpg"
import OnewayNew from "../../components/OnewayNew";
import NewHolidayCategory from "../NewPackagePages/holidayCategory/NewHolidayCategory";
import NewHolidayTrending from "../NewPackagePages/holidayTrending/NewHolidayTrending";
import HolidayTopCountries from "../NewPackagePages/holidayCountries/HolidayTopCountries";
import "./home.css"
import Img from "../../LazyLoading/Img";



const Home = () => {

  const [activeTab, setActiveTab] = useState("oneway");

  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
  };

  useEffect(() => {
    sessionStorage.setItem("hdhhfb7383__3u8748", false);
  }, []);

  const downloadRef = useRef(null);

  // const focusDownload = () => {
  //   if (downloadRef.current) {
  //     downloadRef.current.focus();
  //   }
  // };

  return (
    <div className="" style={{ background: "white" }}>
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

      <div className='heroBannerFlight'>
        <div className="backdrop-img">
          <Img src={homeBG} />
        </div>
        <div className="opacity-layer"></div>
        <div className="heroBannerContent  container">
          <span className="headingTitle">Find Flights , book your tickets with us</span>
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
        {/* </div> */}
      </div>

      <div>
        <Topflightroute />
      </div>

      <div className="mt-3">
        <NewHolidayCategory />
      </div>
      <div>
        <NewHolidayTrending />
      </div>

      <div>
        <Advertise />
      </div>

      <div>
        <HolidayTopCountries />
      </div>

      <div>
        <WhyChooseUs />
      </div>
      <div>
        <Download downloadRef={downloadRef} />
      </div>
      <div>
        <Partners />
      </div>

      <div>
        <Blog />
      </div>

    </div>
  );
};
export default Home;
