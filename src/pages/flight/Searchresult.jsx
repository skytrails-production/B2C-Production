import Searchsection from './Searchsection';
import Popularfilter from "./Popularfilter";
import { useSelector } from "react-redux";
import FlightLoader from "./FlightLoader/FlightLoader";
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar"
import Oneway2 from '../../components/Oneway2';
import { useEffect,useState } from 'react';

const Searchresult = () => {
    const reducerState = useSelector((state) => state);
    const [noResult,setNoResult]=useState(false)
//     useEffect(() => {
//     if (reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorCode !== 0
//        && reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorCode !==undefined
//       // === false
//     ) {
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Error",
//     //     text: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorMessage,

//     //   })
//     //   // navigate(`/`)
//     //   console.warn(reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorMessage, "page not found")
//     }
//   }, [reducerState?.oneWay])
useEffect(()=>{
    console.warn(reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorMessage, "page not foundtyry")
},[reducerState?.oneWay])
    return (
        <>
            {/* {
                reducerState?.oneWay?.isLoading === true ? (
                    <FlightLoader />
                )
                    : ( */}
                        <div className="UniComp_BG">
                            <div className='mainimgFlightSearch'>
                            <Oneway2/>
                                <InsideNavbar />
                            </div>
                            <Searchsection className='main_box' />
                            
                            <Popularfilter />
                        </div>
                    {/* ) */}

            {/* } */}

        </>
    )
}
export default Searchresult;
