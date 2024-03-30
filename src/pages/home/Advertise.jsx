import React, { useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './advertise.css';
import { apiURL } from '../../Constants/constant';
import { useNavigate } from 'react-router-dom';

const Advertise = () => {

    const navigate = useNavigate();
    const localData = sessionStorage.getItem("advertise");
    const localDataArray = JSON.parse(localData);
    useEffect(() => {
        const fetchData = async () => {
            if (!localData) {
                try {
                    const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/user/getWebBanner`);
                    const data = response.data.result;
                    const jsonData = JSON.stringify(data);
                    // console.log(jsonData,"data");
                    sessionStorage.setItem("advertise", jsonData);
                    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [localData]);



    

    const settings = {
        draggable: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };





    return (
        <div className=' advertise-container paddMobile'  >
            <div className="container p-0 mt-4">
                <Slider {...settings}>
                     {/* {localDataArray?.map((ad) => (
                        <div className="slick-slide advertise-slide" key={ad._id}>
                            <img style={{ cursor: "pointer" }} src={ad.image} alt={ad.title} loading='lazy' />
                            {/* <img style={{ cursor: "pointer" }} onClick={() => navigate("/pefaevent")} src={ad.image} alt={ad.title} loading='lazy' /> 
                         </div> 
                    ))}  */}
                    
                        <div className="slick-slide advertise-slide">
                            <a href="https://www.nsw.gov.au/visiting-and-exploring-nsw/nsw-events/vivid-sydney-2024" target='_blank' rel="noreferrer">
                            <img style={{ cursor: "pointer" }} src={localDataArray[1]?.image} alt={localDataArray[1]?.title} loading='lazy' />
                            </a>
                            {/* <img style={{ cursor: "pointer" }} onClick={() => navigate("/pefaevent")} src={ad.image} alt={ad.title} loading='lazy' /> */}
                        </div>
                    
                </Slider>
            </div>
        </div>


    );
};

export default Advertise;
