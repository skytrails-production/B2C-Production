import React, { useEffect } from "react";
import NewPackageForm from "./PackageFormPage/NewPackageForm";
import { Helmet } from "react-helmet-async";
import NewHolidayCategory from "./holidayCategory/NewHolidayCategory";
import NewHolidayTrending from "./holidayTrending/NewHolidayTrending";
import holidayBottom from "./holidayBottom.svg";
import holidayBottomMobile from "./holidayBottomMobile.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearHolidayReducer } from "../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import Img from "../../LazyLoading/Img";
import HolidayTopCountries from "./holidayCountries/HolidayTopCountries";
import Download from "../home/Download";
import WhyChooseUs from "../../components/WhyChooseUs";
import Blog from "../home/Blog";
import diwali from "../../images/diwali.png";
import HolidaySearchForm from "../../components/TailwindSearchComp/heroSection/holidayForm/HolidaySearchForm";
import Testimonials from "../../components/TailwindSearchComp/testimonials/Testimonials";
import Faq from "../../components/TailwindSearchComp/Faq";
import FooterNavigation from "../../components/footerNavigate/FooterNavigation";
import OfferMain from "../../components/TailwindSearchComp/offerPage/OfferMain";
import TrendingPackageHome from "../../components/TailwindSearchComp/trendingPackage/TrendingPackageHome";
const PackageHomePage = () => {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

  useEffect(() => {
    dispatch(clearHolidayReducer());
  }, []);

  return (
    <div>
      <React.Fragment>
        <Helmet>
          <title>
            The Skytrails - Holiday Packages, Bus Booking, Hotel Booking, Flight
            Booking{" "}
          </title>
          <link rel="canonical" href="/holidaypackages" />
          <meta name="description" content="one packages" />
          <meta
            name="keywords"
            content=",family vacation packages,luxury travel deals,budget-friendly getaways,weekend escapes,city break packages     ,scuba diving holidays,cultural tours,skiing and snowboarding packages,wellness retreats,romantic getaways  ,7-day package deal to goa with flights,all-inclusive family fun at [resort name],off-the-beaten-path adventure tours in india,romantic spa getaways under [price],cruise with balcony cabin and shore excursions
          "
          />
        </Helmet>

        <div className="flex md:hidden lg:hidden ">
          <NewPackageForm />
        </div>

        <div className="flightMainBox relative py-28 pt-44 bg-[radial-gradient(circle,_rgba(63,196,251,1)_0%,_rgba(70,153,252,1)_100%)] hidden md:flex lg:flex">
          <img
            src={diwali}
            className="absolute top-0 left-0  h-full object-fill w-full"
            alt="Diwali Background"
          />
          <HolidaySearchForm />
        </div>
        <div>
          <OfferMain />
        </div>

        <div>
          <NewHolidayCategory />
        </div>
        <div>
          {/* <NewHolidayTrending /> */}
          <TrendingPackageHome />
        </div>
        {/* <div>
          <HolidayTopCountries />
        </div> */}

        <div className="my-3 mt-5">
          <div className="custom-container d-none d-md-flex  holiBot">
            <Img style={{ width: "100%" }} src={holidayBottom} />
          </div>
          <div className="container d-flex w-100 d-md-none holiBotMobile">
            <Img style={{ width: "100%" }} src={holidayBottomMobile} />
          </div>
        </div>

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
          <Blog />
        </div> */}
        <div>
          <FooterNavigation />
        </div>
      </React.Fragment>
    </div>
  );
};

export default PackageHomePage;
