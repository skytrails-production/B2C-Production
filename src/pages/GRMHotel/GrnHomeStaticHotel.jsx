import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import './advertise.css';
import { useNavigate } from 'react-router-dom';
// import "./partner.css"
import { hotelActionGRN, clearHotelReducerGRN } from "../../Redux/HotelGRN/hotel";
import { useDispatch, useSelector } from 'react-redux';
import Hotelmainloading from '../Hotel/hotelLoading/Hotelmainloading';
import dayjs from 'dayjs';

const GrnHomeStaticHotel = () => {


    const reducerState = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const localData = sessionStorage.getItem("advertise");
    const [loader, setLoader] = useState(false);
    // const [selectedData, setSelectedData] = useState([]);
    const localDataArray = [

        {
            logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/1.jpg`,
            title: "Darjeeling",
            cityCode: "123209"
        },

        {
            logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/2.jpg`,
            title: "Rishikesh",
            cityCode: "125097"
        },
        {
            logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/3.jpg`,
            title: "Kolkata",
            cityCode: "122164"
        },

        {
            logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/4.jpg`,
            title: "Ajmer",
            cityCode: "124819"
        },
        {
            logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/5.jpg`,
            title: "Pune",
            cityCode: "124649"
        },

        {
            logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/6.jpg`,
            title: "Nainital",
            cityCode: "123559"
        },
        {
            logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/7.jpg`,
            title: "Bangalore",
            cityCode: "121850"
        },


    ]

    const settings = {
        draggable: true,
        arrows: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1 // Show 2 slides on devices with width <= 768px
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

    useEffect(() => {
        dispatch(clearHotelReducerGRN());
    }, []);

    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.isLoading == true) {
            setLoader(true);
        }
    }, [reducerState?.hotelSearchResultGRN?.isLoading]);
    useEffect(() => {
        if (
            reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels?.length >= 0
        ) {
            setLoader(false);
            // navigate("/GrmHotelHome/hotelsearchGRM");

        }
    }, [reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels]);

    const currentDate = new Date();

    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 1);
    console.log(futureDate, "")

    const handlePopularSearch = (param) => {

        console.log(param, "param")
        const payload = {
            "rooms": [{
                adults: 1,
                children_ages: [],
            }],
            "rates": "concise",
            "cityCode": param?.cityCode,
            "currency": "INR",
            "client_nationality": "IN",
            "checkin": dayjs(currentDate).format("YYYY-MM-DD"),
            "checkout": dayjs(futureDate).format("YYYY-MM-DD"),
            "cutoff_time": 30000,
            "version": "2.0"

        };

        const pageNumber = 1;

        sessionStorage.setItem("grnPayload", JSON.stringify(payload));

        dispatch(hotelActionGRN(payload, pageNumber));
        navigate("/GrmHotelHome/hotelsearchGRM");
    }

    console.log(reducerState)


    return (

        <>
            {
                loader ?

                    (
                        <Hotelmainloading />
                    )
                    :
                    (<div className=' advertise-container paddMobile'  >
                        <div className="container p-0 mt-4">



                            <div class="offerText my-5">
                                <p>Best Hotels For You </p>

                            </div>
                            <div className="partnerBox">

                                <Slider {...settings}>
                                    {localDataArray?.map((ad) => (
                                        <div className="slick-slide Hotel-slide" style={{ cursor: "pointer" }} key={ad._id} onClick={() => handlePopularSearch(ad)}>
                                            <div className='imgBoxPartner'>
                                                <img style={{ cursor: "pointer" }} src={ad.logo} alt={ad.logo} loading='lazy' />
                                                <div className="imgBoxContent">
                                                    <span className="selectHotelTitle">{ad.title}</span>
                                                    <p>1 Adult & 1 Night</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div >
                    </div >)
            }
        </>



    );
};

export default GrnHomeStaticHotel;
