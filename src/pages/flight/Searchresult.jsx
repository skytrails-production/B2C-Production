// import Searchsection from './Searchsection';
import Popularfilter from "./Popularfilter";
import Oneway2 from '../../components/Oneway2';
import { Helmet } from "react-helmet-async";
import {  useState,useEffect} from "react";
import FlightProgressBar from "./FlightProgressBar"
import { useDispatch, useSelector } from "react-redux";
import loader from "../../images/flights/flightloadingTry.gif"

const Searchresult = () => {
    const reducerState = useSelector((state) => state);
   

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
                <div className=' mainimgFlightSearch custom-height-sm custom-height-lg'>
                    <Oneway2 />
                    
                        <div>

                        {/* <img src={loader}></img> */}
                        </div>
                </div>
                {/* <Searchsection className='main_box' /> */}

                <Popularfilter />
            </div>

        </>
    )
}
export default Searchresult;
