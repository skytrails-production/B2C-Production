// YourComponent.jsx

import React from 'react';
import './skycollection.css';
// import card1 from '../images/card1.png';
// import card2 from '../images/card2.png';
// import card3 from '../images/card3.png';
const SkyCollection = () => {
  const cardData = [
    {
      title: 'Lavish Holiday in India',
      // imageUrl: card1,
      description: 'Explore by Luxury brands, themes & top picks',
    },
    {
      title: 'Lavish Villas',
      // imageUrl: card2,
      description: 'Premium Villas with Superlative Experience',
    },
    {
      title: 'Lavish International',
      // imageUrl: card3,
      description: 'Dubai, Maldives, Thailand & More',
    },
  ];

  return (
    <div className="skycontainer" >
      <div className="content-containersky">
        <div className="text-containersky">
          <div className="titlesky">Skytrails <br /> Lavish <br />Collection</div>
          {/* <div className="subtitlesky">Lavish Collection</div> */}
        </div>
        <div className="descriptionsky">
          Unparalleled opulence, world-class amenities, tailored for you.
        </div>
      </div>
      <div className="image-containersky">

        {cardData.map((card, index) => (
          <div className="card">

            {/* <img className="card-image" src={card.imageUrl} alt="Card" /> */}
            <div className="card-title">{card.title}</div>
            <div className="card-text">{card.description}</div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default SkyCollection;
