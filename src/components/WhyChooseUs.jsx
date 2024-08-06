
import React from 'react'
import one from "../images/download/one.svg"
import two from "../images/download/two.svg"
import three from "../images/download/three.svg"
import four from "../images/download/four.svg"


const WhyChooseUs = () => {
    return (
        <section class="container paddHotWhyChoose px-0">
            <h2>Why Choose Us ?</h2>
            <div class="row g-3">
                <div className="col-lg-3 col-md-3 col-12  ">
                    <img className='w-100' src={one} alt="steps" />
                </div>
                <div className="col-lg-3 col-md-3 col-12  ">
                    <img className='w-100' src={two} alt="steps" />
                </div>
                <div className="col-lg-3 col-md-3 col-12  ">
                    <img className='w-100' src={three} alt="steps" />
                </div>
                <div className="col-lg-3 col-md-3 col-12 ">
                    <img className='w-100' src={four} alt="steps" />
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
