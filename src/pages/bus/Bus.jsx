// import OfferSwipeToSlide from "../../components/Offerscard";
// import Toursection from "../../components/Toursection";
import Download from "../../pages/home/Download";
// import Footer from "../../layouts/Footer";
import Bussearch from "./Bussearch";
// import OfferCard from "../flight/OfferCard";
// import Navbar from "../../layouts/Navbar";
// import Mainheader from "../../UI/Mainheader";
import BigNavbar from "../../UI/BigNavbar/BigNavbar";
// import InsideNavbar from "../../UI/BigNavbar/InsideNavbar";
// bus css
import { motion } from "framer-motion";
import "./bus.css";
import Advertise from "../home/Advertise";
import FLightOffer from "../flight/FLightOffer";
// import onewayBG from "../../images/onewaybg.png"
import onewayBG from "../../images/onewayBG.jpg";
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

const Taxi = () => {
  return (
    <div>
      <Helmet>
        <title>Bus</title>
        <link rel="canonical" href="/bus" />
        <meta name="description" content="bus" />
        <meta
          name="keywords"
          content="online bus booking,cheap bus ticket,compare bus fare,best bus deal,last minute bus booking,luxury bus travel,comfortable bus journeys,overnight bus trips,scenic bus routes,student bus passes,sleeper bus with AC,bus with Wi-Fi and charging points,pet-friendly bus travel,luggage allowance on buses"
        />
      </Helmet>

      <div className="mainimg">
        {/* <img className="bannerBack" src={onewayBG} alt="" /> */}
        <img className="bannerBack" src="https://img.freepik.com/premium-photo/orange-green-watercolor-background_468073-45.jpg?w=1480" alt="background" />
        {/* <InsideNavbar /> */}
        <BigNavbar />
        <Bussearch />
      </div>

      <motion.div variants={variants} initial="initial" whileInView="animate">
        <FLightOffer variants={variants} />
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        style={{ position: "relative", top: "-30px" }}
      >
        <Advertise variants={variants} />
      </motion.div>
      <Download />
      <WhyChooseUs />
    </div>
  );
};
export default Taxi;
