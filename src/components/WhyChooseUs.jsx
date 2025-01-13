import React from "react";
import one from "../images/download/one.svg";
import two from "../images/download/two.svg";
import three from "../images/download/three.svg";
import four from "../images/download/four.svg";
import Heading from "./TailwindSearchComp/shared/Heading";

const WhyChooseUs = () => {
  return (
    <div className="custom-container mx-auto mt-16">
      <Heading
        // desc="Discover great prices for popular destinations"
        isCenter={true}
      >
        Why Choose Us ?
      </Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg shadow-md">
          <img className="w-100 " src={one} alt="steps" />
        </div>
        <div className="rounded-lg shadow-md  ">
          <img className="w-100 " src={two} alt="steps" />
        </div>
        <div className="rounded-lg shadow-md  ">
          <img className="w-100" src={three} alt="steps" />
        </div>
        <div className="rounded-lg shadow-md">
          <img className="w-100 " src={four} alt="steps" />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
