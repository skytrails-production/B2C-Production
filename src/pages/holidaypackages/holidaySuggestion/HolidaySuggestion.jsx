import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./holidaysuggestion.css"
import { apiURL } from "../../../Constants/constant";
import { clearHolidayReducer, searchOnePackageAction } from "../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
const HolidaySuggestion = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate()



    const searchOneHoliday = (id) => {
        const payload = {
            id,
        };
        dispatch(searchOnePackageAction(payload));
        navigate("/holidayInfo");
    };


    // onClick = {(e) => searchOneHoliday(item?._id)}


    const fetchData = async () => {
        try {
            const response = await fetch(
                `${apiURL.baseURL}/skyTrails/latestPackages`,
            );
            const result = await response.json();

            setData(result.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    // console.log(data)
    return (
        <div>
            <section class="trending pb-3 pt-0">
                <div class="container p-0">
                    {/* <div class="section-title  mx-auto text-center ">
                        <h2 class="mb-1">Explore <span class="theme">Top Trending Destinations</span></h2>
                    </div> */}
                    <div class="offerText my-5"><p>Explore Top Trending Destinations</p></div>
                    <div class="row p-0 align-items-center">
                        <div class="col-lg-12">
                            <div class="row">
                                {
                                    data?.map((item, index) => {
                                        return (
                                            <div key={index} onClick={(e) => searchOneHoliday(item?._id)} class="col-lg-4 col-md-4 col-sm-4 mb-4" style={{ cursor: "pointer" }}>
                                                <div class="trend-item1">
                                                    <div class="trend-image position-relative rounded">
                                                        <img src={item?.pakage_img} alt="package-img" />
                                                        <div
                                                            class="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100">
                                                            <div class="trend-content-title">
                                                                {/* <h5 class="mb-0"><a href="tour-grid.html" class="theme1">{item?.destination?.[0]}</a></h5> */}
                                                                {item?.destination?.slice(0, 3).map((destinationItem, index, array) => (
                                                                    <React.Fragment key={index}>
                                                                        <span className="theme1">{destinationItem?.addMore}</span>
                                                                        {index !== array.length - 1 && <span className="theme1" >, {" "}</span>}
                                                                    </React.Fragment>
                                                                ))}
                                                                <h3 class="mb-0 white">{item?.country}</h3>
                                                            </div>
                                                            <span class="white bg-theme p-1 px-2 rounded">{item?.days}{"D/"}{item?.days - 1}{"N"}</span>
                                                        </div>
                                                        <div class="color-overlay"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }


                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default HolidaySuggestion
