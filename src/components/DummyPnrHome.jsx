import React, { useEffect } from "react";
import Download from "../pages/home/Download";
import Advertise from "../pages/home/Advertise"
import FLightOffer from "../pages/flight/FLightOffer";
import flightbanner from "../images/aerial.png";
import WhyChooseUs from "./WhyChooseUs";
import DummyTicketBookingForm from "./DummyTicketBookingForm"
import { Helmet } from "react-helmet-async";


const Home = () => {
    // console.log("helllo")
    useEffect(() => {
        sessionStorage.setItem("hdhhfb7383__3u8748", false);
    }, [])
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

                <img className="bannerBack" src={flightbanner} alt="background" />
                {/* <BigNavbar /> */}
                <DummyTicketBookingForm />
            </div>
            <div>
                <Advertise />
            </div>
            <div>
                <Download />
            </div>
            <div>
                <WhyChooseUs />
            </div>
            <div>
                <FLightOffer />
            </div>
        </div>
    );
};
export default Home;