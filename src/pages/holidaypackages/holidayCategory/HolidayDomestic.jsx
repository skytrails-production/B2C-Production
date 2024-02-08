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
// import { apiURL } from '../../../Constants/constant'
import iconLocation from "../../../images/packCategory/icon-location.svg"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
// import HolidayLoader from "../holidayLoader/HolidayLoader"
const HolidayCategory = () => {

    const navigate = useNavigate();
    // const [selectedCategory, setSelectedCategory] = useState(null);
    // const [loading, setLoading] = useState(false);


    // const handleCategoryClick = async (category) => {
    //     const queryParameter = category;

    //     try {
    //         setLoading(true);
    //         const response = await fetch(`${apiURL.baseURL}/skyTrails/domesticAndInternationalPackages?country=${queryParameter}`);
    //         const data = await response.json();

    //         if (data.success === 1) {
    //             setSelectedCategory(category);
    //             setLoading(false)
    //             navigate(`/holidaycountrydetails/${category}`, { state: { categoryData: data.data } });
    //         }
    //     } catch (error) {
    //         console.error('Error fetching category data', error);
    //         setLoading(false)
    //     }
    // };

    const handlecountryClick = async (category) => {
        const queryParameter = category;

        // try {
        //     setLoading(true);
        //     const response = await fetch(`${apiURL.baseURL}/skyTrails/countryPackage?country=${queryParameter}`);
        //     const data = await response.json();

        //     if (data.success === 1) {
        //         setSelectedCategory({ category });
        //         setLoading(false)
        navigate(`/holidaycountrydetails/${queryParameter}`);
        //     }
        // } catch (error) {
        //     console.error('Error fetching category data', error);
        //     setLoading(false)
        // }
    };


    return (
        <>

            <div className='container p-0 mt100 '>
                < div className="row g-4 px-4" >
                    <div class="offerText mt-3"><p>Explore Destination by Countries</p></div>
                    <div className="col-lg-4 col-md-4  d-none d-sm-block ">
                        <div className='holidayCountryUniqueOe'>
                            <img src={iconLocation} alt="iconlocation" />
                            <h4>Popular Countries  </h4>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 ">
                        <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('India')}>
                            <h3>India <span><ArrowRightAltIcon /></span></h3>
                            <img src={one} alt="one" />
                            <div class="color-overlayCountry"></div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-6 ">
                        <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('Mauritius')}>
                            <h3>Mauritius <span><ArrowRightAltIcon /></span></h3>
                            <img src={two} alt="two" />
                            <div class="color-overlayCountry"></div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-6 ">
                        <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('Europe')}>
                            <h3>Europe Countries <span><ArrowRightAltIcon /></span></h3>
                            <img src={three} alt="three" />
                            <div class="color-overlayCountry"></div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                        <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('Dubai')}>
                            <h3>UAE <span><ArrowRightAltIcon /></span></h3>
                            <img src={four} alt="four" />
                            <div class="color-overlayCountry"></div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                        <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('France')}>
                            <h3>France <span><ArrowRightAltIcon /></span></h3>
                            <img src={five} alt="five" />
                            <div class="color-overlayCountry"></div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                        <div className="holidayCatBoxDomestic" onClick={() => handlecountryClick('Canada')}>
                            <h3>Canada <span><ArrowRightAltIcon /></span></h3>
                            <img src={seven} alt="seven" />
                            <div class="color-overlayCountry"></div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                        <div className='holidayCountryUnique' onClick={() => handlecountryClick('All')}>
                            <h4> See All  <ArrowRightAltIcon fontSize='large' /> </h4>
                        </div>
                    </div>
                </ div>
            </div >

        </>


    )
}

export default HolidayCategory
