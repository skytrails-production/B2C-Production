import React from "react";
import { useNavigate } from "react-router-dom";
import pefa from "../../images/pefa/pefa1.jpg";

const Pefa = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container mt-4 cursor-pointer"
      onClick={() => navigate("/pefaevent")}
    >
      <img src={pefa} className="rounded-lg w-full" alt="" />
    </div>
  );
};

export default Pefa;