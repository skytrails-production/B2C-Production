// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./newholidayTrending.scss"
import { apiURL } from '../../../Constants/constant';
// import Img from '../../../LazyLoading/Img';
// import { useNavigate } from 'react-router-dom';
import CarouselTrending from '../carouselPage/CarouselTrending';

const NewHolidayTrending = () => {

    const [packageData, setPackageData] = useState([]);
    // const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        try {
            const response = await fetch(
                `${apiURL.baseURL}/skyTrails/latestPackages`,
            );
            const result = await response.json();

            setPackageData(result.data);
            // setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    console.log(packageData, "packageData")

    return (
        <>
            <div className='container paddHotTrending' style={{ backgroundColor: `${packageData?.[0]?.colorCode}` }}>
                {/* <div className='container paddHotCat' style={{ backgroundColor: `#f2e7ff` }}> */}
                <h2>Trending Packages</h2>
                <div className="categoryMainBox">
                    <div className='HoliCateHeading'>
                        {/* <div >
                            <Img src={packageData?.[0]?.Icon} />
                            <h5 style={{ color: `${packageData?.[0]?.headingCode}` }} >
                                {packageData?.[0]?.inclusion}</h5>
                        </div>
                        <p>See All</p> */}
                    </div>
                    <div>
                        <CarouselTrending data={packageData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewHolidayTrending


