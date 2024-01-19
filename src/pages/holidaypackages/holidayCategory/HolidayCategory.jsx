import React from 'react'
import "./holidaycategory.css"
import { useNavigate } from 'react-router-dom'
import hill from "../../../images/packCategory/hill.jpeg";
import heritage from "../../../images/packCategory/heritage.jpeg";
import beach from "../../../images/packCategory/beach.jpg"
import cruise from "../../../images/packCategory/cruise.jpg"
import wildlife from "../../../images/packCategory/wildlife.jpeg"
import { BsArrowRight } from "react-icons/bs";
import { apiURL } from '../../../Constants/constant';

const HolidayCategory = () => {

    const navigate = useNavigate();
    // const [selectedCategory, setSelectedCategory] = useState(null);

    const quotes = {
        Beach: "Sun, sand, and sea - the perfect beach getaway!",
        HillStation: "Escape to the mountains and enjoy the serene beauty.",
        Heritage: "Step back in time and explore our rich cultural heritage.",
        Wildlife: "Experience the thrill of the wild with our wildlife adventures.",
        Cruise: "Sail away on a luxurious cruise and create unforgettable memories."
    };
    const handleCategoryClick = async (category) => {
        const queryParameter = `${category}=true`;

        try {
            const response = await fetch(`${apiURL.baseURL}/skyTrails/beachesPackages?${queryParameter}`);
            const data = await response.json();

            if (data.success === 1) {
                const quote = quotes[category];
                // setSelectedCategory({ category, quote });
                navigate(`/holidaycategorydetails/${category}`, { state: { categoryData: data.data, quote } });
            } else {
                console.error('Failed to fetch category data');
            }
        } catch (error) {
            console.error('Error fetching category data', error);
        }
    };

    return (

        <div className='container p-0 mb100'>
            <div class="offerText my-5"><p>Explore Destination by Categories</p></div>
            <div className="holidayCatMainBox">
                <div className="holidayCatBox" onClick={() => handleCategoryClick('beach')}>
                    <h3>Beaches <span><BsArrowRight /></span></h3>
                    <img src={beach} alt="" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleCategoryClick('hillStation')}>
                    <h3>Hill Station <span><BsArrowRight /></span></h3>
                    <img src={hill} alt="" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleCategoryClick('heritage')}>
                    <h3>Heritage <span><BsArrowRight /></span></h3>
                    <img src={heritage} alt="" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleCategoryClick('wildlife')}>
                    <h3>Wildlife <span><BsArrowRight /></span></h3>
                    <img src={wildlife} alt="" />
                    <div class="color-overlayCategory"></div>
                </div>
                <div className="holidayCatBox" onClick={() => handleCategoryClick('cruise')}>
                    <h3>Cruise <span><BsArrowRight /></span></h3>
                    <img src={cruise} alt="" />
                    <div class="color-overlayCategory"></div>
                </div>

            </div>
        </div>

    )
}

export default HolidayCategory
