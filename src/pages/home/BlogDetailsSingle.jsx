import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { apiURL } from '../../Constants/constant';
import dayjs from 'dayjs';
import { Skeleton } from "@mui/material";

const BlogDetailsSingle = () => {

    const { keyword } = useParams();
    const [blogData, setBlogData] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/blog/getBlogById?blogId=${keyword}`);
            setBlogData(response.data.result);
            setLoader(false);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [keyword])



    const handleSingle = (singleBlog) => {
        setLoader(true)
        navigate(`/blogdetails/${singleBlog?._id}`)
    }


    return (
        <div>
            <div class="container-fluid py-5">
                <div class="container py-5">

                    {
                        loader ?

                            <div class="row g-4">
                                <div class="col-lg-7 col-xl-8 mt-0">
                                    <div class="position-relative overflow-hidden rounded">
                                        {/* <img src={blogData?.searchedBlog?.media?.[0]} class="img-fluid rounded img-zoomin w-100" alt="" /> */}
                                        <Skeleton variant="rect" width="100%" height={400} />
                                        <div class="d-flex justify-content-center px-4 position-absolute flex-wrap " style={{ gap: "13px", bottom: "10px", left: "0" }}>
                                            {/* <Skeleton class="text-white me-3 link-hover" width={200} height={30} />
                                            <span class="text-white me-3 link-hover"><i class="fa fa-comment-dots"></i> {blogData?.searchedBlog?.location}</span>
                                            <span class="text-white link-hover"><i class="fa fa-arrow-up"></i>{dayjs(blogData?.searchedBlog?.createdAt).format("DD MMM, YY")}</span> */}
                                            <Skeleton>
                                                <p className='me-3' style={{ height: "32px", background: "#f1f1f1", width: "40px" }}></p>
                                            </Skeleton>
                                            <Skeleton>
                                                <p className='me-3' style={{ height: "32px", background: "#f1f1f1", width: "40px" }}></p>
                                            </Skeleton>
                                            <Skeleton>
                                                <p className='me-3' style={{ height: "32px", background: "#f1f1f1", width: "40px" }}></p>
                                            </Skeleton>
                                        </div>
                                    </div>
                                    <div class="border-bottom singleBlogHeading py-3">
                                        {/* <h1 class="display-4 text-dark mb-0">{blogData?.searchedBlog?.title}</h1> */}
                                        <Skeleton variant="rect" width="100%" height={50} />
                                    </div>
                                    <Skeleton variant="rect" width="100%" height={15} className='mb-2 rounded' />
                                    <Skeleton variant="rect" width="100%" height={15} className='mb-2 rounded' />
                                    <Skeleton variant="rect" width="100%" height={15} className='mb-2 rounded' />
                                    <Skeleton variant="rect" width="80%" height={15} className='mb-2 rounded' />

                                </div>
                                <div class="col-lg-5 col-xl-4">
                                    <div class="bg-light rounded p-4 pt-0">
                                        <div class="row g-4">
                                            <div class="col-12">
                                                {/* <div class="rounded overflow-hidden"> */}
                                                <Skeleton variant="rect" width="100%" height={130} className="rounded" />
                                                {/* <img src={blogData?.trendingBlog?.[0]?.media?.[0]} class="img-fluid rounded img-zoomin w-100" alt="" /> */}
                                                {/* </div> */}
                                            </div>
                                            <div class="col-12">
                                                <div class="d-flex flex-column">
                                                    <Skeleton variant="rect" width="40%" height={15} className='mb-2 rounded' />
                                                    <Skeleton variant="rect" width="40%" height={15} className='mb-2 rounded' />
                                                    <Skeleton variant="rect" width="40%" height={15} className='mb-2 rounded' />
                                                </div>
                                            </div>
                                            {
                                                [1, 2, 3, 4, 5, 6].map((item) => ( // Slice starting from index 1
                                                    <div class="col-12" >
                                                        <div class="row g-4 align-items-center">
                                                            <div class="col-5">
                                                                <div class="overflow-hidden rounded">
                                                                    <Skeleton variant="rect" width="100%" height={55} className='mb-2 rounded' />
                                                                </div>
                                                            </div>
                                                            <div class="col-7">
                                                                <div class="features-content d-flex flex-column">
                                                                    <Skeleton variant="rect" width="100%" height={15} className='mb-2 rounded' />
                                                                    <Skeleton variant="rect" width="100%" height={15} className='mb-2 rounded' />
                                                                    <Skeleton variant="rect" width="100%" height={15} className='mb-2 rounded' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }



                                        </div>
                                    </div>
                                </div>
                            </div>


                            : <div class="row g-4">
                                <div class="col-lg-7 col-xl-8 mt-0">
                                    <div class="position-relative overflow-hidden rounded">
                                        <img src={blogData?.searchedBlog?.media?.[0]} class="img-fluid rounded img-zoomin w-100" alt="" />
                                        <div class="d-flex justify-content-center px-4 position-absolute flex-wrap" style={{ bottom: "10px", left: "0" }}>
                                            <span class="text-white me-3 link-hover"><i class="fa fa-eye"></i>{blogData?.searchedBlog?.views} Views</span>
                                            <span class="text-white me-3 link-hover"><i class="fa fa-comment-dots"></i> {blogData?.searchedBlog?.location}</span>
                                            <span class="text-white link-hover"><i class="fa fa-arrow-up"></i>{dayjs(blogData?.searchedBlog?.createdAt).format("DD MMM, YY")}</span>
                                        </div>
                                    </div>
                                    <div class="border-bottom singleBlogHeading py-3">
                                        <h1 class="display-4 text-dark mb-0">{blogData?.searchedBlog?.title}</h1>
                                    </div>
                                    {/* <p >{blogData?.searchedBlog?.content}</p> */}
                                    <p class="mt-3 mb-4" dangerouslySetInnerHTML={{ __html: blogData?.searchedBlog?.content }} />
                                </div>
                                <div class="col-lg-5 col-xl-4">
                                    <div class="bg-light rounded p-4 pt-0">
                                        <div class="row g-4">
                                            <div className="col-12" onClick={(e) => handleSingle(blogData?.trendingBlog?.[0])}>
                                                <div class="col-12">
                                                    <div class="rounded overflow-hidden">
                                                        <img src={blogData?.trendingBlog?.[0]?.media?.[0]} class="img-fluid rounded img-zoomin w-100" alt="" />
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="d-flex flex-column">
                                                        <p class="h6">{blogData?.trendingBlog?.[0]?.title}</p>
                                                        <p class="fs-5 mb-0"><i class="fa fa-clock">{blogData?.trendingBlog?.[0]?.location}</i> </p>
                                                        <p class="fs-5 mb-0"><i class="fa fa-eye">{dayjs(blogData?.trendingBlog?.[0]?.createdAt).format("DD MMM, YY")}</i></p>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                blogData?.trendingBlog?.slice(1).map((item, index) => ( // Slice starting from index 1
                                                    <div class="col-12" key={index} onClick={(e) => handleSingle(item)} style={{ cursor: "pointer" }}>
                                                        <div class="row g-4 align-items-center">
                                                            <div class="col-5">
                                                                <div class="overflow-hidden rounded">
                                                                    <img src={item.media?.[0]} class="img-zoomin img-fluid rounded w-100" alt="" /> {/* Use item here */}
                                                                </div>
                                                            </div>
                                                            <div class="col-7">
                                                                <div class="features-content d-flex flex-column">
                                                                    <p class="h6">{item.title}</p> {/* Use item here */}
                                                                    <small><i class="fa fa-clock">{item.location}</i> </small> {/* Use item here */}
                                                                    <small><i class="fa fa-eye">{dayjs(item.createdAt).format("DD MMM, YY")}</i></small> {/* Use item here */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }



                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BlogDetailsSingle
