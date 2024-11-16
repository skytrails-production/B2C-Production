import React from "react";
import "./holidetailsbottomdetails.scss";
import {
  FileTextTwoTone,
  CalendarTwoTone,
  HomeTwoTone,
  ExclamationCircleTwoTone,
  PlusSquareTwoTone,
  ReconciliationTwoTone,
  MinusSquareTwoTone,
} from "@ant-design/icons";
const HolidayDetailsBottomDetails = ({ packageData }) => {
  return (
    <div>
      {
        <div className="packageDayWiseOuterMain">
          <h3 className="packageNameHeading">Overview</h3>
          <div className="dayWiseDetailsBox">
            <div
              className="dangerDesignHoliday"
              dangerouslySetInnerHTML={{ __html: packageData?.overview }}
            ></div>
          </div>
        </div>
      }

      {packageData?.detailed_ltinerary.map((item, index) => (
        <div className="packageDayWiseOuterMain">
          <h3 className="packageNameHeading">Day {index + 1}</h3>
          <div className="dayWiseDetailsBox">
            {/* <h3><CalendarTwoTone className='me-2' twoToneColor="#e73c34" /></h3> */}
            <div
              key={index}
              className="dangerDesignHoliday"
              dangerouslySetInnerHTML={{ __html: item }}
            ></div>
          </div>
        </div>
      ))}

      {
        <div className="packageDayWiseOuterMain">
          <h3 className="packageNameHeading">Hotel Details</h3>
          <div className="dayWiseDetailsBox">
            {/* <h3><HomeTwoTone className='me-2' twoToneColor="#e73c34" />Hotel Details</h3> */}
            <div
              className="dangerDesignHoliday"
              dangerouslySetInnerHTML={{ __html: packageData?.hotel_details }}
            ></div>
          </div>
        </div>
      }
      {
        <div className="packageDayWiseOuterMain">
          <h3 className="packageNameHeading">Inclusion</h3>
          <div className="dayWiseDetailsBox">
            {/* <h3><PlusSquareTwoTone className='me-2' twoToneColor="#e73c34" />Inclusion</h3> */}
            <div
              className="dangerDesignHoliday"
              dangerouslySetInnerHTML={{ __html: packageData?.insclusion_note }}
            ></div>
          </div>
        </div>
      }
      {
        <div className="packageDayWiseOuterMain">
          <h3 className="packageNameHeading">Exclusion</h3>
          <div className="dayWiseDetailsBox">
            <h3>
              <MinusSquareTwoTone className="me-2" twoToneColor="#e73c34" />
              Exclusion
            </h3>
            <div
              className="dangerDesignHoliday"
              dangerouslySetInnerHTML={{ __html: packageData?.exclusion_note }}
            ></div>
          </div>
        </div>
      }
      {
        <div className="packageDayWiseOuterMain">
          <h3 className="packageNameHeading">Term & Condition</h3>
          <div className="dayWiseDetailsBox">
            {/* <h3><ReconciliationTwoTone className='me-2' twoToneColor="#e73c34" />Term & Condition</h3> */}
            <div
              className="dangerDesignHoliday"
              dangerouslySetInnerHTML={{ __html: packageData?.term_Conditions }}
            ></div>
          </div>
        </div>
      }
      {
        <div className="packageDayWiseOuterMain">
          <h3 className="packageNameHeading">Cancellation Policy</h3>
          <div className="dayWiseDetailsBox">
            {/* <h3><ExclamationCircleTwoTone className='me-2' twoToneColor="#e73c34" />Cancellation Policy</h3> */}
            <div
              className="dangerDesignHoliday"
              dangerouslySetInnerHTML={{
                __html: packageData?.cancellation_Policy,
              }}
            ></div>
          </div>
        </div>
      }
    </div>
  );
};

export default HolidayDetailsBottomDetails;
