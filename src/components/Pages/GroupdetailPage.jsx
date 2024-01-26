// import React from 'react'
// import style from "./ui.module.css"
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from 'react-router-dom';
// import { selectAllPinnedPosts } from "../../Store/authSlice";
// function GroupdetailPage() {
//     const StorePinnedPosts = useSelector(selectAllPinnedPosts);
//     const [groupData, setGroupdata] = useState();

//     const { groupid } = useParams();
//     useEffect(() => {

//         // console.log(StorePinnedPosts)
//         let CurrentUserPosts = StorePinnedPosts.find((post) => {
//             return post._id === groupid;
//         });
//         // console.log(CurrentUserPosts);
//         if (CurrentUserPosts) {

//             setGroupdata(CurrentUserPosts);
//         }


//     }, [StorePinnedPosts, groupid])



//     return (
//         <div>
//             {groupData ? <div>
//                 <div className={`p-2  text-light ${style.Sheading} `}>
//                     <h2 className={style.Heading}>
//                         {groupData.groupName}
//                     </h2>
//                 </div>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-12">
//                             <img className='img-fluid mt-2 rounded' style={{ height: "300px", width: "100rem" }} src={groupData.groupThumbnilURL} alt="GroupThumbnail" />
//                         </div>
//                         <div className="col-12">
//                             <h3 className='mt-5'>Group posts:</h3>
//                         </div>


//                         {groupData.groupDicussionsPost
//                             .map((Userposts, index) => {
//                                 return < div key={index} className="col-12 my-2">
//                                     <div className="container">
//                                         <div className="row">

//                                             {
//                                                 Userposts ?
//                                                     <div className={`${style.postdetailDIv}`}>
//                                                         <div className="mt-2">
//                                                             <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
//                                                                 <div className="carousel-inner">
//                                                                     {Userposts.mediaUrls.map((pst, index) => {
//                                                                         return <div key={index} >

//                                                                             {
//                                                                                 Userposts.mediaTypes[index].includes("image") ?
//                                                                                     <div className={`carousel-item  ${index === 0 ? "active" : ""}`} data-bs-interval="2000">
//                                                                                         <img src={pst} className="d-block rounded img-fluid" style={{ width: "982px", height: "300px" }} alt="..." />
//                                                                                     </div>
//                                                                                     :
//                                                                                     <div className={`carousel-item ${index === 0 ? "active" : "active"}`} data-bs-interval="2000">
//                                                                                         <video src={pst} className="d-block rounded img-fluid" style={{ width: "982px", height: "300px" }} controls ></video>
//                                                                                     </div>
//                                                                             }

//                                                                         </div>
//                                                                     })
//                                                                     }</div>
//                                                                 <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
//                                                                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                                                                     <span className="visually-hidden">Previous</span>
//                                                                 </button>
//                                                                 <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
//                                                                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                                                                     <span className="visually-hidden">Next</span>
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                         <div className="container">
//                                                             <div className="row mt-5">
//                                                                 <div className="col-6">
//                                                                     <p>
//                                                                         <span className="fw-bold">Posted by</span> : <span>{Userposts.postedBy}</span>
//                                                                     </p>
//                                                                 </div>
//                                                                 <div className="col-6">
//                                                                     <p>
//                                                                         <span className="fw-bold"> Post created date</span> : <span>{Userposts.postCreated ? Userposts.postCreated.slice(0, 15) : 'NaN'}</span>
//                                                                     </p>
//                                                                 </div>
//                                                                 {/* <div className="col-6">
//                                                             <p>
//                                                                 <span className="fw-bold">Deal type</span> : <span>{Userposts.postDealType ? Userposts.postDealType : 'NaN'}</span>
//                                                             </p>
//                                                         </div> */}
//                                                                 <div className="col-6">
//                                                                     <p>
//                                                                         <span className="fw-bold">Post Reaction</span> : <span>{Userposts.postReactions.length}
//                                                                         </span>
//                                                                     </p>
//                                                                 </div>
//                                                                 <div className="col-6">
//                                                                     <p>
//                                                                         <span className="fw-bold">Post Share</span> : <span>{Userposts.postShare}</span>
//                                                                     </p>
//                                                                 </div>
//                                                                 <div className="col-6">
//                                                                     <p>
//                                                                         <span className="fw-bold">Post comments</span> : <span>{Userposts.comments.length}</span>
//                                                                     </p>
//                                                                 </div>
//                                                                 <div className="col-6">
//                                                                     <p>
//                                                                         <span className="fw-bold">Price</span> : <span>{Userposts.Price}$</span>
//                                                                     </p>
//                                                                 </div>
//                                                                 <div className="col-12">
//                                                                     <p>
//                                                                         <span className="fw-bold">Post Description</span> : <span>{Userposts.postDescription}</span>
//                                                                     </p>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     :
//                                                     <div>
//                                                         <p >
//                                                             No Post found
//                                                         </p>
//                                                     </div>
//                                             }
//                                         </div>
//                                     </div>

//                                 </div>
//                             })}
//                     </div>
//                 </div>
//             </div> : <div>
//                 <p >
//                     No group found
//                 </p>
//             </div>
//             }

//         </div >
//     )
// }

// export default GroupdetailPage;
