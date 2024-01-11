import React, { useState, useEffect } from 'react'
import img1 from "../../../utility/loadingimg1.jpg";
import img2 from "../../../utility/loadingimg3.jpg";
import newHotel from "../../../images/loading/newHotel.gif"
import "./Hotelmainloading.css";



const quotes = [
  {
    text: "Skytrails hotels - comfort and affordability, hand in hand!",
    img: img1,
  },
  {
    text: "Your stay, your way - Skytrails hotels offer unbeatable rates!",
    img: img2,
  },
  {
    text: "Affordable luxury awaits - Skytrails' hotels redefine comfort and price!",
    img: img2,
  },
  {
    text: "Discover comfort without compromising on cost - Skytrails' hotel bookings.",
    img: img2,
  },
  {
    text: "From cozy to luxurious, Skytrails offers the best stays at the best prices!",
    img: img2,
  },
  {
    text: "Hold on!!We are fetching best result for you",
    img: img2,
  },
];



const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};


function Hotelmainloading() {

  const { text, img } = getRandomQuote();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = getRandomQuote();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      setLoading(true);
      fetchData();
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="flightLoading">
      {/* <img src={flightLoading} alt="Flight Loading" /> */}
      <div className="imageflightcontent">

        {/* <div className="flightimgcontainer">
        <img
          src={quotes[currentImgIndex].img}
          alt=""
          className="flightloadingimg"
        />
      </div> */}
        <div className="busimgcontainer">
          <img
            src={newHotel}
            alt=""
            className="flightloadingimg"
          />
        </div>
      </div>

      <div className="funnyfact">
        {loading && <h3>Hold on...</h3>}
        {data && (
          <div>
            <h5>{text}</h5>
          </div>
        )}
      </div>
    </div>
  )
}

export default Hotelmainloading