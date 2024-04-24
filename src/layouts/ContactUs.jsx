import React, { useState, useEffect } from 'react'
import "./termandcondition.css"
import { SpinnerCircular } from 'spinners-react';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { apiURL } from '../Constants/constant';

const ContactUs = () => {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);



    const fetchData = async () => {
        try {
            const response = await fetch(
                `${apiURL.baseURL}/skyTrails/staticContent/listStaticContent?type=CONTACTUS`,
            );
            const result = await response.json();

            setData(result.result);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    // console.log(data);


    return (
        <div>
          
            <div style={{ overflow: "hidden" }}>
                <div className="container-fluid" style={{ marginBottom: "130px", marginTop: "100px" }}>
                    {
                        loading ? (
                            <div className='loaderBoxTc' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <SpinnerCircular сolor="#d90429" />
                            </div>
                        ) :

                            (
                                <div className="termTop mt-5">
                                    <div>
                                        <h3>Contact Us</h3>
                                    </div>

                                    <div className='termBottom'>
                                        {data.map(item => (
                                            // <p>{item.description}</p>

                                            <div className="container-fluid p-4">
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className='contactIconBox'>
                                                            <CallIcon />
                                                        </div>
                                                        <div>
                                                            <span>Call to ask any question</span>
                                                            <p>{item?.contactNumber}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className='contactIconBox'>
                                                            <EmailIcon />
                                                        </div>

                                                        <div>
                                                            <span>Email to get free quote</span>
                                                            <p>{item?.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className='contactIconBox'>
                                                            <LocationOnIcon />
                                                        </div>

                                                        <div>
                                                            <span>Visit our office</span>
                                                            <p>{item?.address[0]?.OperationalAddress.split(",").join(" ")}</p>
                                                            {/* <p>BB-11, 1st floor, Greater Kailash Part 3, Masjid Moth, New Delhi, Delhi,  110048</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                    }
                </div>

            </div>

        </div>
    )
}

export default ContactUs
