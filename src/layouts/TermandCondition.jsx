import React, { useState, useEffect } from 'react'
import "./termandcondition.css"
import { SpinnerCircular } from 'spinners-react';
import { apiURL } from '../Constants/constant';
const TermandCondition = () => {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);



    const fetchData = async () => {
        try {
            const response = await fetch(
                `${apiURL.baseURL}/skyTrails/staticContent/listStaticContent?type=TNC`,
            );
            const result = await response.json();

            setData(result.result);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            setLoading(false);
        }
    };





    return (
        <div>
          
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
                                        <h3>Term & ConditionS</h3>
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

export default TermandCondition
