import { ArrowUpFromLine } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        // Adjust the value as needed
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="bg-primary-6000 hover:bg-primary-700 w-16 fixed flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out right-20 p-3 rounded-xl bottom-6"
        >
          <ArrowUpFromLine size={20} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
