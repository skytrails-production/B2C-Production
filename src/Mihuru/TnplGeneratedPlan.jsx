import React from 'react'
import { useSelector } from 'react-redux'

const TnplGeneratedPlan = () => {

    const reducerState = useSelector((state) => state);
    const generatedPlans = reducerState?.TNPL?.planDetails?.data?.plan_details;
    return (
        <div>
            <div className='my-5'>
                <div className="BlogheadingContainer">
                    <h3>Plans for You</h3 >
                </div >

                <div className='container'>
                    {
                        generatedPlans?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <p>{item?.downpayment}</p>
                                    <a href={item?.navigate_url} target='_blank'>ispar click kro</a>
                                </div>
                            );
                        })
                    }
                </div>

            </div>
        </div>


    )
}

export default TnplGeneratedPlan
