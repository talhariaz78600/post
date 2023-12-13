import React from "react";
import style from "./ui.module.css"
import { useState } from "react";
import {  useSelector } from "react-redux";
import { selectAllPinnedPosts } from "../../Store/authSlice";
import { Button } from "reactstrap";
import { DeleteModel } from "./DeleteModel";



export function PinnedPost() {

    const StorePinnedPosts = useSelector(selectAllPinnedPosts);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [deltedId, setDeletedId] = useState('')
    const [deleteWhatUsers, setdeleteWhatUsers] = useState('')
    const [pContent, setpContent] = useState()
    console.log(StorePinnedPosts);





   


    return (<>
        <div className={`p-2  text-light ${style.Sheading} `}>
            <h2 className={style.Heading}>
            Pinned Posts
            </h2>
        </div>

        {StorePinnedPosts && StorePinnedPosts.length > 0 ?
            <div className="my-2 p-2">

                <div className={style.containerContent}>
                    <div className={style.HeadingContent}>
                        <div className="row gap-2">
                            <div className="col">
                                <h2 className="fw-bold fs-5">Media</h2>
                            </div>
                            <div className="col">
                                <h2 className="fw-bold fs-5">Content</h2>
                            </div>

                            <div className="col">
                                <h2 className="fw-bold fs-5">Posted by</h2>
                            </div>
                            <div className="col">
                                <h2 className="fw-bold fs-5">Posted Date</h2>
                            </div>
                           
                            <div className="col">
                                <h2 className="fw-bold fs-5">Action</h2>
                            </div>
                          
                        </div>
                    </div>
                    {StorePinnedPosts.map((pst, index) => {
                        return <div key={index} className={style.Content}>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <img src={pst.postMediaUrl} alt="PostMedia" style={{ borderRadius: "1rem" }} width={"120rem"} height={"120rem"} />

                                    </div>
                                </div>
                                <div className="col  d-flex align-items-center justify-content-center">
                                    <h2 className="fw-medium fs-6">{pst.postContent}</h2>
                                </div>

                                <div className="col d-flex align-items-center justify-content-center">
                                    <h2 className="fw-medium fs-6">{pst.userName}</h2>
                                </div>
                                <div className="col d-flex align-items-center justify-content-center">
                                    <h2 className="fw-medium fs-6">{pst.PostCreated ? pst.PostCreated.slice(0, 15) : 'NaN'}</h2>
                                </div>
                               
                                <div className="col d-flex align-items-center justify-content-center">
                                    <Button className="Reject"
                                        onClick={() => {
                                            setDeletedId(pst._id)
                                            setModal(!modal);
                                            setdeleteWhatUsers("BumperPost")
                                            setpContent(' Are you sure you want to Delete  this Pinned Post? This action cannot be undone.')
                                        }}
                                    ><i className="bi bi-trash3"></i></Button>
                                </div>

                            </div>
                        </div>
                    })}



                </div>
            </div> :
            <div className=" text-xl d-flex  align-items-center my-5 justify-content-center">
                <p className="text-center center fw-bolder ">
                    No  Pinned Posts Found
                </p>
            </div>
        }

        <DeleteModel modal={modal} setModal={setModal} toggle={toggle} pContent={pContent} deleteWhat={deleteWhatUsers} deltedId={deltedId} setDeletedId={setDeletedId} />

    </>)
}
