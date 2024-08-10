
import Download from "../../pages/home/Download";
import Bussearch from "./Bussearch";
import "./bus.css";
import Advertise from "../home/Advertise";
import FLightOffer from "../flight/FLightOffer";
import busimg from "../../images/aerial.png"
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import Partners from "../home/Partners";
import NewHolidayCategory from "../NewPackagePages/holidayCategory/NewHolidayCategory";
import NewHolidayTrending from "../NewPackagePages/holidayTrending/NewHolidayTrending";
import HolidayTopCountries from "../NewPackagePages/holidayCountries/HolidayTopCountries";
import Blog from "../home/Blog";



const Taxi = () => {
  return (
    <div>
      <Helmet>
        <title>The Skytrails - Bus Booking, Hotel Booking, Flight Booking </title>
        <link rel="canonical" href="/bus" />
        <meta name="description" content="Book bus ticket online at lowest price from The Skytrails. Get affordable deals and discounts on booking your bus ticket. No need to stand in lines anymore." />
        <meta
          name="keywords"
          content="online bus booking,cheap bus ticket,compare bus fare,best bus deal,last minute bus booking,luxury bus travel,comfortable bus journeys,overnight bus trips,scenic bus routes,student bus passes,sleeper bus with AC,bus with Wi-Fi and charging points,pet-friendly bus travel,luggage allowance on buses"
        />
      </Helmet>

      <div className="mainimg">
        <img className="bannerBack" src={busimg} alt="banner" />
        <Bussearch />
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
        <Download />
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
export default Taxi;
