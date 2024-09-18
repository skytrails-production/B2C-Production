import React from 'react'
import "./hotelresultcards.scss"
import starsvg from "../../images/star.svg"
import dayjs from "dayjs";
import freeWifi from "./SVGs/freeWifi.svg"
import freeBreakfast from "./SVGs/freeBreakfast.svg"
import freeParking from "./SVGs/freeParking.svg"
import drinkingWater from "./SVGs/DrinkingWater.svg"
import expressCheckin from "./SVGs/expressCheckin.svg"
import welcomeDrink from "./SVGs/welcomeDrink.svg"
import freeGym from "./SVGs/freeGym.svg"
// import SkeletonHotelResult from "./Skeletons/SkeletonHotelResult";
import { MdCancel } from "react-icons/md";
import { MdOutlineFreeBreakfast } from "react-icons/md";

import { useNavigate } from 'react-router-dom';
import { hotelGalleryRequest, singleHotelGRN } from '../../Redux/HotelGRN/hotel';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../LazyLoading/Img';


const HotelResultCard = ({ result }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleClick = (item) => {


        const payload = {

            "data": {
                "rate_key": item?.min_rate?.rate_key,
                "group_code": item?.min_rate?.group_code,
            },
            "searchID": item?.search_id,
            "hotel_code": item?.hotel_code,

        }

        const galleryPayload = {
            "hotel_id": item?.hotel_code,
        }
        dispatch(hotelGalleryRequest(galleryPayload))
        dispatch(singleHotelGRN(payload))
        navigate("/st-hotel/hotelresult/selectroom")
    };

    // console.log(result)

    return (
        <div className='hotelCard h-100'>
            <div className="packCardImg">
                <Img className="posterImg" src={result?.images?.url} />
            </div>
            <div className="packCardContent">
                <div className='packCardTitle'>
                    <h2>{result?.name}</h2>
                    <p>{Array.from({ length: result?.category }, (_, index) => (
                        <img key={index} src={starsvg} alt={`Star ${index + 1}`} />
                    ))}</p>
                </div>

                <div className='packCardAddress'>
                    <p> {result?.address}</p>
                </div>

                <div className='roomInclusion'>
                    {result?.min_rate?.boarding_details?.[0] !== "Room Only" &&
                        <span className="breakinclude">
                            <MdOutlineFreeBreakfast />   Breakfast Included
                        </span>
                    }
                    {result?.min_rate?.cancellation_policy?.cancel_by_date &&
                        <span className="cancel">
                            <MdCancel />
                            {`cancellation till ${dayjs(result?.min_rate?.cancellation_policy?.cancel_by_date).format("DD MMM, YY")}`}
                        </span>
                    }
                </div>




                <div className='packCardPrice'>
                    <div>
                        <span><del>₹{result?.min_rate?.price + Math.floor(Math.random() * (1200 - 700 + 1)) + 700}</del></span>
                        <h2> ₹{result?.min_rate?.price}</h2>
                    </div>
                    <button onClick={() => handleClick(result)}>View Details</button>
                </div>
            </div>

        </div>
    )
}

export default HotelResultCard
