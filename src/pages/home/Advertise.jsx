import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './advertise.css';
import { apiURL } from '../../Constants/constant';

const Advertise = () => {
    const [advertisementData, setAdvertisementData] = useState([]);

    const fetchData = async () => {
        if (!localData) {
            try {
                const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/user/getWebBanner`);
                const data = response.data.result;
                // sessionStorage.setItem("advertise", data);
                const jsonData = JSON.stringify(data);
                sessionStorage.setItem("advertise", jsonData);
                setAdvertisementData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

    }
    useEffect(() => {
        fetchData();
    }, []);


    const settings = {
        draggable: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const localData = sessionStorage.getItem("advertise");
    const localDataArray = JSON.parse(localData);



    return (
        <div className=' advertise-container'  >
            <div className="container p-0">
                <Slider {...settings}>
                    {localDataArray?.map((ad) => (
                        <div className="slick-slide advertise-slide" key={ad._id}>
                            <img src={ad.image} alt={ad.title} loading='lazy' />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Advertise;