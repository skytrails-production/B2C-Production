import React from 'react'
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import "./FlightOffer.css"
import offer1 from '../../images/offer/offer1.jpg'
import offer2 from '../../images/offer/offer2.jpg'
import offer3 from '../../images/offer/offer3.jpg'
import offer4 from '../../images/offer/offer4.jpg'
import offer5 from '../../images/offer/offer5.jpg'
import offer6 from '../../images/offer/offer6.jpg'
import offer7 from '../../images/offer/offer7.jpg'

const FLightOffer = () => {
    return (
        <div style={{ position: "relative" }}>
            <div className='container p-0'>
                <div className="offerSliderFLight">
                    <div className='offerText'>
                        <p>Flight Booking Discount Offers</p>
                    </div>
                    {/* <div class="section-title  mx-auto text-center my-5">
                        <h2 class="mb-1">
                            Get The Best <span class="theme">Discount On Flight</span>
                        </h2>
                    </div> */}
                    <Glider
                        className="glider-container"
                        draggable
                        hasDots
                        slidesToShow={3.5}
                        slidesToScroll={1}
                        scrollToSlide={5}
                    >
                        <div>
                            <img src={offer1} alt="" />
                        </div>
                        <div>
                            <img src={offer2} alt="" />
                        </div>
                        <div>
                            <img src={offer3} alt="" />
                        </div>
                        <div>
                            <img src={offer4} alt="" />
                        </div>
                        <div>
                            <img src={offer5} alt="" />
                        </div>
                        <div>
                            <img src={offer6} alt="" />
                        </div>
                        <div>
                            <img src={offer7} alt="" />
                        </div>
                    </Glider>
                </div>
            </div>
        </div>
    );
}

export default FLightOffer