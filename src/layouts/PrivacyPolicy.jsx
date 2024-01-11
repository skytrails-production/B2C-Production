import React, { useState, useEffect } from 'react'
import InsideNavbar from "../UI/BigNavbar/InsideNavbar"
import "./termandcondition.css"
import { SpinnerCircular } from 'spinners-react';
import { apiURL } from '../Constants/constant';
const PrivacyPolicy = () => {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `${apiURL.baseURL}/skyTrails/staticContent/listStaticContent?type=PRIVACYPOLICY`,
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <>
                <InsideNavbar />
            </>
            <div style={{ overflow: "hidden" }}>
                <div className="container">
                    {
                        loading ? (
                            <div className='loaderBoxTc' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <SpinnerCircular сolor="#d90429" />
                            </div>
                        ) :

                            (
                                <div className="termTop mt-5">
                                    <div>
                                        <h3>Privacy policy</h3>
                                    </div>

                                    <div className='termBottom'>
                                        {data.map(item => (
                                            <p>{item.description}</p>
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

export default PrivacyPolicy
