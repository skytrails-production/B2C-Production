// WhatsAppIcon.js
import React from 'react';
import whatsapp from "./images/whatsapp.png"

const Whatsapp = () => {
    return (
        <a href="https://api.whatsapp.com/send/?phone=%2B918800517859&text&type=phone_number&app_absent=0&text=Hello" target='_blank'>

            <img src={whatsapp} target="_blank" style={{ width: '50px', height: '50px', borderRadius: '50%', position: 'fixed', bottom: '20px', right: '20px', zIndex: '990' }} />

        </a>
    );
};

export default Whatsapp;