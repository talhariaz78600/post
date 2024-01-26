import React, { useEffect } from "react";
import style from "./ui.module.css"
import { useState } from "react";
import { Loader } from "../Loader/loader";
import { useSelector } from "react-redux"; 
import { selectAllPosts, selectAllPinnedPosts } from "../../Store/authSlice"; 
import { Button } from "reactstrap";
import { DeleteModel } from "./DeleteModel";
// import { EditPost } from "./EditPost";
import { Link } from "react-router-dom";

export function Posts() {
    const StorePosts = useSelector(selectAllPosts);
    const StorePinnedPosts = useSelector(selectAllPinnedPosts);
    const [loading, setloading] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [deltedId, setDeletedId] = useState('')
    const [deleteWhatUsers, setdeleteWhatUsers] = useState('')
    const [pContent, setpContent] = useState()
    console.log(StorePosts);
    const [TotalPinned, setTotalPinned] = useState(0)
    useEffect(() => {
        let MyPinnedPosts = 0;
        StorePinnedPosts.forEach((userobjects) => {
            if (userobjects.isPinnedT === true) {
                MyPinnedPosts++;
            }
        })
        setTotalPinned(MyPinnedPosts)
    }, [StorePinnedPosts])
    console.log(TotalPinned);
    return (<>
        <div className={`p-2  text-light ${style.Sheading} `}>

            <h2 className={style.Heading}>
                All Post
            </h2>
        </div>
        {StorePosts && StorePosts.length > 0 ?
            <div className="my-2 p-2">

                <div className={style.containerContent}>
                    <div className={style.HeadingContent}>
                        <div className="row gap-2">
                            <div className="col">
                                <h2 className="fw-bold fs-5">Media</h2>
                            </div>
                            <div className="col">
                                <h2 className="fw-bold fs-5">Description</h2>
                            </div>
                            <div className="col">
                                <h2 className="fw-bold fs-5">Posted by</h2>
                            </div>
                            <div className="col">
                                <h2 className="fw-bold fs-5">Posted Date</h2>
                            </div>
                            <div className="col">
                                <h2 className="fw-bold fs-5">Reported Posts</h2>
                            </div>
                            <div className="col">
                                <h2 className="fw-bold fs-5">Delete</h2>
                            </div>

                        </div>
                    </div>
                    {StorePosts.map((pst, index) => {
                        return <div key={index} className={style.Content}>
                            <div className="row gap-2 p-2">
                                <div className="row gap-2">

                                    <div className="col">
                                        
                                        <Link to={`/Admin/AdminDashboard/UserDetails/${pst.CreatorID}/Posts/${pst._id}/Postdetail`}>
                                            {
                                                pst.mediaTypes[0].includes("image") ?
                                                    < div >
                                                        <img src={pst.mediaUrls[0]} alt="PostMedia" style={{ borderRadius: "1rem" }} width={"100rem"} height={"100rem"} />

                                                    </div>
                                                    :
                                                    <div>
                                                        <video src={pst.mediaUrls[0]} controls ></video>
                                                    </div>
                                            }

                                        </Link>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-center">
                                        <h2 className="fw-medium fs-6">{pst.postDescription
                                        }</h2>
                                    </div>

                                    <div className="col d-flex align-items-center justify-content-center">
                                        <h2 className="fw-medium fs-6">{pst.postedBy
                                        }</h2>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-center">
                                        <h2 className="fw-medium fs-6">{pst.postCreated ? pst.postCreated.slice(0, 15) : 'NaN'}</h2>
                                    </div>

                                    <div className="col  d-flex align-items-center justify-content-center">
                                        {pst.isReporeted?<span className="fw-bold fs-6  text-danger">Reported post</span>:<span className="fw-bold fs-6  text-success"> Not reported</span>
                                        }
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-center">
                                        <Button className="Reject"
                                            onClick={() => {
                                                setDeletedId(pst._id)
                                                setModal(!modal);
                                                setdeleteWhatUsers("Post")
                                                setpContent(' Are you sure you want to Delete  this Post? This action cannot be undone.')
                                            }}
                                        ><i className="bi bi-trash3"></i></Button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    })}

                </div>
            </div> :
            <div className=" text-xl d-flex  align-items-center my-5 justify-content-center">
                <p className="text-center center fw-bolder ">
                    No Posts Found
                </p>
            </div>
        }

        <DeleteModel modal={modal} setModal={setModal} toggle={toggle} pContent={pContent} deleteWhat={deleteWhatUsers} deltedId={deltedId} setDeletedId={setDeletedId} />

        {/* <EditPost modalEdit={modalEdit} postData={postData} setmodalEdit={setmodalEdit} /> */}

        <Loader loading={loading} />
    </>)
}