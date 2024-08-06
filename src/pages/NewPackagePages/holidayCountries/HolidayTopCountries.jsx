// import axios from 'axios';
import React from 'react'
import "./holidaytopcountries.scss"
import CarouselCountry from '../carouselPage/CarouselCountry';


const HolidayTopCountries = () => {



    return (
        <>
            <div className='container paddHotCountries'>

                <h2>Destination by Countries</h2>
                <div className="categoryMainBox">
                    <div className='HoliCateHeading'>

                    </div>
                    <div>
                        <CarouselCountry />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HolidayTopCountries


