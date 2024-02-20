import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./holidaysuggestion.css"
import { apiURL } from "../../../Constants/constant";
// import { clearHolidayReducer, searchOnePackageAction } from "../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
// import Skeleton from "react-loading-skeleton";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';



const HolidaySuggestion = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [destination, setDestination] = useState("")
    // const reducerState = useSelector((state) => state);
    // const dispatch = useDispatch();
    const navigate = useNavigate()




    // useEffect(() => {
    //     if (destination) {
    //         const payloadDestination = {
    //             destination: destination,
    //             days: 0,
    //         };
    //         sessionStorage.setItem("searchPackageData", JSON.stringify(payloadDestination));
    //         navigate("/holidayInfo");
    //     }
    // }, [destination]);

    // const searchOneHoliday = (item) => {
    //     const id = item?._id;
    //     setDestination(item?.country);
    //     const payload = {
    //         id,
    //     };
    //     dispatch(searchOnePackageAction(payload));

    // };

    useEffect(() => {
        if (destination) {

            const id = destination?._id;
            navigate(`/holidayInfo/${id}`);
        }
    }, [destination]);



    const searchOneHoliday = (item) => {
        const id = item?._id;
        setDestination(item);
        // const payload = {
        //     id,
        // };
        // dispatch(searchOnePackageAction(payload));
        // navigate(`/holidayInfo/${id}`);
        const payloadDestination = {
            destination: destination?.country,
            days: 0,
        };
        sessionStorage.setItem("searchPackageData", JSON.stringify(payloadDestination));

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

            <section class="trending pb-3 pt-0 mb100 d-none d-sm-block ">
                <div class="container p-0">
                    <div class="offerText my-5">
                        <p>Explore Top Trending Destinations</p>

                    </div>
                    <div class="row p-0 align-items-center">
                        <div class="col-lg-12">
                            <div class="row">
                                {loading ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#facad0">
                                            <div key={index} class="rounded col-lg-4 col-md-4 col-sm-4 mb-4">
                                                <Skeleton height={250} />
                                            </div>
                                        </SkeletonTheme>
                                    ))
                                ) : (
                                    data?.map((item, index) => (
                                        <div key={index} onClick={(e) => searchOneHoliday(item)} class="col-lg-4 col-md-4 col-sm-4 col-6 mb-4 p-2" style={{ cursor: "pointer" }}>
                                            <div class="trend-item1">
                                                <div class="trend-image position-relative rounded">
                                                    <img src={item?.pakage_img} alt="package-img" />
                                                    <div class="trend-content d-flex align-items-center justify-content-between  w-100">
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
                                                            <span class="white holiSugPrice p-1  ">₹{item?.pakage_amount?.amount}</span>
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


            {/* for mobile device only  */}

            <section class="trending pb-3 pt-0  d-block d-sm-none ">
                <div class="container p-0">
                    <div class="offerText my-5">
                        <p>Explore Top Trending Destinations</p>

                    </div>
                    <div class="row p-0 align-items-center">
                        <div class="col-lg-12">
                            <div class="row">
                                {loading ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#facad0">
                                            <div key={index} class="rounded col-lg-4 col-md-4 col-sm-4 mb-4">
                                                <Skeleton height={250} />
                                            </div>
                                        </SkeletonTheme>
                                    ))
                                ) : (
                                    data?.map((item, index) => (
                                        <div key={index} onClick={(e) => searchOneHoliday(item)} class="col-lg-4 col-md-4 col-sm-4 col-6 mb-2 p-2" style={{ cursor: "pointer" }}>
                                            <div class="trendSmall">

                                                <div className="imgBoxTrendMobile">
                                                    <img className="uniImgShad" src={item?.pakage_img} alt="package-img" />
                                                    <div class="color-overlayMobile"></div>
                                                    <div className="holiSuggSpanMobile">
                                                        <span class="trendSpanOne">{item?.days}{"D/"}{item?.days - 1}{"N"}</span>
                                                        <span class="trendSpanTwo">₹{item?.pakage_amount?.amount}</span>
                                                    </div>
                                                </div>
                                                <div class="trendContentMobile">


                                                    <div class="trendContentTitleMobile">

                                                        <h3 class="mb-0">
                                                            <span className="pe-1 d-inline-block">
                                                                <svg height="15" viewBox="0 0 32 32" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_3138736"><g id="Pin-2" data-name="Pin"><path d="m25.0464 8.4834a10 10 0 0 0 -7.9116-5.4258 11.3644 11.3644 0 0 0 -2.2691 0 10.0027 10.0027 0 0 0 -7.9121 5.4253 10.8062 10.8062 0 0 0 1.481 11.8936l6.7929 8.2588a1 1 0 0 0 1.545 0l6.7929-8.2588a10.8055 10.8055 0 0 0 1.481-11.8931zm-9.0464 8.5166a4 4 0 1 1 4-4 4.0047 4.0047 0 0 1 -4 4z"></path></g></svg>
                                                            </span> {item?.country}</h3>
                                                        <div>
                                                            {item?.destination?.slice(0, 3).map((destinationItem, index, array) => (
                                                                <React.Fragment key={index}>
                                                                    <span className="">{destinationItem?.addMore}</span>
                                                                    {index !== array.length - 1 && <span className="">, {" "}</span>
                                                                    }
                                                                </React.Fragment>
                                                            ))}
                                                        </div>
                                                    </div>
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

            {/* for mobile device only  */}
        </div>
    )
}

export default HolidaySuggestion
