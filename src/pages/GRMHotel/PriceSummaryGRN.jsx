import * as React from "react";
import { useSelector } from "react-redux";

export default function PriceSummaryGRN() {

    const reducerState = useSelector((state) => state);

    const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
    const commnetRate = hotelinfoGRN?.rate?.rate_comments?.MandatoryTax;
    // console.log(reducerState, "reducer state")

    const markUpamount =
        reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup *
        Number(hotelinfoGRN?.rate?.price);

    return (
        <>
            <div className="priceSummaryHotel">
                <div className="head">
                    <span>Price Summary</span>
                </div>
                <div className="priceChart">
                    <div>
                        <span className="text-bold">Check in Time Payment</span>
                    </div>
                    <div>
                        <span></span>
                        <p>

                            {commnetRate}
                        </p>
                    </div>

                </div>
                <div className="priceChart">
                    <div>
                        <span className="text-bold">Rate</span>
                    </div>
                    <div>
                        <span>Published</span>
                        <p>
                            {"₹"}
                            {Number(hotelinfoGRN?.rate?.price).toFixed(0)}
                        </p>
                    </div>
                    <div>
                        <span>Other Tax</span>
                        <p>
                            {"₹"}
                            {Number(markUpamount).toFixed(0)}
                        </p>
                    </div>

                    <div>
                        <span className="text-bold">No of Rooms</span>
                        <p className="text-bold"> {hotelinfoGRN?.rate?.rooms.length}</p>
                    </div>
                </div>
                <div className="TotGst">
                    <div>
                        <span>Grand Total:</span>
                        <p>
                            {"₹"}
                            {(Number(hotelinfoGRN?.rate?.price) + Number(markUpamount)).toFixed(0)}
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}
