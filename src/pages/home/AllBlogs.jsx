import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './advertise.css';
import { apiURL } from '../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import "./blog.css"
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import cheerio from "cheerio";

const AllBlogs = () => {

    // const reducerState = useSelector((state) => state);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const sliderRef = useRef(null); // Reference for the slider component

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(apiURL.baseURL + '/skyTrails/api/blog/getAllBlogs?page=1');
                setBlogs(response.data.result.docs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        // After blogs are fetched, find the index of the first recent blog
        const index = blogs.findIndex(blog => isRecent(blog.createdAt));
        if (sliderRef.current && index !== -1) {
            sliderRef.current.slickGoTo(index); // Go to the slide of the first recent blog
        }
    }, [blogs]);

    const handleSingle = (singleBlog) => {
        navigate(`/blogdetails/${singleBlog?.title}`);
        // const encodedTitle = encodeURIComponent(singleBlog?.title).replace(/%20/g, "-");
        // navigate(`/blogdetails/${encodedTitle}`);
    };



    const isRecent = (createdAt) => {
        const currentDate = new Date();
        const creationDate = new Date(createdAt);
        const timeDifference = currentDate - creationDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        return daysDifference <= 4;
    };

    const stripHtmlWithCheerio = (html) => {
        const $ = cheerio.load(html);
        return $.text();
    };

    return (
        <section className=' mt-5'>
            <div className='advertise-container paddMobile'>
                <div className="container p-0 mt-4">
                    <div className="BlogheadingContainer">
                        <h3>Read Our Blogs</h3>
                    </div>
                    <div className="blogBox">
                        <div className="container">
                            <div className="row g-3">

                                {blogs?.map((blog) => {
                                    const content = blog?.content;
                                    const strippedContent = stripHtmlWithCheerio(content);
                                    const preview = strippedContent.slice(0, 200);
                                    return (
                                        <div className="col-lg-4" key={blog._id}>
                                            <div className=" blog-slide">
                                                <div className='blogMainBox'>
                                                    <div className='imgBoxBlog'>
                                                        {isRecent(blog?.createdAt) && <span className='ibbabs'>New</span>}
                                                        <img src={blog?.media?.[0]} alt={blog?.media?.[0]} loading='lazy' />
                                                    </div>
                                                    <div className="imgBoxContentBlog">
                                                        <div className='locDate'>
                                                            <div className="locDataInner">
                                                                <span>
                                                                    <svg height="15" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_3177361">
                                                                        <g id="Pin">
                                                                            <path d="m32 0a24.0319 24.0319 0 0 0 -24 24c0 17.23 22.36 38.81 23.31 39.72a.99.99 0 0 0 1.38 0c.95-.91 23.31-22.49 23.31-39.72a24.0319 24.0319 0 0 0 -24-24zm0 35a11 11 0 1 1 11-11 11.0066 11.0066 0 0 1 -11 11z"></path>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                                <p>{blog?.location}</p>
                                                            </div>
                                                            <p>{dayjs(blog?.createdAt).format("DD MMM, YY")}</p>
                                                        </div>
                                                        <div className="blogContent">
                                                            <h2>{blog?.title}</h2>
                                                            <p>{preview}</p>
                                                            <div className='d-flex justify-content-center mt-3'>
                                                                <button onClick={(e) => handleSingle(blog)}>Read More</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AllBlogs
