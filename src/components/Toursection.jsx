// MyComponent.jsx

import React from 'react';
import './toursection.css';

export default function Toursection() {

  return (

    // <div className="containerTour">
    //   <div className="item">
    //     <div className="icon-container">
    //       <div className="icon-backgroundTour"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    //         <mask id="mask0_414_10772" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    //           <rect width="24" height="24" fill="#D9D9D9" />
    //         </mask>
    //         <g mask="url(#mask0_414_10772)">
    //           <path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C14.4333 2 16.5625 2.7625 18.3875 4.2875C20.2125 5.8125 21.35 7.725 21.8 10.025H19.75C19.4333 8.80833 18.8625 7.72083 18.0375 6.7625C17.2125 5.80417 16.2 5.08333 15 4.6V5C15 5.55 14.8042 6.02083 14.4125 6.4125C14.0208 6.80417 13.55 7 13 7H11V9C11 9.28333 10.9042 9.52083 10.7125 9.7125C10.5208 9.90417 10.2833 10 10 10H8V12H10V15H9L4.2 10.2C4.15 10.5 4.10417 10.8 4.0625 11.1C4.02083 11.4 4 11.7 4 12C4 14.1833 4.76667 16.0583 6.3 17.625C7.83333 19.1917 9.73333 19.9833 12 20V22ZM21.1 21.5L17.9 18.3C17.55 18.5 17.175 18.6667 16.775 18.8C16.375 18.9333 15.95 19 15.5 19C14.25 19 13.1875 18.5625 12.3125 17.6875C11.4375 16.8125 11 15.75 11 14.5C11 13.25 11.4375 12.1875 12.3125 11.3125C13.1875 10.4375 14.25 10 15.5 10C16.75 10 17.8125 10.4375 18.6875 11.3125C19.5625 12.1875 20 13.25 20 14.5C20 14.95 19.9333 15.375 19.8 15.775C19.6667 16.175 19.5 16.55 19.3 16.9L22.5 20.1L21.1 21.5ZM15.5 17C16.2 17 16.7917 16.7583 17.275 16.275C17.7583 15.7917 18 15.2 18 14.5C18 13.8 17.7583 13.2083 17.275 12.725C16.7917 12.2417 16.2 12 15.5 12C14.8 12 14.2083 12.2417 13.725 12.725C13.2417 13.2083 13 13.8 13 14.5C13 15.2 13.2417 15.7917 13.725 16.275C14.2083 16.7583 14.8 17 15.5 17Z" fill="#071C2C" />
    //         </g>
    //       </svg></div>

    //     </div>
    //     <div className="toursection_text">Where to Go</div>
    //   </div>

    //   <div className="item">
    //     <div className="icon-container">
    //       <div className="icon-backgroundTour"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    //         <mask id="mask0_414_10778" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    //           <rect width="24" height="24" fill="#D9D9D9" />
    //         </mask>
    //         <g mask="url(#mask0_414_10778)">
    //           <path d="M10.5 15.5H13.5V13H16V10H13.5V7.5H10.5V10H8V13H10.5V15.5ZM12 22C9.68333 21.4167 7.77083 20.0875 6.2625 18.0125C4.75417 15.9375 4 13.6333 4 11.1V5L12 2L20 5V11.1C20 13.6333 19.2458 15.9375 17.7375 18.0125C16.2292 20.0875 14.3167 21.4167 12 22ZM12 19.9C13.7333 19.35 15.1667 18.25 16.3 16.6C17.4333 14.95 18 13.1167 18 11.1V6.375L12 4.125L6 6.375V11.1C6 13.1167 6.56667 14.95 7.7 16.6C8.83333 18.25 10.2667 19.35 12 19.9Z" fill="#071C2C" />
    //         </g>
    //       </svg></div>

    //     </div>
    //     <div className="toursection_text">
    //       <span>Insurance<br /></span>
    //       <p>For International Trips</p>

    //     </div>
    //   </div>

    //   <div className="item">
    //     <div className="icon-container">
    //       <div className="icon-backgroundTour"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    //         <mask id="mask0_414_10784" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    //           <rect width="24" height="24" fill="#D9D9D9" />
    //         </mask>
    //         <g mask="url(#mask0_414_10784)">
    //           <path d="M6.85078 17.15L3.65078 15.4L4.70078 14.35L7.20078 14.7L11.1008 10.8L3.30078 6.55005L4.70078 5.15005L14.2508 7.60005L18.1758 3.72505C18.4591 3.44172 18.8133 3.30005 19.2383 3.30005C19.6633 3.30005 20.0175 3.44172 20.3008 3.72505C20.5841 4.00838 20.7258 4.36255 20.7258 4.78755C20.7258 5.21255 20.5841 5.56672 20.3008 5.85005L16.4008 9.75005L18.8508 19.3L17.4508 20.7L13.2008 12.9L9.30078 16.8L9.65078 19.3L8.60078 20.35L6.85078 17.15Z" fill="#071C2C" />
    //         </g>
    //       </svg></div>
    //       <div className="icon" style={{ width: '17.43px', height: '17.40px', left: '3.30px', top: '3.30px' }}></div>
    //     </div>
    //     <div className="toursection_text">
    //       <span>Explore International Flights<br /></span>
    //       <p >Cheapest Flights to Paris, Bali, Tokyo & more</p>
    //     </div>
    //   </div>
    // </div>
    <></>
  );
}
