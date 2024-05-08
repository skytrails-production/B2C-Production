import React, { useState } from 'react';

const RandomPaymentSuccess = () => {
    const amount = sessionStorage.getItem("randomPaymentAmount");
    const easepayid = sessionStorage.getItem("RandomPaymenteasepayid");

    const [copied, setCopied] = useState(false);

    const copyText = () => {
        const textToCopy = document.getElementById("easepayid").innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch((err) => console.error('Failed to copy: ', err));
    };

    return (
        <div>
            <div className="container my-5">
                <div className="row">
                    <div className='ranPayBox'>
                        <div className="ranPayOuter">
                            <div className='ranPay'>
                                <svg height="100" fill='white' viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg" id="fi_4117726"><g><path d="m192 464h-64a8 8 0 0 0 0 16h64a8 8 0 0 0 0-16z"></path><path d="m468 160h-164v-124a28.031 28.031 0 0 0 -28-28h-232a28.031 28.031 0 0 0 -28 28v440a28.031 28.031 0 0 0 28 28h232a28.031 28.031 0 0 0 28-28v-116h164a28.031 28.031 0 0 0 28-28v-144a28.031 28.031 0 0 0 -28-28zm-270.25-136-4 16h-67.5l-4-16zm90.25 452a12.01 12.01 0 0 1 -12 12h-232a12.01 12.01 0 0 1 -12-12v-440a12.01 12.01 0 0 1 12-12h61.75l6.49 25.94a8 8 0 0 0 7.76 6.06h80a8 8 0 0 0 7.76-6.06l6.49-25.94h61.75a12.01 12.01 0 0 1 12 12zm16-196h24v32h-24zm176 52a12.01 12.01 0 0 1 -12 12h-164v-16h32a8 8 0 0 0 8-8v-48a8 8 0 0 0 -8-8h-32v-24h176zm0-108h-176v-16h176zm0-32h-176v-16h164a12.01 12.01 0 0 1 12 12z"></path><path d="m456 264h-72a8 8 0 0 0 0 16h72a8 8 0 0 0 0-16z"></path><path d="m456 288h-72a8 8 0 0 0 0 16h72a8 8 0 0 0 0-16z"></path><path d="m456 312h-32a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16z"></path><path d="m160 160a96 96 0 1 0 96 96 96.108 96.108 0 0 0 -96-96zm0 176a80 80 0 1 1 80-80 80.091 80.091 0 0 1 -80 80z"></path><path d="m202.343 226.343-51.094 51.094-26.449-19.837a8 8 0 1 0 -9.6 12.8l32 24a8 8 0 0 0 10.457-.743l56-56a8 8 0 0 0 -11.314-11.314z"></path></g></svg>
                            </div>
                        </div>
                        <h1>Payment successful</h1>
                        <p>Payment of ₹ {amount} has been received successfully </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center", alignItems: "center" }}>
                            <p>Your Transaction Id</p>
                            <div className='copyAbletnxId'>
                                <span style={{ border: copied ? "2px dashed #21be79" : "" }} id="easepayid">{easepayid} </span>
                                <button style={{ backgroundColor: copied ? "#94211a" : "" }} onClick={copyText}>{copied ? "Copied" : "Copy"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RandomPaymentSuccess;
