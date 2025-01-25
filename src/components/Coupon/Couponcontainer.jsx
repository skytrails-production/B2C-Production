import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import SecureStorage from "react-secure-storage";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Checkbox, Spin, Alert } from "antd";
import { swalModal } from "../../utility/swal";
import Authentic from "../../pages/Auth/Authentic";
import swal from "sweetalert2";
import { colors } from "../../colors";
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
  const [couponError, setCouponError] = useState("");
  // const [selectedCoupon, setSelectedCoupon] = useState("");
  const [loginerror, setloginerror] = useState(false);
  const offertypevalue = value;

  const reducerState = useSelector((state) => state);
  const authenticUser = reducerState?.logIn?.loginData?.status;
  const couponappiled = reducerState?.logIn?.loginData?.data?.result?._id;

  // console.log("selectedCoupon",selectedCoupon)

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
  };

  // console.log(couponappiled,"dhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  useEffect(() => {
    if (authenticUser == 200) {
      setloginerror(false);
      handleModalClose();
    }
  }, [authenticUser]);

  // console.log("offertypevaluehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",offertypevalue)
  const getCoupons = async () => {
    if (authenticUser !== 200) {
      setloginerror(true);
      setIsLoginModalOpen(true);
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

  const handleCouponSelect = (couponCode) => {
    setSelectedCoupon(couponCode);
  };

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
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        flexDirection: "column",
      }}
    >
      {!showInputField ? (
        <>
          <button
            type="primary"
            onClick={() => getCoupons()}
            style={{
              marginTop: "10px",
              marginBottom: "10px",

              width: "100%",
            }}
            className={`${colors.primary6000} hover:${colors.primary700} rounded-lg p-1 button text-white`}
          >
            {loading ? <Spin /> : "Apply Coupon"}
          </button>
          {/* {loginerror && (
            <div
              style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
            > */}
          {/* Please Login */}
          {/* {loginerror && (
            <div
              style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
            >
              Please Login
            </div>
          )} */}

          <Authentic
            isOpen={isLoginModalOpen}
            onClose={handleModalClose}
            // isLogoutOpen={logoutModalVisible}
            // onLogoutClose={closeLogoutModal}
          />
          {/* </div> */}
          {/* )} */}

        </>
      ) : (
        <div>
          <input
            placeholder="Enter coupon code"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={couponCode}
            onChange={(e) => onCouponChange(e.target.value)}
            style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
          />

          <div>
            {getCouponValue.map((coupon) => (
              <div
                key={coupon._id}
                style={{
                  backgroundColor: "#F4F4F4",
                  padding: "10px 10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                }}
              >
                <Checkbox
                  onChange={(e) => handleCheckboxChange(e, coupon)}
                  // checked={selectedCoupon === coupon.couponCode}
                  disabled={coupon.userApplied?.includes(
                    reducerState?.logIn?.loginData?.data?.result?._id
                  )}
                  checked={selectedCoupon && selectedCoupon._id === coupon._id}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "var(--black4)",
                    }}
                  >
                    {coupon.couponCode}
                  </p>{" "}
                  {coupon.content}
                </Checkbox>
                {coupon.userApplied?.includes(
                  reducerState?.logIn?.loginData?.data?.result?._id
                ) && (
                  <p
                    style={{ color: "red", fontSize: "14px", marginTop: "5px" }}
                  >
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
