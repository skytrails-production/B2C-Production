import React from "react";
import notFound from "./images/notFound.png";

const PageNotFound = () => {
  return (
    <div className="h-[60vh] w-full flex justify-center items-center">
      <img src={notFound} alt="" />
    </div>
  );
};

export default PageNotFound;
