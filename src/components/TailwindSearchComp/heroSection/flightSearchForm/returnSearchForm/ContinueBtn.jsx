import React from "react";

const ContinueBtn = ({
  valiation,
  setSub,
  handleTravelClickOpen,
  setReviewTravellerModal,
  handleFocus,
}) => {
  return (
    <>
      {!valiation ? (
        <button
          className="py-2 px-8 mt-4 bg-indigo-600 font-bold text-center rounded-md text-white "
          // type="submit"
          onClick={() => {
            setSub(true); // Trigger any existing logic
            handleFocus(); // Focus on the form
          }}
        >
          Continue
        </button>
      ) : (
        <button
          className="py-2 px-8 mt-4  bg-primary-6000 font-bold text-center rounded-md text-white "
          // type="submit"
          // onClick={() => handleBookingProcess()}
          onClick={() => handleTravelClickOpen()}
          // onClick={() => setReviewTravellerModal()}
        >
          Continue
        </button>
      )}
    </>
  );
};

export default ContinueBtn;
