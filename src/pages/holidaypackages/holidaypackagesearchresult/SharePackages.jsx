import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
const SharePackages = ({ id }) => {



    const [isHover, toggleHover] = useState(false);
    // const [isLinkCopied, setIsLinkCopied] = useState(false);
    const toggleHoverMenu = () => {
        toggleHover(!isHover);
    };
    const toggleHoverMenuTwo = () => {
        toggleHover(false);
    };

    const subMenuAnimate = {
        enter: {
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: 0.2
            },
            display: "block"
        },
        exit: {
            opacity: 0,
            rotateX: -15,
            transition: {
                duration: 0.2,
                delay: 0
            },
            transitionEnd: {
                display: "none"
            }
        }
    };


    // const shareWhatsApp = () => {
    //     const url = `https://web.whatsapp.com/send?text=${encodeURIComponent(
    //         `https://theskytrails.com/holidayInfo/${id}`
    //     )}`;
    //     window.open(url, "_blank");
    // };

    const shareWhatsApp = () => {
        const isMobileDevice = /Android|iPhone|iPad|iPod|Windows Phone/i.test(
            navigator.userAgent
        );

        const url = isMobileDevice
            ? `whatsapp://send?text=${encodeURIComponent(
                `https://theskytrails.com/holidayInfo/${id}`
            )}`
            : `https://web.whatsapp.com/send?text=${encodeURIComponent(
                `https://theskytrails.com/holidayInfo/${id}`
            )}`;

        window.open(url, "_blank");
    };

    const shareTwitter = () => {
        const url = `http://twitter.com/share?url=https://theskytrails.com/holidayInfo/${id}`;
        window.open(url, "twitter-share-dialog", "width=650,height=auto");
    };

    const shareLinkedIn = () => {
        const url = `https://www.linkedin.com/shareArticle?mini=true&summary=youtube&title=f1&url=https://theskytrails.com/holidayInfo/${id}`;
        window.open(url, "linkedin-share-dialog", "width=650,height=auto");
    };

    const shareFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=https://theskytrails.com/holidayInfo/${id}`;
        window.open(url, "facebook-share-dialog", "width=650,height=auto");
    };

    const copyLinkToClipboard = () => {
        const linkToCopy = `https://theskytrails.com/holidayInfo/${id}`;
        navigator.clipboard
            .writeText(linkToCopy)
            .then(() => {
                console.log("Link copied!");
                // setIsLinkCopied(true);

                // setTimeout(() => {
                //     setIsLinkCopied(false);
                // }, 3000); 
            })
            .catch((err) => console.error("Unable to copy link", err));
    };

    return (
        <>

            <motion.div className="shareBox menu-item" title="share" onClick={toggleHoverMenu}
                onHoverEnd={toggleHoverMenuTwo}
            >
                {/* // onHoverEnd={toggleHoverMenu}> */}
                <svg height="20" viewBox="0 0 294.0002 294.0004" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_5873833"><g id="Layer_2" data-name="Layer 2"><g id="external_link" data-name="external link"><path d="m210 189h42v55.997a49.0587 49.0587 0 0 1 -48.9932 49.003h-154.0136a49.0587 49.0587 0 0 1 -48.9932-49.003v-153.9932a49.0587 49.0587 0 0 1 48.9932-49.0038h56.0068v42h-56.0068a7.004 7.004 0 0 0 -6.9932 7.0038v153.9932a7.004 7.004 0 0 0 6.9932 7.003h154.0136a7.004 7.004 0 0 0 6.9932-7.003z" fill="#d90429"></path><path d="m210 189h42v55.9966a49.0587 49.0587 0 0 1 -48.993 49.0034h-154.0137a49.0587 49.0587 0 0 1 -48.9933-49.0033v-153.9933a49.0587 49.0587 0 0 1 48.9933-49.0034h56.0067v42h-56.0067a7.004 7.004 0 0 0 -6.9933 7.0034v153.9933a7.004 7.004 0 0 0 6.9933 7.0033h154.0137a7.004 7.004 0 0 0 6.993-7.0033z" fill="#d90429"></path><g fill="#111"><path d="m147 0v42h75.3047l-132.1524 132.1528 29.6954 29.6953 132.1523-132.1524v75.3043h42v-126a21 21 0 0 0 -21-21z"></path><path d="m147 0v42h75.3047l-132.1522 132.1524 29.6953 29.6953 132.1522-132.1524v75.3047h42v-126a21 21 0 0 0 -21-21z"></path></g></g></g></svg>
                <ToastContainer />

                <motion.div
                    initial="exit"
                    animate={isHover ? "enter" : "exit"}
                    variants={subMenuAnimate}
                    className="position-absolute  shareContent"
                >
                    <div className="dropItemShare">
                        <Link to="#" onClick={shareWhatsApp}>
                            <svg height="17" viewBox="0 0 176 176" width="17" xmlns="http://www.w3.org/2000/svg" id="fi_3670051"><g id="Layer_2" data-name="Layer 2"><g id="_09.whatsapp" data-name="09.whatsapp"><circle id="background" cx="88" cy="88" fill="#29a71a" r="88"></circle><g id="icon" fill="#fff"><path d="m126.8 49.2a54.57 54.57 0 0 0 -87.42 63.13l-5.79 28.11a2.08 2.08 0 0 0 .33 1.63 2.11 2.11 0 0 0 2.24.87l27.55-6.53a54.56 54.56 0 0 0 63.09-87.21zm-8.59 68.56a42.74 42.74 0 0 1 -49.22 8l-3.84-1.9-16.89 4 .05-.21 3.5-17-1.88-3.71a42.72 42.72 0 0 1 7.86-49.59 42.73 42.73 0 0 1 60.42 0 2.28 2.28 0 0 0 .22.22 42.72 42.72 0 0 1 -.22 60.19z"></path><path d="m116.71 105.29c-2.07 3.26-5.34 7.25-9.45 8.24-7.2 1.74-18.25.06-32-12.76l-.17-.15c-12.09-11.21-15.23-20.54-14.47-27.94.42-4.2 3.92-8 6.87-10.48a3.93 3.93 0 0 1 6.15 1.41l4.45 10a3.91 3.91 0 0 1 -.49 4l-2.25 2.92a3.87 3.87 0 0 0 -.35 4.32c1.26 2.21 4.28 5.46 7.63 8.47 3.76 3.4 7.93 6.51 10.57 7.57a3.82 3.82 0 0 0 4.19-.88l2.61-2.63a4 4 0 0 1 3.9-1l10.57 3a4 4 0 0 1 2.24 5.91z"></path></g></g></g></svg> &nbsp; Whatsapp
                        </Link>
                        <Link to="#" onClick={shareTwitter} style={{ cursor: "pointer" }}>
                            <svg id="fi_5969020" height="17" width="17" enable-background="new 0 0 1227 1227" viewBox="0 0 1227 1227" xmlns="http://www.w3.org/2000/svg"><g><path fill="#111" d="m613.5 0c-338.815 0-613.5 274.685-613.5 613.5s274.685 613.5 613.5 613.5 613.5-274.685 613.5-613.5-274.685-613.5-613.5-613.5z"></path><path d="m680.617 557.98 262.632-305.288h-62.235l-228.044 265.078-182.137-265.078h-210.074l275.427 400.844-275.427 320.142h62.239l240.82-279.931 192.35 279.931h210.074l-285.641-415.698zm-335.194-258.435h95.595l440.024 629.411h-95.595z" fill="#fff"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> &nbsp; Twitter
                        </Link>
                        <Link to="#" onClick={shareLinkedIn} style={{ cursor: "pointer" }}>
                            <svg height="17" viewBox="0 0 512 512" width="17" xmlns="http://www.w3.org/2000/svg" id="fi_1384014"><path fill="#0A66C2" d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm-74.390625 387h-62.347656v-187.574219h62.347656zm-31.171875-213.1875h-.40625c-20.921875 0-34.453125-14.402344-34.453125-32.402344 0-18.40625 13.945313-32.410156 35.273437-32.410156 21.328126 0 34.453126 14.003906 34.859376 32.410156 0 18-13.53125 32.402344-35.273438 32.402344zm255.984375 213.1875h-62.339844v-100.347656c0-25.21875-9.027343-42.417969-31.585937-42.417969-17.222656 0-27.480469 11.601563-31.988282 22.800781-1.648437 4.007813-2.050781 9.609375-2.050781 15.214844v104.75h-62.34375s.816407-169.976562 0-187.574219h62.34375v26.558594c8.285157-12.78125 23.109375-30.960937 56.1875-30.960937 41.019531 0 71.777344 26.808593 71.777344 84.421874zm0 0"></path></svg>  &nbsp; Linkedin
                        </Link>
                        <Link to="#" onClick={shareFacebook} style={{ cursor: "pointer" }}>
                            <svg height="17" viewBox="0 0 152 152" width="17" xmlns="http://www.w3.org/2000/svg" id="fi_4494475"><g id="Layer_2" data-name="Layer 2"><g id="_01.facebook" data-name="01.facebook"><circle id="background" cx="76" cy="76" fill="#334c8c" r="76"></circle><path id="icon" d="m95.26 68.81-1.26 10.58a2 2 0 0 1 -2 1.78h-11v31.4a1.42 1.42 0 0 1 -1.4 1.43h-11.21a1.42 1.42 0 0 1 -1.4-1.44l.06-31.39h-8.33a2 2 0 0 1 -2-2v-10.58a2 2 0 0 1 2-2h8.28v-10.26c0-11.87 7.06-18.33 17.4-18.33h8.47a2 2 0 0 1 2 2v8.91a2 2 0 0 1 -2 2h-5.19c-5.62.09-6.68 2.78-6.68 6.8v8.85h12.31a2 2 0 0 1 1.95 2.25z" fill="#fff"></path></g></g></svg>  &nbsp; Facebook
                        </Link>
                        <Link to="#" onClick={copyLinkToClipboard} style={{ cursor: "pointer" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="fi_9436206" data-name="Layer 1" viewBox="0 0 200 200" width="17" height="17"><path d="M119.75,59H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59ZM100,0A100,100,0,1,0,200,100,100,100,0,0,0,100,0ZM51,119.75V66.61A15.62,15.62,0,0,1,66.61,51h53.14a15.62,15.62,0,0,1,15.61,15.61v53.14a15.62,15.62,0,0,1-15.61,15.61H66.61A15.62,15.62,0,0,1,51,119.75Zm98,7.77A21.51,21.51,0,0,1,127.52,149H81.06a4,4,0,0,1,0-8h46.46A13.5,13.5,0,0,0,141,127.52V81.06a4,4,0,0,1,8,0Zm-21.64-7.77V66.61A7.62,7.62,0,0,0,119.75,59H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14A7.62,7.62,0,0,0,127.36,119.75ZM119.75,59H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Zm0,0H66.61A7.63,7.63,0,0,0,59,66.61v53.14a7.63,7.63,0,0,0,7.61,7.61h53.14a7.62,7.62,0,0,0,7.61-7.61V66.61A7.62,7.62,0,0,0,119.75,59Z"></path></svg> &nbsp; Copy Link
                        </Link>
                        {/* {isLinkCopied && toast.success('Link copied successfully!')} */}
                    </div>
                </motion.div>

            </motion.div>
        </>

    );
};

export default SharePackages;


