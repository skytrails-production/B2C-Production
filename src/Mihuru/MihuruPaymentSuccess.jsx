import React, { useEffect } from 'react'
import "./mihuru.css"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../Constants/constant';

const MihuruPaymentSuccess = () => {

    const location = useLocation();


    const urlParams = new URLSearchParams(location.search);

    const api = urlParams.get('api');
    const paymentId = urlParams.get('payment_id');
    const paymentReferenceId = urlParams.get('payment_reference_id');
    const paymentStatus = urlParams.get('payment_status');
    const partnerTransactionId = urlParams.get('partnerTransactionId');
    const amount = urlParams.get('amount');


    useEffect(() => {
        const fetchData = async () => {

            const payload = {
                userId: partnerTransactionId,
                amount: amount == "undefined" ? 500 : amount,
                payment_id: paymentId,
                payment_reference_id: paymentReferenceId,
            }
            try {
                const res = await axios({
                    method: 'post',
                    url: `${apiURL.baseURL}/skyTrails/api/user/updatemihuruwallet`,
                    data: payload,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log(res, "response")

                // if (res?.data?.data?.error === null) {
                //     setErrorData(false);
                //     dispatch(tnplPlanGeneratorRequest(res?.data?.data));
                // } else {
                //     setErrorData(true);
                // }

            } catch (error) {
                console.log('API Error:', error);
            }
        };

        fetchData();
    }, []);





    return (
        <div className='loanSuccess'>
            <span><i class="fa-solid fa-check"></i></span>
            <h3>Loan Granted Successfully</h3>
        </div>
    )
}

export default MihuruPaymentSuccess
