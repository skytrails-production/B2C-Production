import React, { useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './advertise.css';
import { apiURL } from '../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import "./partner.css"

const Partners = () => {

    const navigate = useNavigate();
    // const localData = sessionStorage.getItem("advertise");
    const localDataArray = [

        {
            logo: "https://github.com/The-SkyTrails/Images/blob/main/patnerlogo/Hongkong.png?raw=true"
        },

        {
            logo: "https://github.com/The-SkyTrails/Images/blob/main/patnerlogo/australia.png?raw=true"
        },
        {
            logo: "https://github.com/The-SkyTrails/Images/blob/main/patnerlogo/iata.png?raw=true"
        },

        {
            logo: "https://github.com/The-SkyTrails/Images/blob/main/patnerlogo/japan.png?raw=true"
        },
        {
            logo: "https://raw.githubusercontent.com/The-SkyTrails/Images/main/patnerlogo/kiwiway.png"
        },

        {
            logo: "https://raw.githubusercontent.com/The-SkyTrails/Images/main/patnerlogo/korea-tourism.png"
        },
        {
            logo: "https://github.com/The-SkyTrails/Images/blob/main/patnerlogo/malysia.png?raw=true"
        },

        {
            logo: "https://github.com/The-SkyTrails/Images/blob/main/patnerlogo/mauritius-tourism.png?raw=true"
        },
        {
            logo: "https://github.com/The-SkyTrails/Images/blob/main/patnerlogo/singapore.png?raw=true"
        },
        {
            logo: "https://github.com/The-SkyTrails/Images/blob/main/patnerlogo/thailand.png?raw=true"
        },
        {
            logo: "https://github.com/The-SkyTrails/Images/blob/main/patnerlogo/vietnam.png?raw=true"
        },



    ]
    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (!localData) {
    //             try {
    //                 const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/user/getWebBanner`);
    //                 const data = response.data.result;
    //                 const jsonData = JSON.stringify(data);
    //                 sessionStorage.setItem("advertise", jsonData);
    //             } catch (error) {
    //                 console.error('Error fetching data:', error);
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [localData]);



    // const settings = {
    //     draggable: true,
    //     arrows: false,
    //     dots: false,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 1000,
    // };
    const settings = {
        draggable: true,
        arrows: false,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2 // Show 2 slides on devices with width <= 768px
                }
            },
            {
                breakpoint: 1468,
                settings: {
                    slidesToShow: 4 // Show 4 slides on devices with width <= 1468px
                }
            }
        ]
    };





    return (
        <div className=' advertise-container paddMobile'  >
            <div className="container p-0 mt-4">
                <div className="partnerBox">
                    <div className="partner-container">
                        <h3>Recognized Partnership</h3>
                    </div>
                    <Slider {...settings}>
                        {localDataArray?.map((ad) => (
                            <div className="slick-slide partner-slide" key={ad._id}>
                                <img style={{ cursor: "pointer" }} src={ad.logo} alt={ad.logo} loading='lazy' />
                                {/* <img style={{ cursor: "pointer" }} onClick={() => navigate("/pefaevent")} src={ad.image} alt={ad.title} loading='lazy' /> */}
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>


    );
};

export default Partners;
