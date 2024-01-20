import React, { useEffect } from 'react'
import goa from "../../../images/goa.jpg";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { searchPackageAction } from '../../../Redux/SearchPackage/actionSearchPackage';
import { searchOnePackageAction } from '../../../Redux/OnePackageSearchResult/actionOneSearchPackage';
import { useNavigate } from 'react-router-dom';
const HolidaySimilar = () => {

    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const searchedData = sessionStorage.getItem("searchPackageData")
    const Stringify = JSON.parse(searchedData)
    const filteredPackage =
        reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;

    // console.log(filteredPackage, "filtered")

    useEffect(() => {
        const payload = {
            destination: Stringify?.destination,
            days: 0,
        };
        dispatch(searchPackageAction(payload));
        // sessionStorage.setItem("searchPackageData", JSON.stringify(payload));
    }, [])



    const searchOneHoliday = (id) => {
        const payload = {
            id,
        };
        dispatch(searchOnePackageAction(payload));
        navigate("/holidayInfo");
        window.scrollTo(0, 0)
    };


    return (
        <div>

            <section class="trending pb-3 pt-0 mb100">
                <div class="container p-0">
                    {/* <div class="section-title  mx-auto text-center ">
                        <h2 class="mb-1">Explore <span class="theme">Top Trending Destinations</span></h2>
                    </div> */}
                    <div class="offerText my-5">
                        <p>Suggested Destinations in {Stringify.destination} </p>

                    </div>
                    <div class="row p-0 align-items-center">
                        <div class="col-lg-12">
                            <div class="row">
                                {
                                    filteredPackage?.slice(0, 3).map((item, index) => (
                                        <div key={index} onClick={(e) => searchOneHoliday(item?._id)} class="col-lg-4 col-md-4 col-sm-4 mb-4" style={{ cursor: "pointer" }}>
                                            <div class="trend-item1">
                                                <div class="trend-image position-relative rounded">
                                                    <img src={item?.pakage_img} alt="package-img" />
                                                    <div class="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0  w-100">
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
                                    )
                                    )}
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default HolidaySimilar
