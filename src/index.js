import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "react-loading-skeleton/dist/skeleton.css";
import Maintenance from "./components/Maintenance";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
      <Helmet>
          <script type="text/javascript">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "layvxza6fm");
            `}
          </script>

          <script type="application/ld+json">
  {JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "Theskytrails",
  "url": "https://theskytrails.com",
  "description": "Your one-stop destination for all travel needs, including flight booking, hotel booking, holiday packages, and bus booking.",
  "author": {
    "@type": "Organization",
    "name": "Theskytrails"
  },
  "datePublished": "2024-07-10",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "345"
  },
  "mainEntity": [
    {
      "@type": "Service",
      "name": "Flight Booking",
      "description": "Book flights to various destinations with ease.",
      "url": "https://theskytrails.com",
      "image": "https://github.com/The-SkyTrails/Images/blob/main/flightseo.jpg?raw=true",
      "serviceType": "Flight Booking",
      "provider": {
        "@type": "Organization",
        "name": "Theskytrails"
      }
    },
    {
      "@type": "Service",
      "name": "Hotel Booking",
      "description": "Find and book hotels at the best prices.",
      "url": "https://theskytrails.com/st-hotel",
      "image": "https://raw.githubusercontent.com/The-SkyTrails/Images/main/Hotelseo.jpg",
      "serviceType": "Hotel Booking",
      "provider": {
        "@type": "Organization",
        "name": "Theskytrails"
      }
    },
    {
      "@type": "Service",
      "name": "Holiday Packages",
      "description": "Explore and book comprehensive holiday packages.",
      "url": "https://theskytrails.com/holidaypackages",
      "image": "https://raw.githubusercontent.com/The-SkyTrails/Images/main/HolidayPackagesseo.jpg",
      "serviceType": "Holiday Packages",
      "provider": {
        "@type": "Organization",
        "name": "Theskytrails"
      }
    },
    {
      "@type": "Service",
      "name": "Bus Booking",
      "description": "Book bus tickets to travel across the country.",
      "url": "https://theskytrails.com/bus",
      "image": "https://raw.githubusercontent.com/The-SkyTrails/Images/main/Busseo.jpg",
      "serviceType": "Bus Booking",
      "provider": {
        "@type": "Organization",
        "name": "Theskytrails"
      }
    }
  ]
}
)}
  </script>
        </Helmet>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
