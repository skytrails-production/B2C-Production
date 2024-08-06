
import React from 'react'
import "./newcategorySkeleton.scss"

const HolidayCategorySkeleton = () => {

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="container">
                <div className="carousel">



                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>


                </div>
            </div>
            <div className="container">
                <div className="carousel">



                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>


                </div>
            </div>
            <div className="container">
                <div className="carousel">



                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>


                </div>
            </div>
            <div className="container">
                <div className="carousel">



                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>


                </div>
            </div>
        </>
    )
}

export default HolidayCategorySkeleton
