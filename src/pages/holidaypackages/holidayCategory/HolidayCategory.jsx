import React from 'react'

const HolidayCategory = () => {
    return (
        <div className='container p-0'>
            <div class="offerText my-5"><p>Explore Destination by Categories</p></div>
            <div className="row">
                <div className="col-lg-3 col-md-3">
                    <div className="holidayCatBox">
                        <h3>Beaches</h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3">
                    <div className="holidayCatBox">
                        <h3>Hill Station</h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3">
                    <div className="holidayCatBox">
                        <h3>Heritage</h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3">
                    <div className="holidayCatBox">
                        <h3>Wildlife</h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3">
                    <div className="holidayCatBox">
                        <h3>Cruise</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HolidayCategory
