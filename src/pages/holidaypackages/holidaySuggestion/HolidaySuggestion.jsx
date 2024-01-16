import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./holidaysuggestion.css"
import { apiURL } from "../../../Constants/constant";
import { clearHolidayReducer, searchOnePackageAction } from "../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
// import Skeleton from "react-loading-skeleton";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';



const HolidaySuggestion = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [destination, setDestination] = useState("")
    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate()




    useEffect(() => {
        if (destination) {
            const payloadDestination = {
                destination: destination,
                days: 0,
            };
            sessionStorage.setItem("searchPackageData", JSON.stringify(payloadDestination));
            navigate("/holidayInfo");
        }
    }, [destination]);

    const searchOneHoliday = (item) => {
        const id = item?._id;
        setDestination(item?.country);
        const payload = {
            id,
        };
        dispatch(searchOnePackageAction(payload));

    };



    // console.log(destination, "data desti")


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

    // if (loading) {
    //     return (
    //         <h1>my name is shaan</h1>
    //     )
    // }
    return (
        <div>

            <section class="trending pb-3 pt-0 mb100">
                <div class="container p-0">
                    {/* <div class="section-title  mx-auto text-center ">
                        <h2 class="mb-1">Explore <span class="theme">Top Trending Destinations</span></h2>
                    </div> */}
                    <div class="offerText my-5">
                        <p>Explore Top Trending Destinations</p>

                    </div>
                    <div class="row p-0 align-items-center">
                        <div class="col-lg-12">
                            <div class="row">
                                {loading ? (
                                    // Show the skeleton for each item while data is being fetched
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#facad0">
                                            <div key={index} class="rounded col-lg-4 col-md-4 col-sm-4 mb-4">
                                                <Skeleton height={250} />
                                            </div>
                                        </SkeletonTheme>
                                    ))
                                ) : (
                                    data?.map((item, index) => (
                                        <div key={index} onClick={(e) => searchOneHoliday(item)} class="col-lg-4 col-md-4 col-sm-4 mb-4" style={{ cursor: "pointer" }}>
                                            <div class="trend-item1">
                                                <div class="trend-image position-relative rounded">
                                                    <img src={item?.pakage_img} alt="package-img" />
                                                    <div class="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100">
                                                        <div class="trend-content-title">
                                                            {item?.destination?.slice(0, 3).map((destinationItem, index, array) => (
                                                                <React.Fragment key={index}>
                                                                    <span className="theme1">{destinationItem?.addMore}</span>
                                                                    {index !== array.length - 1 && <span className="theme1">, {" "}</span>}
                                                                </React.Fragment>
                                                            ))}
                                                            <h3 class="mb-0 white">{item?.country}</h3>
                                                        </div>
                                                        <div className="holiSuggSpan">
                                                            <span class=" white bg-theme p-1 px-2 rounded">{item?.days}{"D/"}{item?.days - 1}{"N"}</span>
                                                            <span class="white holiSugPrice p-1 px-2 ">₹{item?.pakage_amount?.amount}</span>
                                                        </div>
                                                    </div>
                                                    <div class="color-overlay"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default HolidaySuggestion
