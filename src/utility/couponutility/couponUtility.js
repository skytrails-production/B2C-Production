import { apiURL } from "../../Constants/constant";
import axios from "axios";

import SecureStorage from "react-secure-storage";
export const couponconfirmation = async (couponvalue) => {
    try {
        const token = SecureStorage.getItem("jwtToken");
        const response = await axios.get(
            `${apiURL.baseURL}/skyTrails/api/coupons/couponApplied/${couponvalue}`,

            {
                headers: {
                    token: token,
                },
            }
        );
    } catch (error) {
        console.log(error);
    }
};