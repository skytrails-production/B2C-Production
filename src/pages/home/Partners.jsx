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
            logo: "https://storage.googleapis.com/cgiarorg/2018/02/IITA.png"
        },

        {
            logo: "https://storage.googleapis.com/cgiarorg/2018/02/IITA.png"
        },
        {
            logo: "https://storage.googleapis.com/cgiarorg/2018/02/IITA.png"
        },
        {
            logo: "https://storage.googleapis.com/cgiarorg/2018/02/IITA.png"
        },

        {
            logo: "https://storage.googleapis.com/cgiarorg/2018/02/IITA.png"
        },
        {
            logo: "https://storage.googleapis.com/cgiarorg/2018/02/IITA.png"
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



    const settings = {
        draggable: true,
        arrows: false,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
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
                            <div className="slick-slide advertise-slide" key={ad._id}>
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
