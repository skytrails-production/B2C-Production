import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './advertise.css';


const EventBanner = ({ focusDownload }) => {

    const localDataArray = [{
        image: "https://raw.githubusercontent.com/The-SkyTrails/Images/main/eventBanner-new.jpg",
    }];



    const settings = {
        draggable: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const handleClick = () => {
        // Call the function passed from the parent component to focus on the Download component
        focusDownload();
    };

    return (
        <div className=' advertise-container paddMobile' onClick={handleClick} >
            <div className="container p-0 mt-4">
                <Slider {...settings}>
                    {localDataArray?.map((ad) => (
                        <div className="slick-slide advertise-slide">
                            <img style={{ cursor: "pointer" }} src={ad.image} alt="event" loading='lazy' />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>


    );
};

export default EventBanner;
