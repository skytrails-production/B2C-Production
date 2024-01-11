// TripSecureComponent.js

import React from "react";
import "./TripSecureComponent.css";

const TripSecureComponent = () => {
  return (
    <div className="TripSecureContainer">
      <div className="HeaderContainer">
        {/* Brand Container */}
        <div className="BrandContainer">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="23"
              viewBox="0 0 20 23"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.2075 4.16209C3.82642 4.11304 7.30601 2.63412 10 0C12.6938 2.63461 16.1734 4.11403 19.7925 4.16345C19.93 5.049 20 5.9618 20 6.88958C20 14.008 15.825 20.0638 10 22.3077C4.175 20.0625 0 14.0067 0 6.88822C0 5.95907 0.0712499 5.049 0.2075 4.16209ZM14.6337 9.21381C14.8614 8.95686 14.9874 8.61272 14.9846 8.25551C14.9817 7.89829 14.8503 7.55659 14.6185 7.30399C14.3868 7.05139 14.0732 6.90811 13.7455 6.90501C13.4178 6.90191 13.102 7.03923 12.8663 7.2874L8.75 11.7737L7.13375 10.0122C6.898 9.764 6.58224 9.62668 6.2545 9.62978C5.92675 9.63288 5.61324 9.77616 5.38148 10.0288C5.14972 10.2814 5.01826 10.6231 5.01541 10.9803C5.01256 11.3375 5.13855 11.6816 5.36625 11.9386L7.86625 14.6633C8.10066 14.9188 8.41854 15.0622 8.75 15.0622C9.08146 15.0622 9.39934 14.9188 9.63375 14.6633L14.6337 9.21381Z"
                fill="#d90429"
              />
            </svg>
          </div>
          <div className="BrandText">Trip Secure</div>
        </div>

        {/* Logo Containers */}
        {/* <div className="LogoContainer">
          <div className="LogoText">Logo</div>
        </div>
        <div className="LogoContainer">
          <div className="LogoText">Logo</div>
        </div> */}
      </div>

      {/* Price Container */}
      <div className="PriceContainer">
        {/* Price Text Container */}
        <div className="PriceTextContainer">
          <div className="PriceText">₹249</div>
          <div className="GstText">/Traveller (18% GST included)</div>
        </div>

        {/* Features Container */}
        <div className="FeaturesContainer">
          {/* Feature Box 1 */}
          <div className="FeatureBox">
            <div className="IconContainer">
              <div className="IconBackground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <mask
                    id="mask0_367_27208"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="25"
                  >
                    <rect y="0.807617" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_367_27208)">
                    <path
                      d="M7 21.8076C6.45 21.8076 5.97917 21.6118 5.5875 21.2201C5.19583 20.8285 5 20.3576 5 19.8076V8.80762C5 8.25762 5.19583 7.78678 5.5875 7.39512C5.97917 7.00345 6.45 6.80762 7 6.80762H9V4.30762C9 3.89095 9.14583 3.53678 9.4375 3.24512C9.72917 2.95345 10.0833 2.80762 10.5 2.80762H13.5C13.9167 2.80762 14.2708 2.95345 14.5625 3.24512C14.8542 3.53678 15 3.89095 15 4.30762V6.80762H17C17.55 6.80762 18.0208 7.00345 18.4125 7.39512C18.8042 7.78678 19 8.25762 19 8.80762V19.8076C19 20.3576 18.8042 20.8285 18.4125 21.2201C18.0208 21.6118 17.55 21.8076 17 21.8076C17 22.091 16.9042 22.3284 16.7125 22.5201C16.5208 22.7118 16.2833 22.8076 16 22.8076C15.7167 22.8076 15.4792 22.7118 15.2875 22.5201C15.0958 22.3284 15 22.091 15 21.8076H9C9 22.091 8.90417 22.3284 8.7125 22.5201C8.52083 22.7118 8.28333 22.8076 8 22.8076C7.71667 22.8076 7.47917 22.7118 7.2875 22.5201C7.09583 22.3284 7 22.091 7 21.8076ZM7 19.8076H17V8.80762H7V19.8076ZM8 18.8076H9.5V9.80762H8V18.8076ZM11.25 18.8076H12.75V9.80762H11.25V18.8076ZM14.5 18.8076H16V9.80762H14.5V18.8076ZM10.5 6.80762H13.5V4.30762H10.5V6.80762Z"
                      fill="#d90429"
                    />
                  </g>
                </svg>
              </div>
              <div className="IconForeground"></div>
            </div>
            <div className="FeatureTextContainer">
              <div className="FeatureTitle">24x7</div>
              <div className="FeatureDescription">
                Delayed/lost baggage Assistance
              </div>
            </div>
          </div>

          {/* Feature Box 2 */}
          <div className="FeatureBox">
            <div className="IconContainer">
              <div className="IconBackground"></div>
              <div className="IconForeground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <mask
                    id="mask0_367_27215"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="25"
                  >
                    <rect y="0.807617" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_367_27215)">
                    <path
                      d="M13 23.8076V17.8076L10.9 15.8076L9.9 20.2076L3 18.8076L3.4 16.8076L8.2 17.8076L9.8 9.70762L8 10.4076V13.8076H6V9.10762L9.95 7.40762C10.5333 7.15762 10.9625 6.99512 11.2375 6.92012C11.5125 6.84512 11.7667 6.80762 12 6.80762C12.35 6.80762 12.675 6.89928 12.975 7.08262C13.275 7.26595 13.5167 7.50762 13.7 7.80762L14.7 9.40762C15.1333 10.1076 15.7208 10.6826 16.4625 11.1326C17.2042 11.5826 18.05 11.8076 19 11.8076V13.8076C17.9 13.8076 16.8708 13.5785 15.9125 13.1201C14.9542 12.6618 14.15 12.0576 13.5 11.3076L12.9 14.3076L15 16.3076V23.8076H13ZM13.5 6.30762C12.95 6.30762 12.4792 6.11178 12.0875 5.72012C11.6958 5.32845 11.5 4.85762 11.5 4.30762C11.5 3.75762 11.6958 3.28678 12.0875 2.89512C12.4792 2.50345 12.95 2.30762 13.5 2.30762C14.05 2.30762 14.5208 2.50345 14.9125 2.89512C15.3042 3.28678 15.5 3.75762 15.5 4.30762C15.5 4.85762 15.3042 5.32845 14.9125 5.72012C14.5208 6.11178 14.05 6.30762 13.5 6.30762Z"
                      fill="#d90429"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="FeatureTextContainer">
              <div className="FeatureTitle">Up to ₹3,000</div>
              <div className="FeatureDescription">Missed Flight</div>
            </div>
          </div>

          {/* Feature Box 3 */}
          <div className="FeatureBox">
            <div className="IconContainer">
              <div className="IconForeground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <mask
                    id="mask0_367_27222"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="25"
                  >
                    <rect y="0.807617" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_367_27222)">
                    <path
                      d="M14.4 16.8076L13 15.4076L15.6 12.8076L13 10.2076L14.4 8.80762L17 11.4076L19.6 8.80762L21 10.2076L18.4 12.8076L21 15.4076L19.6 16.8076L17 14.2076L14.4 16.8076ZM6 23.8076C5.45 23.8076 4.97917 23.6118 4.5875 23.2201C4.19583 22.8285 4 22.3576 4 21.8076V3.80762C4 3.25762 4.19583 2.78678 4.5875 2.39512C4.97917 2.00345 5.45 1.80762 6 1.80762H16C16.55 1.80762 17.0208 2.00345 17.4125 2.39512C17.8042 2.78678 18 3.25762 18 3.80762V7.80762H16V6.80762H6V18.8076H16V17.8076H18V21.8076C18 22.3576 17.8042 22.8285 17.4125 23.2201C17.0208 23.6118 16.55 23.8076 16 23.8076H6ZM6 20.8076V21.8076H16V20.8076H6ZM6 4.80762H16V3.80762H6V4.80762Z"
                      fill="#d90429"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="FeatureTextContainer">
              <div className="FeatureTitle">Up to ₹3,000</div>
              <div className="FeatureDescription">Trip Cancellation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Feedback Container */}
      <div className="CustomerFeedbackContainer">
        {/* Customer Feedback Text Container */}
        <div className="CustomerFeedbackTextContainer">
          <div className="FeedbackTitle">
            Preferred by millions of travellers
          </div>
          <div className="FeedbackListContainer">
            {/* Feedback Item 1 */}
            <div className="FeedbackItem">
              <div className="FeedbackMessage">
                Your willingness to go above and beyond significant difference
                in my ability... <span className="ReadMoreLink">Read More</span>
              </div>

              <div className="CustomerName">~Amit Paul</div>
            </div>

            {/* Feedback Item 2 */}
            <div className="FeedbackItem">
              <div className="FeedbackMessage">
                Your willingness to go above and beyond significant difference
                in my ability...<span className="ReadMoreLink">Read More</span>
              </div>

              <div className="CustomerName">~Amit Paul</div>
            </div>
          </div>
        </div>
      </div>

      {/* User Choice Container */}
      <div className="UserChoiceContainer">
        {/* User Choice Group */}
        <div className="UserChoiceGroup">
          {/* User Choice Item 1 */}
          {/* <div className="UserChoiceItem">
            <div className="UserChoiceIcon"></div>
            <div>
              <span className="UserChoiceText">YES,</span>
              <span className="UserChoiceOption"> Secure my trip.</span>
            </div>
          </div> */}

          {/* User Choice Item 2 */}
          {/* <div className="UserChoiceItem">
            <div className="UserChoiceIcon"></div>
            <div>
              <span className="UserChoiceText">No,</span>
              <span className="UserChoiceOption"> I will risk my trip.</span>
            </div>
          </div> */}
          {/* <div className="UserChoiceContainer"> */}
            {/* User Choice Item 1 */}
            <div className="UserChoiceItem">
              <input
                type="radio" 
                id="secureTrip"
                name="userChoice"
                className="UserChoiceRadio"
                value={true}
              />
              {/* <div className="UserChoiceIcon"></div> */}
              <div>
                <label htmlFor="secureTrip" className="UserChoiceLabel">
                  <span className="UserChoiceText">YES,</span>
                  <span className="UserChoiceOption"> Secure my trip.</span>
                </label>
              </div>
            </div>

            {/* User Choice Item 2 */}
            <div className="UserChoiceItem">
              <input
                type="radio" 
                id="riskTrip"
                name="userChoice"
                className="UserChoiceRadio"
                value={false}
              />
              {/* <div className="UserChoiceIcon"></div> */}
              <div>
                <label htmlFor="riskTrip" className="UserChoiceLabel">
                  <span className="UserChoiceText">No,</span>
                  <span className="UserChoiceOption">
                    {" "}
                    I will risk my trip.
                  </span>
                </label>
              </div>
            </div>
          {/* </div> */}
        </div>

        {/* Age Confirmation Text */}
        <div className="AgeConfirmationText">
          By selecting the product, I confirm the traveler's age is between 6
          months and 70 years and agree to{" "}
          <span className="TermsAndConditionsLink">T&Cs</span>.
        </div>
      </div>
    </div>
  );
};

export default TripSecureComponent;
