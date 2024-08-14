import React, { useState, useEffect, useRef } from 'react'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs"
import { useNavigate } from 'react-router-dom';
import Img from '../../LazyLoading/Img';
import "./hotelgallerycarousel.scss"
const HotelGalleryCarousel = ({ data }) => {

    const carouselContainer = useRef();
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    // console.log(data, "data")



    // const [destination, setDestination] = useState("")

    // useEffect(() => {
    //     if (destination) {

    //         const id = destination?._id;
    //         navigate(`/holidaypackages/packagedetails/${id}`);
    //     }
    // }, [destination]);



    // const searchOneHoliday = (item) => {

    //     const id = item?._id;
    //     setDestination(item);
    //     const payloadDestination = {
    //         destination: destination?.country,
    //         days: 0,
    //     };
    //     sessionStorage.setItem("searchPackageData", JSON.stringify(payloadDestination));

    // };

    return (
        <div className='position-relative'>
            <div className="carouselPackageHotelGallery">

                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />

                <div className="carouselItems" ref={carouselContainer}>
                    {
                        data?.map((item, index) => {
                            return (
                                <div className="carouselItem">
                                    <div className="posterBlock">
                                        <Img src={item?.url} />
                                    </div>

                                </div>
                            )
                        })
                    }



                </div>

            </div>
        </div>
    )
}

export default HotelGalleryCarousel
