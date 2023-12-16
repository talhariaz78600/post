import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { selectAllPosts } from '../../Store/authSlice';
import style from "./ui.module.css"
import { Loader } from "../Loader/loader";
import { useParams } from 'react-router-dom';
function PostDetailPage() {
    const storeAllPosts = useSelector(selectAllPosts)
    let [loading, setloading] = useState(true);
    let [Userposts, setUserposts] = useState();
    const { postid } = useParams();
    useEffect(() => {

        console.log(storeAllPosts)
        let CurrentUserPosts = storeAllPosts.find((post) => {
            return post._id === postid;
        });
        console.log(CurrentUserPosts);
        if (CurrentUserPosts) {

            setloading(false)
        }
        setUserposts(CurrentUserPosts);

    }, [storeAllPosts, postid])



    return (
        <div>

            <div className={`p-2  text-light ${style.Sheading} `}>

                <h2 className={style.Heading}>
                    Post Detail
                </h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        {
                            Userposts ?
                                <div className={`${style.postdetailDIv} mt-5 mb-4`}>
                                    <div className="mt-2">
                                        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-inner">
                                                {Userposts.mediaUrls.map((pst, index) => {
                                                    return <div key={index} >

                                                        {
                                                            Userposts.mediaTypes[index].includes("image") ?
                                                                <div className={`carousel-item  ${index===0?"active":""}`} data-bs-interval="2000">
                                                                    <img src={pst} className="d-block rounded img-fluid" style={{ width: "982px", height: "400px" }} alt="..." />
                                                                </div>
                                                                :
                                                                <div className={`carousel-item ${index===0?"active":"active"}`} data-bs-interval="2000">
                                                                    <video src={pst} className="d-block rounded img-fluid" style={{ width: "982px", height: "400px" }} controls ></video>
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
                                    <div className="container">
                                        <div className="row mt-5">
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Posted by</span> : <span>{Userposts.postedBy}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold"> Post created date</span> : <span>{Userposts.postCreated ? Userposts.postCreated.slice(0, 15) : 'NaN'}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Deal type</span> : <span>{Userposts.postDealType ? Userposts.postDealType : 'NaN'}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Post Reaction</span> : <span>{Userposts.postReactions.length}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Post Share</span> : <span>{Userposts.postShare}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Post comments</span> : <span>{Userposts.comments.length}</span>
                                                </p>
                                            </div>
                                            <div className="col-12">
                                                <p>
                                                    <span className="fw-bold">Post Description</span> : <span>{Userposts.postDescription}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Price</span> : <span>{Userposts.Price}$</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Estimated_Rents</span> : <span>{Userposts.Estimated_Rents}$</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">City,State - Zipcode</span> : <span>{Userposts.city + "," + Userposts.state + " - " + Userposts.zipCode}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">DwellingStyle</span> : <span>{Userposts.DwellingStyle}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">No Of Bedrooms</span> : <span>{Userposts.NoOfBedromoms}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">No Of Bathrooms</span> : <span>{Userposts.NoOfBathrooms}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">C. O. E.</span> : <span>{Userposts.close_of_Escrow}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Pool</span> : <span>{Userposts.Pool}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Basement</span> : <span>{Userposts.Basement}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Repair Needs</span> : <span>{Userposts.Repair_Needs}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">HAO Feature</span> : <span>{Userposts.HAO_Feature}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Monthly PMT</span> : <span>{Userposts.Monthly_PMT}</span>
                                                </p>
                                            </div>
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
                </div>
            </div>
            <Loader loading={loading} />

        </div>
    )
}

export default PostDetailPage;
