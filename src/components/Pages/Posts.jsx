import React, { useEffect } from "react";
import style from "./ui.module.css"
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader } from "../Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, updatePostStatus, addPinnedPosts, selectAllPinnedPosts } from "../../Store/authSlice";
import { Button } from "reactstrap";
import { DeleteModel } from "./DeleteModel";
import { EditPost } from "./EditPost";
// import imageCompression from 'browser-image-compression';

const serverURL = process.env.REACT_APP_SERVER_URL


export function Posts() {
    // const [selectedOption, setSelectedOption] = useState('Select..');

    const dispatch = useDispatch();
    const StorePosts = useSelector(selectAllPosts);
    const StorePinnedPosts = useSelector(selectAllPinnedPosts);
    const [loading, setloading] = useState(false);
    // const [Myfile, setMyfile] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [deltedId, setDeletedId] = useState('')
    const [deleteWhatUsers, setdeleteWhatUsers] = useState('')
    const [pContent, setpContent] = useState()
    // const [postId, setPostId] = useState('')
    console.log(StorePosts);
    const [modalEdit, setmodalEdit] = useState(false);
    // const toggleEdit = () => setmodalEdit(!modal);
    const [postData, setpostData] = useState()
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

        {/* <input type="file" name="" id="" onChange={(e) => { setMyfile(e.target.files[0]) }} />
        <button onClick={async () => {

            try {

                setloading(true)

                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                };
                const compressedFile = await imageCompression(Myfile, options);
                console.log("compressed file");
                console.log(compressedFile);


                const formData = new FormData()
                formData.append("postContent", "2 do not do any action on it")
                formData.append("postMedia", compressedFile)
                let response = await axios.post(`${serverURL}/api/posts/654f545cb80a37a368e19597/posts/add_post`, formData)

                if (response && response.status === 200) {
                    setloading(false)
                    toast.success(response.data.message)
                    console.log(response.data.post);
                    // dispatch(addNewPosts(response.data.newPost))
                }


            } catch (error) {
                setloading(false)
                if (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        toast.error(error.response.data.message);
                    } else {
                        toast.error("Failed to Add Post ");
                    }
                }

            }
        }} className={style.buttonDisApprove} >Add Post </button> */}

        {StorePosts && StorePosts.length > 0 ?
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
                                <h2 className="fw-bold fs-5">Status</h2>
                            </div>

                        </div>
                    </div>
                    {StorePosts.map((pst, index) => {
                        return <div key={index} className={style.Content}>
                            <div className="row gap-2 p-2">
                                <div className="row gap-2 p-1">
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
                                        {pst.underApproval ? <span className="fw-bold fs-6 text-warning">Pending</span> : <div>
                                            {pst.isApproved ? <span className="fw-bold fs-6 text-success">Approved</span> : <span className="fw-bold fs-6 text-danger">Disapproved</span>}
                                        </div>}

                                    </div>
                                </div>
                                <div className="row gap-2 p-1">


                                    <div className="col d-flex align-items-center justify-content-center">

                                        <button onClick={async () => {
                                            try {
                                                setloading(true)
                                                let response = await axios.post(`${serverURL}/api/posts/${pst._id}/Approve_post`, { appproveStatus: pst.isApproved })

                                                if (response && response.status === 200) {
                                                    setloading(false)
                                                    toast.success(response.data.message)
                                                    dispatch(updatePostStatus({ _id: pst._id, post: response.data.post }))
                                                }


                                            } catch (error) {
                                                setloading(false)
                                                if (error) {
                                                    if (error.response) {
                                                        console.log(error.response.data);
                                                        console.log(error.response.status);
                                                        toast.error(error.response.data.message);
                                                    } else {
                                                        toast.error("Failed to Update Post Status");
                                                    }
                                                }

                                            }
                                        }} className={pst.isApproved ? style.buttonDisApprove : style.buttonApprove} > {pst.isApproved ? 'Disapprove' : 'Approved'} </button>

                                    </div>

                                    <div className="col d-flex align-items-center justify-content-center">
                                        <button onClick={async () => {

                                            if (pst.isPinned) {
                                                toast.info("Already Added")
                                                return
                                            }


                                            try {
                                                setloading(true)
                                                let response = await axios.post(`${serverURL}/api/PinnedPosts/${pst._id}/add_Pinned_post`, { TotalPinned })

                                                if (response && response.status === 200) {
                                                    setloading(false)
                                                    toast.success(response.data.message)
                                                    console.log("response aya");
                                                    console.log(response.data.newBumperpost);
                                                    dispatch(addPinnedPosts({ postId: pst._id, NewBumperPost: response.data.newBumperpost, TotalPinned }))
                                                }


                                            } catch (error) {
                                                setloading(false)
                                                if (error) {
                                                    if (error.response) {
                                                        if (error.response.status === 401) {
                                                            toast.warning(error.response.data.message)
                                                        } else if (error.response.status === 409) {
                                                            toast.info(error.response.data.message)

                                                        }
                                                        else {

                                                            console.log(error.response.data);
                                                            console.log(error.response.status);
                                                            toast.error(error.response.data.message);
                                                        }
                                                    } else {
                                                        toast.error("Failed to Add Post to Bumper");
                                                    }
                                                }

                                            }
                                        }} className={pst.isPinned ? style.buttonAdded : style.buttonAdd} > {pst.isPinned ? "Added" : "Add"} </button>

                                    </div>


                                    <div onClick={() => {
                                        setmodalEdit(true)
                                        setpostData(pst)

                                    }} style={{ cursor: "pointer" }} className="col d-flex align-items-center  justify-content-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>

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

        <EditPost modalEdit={modalEdit} postData={postData} setmodalEdit={setmodalEdit} />

        <Loader loading={loading} />
    </>)
}