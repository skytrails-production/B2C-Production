import Searchsection from './Searchsection';
import Popularfilter from "./Popularfilter";
import { useSelector } from "react-redux";
import FlightLoader from "./FlightLoader/FlightLoader";
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar"
import Oneway2 from '../../components/Oneway2';

const Searchresult = () => {
    const reducerState = useSelector((state) => state);
    return (
        <>
            {/* {
                reducerState?.oneWay?.isLoading === true ? (
                    <FlightLoader />
                )
                    : ( */}
                        <div className="UniComp_BG">
                            <div className='mainimgFlightSearch'>
                            <Oneway2/>
                                <InsideNavbar />
                            </div>
                            <Searchsection className='main_box' />
                            
                            <Popularfilter />
                        </div>
                    {/* ) */}

            {/* } */}

        </>
    )
}
export default Searchresult;
