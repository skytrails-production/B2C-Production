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

const HolidayCategory = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCategoryClick = async (category) => {
        const queryParameter = `${category}`;
        navigate(`/holidaycategorydetails/${queryParameter}`);
        // try {
        //     setLoading(true);
        //     const response = await fetch(`${apiURL.baseURL}/skyTrails/beachesPackages?keyword=${queryParameter}`);
        //     const data = await response.json();

        //     if (data.success === 1) {
        //         setLoading(false)
        //         navigate(`/holidaycategorydetails/${category}`, { state: { categoryData: data.data } });
        //     }
        // } catch (error) {
        //     console.error('Error fetching category data', error);
        //     setLoading(false)
        // }
    };


    if (loading) {
        return (
            <HolidayLoader />
        )
    }


    return (

        <div className='container p-0 mb100'>
            <div class="offerText my-5"><p>Explore Destination by Categories</p></div>
            <div className="holidayCatMainBox">
                <div className="holidayCatBox" onClick={() => handleCategoryClick('beach')}>
                    <h3>Beaches <span><BsArrowRight /></span></h3>
                    <img src={beach} alt="beach" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleCategoryClick('hillStation')}>
                    <h3>Hill Station <span><BsArrowRight /></span></h3>
                    <img src={hill} alt="hill" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleCategoryClick('heritage')}>
                    <h3>Heritage <span><BsArrowRight /></span></h3>
                    <img src={heritage} alt="heritage" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleCategoryClick('wildlife')}>
                    <h3>Wildlife <span><BsArrowRight /></span></h3>
                    <img src={wildlife} alt="wildlife" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleCategoryClick('cruise')}>
                    <h3>Cruise <span><BsArrowRight /></span></h3>
                    <img src={cruise} alt="cruise" />
                    <div class="color-overlayCategory"></div>
                </div>

            </div>
        </div>

    )
}

export default HolidayCategory
