import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import SecureStorage from "react-secure-storage";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Checkbox, Spin, Alert } from "antd";
import { swalModal } from "../../utility/swal";
import swal from "sweetalert2";
const CouponContainer = ({
  value,
  couponCode,
  couponStatus,
  couponDiscount,
  loading,
  error,
  selectedCoupon,
  setSelectedCoupon,
  onCouponChange,
  onCouponStatusChange,
  onCouponDiscountChange,
  onLoadingChange,
  onErrorChange,
}) => {
  const [getCouponValue, setGetCouponValue] = useState([]);
  const [showInputField, setShowInputField] = useState(false);
  const [couponError, setCouponError] = useState('');
  // const [selectedCoupon, setSelectedCoupon] = useState("");
  const [loginerror, setloginerror] = useState(false);
  const offertypevalue = value;

  const reducerState = useSelector((state) => state);
  const authenticUser = reducerState?.logIn?.loginData?.status;
  const couponappiled = reducerState?.logIn?.loginData?.data?.result?._id;

  // console.log("selectedCoupon",selectedCoupon)

  // console.log(couponappiled,"dhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  useEffect(() => {
    if (authenticUser == 200) {
      setloginerror(false);
    }
  }, [authenticUser]);

  // console.log("offertypevaluehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",offertypevalue)
  const getCoupons = async () => {
    if (authenticUser !== 200) {
      setloginerror(true);
      // swal.fire("Please Login");
      return;
    }
    setShowInputField(true);
    onLoadingChange(true);
    onErrorChange(null);
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/coupons/getCoupons`
      );
      if (response.data.statusCode === 200) {
        const filteredCoupons = response.data.result.filter(
          (coupon) =>
            coupon.offerType == "FORALL" || coupon.offerType == offertypevalue
        );
        setGetCouponValue(filteredCoupons);
      } else {
        onErrorChange("Failed to fetch coupons");
      }
    } catch (e) {
      onErrorChange("Error fetching coupons");
    }
    onLoadingChange(false);
    // }
  };
  // console.log("getCouponValue",getCouponValue?._id);
  // const handleApplyCoupon = async () => {
  //   try {
  //     onLoadingChange(true);
  //     const token = SecureStorage.getItem("jwtToken");
  //     const response = await axios.put(
  //       `${apiURL.baseURL}/skyTrails/api/coupons/applyCoupon`,
  //       { couponCode: selectedCoupon },
  //       {
  //         headers: {
  //           token: token,
  //         },
  //       }
  //     );
  //     if (response?.data?.statusCode === 200) {
  //       sessionStorage.setItem("couponCode", selectedCoupon);
  //       onCouponStatusChange(true);
  //       onCouponDiscountChange(response.data.result.discount || 0);
  //       onCouponChange(selectedCoupon);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.data.statusCode === 409) {
  //       onErrorChange("Coupon already applied");
  //       setTimeout(() => {
  //         onErrorChange(null);
  //       }, 4000);
  //     } else if (error.response && error.response.data.statusCode === 404) {
  //       onErrorChange(
  //         error.response?.data?.responseMessage ||
  //           "Error Applying coupon. Please try again."
  //       );
  //     } else {
  //       onErrorChange(
  //         error.response?.data?.message ||
  //           "Error applying coupon. Please try again."
  //       );
  //     }
  //   } finally {
  //     onLoadingChange(false);
  //   }
  // };

  const handleCouponSelect = (couponCode) => {
    setSelectedCoupon(couponCode);
  };

  // const handleCheckboxChange = (e, couponCode) => {
  //   console.log(couponCode, "couponCode");
  //   if (e.target.checked) {
  //     handleCouponSelect(couponCode);
  //     // handleApplyCoupon();
  //   } else {
  //     setSelectedCoupon("");
  //     onCouponChange("");
  //     onCouponStatusChange(false);
  //     onCouponDiscountChange(0);
  //   }
  // };
  const handleCheckboxChange = (e, coupon) => {
    if (e.target.checked) {
      setSelectedCoupon(coupon);
      onCouponChange(coupon.couponCode);
    } else {
      setSelectedCoupon(null);
      onCouponChange("");
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"end"}}>
      {!showInputField ? (
        <>
          <Button
            type="primary"
            onClick={() => getCoupons()}
            style={{
              marginTop: "10px",
              marginBottom: "10px",

              width: "100%",
              backgroundColor: "#e73c34",
              // backgroundImage:
              //   "linear-gradient(to top, rgb(237, 210, 135), rgb(184, 134, 11))",
              background: "#e73c34",

            }}
          >
            {loading ? <Spin /> : "Apply Coupon"}
          </Button>
          {loginerror && (
            <div
              style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
            >
              Please Login
            </div>
          )}
        </>
      ) : (
        <div>
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => onCouponChange(e.target.value)}
            style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
          />

          <div>
            {getCouponValue.map((coupon) => (

              <div
                key={coupon._id}
                style={{
                  backgroundColor: "#ffd6ff",
                  padding: "10px 10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px"
                }}
              >
                <Checkbox
                  onChange={(e) => handleCheckboxChange(e, coupon)}
                  // checked={selectedCoupon === coupon.couponCode}
                  disabled={coupon.userApplied?.includes(reducerState?.logIn?.loginData?.data?.result?._id)}
                  checked={selectedCoupon && selectedCoupon._id === coupon._id}
                >
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {coupon.couponCode}
                  </p>{" "}
                  {coupon.content}
                </Checkbox>
                {coupon.userApplied?.includes(reducerState?.logIn?.loginData?.data?.result?._id) && (
                  <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                    Coupon already applied
                  </p>
                )}

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponContainer;
