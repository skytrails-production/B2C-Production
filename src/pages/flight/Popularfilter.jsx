
import * as React from "react";
import "./popularfilter.css"
import Selectflight from "./Selectflight";
import "./searchresult.css";
function valuetext(value) {
  return `${value}°C`;
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Popularfilter = (props) => {
  const [value, setValue] = React.useState("1");

  return (
    <section className="">
      <div className="col-lg-12">
        <Selectflight />
      </div>
    </section>
  );
};

export default Popularfilter;
