import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { selectAllPosts } from '../../Store/authSlice';
import style from "./ui.module.css"
import { Loader } from "../Loader/loader";
import { useParams } from 'react-router-dom';
function PostDetailPage() {
    const storeAllPosts = useSelector(selectAllPosts)
    let [loading, setloading] = useState(false);
    let [Userposts, setUserposts] = useState();
    const { postid } = useParams();

    useEffect(() => {

        console.log(storeAllPosts)
        let CurrentUserPosts = storeAllPosts.find((post) => {
            return post._id === postid;
        });
        console.log(CurrentUserPosts)
        setUserposts(CurrentUserPosts);

    }, [storeAllPosts, postid])


console.log(Userposts)
    return (
        <div>

            <div className={`p-2  text-light ${style.Sheading} `}>

                <h2 className={style.Heading}>
                    Post Detail
                </h2>
            </div>

            {
                Userposts ?
                    <div className={`${style.ProfileDIv}`}>
                        <div className="mt-2">
                            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                {Userposts.mediaUrls.map((pst, index) => {
                                    return <div key={index} >

                                        {
                                            Userposts.mediaTypes[index].includes("image") ?
                                                <div className="carousel-item active" data-bs-interval="3000">
                                                    <img src={pst} className="d-block" style={{ width: "980px", height: "400px" }} alt="..." />
                                                </div>
                                                :
                                                <div className="carousel-item active" data-bs-interval="3000">
                                                    <video  src={pst} controls ></video>
                                                </div>
                                        }

                                    </div>
                                })
                                }</div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <p>
                            No Post found
                        </p>
                    </div>
            }

        </div>
    )
}

export default PostDetailPage;
