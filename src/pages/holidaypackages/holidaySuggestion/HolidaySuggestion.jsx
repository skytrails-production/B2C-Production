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

    // console.log(data, "data")
    return (
        <div>

            <section class="trending pb-3 pt-0 mb100 d-none d-sm-block ">
                <div class="container p-0">
                    <div class="offerText my-5">
                        <p>Explore Top Trending Destinations</p>

                    </div>
                    <div class="row p-0 align-items-center">
                        <div class="col-lg-12">
                            <div class="row g-4">
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


                                        <div class="col-lg-4">
                                            <div class="holidaySuggesBox">
                                                <div class="holidaySuggesBoxOne">
                                                    <span><svg height="15" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_3177361"><g id="Pin"><path d="m32 0a24.0319 24.0319 0 0 0 -24 24c0 17.23 22.36 38.81 23.31 39.72a.99.99 0 0 0 1.38 0c.95-.91 23.31-22.49 23.31-39.72a24.0319 24.0319 0 0 0 -24-24zm0 35a11 11 0 1 1 11-11 11.0066 11.0066 0 0 1 -11 11z"></path></g></svg></span>
                                                    <p>{item?.country}</p>
                                                </div>
                                                <div class="holidaySuggesBoxTwo">
                                                    <h3>{item?.pakage_title}</h3>
                                                </div>
                                                <div class="holidaySuggesBoxThree">
                                                    {
                                                        item?.package_img.length > 0 ? (
                                                            <img src={item?.package_img[0]} alt="package-img" />

                                                        ) : (
                                                            <img src={item?.pakage_img} alt="package-img" />
                                                        )
                                                    }
                                                </div>
                                                <div class="holidaySuggesBoxFour">
                                                    {/* <span>10 Activities</span> */}
                                                    <span>
                                                        <svg id="fi_12273708" enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="15" height="15" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m437.323 450.111 37.677 20.828v-229.891c-43.972 13.964-83.514 31.964-104.597 49.56-7.406 6.181-12.313 12.106-13.996 17.51-4.761 15.288 22.565 24.322 42.504 28.899 33.837 7.768 35.168 43.163 36.645 82.472.379 10.068.768 20.415 1.767 30.622zm-386.175-279.524-14.148 7.82v292.532l103.543-57.239c1.747-.989 3.951-1.078 5.839-.041l70.154 38.781c13.361-7.526 17.016-35.047 5.6-49.552-5.087-6.464-13.43-10.666-25.674-9.969-22.289 1.268-30.268-19.084-31.733-44.819-1.538-27.04 4.157-60.246 6.993-76.779 5.177-30.179 5.627-51.81-7.137-53.784-16.851-2.606-51.634 20.708-77.309 19.479-21.073-1.009-36.582-16.106-36.128-66.429zm204.852-129.526c18.996 0 37.988 7.201 52.388 21.602 28.804 28.804 28.804 75.974.001 104.777l-52.389 52.389-52.389-52.389c-14.401-14.401-21.602-33.392-21.602-52.389 0-41.037 32.953-73.99 73.991-73.99zm20.693 51.804c-18.385-18.385-49.955-5.3-49.955 20.693s31.57 39.077 49.955 20.692c11.427-11.427 11.427-29.958 0-41.385zm-20.693-20.571c-22.787 0-41.263 18.476-41.263 41.263s18.475 41.263 41.263 41.263c22.787 0 41.263-18.476 41.263-41.263s-18.476-41.263-41.263-41.263zm-106.5 111.636v-61.08l22.954 12.689c3.594 14.824 11.152 28.864 22.673 40.385l56.631 56.631c2.343 2.343 6.142 2.343 8.484 0l56.631-56.631c11.521-11.521 19.079-25.561 22.673-40.385l22.954-12.689v115.983c0 3.314 2.686 6 6 6s6-2.686 6-6v-115.983l100.5 55.557v50.113c-44.733 13.914-119.924 43.589-130.03 76.035-2.735 8.784-.851 17.089 6.699 24.561 7.811 7.73 22.184 14.434 44.571 19.573 24.901 5.716 26.068 36.753 27.364 71.222.288 7.664.582 15.485 1.125 23.238l-50.229-27.767v-52.675c0-3.314-2.686-6-6-6s-6 2.686-6 6v52.675l-100.5 55.557v-210.825c0-3.314-2.686-6-6-6s-6 2.686-6 6v210.826l-22.04-12.184c15.648-14.721 17.551-45.546 3.599-63.273-7.366-9.359-19.045-15.467-35.753-14.516-34.039 1.937-13.167-101.38-11.144-114.458 6.693-43.266-2.031-58.276-18.247-60.784-21.646-3.349-55.589 20.438-78.575 19.338-15.304-.732-26.285-14.389-24.569-61.178l74.229-41.035v61.08c0 3.314 2.686 6 6 6s6-2.687 6-6z" fill-rule="evenodd"></path></svg>
                                                        {item?.destination?.length} Places</span>
                                                    <span>
                                                        <svg id="fi_2886665" enable-background="new 0 0 34 34" height="15" viewBox="0 0 34 34" width="15" xmlns="http://www.w3.org/2000/svg"><g><path d="m29.6 2h-3v3c0 .6-.5 1-1 1s-1-.4-1-1v-3h-16v3c0 .6-.5 1-1 1s-1-.4-1-1v-3h-3c-1.5 0-2.6 1.3-2.6 3v3.6h32v-3.6c0-1.7-1.8-3-3.4-3zm-28.6 8.7v18.3c0 1.8 1.1 3 2.7 3h26c1.6 0 3.4-1.3 3.4-3v-18.3zm8.9 16.8h-2.4c-.4 0-.8-.3-.8-.8v-2.5c0-.4.3-.8.8-.8h2.5c.4 0 .8.3.8.8v2.5c-.1.5-.4.8-.9.8zm0-9h-2.4c-.4 0-.8-.3-.8-.8v-2.5c0-.4.3-.8.8-.8h2.5c.4 0 .8.3.8.8v2.5c-.1.5-.4.8-.9.8zm8 9h-2.5c-.4 0-.8-.3-.8-.8v-2.5c0-.4.3-.8.8-.8h2.5c.4 0 .8.3.8.8v2.5c0 .5-.3.8-.8.8zm0-9h-2.5c-.4 0-.8-.3-.8-.8v-2.5c0-.4.3-.8.8-.8h2.5c.4 0 .8.3.8.8v2.5c0 .5-.3.8-.8.8zm8 9h-2.5c-.4 0-.8-.3-.8-.8v-2.5c0-.4.3-.8.8-.8h2.5c.4 0 .8.3.8.8v2.5c0 .5-.3.8-.8.8zm0-9h-2.5c-.4 0-.8-.3-.8-.8v-2.5c0-.4.3-.8.8-.8h2.5c.4 0 .8.3.8.8v2.5c0 .5-.3.8-.8.8z"></path></g></svg>
                                                        {item?.days}{"D/"}{item?.days - 1}{"N"}</span>
                                                </div>
                                                <hr class="hori" />
                                                <div class="holidaySuggesBoxFive">
                                                    <p>₹{item?.pakage_amount?.amount}<span>/Person</span></p>
                                                    <button onClick={(e) => searchOneHoliday(item)}>View Package</button>
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
