import React from 'react'
import HoliResFilterBig from './HoliResFilterBig'

import HoliResFilterSmall from './HoliResFilterSmall';

import "./holidayresultskeleton.scss"



const HolidayResultSkeleton = () => {
    // con



    const skItemLeft = () => {
        return (
            <div className="skeletonItemResultCard">
                <div className="posterBlock skeleton"></div>
                {/* <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div> */}
            </div>
        );
    };

    const skItemLeftFilterBig = () => {
        return (
            <div className="skeletonItemResultFilter">
                <div className="posterBlock skeleton"></div>
                {/* <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div> */}
            </div>
        );
    };

    return (
        <div className='pt-4' style={{ backgroundColor: "white" }}>

            <div className='container'>
                <div className="row">
                    <div className="col-lg-3 visibleBig p-0">
                        {/* <HoliResFilterBig /> */}

                        <div className="carouselResultFilter">
                            <div className="loadingSkeletonResultFilter">
                                {skItemLeftFilterBig()}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 visibleSmall ">
                        <HoliResFilterSmall />
                    </div>

                    <div className="col-lg-9 ">
                        <div className='row g-4'>
                            {[1, 2, 3, 4].map((item) => {
                                return (
                                    <div className="col-lg-6">
                                        <div className="carouselResultCard">
                                            <div className="loadingSkeletonResultCard">
                                                {skItemLeft()}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HolidayResultSkeleton
