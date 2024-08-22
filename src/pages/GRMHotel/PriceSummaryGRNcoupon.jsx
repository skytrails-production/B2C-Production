import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CouponContainer from "../../components/Coupon/Couponcontainer";
import dayjs from "dayjs";
import { Button } from "antd";

function PriceSummaryGRNcoupon(props) {
  const { onFinalAmountChange, oncouponselect, payButton, loadingPayButton } = props;

  const reducerState = useSelector((state) => state);

  const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
  const commnetRate = hotelinfoGRN?.rate?.rate_comments?.MandatoryTax;
  const hotelMainReducer = reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
  const markUpamount =
    Number(reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup) *
    Number(hotelinfoGRN?.rate?.price);

  const [showApplyButton, setShowApplyButton] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [selectedCoupon, setSelectedCoupon] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const discountValueObj = selectedCoupon?.discountPercentage?.filter(
    (item, index) => {
      return item?.name == "HOTELS" || item?.name == "FORALL";
    }
  );



  // console.log("discountValueObj", discountValueObj,discountValueObj?.[0].value);

  const handleCouponChange = (code) => {
    setCouponCode(code);
    setCouponApplied(!!code);
  };

  const handleCouponStatusChange = (status) => {
    setCouponStatus(status);
  };

  const handleCouponDiscountChange = (discount) => {
    setCouponDiscount(discount);
  };

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleErrorChange = (errorMessage) => {
    setError(errorMessage);
  };

  const flight = "HOTELS";

  const totalPriceCalculator = () => {
    let finalAmount = 0;
    let discountAmount = 0;

    const publishedFare = Number(hotelinfoGRN?.rate?.price);
    if (selectedCoupon !== null) {
      let discountamount = 0;
      if (publishedFare <= discountValueObj?.[0].value?.min[0]) {
        discountamount = Number(discountValueObj?.[0].value?.min[1]);
      } else if (Number(publishedFare) >= Number(discountValueObj?.[0].value?.max[0])) {
        discountamount = Number(discountValueObj?.[0].value?.max[1]);
      }

      if (discountValueObj?.[0].type == "PERCENTAGE") {
        finalAmount = Number(publishedFare) + Number(markUpamount) - Number(publishedFare) * Number(discountamount * 0.01);
        discountAmount = Number(publishedFare) * Number(discountamount * 0.01);


      } else if (discountValueObj?.[0].type == "AMOUNT") {
        finalAmount = Number(publishedFare) + Number(markUpamount) - Number(discountamount);
        discountAmount = Number(discountamount);
      }
    }
    else {
      finalAmount =
        finalAmount +
        Number(hotelinfoGRN?.rate?.price) +
        Number(markUpamount);
    }
    // return { amountGenerator: { finalAmount, discountAmount } };
    return { finalAmount, discountAmount };
  };
  const { finalAmount, discountAmount } = totalPriceCalculator();

  // console.log("finalAmount",finalAmount,discountAmount);

  // console.log("couponvalue",selectedCoupon.couponCode);
  useEffect(() => {
    if (typeof onFinalAmountChange === 'function') {
      onFinalAmountChange(finalAmount);
      oncouponselect(couponCode);
    } else {
      console.error('onFinalAmountChange is not a function:');
    }
  }, [finalAmount, couponCode]);
  return (
    <>

      <div className="initialBookingData">
        <div className="checkInCheckOutBox">
          <div className="checkInInnerBoxOne">
            <div>
              <p>Check-In</p>
              <h5>
                {dayjs(hotelMainReducer?.checkin).format(
                  "DD MMM, YY"
                )}
              </h5>
              <h2>
                {dayjs(hotelMainReducer?.checkin).format(
                  "dddd"
                )}
              </h2>
            </div>

            <div>
              <p>Check-Out</p>
              <h5>
                {dayjs(hotelMainReducer?.checkout).format(
                  "DD MMM, YY"
                )}
              </h5>
              <h2>
                {dayjs(hotelMainReducer?.checkout).format(
                  "dddd"
                )}
              </h2>
            </div>
          </div>
          <div className="checkInInnerBoxTwo">
            <p>
              {hotelMainReducer?.no_of_rooms} Room
            </p>
            <h5>
              {", "}{hotelMainReducer?.no_of_adults} Adult{" "}
              {hotelMainReducer?.no_of_children > 0
                ? `${hotelMainReducer?.no_of_children} Child`
                : ""}
            </h5>
          </div>
        </div>


        <div className="sideBarPriceBox">

          <div>
            <h6>₹{" "}{(hotelinfoGRN?.rate?.price / hotelMainReducer?.no_of_nights).toFixed(0)} x {hotelMainReducer?.no_of_nights}{" "}nights</h6>
            <p>₹{" "}{hotelinfoGRN?.rate?.price}</p>
          </div>
          <div>
            <h6>₹{" "}{(hotelinfoGRN?.rate?.price / hotelMainReducer?.no_of_rooms).toFixed(0)} x {hotelMainReducer?.no_of_rooms}{" "}rooms</h6>
            <p>₹{" "}{hotelinfoGRN?.rate?.price}</p>
          </div>

        </div>
        <hr />

        <div className="sideBarPriceBox">

          <div>
            <h6>Other Tax</h6>
            <p>₹{" "}{Number(markUpamount).toFixed(0)}</p>
          </div>

          {
            commnetRate &&

            <div>
              <span className="text-bold">Check in Time Payment</span>
              <p>
                {commnetRate}
              </p>
            </div>



          }

          {discountAmount > 0 && (
            <div>
              <h6>Discount Amount</h6>
              <p>
                {"₹"}
                {Number(discountAmount).toFixed(2)}
              </p>
            </div>
          )}
          <div>
            <h6>Grand Total</h6>
            <p className="grTotal">₹{" "}{Number(finalAmount).toFixed(0)}</p>
          </div>

          <div className="sideBarButtonsHotel">


            <Button type="primary" loading={loadingPayButton} onClick={payButton}>Pay Now</Button>
          </div>
          <CouponContainer
            value={flight}
            couponCode={couponCode}
            couponApplied={couponApplied}
            couponStatus={couponStatus}
            couponDiscount={couponDiscount}
            loading={loading}
            selectedCoupon={selectedCoupon}
            error={error}
            onCouponChange={handleCouponChange}
            onCouponStatusChange={handleCouponStatusChange}
            onCouponDiscountChange={handleCouponDiscountChange}
            onLoadingChange={handleLoadingChange}
            onErrorChange={handleErrorChange}
            setSelectedCoupon={setSelectedCoupon}
          />

        </div>

      </div>

      {/* <div className="priceSummaryHotel">
        <div className="head">
          <span>Price Summary</span>
        </div>
        {
          commnetRate &&
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
        }

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

          {discountAmount > 0 && (
            <div>
              <span>Discount Amount:</span>
              <p>
                {"₹"}
                {Number(discountAmount).toFixed(2)}
              </p>
            </div>
          )}

          <div>
            <span>Grand Total:</span>
            <p>
              {"₹"}
              {Number(finalAmount).toFixed(2)}
            </p>
          </div>



        </div>

        

      </div> */}
    </>
  )
}

export default PriceSummaryGRNcoupon