
import Navbar from "../../layouts/Navbar";
import Mainheader from "../../UI/Mainheader";
import OfferSwipeToSlide from "../../components/Offerscard";
import Toursection from "../../components/Toursection";
import Download from "../../components/Download";
import Footer from "../../layouts/Footer";
import Forexsearch from "./Forexsearch";

// forex css 
import "./forex.css";

const Forex = () => {
    return (
        <div className="home_banner">
           
            <Forexsearch ></Forexsearch>
            <OfferSwipeToSlide></OfferSwipeToSlide>
            <Toursection></Toursection>
            <Download></Download>
          
        </div>
    )
}
export default Forex;
