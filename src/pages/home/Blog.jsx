import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './advertise.css';
import { apiURL } from '../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import one from "../../images/selectHotels/1.jpg"
import two from "../../images/selectHotels/2.jpg"
import three from "../../images/selectHotels/3.jpg"
import four from "../../images/selectHotels/4.jpg"
import five from "../../images/selectHotels/5.jpg"
import six from "../../images/selectHotels/6.jpg"
import seven from "../../images/selectHotels/7.jpg"
import "./blog.css"
import { useDispatch, useSelector } from 'react-redux';
import Hotelmainloading from '../Hotel/hotelLoading/Hotelmainloading';
import dayjs from 'dayjs';
import cheerio from "cheerio";

const Blog = () => {


    const reducerState = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(apiURL.baseURL + '/skyTrails/api/blog/getAllBlogs');
                setBlogs(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();

    }, []);



    const handleSingle = (singleBlog) => {

        navigate(`/blogdetails/${singleBlog?._id}`)
    }


    const settings = {
        draggable: true,
        arrows: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1 // Show 2 slides on devices with width <= 768px
                }
            },
            {
                breakpoint: 1468,
                settings: {
                    slidesToShow: 3 // Show 4 slides on devices with width <= 1468px
                }
            }
        ]
    };




    return (

        <section className='blogBack mt-5'>
            <div className=' advertise-container paddMobile'  >
                <div className="container p-0 mt-4">

                    <div className="BlogheadingContainer">
                        <h3>Read Our Blogs</h3 >
                    </div >
                    <div className="blogBox">

                        <div className="container">
                            <div className="row g-3">
                                <Slider {...settings}>
                                    {blogs?.map((blog) => {
                                        const stripHtmlWithCheerio = (html) => {
                                            const $ = cheerio.load(html);
                                            return $.text();
                                        };
                                        const content = blog?.content;
                                        const strippedContent = stripHtmlWithCheerio(content);
                                        const preview = strippedContent.slice(0, 200);
                                        return (
                                            <div className="col-lg-4 " onClick={(e) => handleSingle(blog)}>
                                                <div className="slick-slide blog-slide" style={{ cursor: "pointer" }} key={blog._id} >
                                                    <div className='blogMainBox'>
                                                        <div className='imgBoxBlog'>
                                                            <img style={{ cursor: "pointer" }} src={blog?.media?.[0]} alt={blog?.media?.[0]} loading='lazy' />

                                                        </div>
                                                        <div className="imgBoxContentBlog">
                                                            <div className='locDate'>
                                                                <div class="locDataInner">
                                                                    <span>
                                                                        <svg height="15" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_3177361"><g id="Pin"><path d="m32 0a24.0319 24.0319 0 0 0 -24 24c0 17.23 22.36 38.81 23.31 39.72a.99.99 0 0 0 1.38 0c.95-.91 23.31-22.49 23.31-39.72a24.0319 24.0319 0 0 0 -24-24zm0 35a11 11 0 1 1 11-11 11.0066 11.0066 0 0 1 -11 11z"></path></g>
                                                                        </svg>
                                                                    </span>
                                                                    <p>{blog?.location}</p>
                                                                </div>
                                                                <p>{dayjs(blog?.createdAt).format("DD MMM, YY")}</p>
                                                            </div>
                                                            <div className="blogContent">
                                                                <h2>{blog?.title}</h2>
                                                                <p>{preview}</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        </section>

    )
};

export default Blog;
