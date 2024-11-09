// WhatsAppIcon.js
import React, { useState, useEffect } from "react";
import whatsapp from "./images/whatsapp.png";

const Whatsapp = () => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 130) {
        setShowText(false);
      } else {
        setShowText(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href="https://api.whatsapp.com/send/?phone=%2B918800517859&text&type=phone_number&app_absent=0&text=Hello"
      rel="noopener noreferrer"
      target="_blank"
      aria-label="Send a message on WhatsApp to +918800517859"
    >
      <div
        className={`fixed transition-all duration-500 ease-in-out right-0 bottom-6  p-2 z-50 rounded-s-2xl bg-green-500 flex items-center space-x-2
      ${showText ? "w-40" : "w-16"}`}
      >
        <img
          src={whatsapp}
          alt="whatsappIcon"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        />
        <span
          className={`text-[1rem] text-white text-nowrap font-semibold transition-all duration-500 ease-in-out ${
            showText ? "opacity-100 w-auto" : "opacity-0 w-0 d-none"
          }`}
        >
          Contact us
        </span>
      </div>
    </a>
  );
};

export default Whatsapp;
