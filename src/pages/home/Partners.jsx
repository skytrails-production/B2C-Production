import React, { useRef } from 'react'
// import { useNavigate } from 'react-router-dom';
import "./partner.scss"

import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs"
import Img from '../../LazyLoading/Img';

const Partners = () => {

    const carouselContainer = useRef();
    // const navigate = useNavigate();

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



    return (
        <div className='container paddHotCatTopRoute'>

            <h2>Recognized Partnership</h2>
            <div className="categoryMainBox">
                <div className='HoliCateHeading'>

                </div>
                <div className='position-relative'>
                    <div className="carouselPartners">

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
                                localDataArray?.map((item, index) => {
                                    return (
                                        <div className="carouselItem" >
                                            <div className="posterBlock">
                                                <Img src={item?.logo} />
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Partners;
