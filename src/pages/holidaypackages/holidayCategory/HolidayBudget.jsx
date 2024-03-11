import React, { useState } from 'react'
import "./holidaycategory.css"
import { useNavigate } from 'react-router-dom'
import hill from "../../../images/packCategory/hill.jpeg";
import heritage from "../../../images/packCategory/heritage.jpeg";
import beach from "../../../images/packCategory/beach.jpg"
import cruise from "../../../images/packCategory/cruise.jpg"
import wildlife from "../../../images/packCategory/wildlife.jpeg"
import { BsArrowRight } from "react-icons/bs";
import { apiURL } from '../../../Constants/constant';
import HolidayLoader from "../holidayLoader/HolidayLoader"

const HolidayBudget = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleBudget = async (category) => {
        const queryParameter = `${category}`;
        navigate(`/holidaybudgetdetails/${queryParameter}`);

    };


    if (loading) {
        return (
            <HolidayLoader />
        )
    }


    return (

        <div className='container p-0 mb100'>
            <div class="offerText my-5"><p>Holidays Under Your Budget</p></div>
            <div className="holidayCatMainBox">
                <div className="holidayCatBox" onClick={() => handleBudget('100000')}>
                    <h3>Under 1 Lakh <span><BsArrowRight /></span></h3>
                    <img src="https://travvolt.s3.amazonaws.com/l.jpg" alt="beach" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleBudget('200000')}>
                    <h3>1 Lakh - 2 Lakhs <span><BsArrowRight /></span></h3>
                    <img src="https://travvolt.s3.amazonaws.com/Natural%20Bridge.jpg" alt="hill" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleBudget('300000')}>
                    <h3>2 Lakhs - 3 Lakhs<span><BsArrowRight /></span></h3>
                    <img src="https://travvolt.s3.amazonaws.com/Darjeeling_Town_view.jpg" alt="heritage" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleBudget('400000')}>
                    <h3>3 Lakhs + <span><BsArrowRight /></span></h3>
                    <img src="https://travvolt.s3.amazonaws.com/sin.webp" alt="heritage" />
                    <div class="color-overlayCategory"></div>
                </div>
            </div>
        </div>

    )
}

export default HolidayBudget
