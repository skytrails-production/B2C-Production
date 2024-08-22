import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";



export default function PriceSummaryGRN(props) {

  const { onFinalAmountChange } = props;

  const reducerState = useSelector((state) => state);

  const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
  const commnetRate = hotelinfoGRN?.rate?.rate_comments?.MandatoryTax;
  const hotelMainReducer = reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;


  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup *
    Number(hotelinfoGRN?.rate?.price);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const discountValueObj = selectedCoupon?.discountPercentage?.filter(
    (item, index) => {
      return item?.name == "HOTELS" || item?.name == "FORALL";
    }
  );


  const totalPriceCalculator = () => {
    let finalAmount = 0;
    let discountAmount = 0;
    const publishedFare = hotelinfoGRN?.rate?.price;
    if (selectedCoupon !== null) {
      let discountamount = 0;
      if (publishedFare <= discountValueObj?.[0].value?.min[0]) {
        discountamount = discountValueObj?.[0].value?.min[1];
      } else if (publishedFare >= discountValueObj?.[0].value?.max[0]) {
        discountamount = Number(discountValueObj?.[0].value?.max[1]);
      }

      if (discountValueObj?.[0].type == "PERCENTAGE") {
        finalAmount = Number(publishedFare) + Number(markUpamount) - Number(publishedFare) * Number(discountamount * 0.01);
        discountAmount = publishedFare * (discountamount * 0.01);


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


  useEffect(() => {
    if (typeof onFinalAmountChange === 'function') {
      onFinalAmountChange(finalAmount);
    } else {
      console.error('onFinalAmountChange is not a function:');
    }
  }, [finalAmount]);



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
          <div>
            <h6>Grand Total</h6>
            <p className="grTotal">₹{" "}{Number(finalAmount).toFixed(0)}</p>
          </div>


        </div>

        {/* <div className="sideBarButtonsHotel">
        

          <Button type="primary" onClick={}>Continue</Button>
        </div> */}

      </div>
    </>
  );
}
