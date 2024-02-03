import React, { useEffect, useState } from 'react'
import "./SSDCform.css";
import Ssdcform from "./Ssdcform";
import img1 from "../../images/image 1212.png";
import img2 from "../../images/image 1211.png";
import axios from 'axios';
import imglogo from "../../images/whiteLogo.png"
import img3 from "../../images/atmosphere-landmark-ground-cloudscape-nature 1.png"
import SSDCtable from './SSDCtable';
import SSDCCard from './SSDCCard';
import { apiURL } from "../../Constants/constant";
import { useParams } from 'react-router-dom';


function SSDClanding() {
  const {country}=useParams();
  const [jobs, setJobs] = useState([]);
  // const [backgroundImage, setBackgroundImage] = useState(null);
  const [loading, setLoading]=useState(true);
  const [error, SetError] = useState(null);

  useEffect(()=>{

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL.baseURL}/skyTrails/ssdcJobs/${country}`);
        setJobs(response.data.data);
        // setBackgroundImage(response.data.data.image);


        // console.log(response.data.data, "jggugugugugyugyugyug");
      } catch (error) {
        SetError(error.message);
      } finally {
        setLoading(false);
      }
    };
         fetchData();

  },[country])

  if(loading){
    return <p>Loading.....</p>
  }

  if(error){
    return <p>Error: {error}</p>
  }

  return (
    <>

    <div className="ssdc-header">
    <div className="img-header-logo">
      <img src={imglogo} alt="" className='imglogo' />
    </div>
    </div>

    <div className="ssdcformpage" >

    <div className="ssdc-content-page">
    <div class="container">
  <div class="row">
  
  <div class="col-12 col-md-12 col-lg-6 ssdchalfside">
      
      {/* <p className='upsliling-container-content'> Your interview is Scheduled on <br/> <span> {jobs.interviewDate}</span> <br/>
       Walk in interview Location : <br/>{jobs.interviewAddress}</p> */}
       <img src={jobs.image} alt="" className='ssdcsideimg' />

     
    </div>

  
    <div class="col-12 col-md-12 col-lg-6">
    <Ssdcform jobs={jobs}/>
    </div>
  </div>
</div>

    </div>

    </div>

    

    {/* information table*/}
   <SSDCtable jobs={jobs}/>
   <SSDCCard jobs={jobs}/>

   {/* //////////joinssdc/////////// */}

  
    <div className="joinssdc-container-content">
    <div className="joinssdc-container-content1">
      <div className="ssdc-training-center-heading">Join SSDC</div>
      <div className="joinssdc-page2">A line related to telling the overall benefit of ssdc</div>

   
  <div class="row ssdclandingrow">
   
    <div class="col-12 col-md-6 col-lg-4 grid-content1">
    <div className="grid-content-container">No Initial Cost</div>
    <div className="grid-content-container1">We don’t charge any fees till your work permit arrives.</div>
     
    </div>

   
    <div class="col-12 col-md-6 col-lg-4 grid-content1">
    <div className="grid-content-container">Free Training Programme</div>
    <div className="grid-content-container1">SSDC provides comprehensive upskilling to make you job ready.</div>
     
    </div>

   
    <div class="col-12 col-md-6 col-lg-4 grid-content1">
    <div className="grid-content-container">Additional Perks</div>
    <div className="grid-content-container1">Free accommodation and medical insurance provided by </div>
     
    </div>
 
</div>



    </div>
   </div>


    <div className="ssdc-page-repostdly container">

    <div className="ssdc-content-repostldy">
      <p className='repostldy-heading'>Proudly Accredited by</p>

      <div className="responstldy-img">
        <img src={img1} alt="" />
        <img src={img2} alt="" />
      </div>
    </div>

    </div>



    <div className="ssdc-training-location ">
     <div className="ssdc-training-center-heading">
     Our Training Centre
     </div>
     <div class="custom-container11">
       <div className="service-offer-img1">
        <img src={img3} alt=""/>
        <div className="content-overlay1">
          <div className="training-img-text1">
          NH 1, Village Bhuri Mazara,
            Tehsil Rajpura.
          Patiala Punjab-140401
          </div>
        </div>
       </div>
      </div>


    </div>
    


    
    </>
  )
}

export default SSDClanding