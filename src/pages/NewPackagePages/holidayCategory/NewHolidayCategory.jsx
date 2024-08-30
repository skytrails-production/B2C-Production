import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./newcategory.scss";
import { apiURL } from '../../../Constants/constant';
import CarouselCategory from '../carouselPage/CarouselCategory';
import Img from '../../../LazyLoading/Img';
import { useNavigate } from 'react-router-dom';
import HolidayCategorySkeleton from './HolidayCategorySkeleton';

const NewHolidayCategory = () => {
    const [packageData, setPackageData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const packageAvailable = sessionStorage.getItem("packageAvailable");

        if (packageAvailable) {
            const storedData = JSON.parse(packageAvailable);
            setPackageData(storedData);
            setLoading(false);
        } else {
            const getPackage = async () => {
                try {
                    const response = await axios.get(
                        `${apiURL.baseURL}/skyTrails/api/packages/packagesCategory`
                    );
                    if (response.data.statusCode === 200) {
                        setPackageData(response.data.results);
                        sessionStorage.setItem("packageAvailable", JSON.stringify(response.data.results));
                        // console.log('packagelist', response);
                    } else {
                        console.log('packageError', response);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000); // Timeout for 3 seconds
                }
            };
            getPackage();
        }
    }, []);

    const handleFormClicks = (e) => {
        console.log(e, "e ki value");
        navigate(`/holidaypackages/category/${e}`);
    };

    if (loading) {
        return <HolidayCategorySkeleton />;
    }

    return (
        <>
            {packageData.map((category, index) => (
                <div key={index} className='container paddHotCategory' style={{ backgroundColor: `${category.colorCode}` }}>
                    <div className="categoryMainBox">
                        <div className='HoliCateHeading'>
                            <div>
                                <Img src={category.Icon} />
                                <h5 style={{ color: `${category.headingCode}` }}>
                                    {category.inclusion}
                                </h5>
                            </div>
                            <p style={{ cursor: "pointer" }} onClick={() => handleFormClicks(category.inclusion)}>See All</p>
                        </div>
                        <div>
                            <CarouselCategory data={category} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default NewHolidayCategory;
