import React, { useState, useEffect } from 'react';
import { FaLongArrowAltUp } from "react-icons/fa";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) { // Adjust the value as needed
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div>
            {isVisible && (
                <div onClick={scrollToTop} className="scrollToTop" style={{ width: '45px', height: '45px', position: 'fixed', bottom: '20px', right: '80px', zIndex: '990' }}>
                    <FaLongArrowAltUp />
                </div>
            )}
        </div>
    );
};

export default ScrollToTop;
