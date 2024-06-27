import React, { useEffect, useState, useRef } from "react";
import SwipeToSlide from "../../components/Card";
import Download from "./Download";
import Oneway from "../../components/Oneway";
// import OfferCard from "../flight/OfferCard";
import "./home.css";
import { motion } from "framer-motion";
import Advertise from "./Advertise";
// import FLightOffer from "../flight/FLightOffer";

import HolidaySuggestion from "../holidaypackages/holidaySuggestion/HolidaySuggestion";
import HolidayCategory from "../holidaypackages/holidayCategory/HolidayCategory";
import Topflightroute from "../flight/Topflightroute";
import HolidayDomestic from "../holidaypackages/holidayCategory/HolidayDomestic";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import HolidayBudget from "../holidaypackages/holidayCategory/HolidayBudget";
// import ReturnForm from "../flight/ReturnFlight/ReturnForm";
// import SecureStorage from "react-secure-storage";
import Partners from "./Partners";
import flightbanner from "../../images/aerial.png";
// import EventBanner from "./EventBanner";
import MulticityForm from "../flight/MultiCity/MulticityForm";
import Blog from "./Blog";
import ReturnFormNew from "../flight/ReturnFlight/ReturnFornNew";
import OnewayNew from "../../components/OnewayNew";

const variants = {
  initial: {
    y: 50,
    opacity: 1,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Home = () => {
  // console.log("helllo")

  const [activeTab, setActiveTab] = useState("oneway");

  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
  };

  useEffect(() => {
    sessionStorage.setItem("hdhhfb7383__3u8748", false);
  }, []);

  const downloadRef = useRef(null);

  const focusDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.focus();
    }
  };

  return (
    <div className="home_banner">
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

      <div className="mainimg">
        {/* <h1 style={{color:"black"}}>hellonjkedndjkn</h1> */}
        {/* <img className="bannerBack" src="https://raw.githubusercontent.com/The-SkyTrails/Images/main/onewayBG.jpg" alt="background" /> */}
        <img className="bannerBack" src={flightbanner} alt="background" />
        {/* <BigNavbar /> */}

        <div className="content-heading d-none d-sm-none">Find Flights , book your tickets with us</div>

        {/* <div className="container"> */}
        <div className="homeabsnew container">
          <div className="buttonTabs">
            <div className="container p-0">
              {/* <button onClick={() => setActiveTab('oneway')}>Oneway</button>
            <button onClick={() => setActiveTab('return')}>Return</button> */}

              <div className="tabBox">
                <div className={activeTab === "oneway" ? "inputTabs" : ""}>
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
                <div className={activeTab === "return" ? "inputTabs" : ""}>
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
                      ? "d-none d-sm-flex inputTabs"
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
        {/* </div> */}
      </div>

      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <HolidayCategory variants={variants} />
      </motion.div>

      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <HolidayBudget variants={variants} />
      </motion.div>

      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
        style={{ position: "relative" }}
      >
        <Topflightroute variants={variants} />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
        style={{ position: "relative" }}
      >
        <HolidaySuggestion variants={variants} />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
        style={{ position: "relative" }}
      >
        <Advertise variants={variants} />
      </motion.div>

      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <HolidayDomestic variants={variants} />
      </motion.div>

      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <SwipeToSlide variants={variants} />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <Blog variants={variants} />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <Download downloadRef={downloadRef} variants={variants} />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <WhyChooseUs variants={variants} />
      </motion.div>
      {/* <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <FLightOffer variants={variants} />
      </motion.div> */}
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <Partners variants={variants} />
      </motion.div>

    </div>
  );
};
export default Home;
