import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CouponContainer from "../../components/Coupon/Couponcontainer";

function PriceSummaryGRNcoupon(props) {
    const { onFinalAmountChange , oncouponselect} = props;

    const reducerState = useSelector((state) => state);

    const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
    const commnetRate = hotelinfoGRN?.rate?.rate_comments?.MandatoryTax;

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
            // if (selectedCoupon !== null) {
            //     if (discountValueObj?.[0].type == "PERCENTAGE") {
            //     finalAmount =
            //       finalAmount +
            //       (hotelinfoGRN?.rate?.price) +
            //       markUpamount -
            //       (hotelinfoGRN?.rate?.price) *
            //         (discountValueObj?.[0].value * 0.01);
        
            //     discountAmount =
            //       discountAmount +
            //       (hotelinfoGRN?.rate?.price) *
            //         (discountValueObj?.[0].value * 0.01);
            //   } else if (discountValueObj?.[0].type == "AMOUNT") {
            //     finalAmount =
            //       finalAmount +
            //       (hotelinfoGRN?.rate?.price) +
            //       markUpamount  -
            //       discountValueObj?.[0].value ;
            //     discountAmount = discountAmount + discountValueObj?.[0].value;
            //   }
            // }
            const publishedFare =  Number(hotelinfoGRN?.rate?.price) ;
    if (selectedCoupon !== null) {
      let discountamount = 0;
      if (publishedFare <= discountValueObj?.[0].value?.min[0]) {
        discountamount = Number(discountValueObj?.[0].value?.min[1]);
      } else if (Number(publishedFare) >= Number(discountValueObj?.[0].value?.max[0])) {
        discountamount = Number(discountValueObj?.[0].value?.max[1]);
      }

      if (discountValueObj?.[0].type == "PERCENTAGE") {
        finalAmount = Number(publishedFare) + Number(markUpamount)  - Number(publishedFare) * Number(discountamount * 0.01);
        discountAmount = Number(publishedFare) * Number(discountamount * 0.01);

       
      } else if (discountValueObj?.[0].type == "AMOUNT") {
        finalAmount = Number(publishedFare) + Number(markUpamount) - Number(discountamount);
        discountAmount =   Number(discountamount);
      }}
             else {
              finalAmount =
                finalAmount +
                Number(hotelinfoGRN?.rate?.price) +
                Number( markUpamount );
            }
            // return { amountGenerator: { finalAmount, discountAmount } };
            return {finalAmount, discountAmount};
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
          }, [finalAmount,couponCode]);
  return (
    <>
    <div className="priceSummaryHotel">
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
      
      {/* <div>
        <span>Base Fare </span>
        <p>{(Number(hotelinfoGRN?.rate?.price)).toFixed(2)}</p>
      </div> */}

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
                    {/* {(Number(hotelinfoGRN?.rate?.price) + Number(markUpamount)).toFixed(0)} */}
                    {Number(finalAmount).toFixed(2)}
                </p>
            </div>



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
</>
  )
}

export default PriceSummaryGRNcoupon