
import React from 'react'
// import step1 from "../images/download/steps-1.png"
// import step2 from "../images/download/steps-2.png"
// import step3 from "../images/download/steps-3.png"
import one from "../images/download/one.png"
import two from "../images/download/two.png"
import three from "../images/download/three.png"
import four from "../images/download/four.png"
const WhyChooseUs = () => {
    return (
        <section class=" download-no-top">
            <div class="container">
                <div class="offerText my-5">
                    <p>Why Choose Us ?</p>
                </div>
                <div class="row  ">
                    <div className="col-lg-3 col-md-3 align-items-stretch mb-3">
                        <div class="download-steps whyChoose">
                            <i><img src={one} alt="steps" /></i>
                            {/* <span>1</span> */}
                            <h4>Easy Booking</h4>
                            <p>We offer easy and cheapest flight bookings with attractive offers.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 align-items-stretch mb-3">
                        <div class="download-steps whyChoose">
                            <i><img src={two} alt="steps" /></i>
                            {/* <span>2</span> */}
                            <h4>Cheapest Flight</h4>
                            <p>We ensure low rates on hotel reservation, holiday packages and on flight tickets.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 align-items-stretch mb-3">
                        <div class="download-steps whyChoose">
                            <i><img src={three} alt="steps" /></i>
                            {/* <span>3</span> */}
                            <h4>Exciting Deals</h4>
                            <p>Enjoy exciting deals on flights, hotels, buses, car rental and tour packages.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 align-items-stretch mb-3">
                        <div class="download-steps whyChoose">
                            <i><img src={four} alt="steps" /></i>
                            {/* <span>3</span> */}
                            <h4>24/7 Support</h4>
                            <p>Get assistance 24/7 on any kind of travel related query. We are happy to assist you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
