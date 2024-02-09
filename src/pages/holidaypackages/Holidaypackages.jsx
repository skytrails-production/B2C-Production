import React, { useEffect, useState } from "react";
import Hotelpackageform from "../../components/Hotelpackageform";
import Download from "../home/Download";
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar";
import { motion } from "framer-motion";
// import onewayBG from "../../images/onewaybg.png"
import onewayBG from "../../images/onewayBG.jpg";
import demo from "../../images/demo.png";
import cloud from "../../images/cloud.png"
import cloudright from "../../images/cloudright.png"
// import bird from "../../images/bird.gif"
import Advertise from "../home/Advertise";
// import FLightOffer from '../flight/FLightOffer';
// import BigNavbar from "../../UI/BigNavbar/BigNavbar";
import HolidaySuggestion from "./holidaySuggestion/HolidaySuggestion";
import HolidayCategory from "./holidayCategory/HolidayCategory";
import HolidayDomestic from "./holidayCategory/HolidayDomestic";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";

const variants = {
  initial: {
    y: 50,
    opacity: 0,
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
const ColorGradient = {
  open: {
    backgroundImage: "linear-gradient(90deg, #9ef4e9 -104%, #ade6e8 17%, #84c2c8)",
    transition: {
      duration: 2,
    },
  },
  close: {
    backgroundImage: "linear-gradient(90deg, rgb(10, 35, 66) -104%, rgb(95 137 173) 17%, rgb(10, 35, 66) )",
    transition: {
      duration: 2,
    },
  },
  exit: {
    opacity: 0
  }
};

const starVarient = {

  open: {
    opacity: 1,
    transition: {
      duration: 2
    }
  },
  close: {
    opacity: 0,
    transition: {
      duration: 2
    }
  },
}


const sunVarient = {
  initial: {
    opacity: 0,
    y: 500,

    transition: {
      duration: 2,
      staggerChildren: 0.1,
    },
  },

  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      staggerChildren: 0.1,
    },
  },

  close: {
    y: 500,
    opacity: 0,
    transition: {
      duration: 2,
      staggerChildren: 0.1,
    },
  }

}


const Hotelpackages = () => {


  const [isExit, setIsExit] = useState(false);
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHours(now.getHours());
      setMinutes(now.getMinutes());
      // console.log(hours, minutes, "hours and mihnutes")
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes]);

  useEffect(() => {
    // setIsExit((hours === 17 && minutes === 34) && (hours < 6));
    setIsExit((hours >= 18 && minutes > 4) || (hours < 6 && minutes > 8));
  }, [hours, minutes, isExit]);

  // console.log(isExit);







  return (
    <React.Fragment>
      <Helmet>
        <title>The Skytrails - Holiday Packages, Bus Booking, Hotel Booking, Flight Booking </title>
        <link rel="canonical" href="/holidaypackages" />
        <meta name="description" content="one packages" />
        <meta
          name="keywords"
          content=",family vacation packages,luxury travel deals,budget-friendly getaways,weekend escapes,city break packages     ,scuba diving holidays,cultural tours,skiing and snowboarding packages,wellness retreats,romantic getaways  ,7-day package deal to goa with flights,all-inclusive family fun at [resort name],off-the-beaten-path adventure tours in india,romantic spa getaways under [price],cruise with balcony cabin and shore excursions
          "
        />
      </Helmet>
      {/* <div className="mainimg">
        <img className="bannerBack" src={onewayBG} alt="banner" />

        <InsideNavbar />
        <Hotelpackageform />
      </div> */}

      {/* <div className="mainimgPackage" style={{ backgroundImage: !isExit ? 'linear-gradient(90deg, #9ef4e9 0, #ade6e8 51%, #84c2c8)' : 'linear-gradient(to right, rgb(10, 35, 66) -140%, rgb(95 137 173) 51%, rgb(10, 35, 66) 100%)', transition: 'background-image 2s ease' }}> */}
      <motion.div className="mainimgPackage" variants={ColorGradient} exit="exit" animate={isExit ? "close" : "open"}>

        <img
          className="bannerBackPackage"
          style={{ zIndex: "1" }}
          src={demo}
          alt="background"
        />
        <motion.div variants={starVarient} initial="open" animate={isExit ? "open" : "close"} className="starsAbs"></motion.div>
        <motion.img
          initial={{ opacity: 0, x: -500 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ ease: "easeOut", delay: 2, duration: 2 }}
          className="cloudleft"
          style={{ zIndex: "0" }}
          src={cloud}
          alt="background"
        />

        <motion.img
          initial={{ opacity: 0, x: 500 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ ease: "easeOut", delay: 2, duration: 2 }}
          className="cloudright"
          style={{ zIndex: "0" }}
          src={cloudright}
          alt="background"
        />
        <InsideNavbar />
        <motion.div
          className="boxSun"
          variants={sunVarient} initial="initial" animate={isExit ? "close" : "open"}
        />
        <motion.div
          className="boxMoon"
          variants={sunVarient} initial="initial" animate={isExit ? "open" : "close"}
        />
        <Hotelpackageform />
      </motion.div>

      <motion.div variants={variants} initial="initial" whileInView="animate">
        <HolidayCategory variants={variants} />
      </motion.div>
      <motion.div variants={variants} initial="initial" whileInView="animate">
        <HolidaySuggestion variants={variants} />
      </motion.div>

      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        style={{ position: "relative", top: "-30px" }}
      >
        <Advertise variants={variants} />
      </motion.div>

      <motion.div variants={variants} initial="initial" whileInView="animate">
        <HolidayDomestic variants={variants} />
      </motion.div>

      <Download />
      <WhyChooseUs />
    </React.Fragment>
  );
};

export default Hotelpackages;
