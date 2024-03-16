import React, { useEffect, useState } from "react";
import SwipeToSlide from "../../components/Card";
import Download from "./Download";
import Oneway from "../../components/Oneway";
// import OfferCard from "../flight/OfferCard";
import "./home.css";
import { motion } from "framer-motion";
import Advertise from "./Advertise";
import FLightOffer from "../flight/FLightOffer";
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar"
// import onewayBG from "../../images/onewaybg.png"
import onewayBG from "../../images/onewayBG.jpg";
// import BigNavbar from "../../UI/BigNavbar/BigNavbar";
import HolidaySuggestion from "../holidaypackages/holidaySuggestion/HolidaySuggestion";
import HolidayCategory from "../holidaypackages/holidayCategory/HolidayCategory";
import Topflightroute from "../flight/Topflightroute";
import HolidayDomestic from "../holidaypackages/holidayCategory/HolidayDomestic";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import HolidayBudget from "../holidaypackages/holidayCategory/HolidayBudget";
import ReturnForm from "../flight/ReturnFlight/ReturnForm";
import SecureStorage from "react-secure-storage";
import Partners from "./Partners";

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

  const [activeTab, setActiveTab] = useState('oneway');

  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
  };

  useEffect(() => {
    sessionStorage.setItem("hdhhfb7383__3u8748", false);
  }, [])

  // console.log(SecureStorage.getItem("jwtToken"))

  return (
    <div className="home_banner">


      <Helmet>
        <title>The Skytrails</title>
        <link rel="canonical" href="/" />
        <meta name="description" content="one way flight" />
        <meta
          name="keywords"
          content="
online flight booking,compare flight prices,best airfare deals,last minute flights,multi-city flight booking,business class flights,non-stop flights budget airlines,family-friendly airlines,flight upgrades,round trip flights under 4000,direct flights with vistara,airports with cheapest flights to Vistara,flights with in-flight entertainment,flexible booking options"
        />
      </Helmet>

      <div className="mainimg">
        {/* <img className="bannerBack" src="https://img.freepik.com/premium-vector/landscape-with-buildings-vehicles-morning-city-life_95169-195.jpg?w=1060" alt="background" /> */}
        <img className="bannerBack" src="https://raw.githubusercontent.com/The-SkyTrails/Images/main/onewayBG.jpg" alt="background" />
        <InsideNavbar />
        {/* <BigNavbar /> */}


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
                />
                <label htmlFor="return">Return</label>
              </div>
            </div>
          </div>
        </div>
        {activeTab === 'oneway' && <Oneway />}
        {activeTab === 'return' && <ReturnForm />}
      </div>

      <motion.div variants={variants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
        <HolidayCategory variants={variants} />
      </motion.div>
      <motion.div variants={variants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
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


      <motion.div variants={variants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
        <HolidayDomestic variants={variants} />
      </motion.div>


      <motion.div variants={variants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
        <SwipeToSlide variants={variants} />
      </motion.div>
      <motion.div variants={variants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
        <Download variants={variants} />
      </motion.div>
      <motion.div variants={variants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
        <WhyChooseUs variants={variants} />
      </motion.div>
      <motion.div variants={variants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
        <FLightOffer variants={variants} />
      </motion.div>
      {/* <motion.div variants={variants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}>
        <Partners variants={variants} />
      </motion.div> */}


    </div>
  );
};
export default Home;