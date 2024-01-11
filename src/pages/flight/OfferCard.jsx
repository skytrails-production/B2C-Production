import React from 'react';
import './OfferCard.css'; // Import your CSS file
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderCard from './SliderCard';


// tabs 
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const OfferCard = () => {


  // tabs script 

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (

    <div className='margin-pecentage'>
      {/* <div className="container-fluid my-5">
        <div className="row OfferMainBg">
          <div className="col-lg-2 ">
            <p>Offers</p>
          </div>
          <div className="col-lg-10">
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                    <Tab label="ON 1st BOOKING" value="1" />
                    <Tab label="Hotels" value="2" />
                    <Tab label="All Offers" value="3" />
                    <Tab label="Flights" value="4" />
                    <Tab label="Holidays" value="5" />
                    <Tab label="Cabs" value="6" />
                    <Tab label="Bank Offers" value="7" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <SliderCard />
                </TabPanel>
                <TabPanel value="2">
                  <SliderCard />
                </TabPanel>
                <TabPanel value="3"> <SliderCard /></TabPanel>
                <TabPanel value="4"> <SliderCard /></TabPanel>
                <TabPanel value="5"> <SliderCard /></TabPanel>
                <TabPanel value="6"> <SliderCard /></TabPanel>
                <TabPanel value="7"> <SliderCard /></TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default OfferCard;
