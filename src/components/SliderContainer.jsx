// CarouselComponent.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import card1 from "../images/Rectangle .png";
import Rectangle from "../images/Rectangle1.png";
import "./slidercon.css";
const SliderContainer = () => {
  const defaultImages = [
    card1,
    card1,
    card1,
    card1,
    card1,
    card1,
    card1,
    card1,
  ];
  const defaultImages1 = [Rectangle, Rectangle, Rectangle, Rectangle, Rectangle,Rectangle, Rectangle, Rectangle];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <div
        style={{
          width: "90%",
          margin: "auto",
          marginTop: "20px",
          padding: "20px",
        }}
        className="mainslider"
      >
        <div>
          <div className="containerslide">
            <div className="textContainerslide">
              <div className="titleslide">
                Deepest Prices For Travel Till, 10th Nov
              </div>
              <div className="subtitleslide">
                Grab Flat 35% off! Use Code LAST CHANCE
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {defaultImages.map((image, index) => (
              <div
                key={index}
                style={{ margin: "0 8px", height: "200px", width: "90%" }}
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  style={{
                    width: "90%",
                    height: "200px",
                    position: "relative",
                  }}
                />
                <div
                  className="imageContent1"
                  style={{
                    position: "absolute",
                    top: "130px",
                    color: "white",
                    margin: "8px",
                  }}
                >
                  <div className="headingslider">Kerala</div>
                  <div className="txtslider">Starting at 8,900</div>
                  <div className="txtslider">Per Person</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <br></br>
      <div
        style={{
          width: "90%",
          margin: "auto",
          marginTop: "20px",
          padding: "20px",
        }}
        className="mainslider"
      >
        <div>
          <div className="containerslide">
            <div className="textContainerslide">
              <div className="titleslide">
              Jackpot Deals on Top Selling Packages
              </div>
              <div className="subtitleslide">
              Save extra with our exclusive deals!
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {defaultImages1.map((image, index) => (
              <div
                key={index}
                style={{ margin: "0 8px", height: "200px", width: "90%" }}
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  style={{
                    width: "90%",
                    height: "200px",
                    position: "relative",
                  }}
                />
                {/* <div
                  className="imageContent1"
                  style={{
                    position: "absolute",
                    top: "130px",
                    color: "white",
                    margin: "8px",
                  }}
                >
                  <div className="headingslider">Kerala</div>
                  <div className="txtslider">Starting at 8,900</div>
                  <div className="txtslider">Per Person</div>
                </div> */}
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <br></br>
      <div
        style={{
          width: "90%",
          margin: "auto",
          marginTop: "20px",
          padding: "20px",
        }}
        className="mainslider"
      >
        <div>
          <div className="containerslide">
            <div className="textContainerslide">
              <div className="titleslide">International Destinations</div>
            </div>
          </div>
          <Slider {...settings}>
            {defaultImages1.map((image, index) => (
              <div
                key={index}
                style={{ margin: "0 8px", height: "200px", width: "90%" }}
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  style={{
                    width: "90%",
                    height: "200px",
                    position: "relative",
                  }}
                />
              
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <br></br>
      <div
        style={{
          width: "90%",
          margin: "auto",
          marginTop: "20px",
          padding: "20px",
        }}
        className="mainslider"
      >
        <div>
          <div className="containerslide">
            <div className="textContainerslide">
              <div className="titleslide">Explored The Unexplored</div>
            </div>
          </div>
          <Slider {...settings}>
            {defaultImages1.map((image, index) => (
              <div
                key={index}
                style={{ margin: "0 8px", height: "200px", width: "90%" }}
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  style={{
                    width: "90%",
                    height: "200px",
                    position: "relative",
                  }}
                />
               
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderContainer;
