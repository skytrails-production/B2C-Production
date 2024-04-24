import Searchsection from './Searchsection';
import Popularfilter from "./Popularfilter";
import { useSelector } from "react-redux";
// import FlightLoader from "./FlightLoader/FlightLoader";
import Oneway2 from '../../components/Oneway2';
import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";

const Searchresult = () => {
    const reducerState = useSelector((state) => state);
    // const [noResult, setNoResult] = useState(false)

    useEffect(() => {
        // console.warn(reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorMessage, "page not foundtyry")
    }, [reducerState?.oneWay])
    return (
        <>
            <Helmet>
                <title>The Skytrails - Flight Booking, Holiday Packages, Bus Booking, Hotel Booking </title>
                <link rel="canonical" href="/" />
                <meta name="description" content="one way flight" />
                <meta
                    name="keywords"
                    content="
online flight booking,compare flight prices,best airfare deals,last minute flights,multi-city flight booking,business class flights,non-stop flights budget airlines,family-friendly airlines,flight upgrades,round trip flights under 4000,direct flights with vistara,airports with cheapest flights to Vistara,flights with in-flight entertainment,flexible booking options"
                />
            </Helmet>

            <div className="UniComp_BG">
                <div className='mainimgFlightSearch'>
                    <Oneway2 />
                </div>
                <Searchsection className='main_box' />

                <Popularfilter />
            </div>

        </>
    )
}
export default Searchresult;
