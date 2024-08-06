import React, { useEffect } from "react";
import Download from "../../home/Download";
import Advertise from "./../../home/Advertise";
import FLightOffer from "../../flight/FLightOffer";
import Topflightroute from "../../flight/Topflightroute";
import WhyChooseUs from "../../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import ReturnFormNew from "./ReturnFornNew";



const ReturnMain = () => {
    // console.log("helllo")
    useEffect(() => {
        sessionStorage.setItem("hdhhfb7383__3u8748", false);
    }, [])
    return (
        <div className="home_banner">
            <Helmet>
                <title>The Skytrails</title>
                <link rel="canonical" href="/" />
                <meta name="description" content="Return flight" />
                <meta
                    name="keywords"
                    content="
online flight booking,compare flight prices,best airfare deals,last minute flights,multi-city flight booking,business class flights,non-stop flights budget airlines,family-friendly airlines,flight upgrades,round trip flights under 4000,direct flights with vistara,airports with cheapest flights to Vistara,flights with in-flight entertainment,flexible booking options"
                />
            </Helmet>

            <div className="mainimg">
                {/* <img className="bannerBack" src="https://img.freepik.com/premium-vector/landscape-with-buildings-vehicles-morning-city-life_95169-195.jpg?w=1060" alt="background" /> */}
                <img className="bannerBack" src="https://raw.githubusercontent.com/The-SkyTrails/Images/main/onewayBG.jpg" alt="background" />
                {/* <BigNavbar /> */}
                <ReturnFormNew />
            </div>


            <div>
                <Topflightroute />
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
export default ReturnMain;


