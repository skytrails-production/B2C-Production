import React, { useState, useEffect, useRef } from 'react'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs"
import { useNavigate } from 'react-router-dom';
import Img from '../../../LazyLoading/Img';
import "./carouseltrending.scss"
const CarouselTrending = ({ data }) => {

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



    const [destination, setDestination] = useState("")

    useEffect(() => {
        if (destination) {

            const id = destination?._id;
            navigate(`/holidaypackages/packagedetails/${id}`);
        }
    }, [destination]);



    const searchOneHoliday = (item) => {
        // console.log(item, "item")
        const id = item?._id;
        setDestination(item);
        const payloadDestination = {
            destination: destination?.country,
            days: 0,
        };
        sessionStorage.setItem("searchPackageData", JSON.stringify(payloadDestination));

    };

    return (
        <div className='position-relative'>
            <div className="carouselPackageTrending">

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
                                <div className="carouselItem" onClick={(e) => searchOneHoliday(item)} >
                                    <div className="posterBlock">
                                        <Img src={item?.pakage_img || item?.package_img?.[0]} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="titleHoliCat">
                                            {item?.pakage_title}
                                        </span>
                                        <div className="dateHoliCat">
                                            <span >
                                                {item?.days}D/ {item?.days - 1}N
                                            </span>
                                            <span>
                                                ₹ {item?.pakage_amount?.amount}
                                            </span>
                                        </div>
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

export default CarouselTrending
