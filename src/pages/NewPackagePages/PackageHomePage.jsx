import React, { useEffect } from 'react'
import NewPackageForm from './PackageFormPage/NewPackageForm'
import { Helmet } from "react-helmet-async";
import NewHolidayCategory from './holidayCategory/NewHolidayCategory';
import NewHolidayTrending from './holidayTrending/NewHolidayTrending';
import holidayBottom from "./holidayBottom.svg"
import holidayBottomMobile from "./holidayBottomMobile.svg"
import { useDispatch, useSelector } from 'react-redux';
import { clearHolidayReducer } from '../../Redux/OnePackageSearchResult/actionOneSearchPackage';
import Img from '../../LazyLoading/Img';
import HolidayTopCountries from './holidayCountries/HolidayTopCountries';
import Download from '../home/Download';
import WhyChooseUs from '../../components/WhyChooseUs';
import Blog from '../home/Blog';
const PackageHomePage = () => {

    const dispatch = useDispatch()
    const reducerState = useSelector((state) => state);

    useEffect(() => {
        dispatch(clearHolidayReducer());
    }, [])

    return (
        <div >
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

                <NewPackageForm />

                <div>
                    <NewHolidayCategory />
                </div>
                <div>
                    <NewHolidayTrending />
                </div>
                <div>
                    <HolidayTopCountries />
                </div>

                <div className='my-3'>
                    <div className="container d-none d-md-flex  holiBot">
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
                    <Download />
                </div>


                <div>
                    <Blog />
                </div>

            </React.Fragment>
        </div>
    )
}

export default PackageHomePage
