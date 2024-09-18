import React from 'react'


import "./FlightOffer.css"
// import offer1 from '../../images/offer/offer1.jpg'
// import offer2 from '../../images/offer/offer2.jpg'
// import offer3 from '../../images/offer/offer3.jpg'
// import offer4 from '../../images/offer/offer4.jpg'
// import offer5 from '../../images/offer/offer5.jpg'
// import offer6 from '../../images/offer/offer6.jpg'
// import offer7 from '../../images/offer/offer7.jpg'

const FLightOffer = () => {
    return (
        <div style={{ position: "relative" }}>
            <div className='container p-0'>
                <div className="offerSliderFLight">
                    <div className='offerText'>
                        <p>Flight Booking Discount Offers</p>
                    </div>
                    <div
                        className="glider-container"
                        draggable
                        hasDots

                        slidesToScroll={1}
                        scrollToSlide={5}
                        slidesToShow={3}
                    >
                        <div>
                            {/* <img src={offer1} alt="offer1" /> */}
                        </div>
                        <div>
                            {/* <img src={offer2} alt="offer2" /> */}
                        </div>
                        <div>
                            {/* <img src={offer3} alt="offer3" /> */}
                        </div>
                        <div>
                            {/* <img src={offer4} alt="offer4" /> */}
                        </div>
                        <div>
                            {/* <img src={offer5} alt="offer5" /> */}
                        </div>
                        <div>
                            {/* <img src={offer6} alt="offer6" /> */}
                        </div>
                        <div>
                            {/* <img src={offer7} alt="offer7" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FLightOffer
