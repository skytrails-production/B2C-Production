import React, { useState } from 'react'
import "./holidaycategory.css"
import { useNavigate } from 'react-router-dom'
// import hill from "../../../images/packCategory/hill.jpg"
import one from "../../../images/destination/1.jpg"
import two from "../../../images/destination/2.jpg"
import three from "../../../images/destination/3.jpg"
import four from "../../../images/destination/4.jpg"
import five from "../../../images/destination/5.jpg"
// import six from "../../../images/destination/6.jpg"
import seven from "../../../images/destination/7.jpg"
import { apiURL } from '../../../Constants/constant'
import iconLocation from "../../../images/packCategory/icon-location.svg"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import HolidayLoader from "../holidayLoader/HolidayLoader"
const HolidayCategory = () => {

    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const quotes = {
        India: "A Country where legends Born",

    };

    const handleCategoryClick = async (category) => {
        const queryParameter = category;

        try {
            // const response = await fetch(`${apiURL.baseURL}/skyTrails/beachesPackages?${queryParameter}`);
            setLoading(true);
            const response = await fetch(`${apiURL.baseURL}/skyTrails/domesticAndInternationalPackages?country=${queryParameter}`);
            const data = await response.json();

            if (data.success === 1) {
                const quote = quotes[category];
                setSelectedCategory({ category, quote });
                setLoading(false)
                navigate(`/holidaycategorydetails/${category}`, { state: { categoryData: data.data, quote } });
            }
        } catch (error) {
            console.error('Error fetching category data', error);
            setLoading(false)
        }
    };

    const handlecountryClick = async (category) => {
        const queryParameter = category;

        try {
            // const response = await fetch(`${apiURL.baseURL}/skyTrails/beachesPackages?${queryParameter}`);
            setLoading(true);
            const response = await fetch(`${apiURL.baseURL}/skyTrails/countryPackage?country=${queryParameter}`);
            const data = await response.json();

            if (data.success === 1) {
                const quote = quotes[category];
                setSelectedCategory({ category, quote });
                setLoading(false)
                navigate(`/holidaycategorydetails/${category}`, { state: { categoryData: data.data, quote } });
            }
        } catch (error) {
            console.error('Error fetching category data', error);
            setLoading(false)
        }
    };

    if (loading) {
        return (
            <HolidayLoader />
        )
    }

    return (

        <div className='container p-0 mt100 '>
            {/* <div class="offerText my-5"><p>Explore Destination by Categories</p></div> */}
            <div className="row g-4">
                <div className="col-lg-4 col-md-4">
                    <div className='holidayCountryUniqueOe'>
                        <img src={iconLocation} alt="iconlocation" />
                        <h4>Popular Countries  </h4>
                    </div>

                </div>
                <div className="col-lg-8 col-md-8">
                    <div className="holidayCatBoxDomestic" onClick={() => handleCategoryClick('India')}>
                        <h3>India <span><ArrowRightAltIcon /></span></h3>
                        <img src={one} alt="" />
                        <div class="color-overlayCountry"></div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4">
                    <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('Mauritius')}>
                        <h3>Mauritius <span><ArrowRightAltIcon /></span></h3>
                        <img src={two} alt="" />
                        <div class="color-overlayCountry"></div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4">
                    <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('Europe')}>
                        <h3>Europe Countries <span><ArrowRightAltIcon /></span></h3>
                        <img src={three} alt="" />
                        <div class="color-overlayCountry"></div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4">
                    <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('Dubai')}>
                        <h3>UAE <span><ArrowRightAltIcon /></span></h3>
                        <img src={four} alt="" />
                        <div class="color-overlayCountry"></div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4">
                    <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('France')}>
                        <h3>France <span><ArrowRightAltIcon /></span></h3>
                        <img src={five} alt="" />
                        <div class="color-overlayCountry"></div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4">
                    <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('Canada')}>
                        <h3>Canada <span><ArrowRightAltIcon /></span></h3>
                        <img src={seven} alt="" />
                        <div class="color-overlayCountry"></div>
                    </div>
                </div>
                {/* <div className="col-lg-8">
                    <div className="holidayCatBoxDomestic" onClick={() => handleCategoryClick('international')}>
                        <h3>All Countries</h3>
                    </div>
                </div> */}
                <div className="col-lg-4 col-md-4">
                    <div className='holidayCountryUnique' onClick={() => handleCategoryClick('international')}>
                        <h4> See All  <ArrowRightAltIcon fontSize='large' /> </h4>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HolidayCategory
