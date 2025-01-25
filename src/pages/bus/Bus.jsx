import Download from "../../pages/home/Download";
// import Bussearch from "./Bussearch";
// import "./bus.css";
import Advertise from "../home/Advertise";

import busBanner from "../../images/busNew.webp";
import WhyChooseUs from "../../components/WhyChooseUs";
import { Helmet } from "react-helmet-async";
import Partners from "../home/Partners";
// import NewHolidayCategory from "../NewPackagePages/holidayCategory/NewHolidayCategory";
// import NewHolidayTrending from "../NewPackagePages/holidayTrending/NewHolidayTrending";
// import HolidayTopCountries from "../NewPackagePages/holidayCountries/HolidayTopCountries";
import Blog from "../home/Blog";
import Img from "../../LazyLoading/Img";
import BusForm from "./BusForm";
// import diwali from "../../images/diwali.png";
import BusSearchForm from "../../components/TailwindSearchComp/heroSection/busSearchForm/BusSearchForm";
import Testimonials from "../../components/TailwindSearchComp/testimonials/Testimonials";
import Faq from "../../components/TailwindSearchComp/Faq";
import FooterNavigation from "../../components/footerNavigate/FooterNavigation";
import OfferMain from "../../components/TailwindSearchComp/offerPage/OfferMain";
import TrendingPackageHome from "../../components/TailwindSearchComp/trendingPackage/TrendingPackageHome";

const Bus = () => {
  return (
    <div>
      <div className="hotel_banner">
        <Helmet>
          <title>
            The Skytrails - Hotel Booking, Flight Booking, Bus Booking
          </title>
          <link rel="canonical" href="/bus" />
          <meta name="description" content="bus" />
          <meta
            name="keywords"
            content="online bus booking,cheap bus ticket,compare bus fare,best bus deal,last minute bus booking,luxury bus travel,comfortable bus journeys,overnight bus trips,scenic bus routes,student bus passes,sleeper bus with AC,bus with Wi-Fi and charging points,pet-friendly bus travel,luggage allowance on buses "
          />
        </Helmet>

        <div className="heroBannerFlight flex md:hidden lg:hidden">
          <div className="backdrop-img">
            <Img src={busBanner} />
          </div>
          <div className="opacity-layer"></div>
          <div className="heroBannerContent container">
            <span className="headingTitle">
              Make booking easy and convenient.
            </span>
            <BusForm />
          </div>
        </div>

        <div
          className="flightMainBox relative py-28 pt-44 bg-[radial-gradient(circle,_rgba(189,22,15,1)_0%,_rgba(214,74,80,1)_100%)] hidden md:flex bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${busBanner})` }}
        >
          <BusSearchForm />
        </div>

        {/* <div className="mt-3">
          <NewHolidayCategory />
        </div> */}

        <div>
          <OfferMain active={"BUS"} />
        </div>
        <div>
          {/* <NewHolidayTrending /> */}
          <TrendingPackageHome />
        </div>

        {/* <div>
          <Advertise />
        </div> */}

        {/* <div>
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
        {/* <div>
          <Download />
        </div>
        <div>
          <Partners />
        </div>

        <div>
          <Blog />
        </div> */}
        <div>
          <FooterNavigation />
        </div>
      </div>
    </div>
  );
};
export default Bus;
