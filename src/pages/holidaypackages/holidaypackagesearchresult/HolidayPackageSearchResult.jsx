import React from 'react';
import './holidaypackagesearchresult.css';
import HolidayPackagesDetail from './HolidayPackagesDetail';
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";
import { Helmet } from "react-helmet-async";
import { useSelector } from 'react-redux';


const HolidayPackageSearchResult = () => {

    const reducerState = useSelector((state) => state);
    const filteredPackage =
        reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;
    return (
        <>
            <Helmet>
                <title>Holiday Packages Search Results</title>
                <link rel="canonical" href="/HolidayPackageSearchResult" />
                <meta name="description" content="one packages" />
                <meta
                    name="keywords"
                    content=",family vacation packages,luxury travel deals,budget-friendly getaways,weekend escapes,city break packages ,scuba diving holidays,cultural tours,skiing and snowboarding packages,wellness retreats,romantic getaways,7-day package deal to goa with flights,all-inclusive family fun at Goa,off-the-beaten-path adventure tours in india,romantic spa getaways under 3000,cruise with balcony cabin and shore excursions
          "
                />
            </Helmet>
            {/* <div className="mainimgPackageSearch">
                <InsideNavbar />
            </div> */}

            <div className="holidayInfoBackWall">
                <div className="packInfoBackdrop">
                    <img src={filteredPackage?.[0]?.pakage_img} alt="package" />
                </div>
                <div className="opacityPack">

                </div>
                <InsideNavbar />
            </div>

            <section>
                <HolidayPackagesDetail />
            </section>
        </>
    )
}

export default HolidayPackageSearchResult
