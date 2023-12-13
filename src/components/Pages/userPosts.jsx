import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./ui.module.css"
import { Button } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, updatePostStatus } from '../../Store/authSlice';
import { Loader } from "../Loader/loader";
import { DeleteModel } from "./DeleteModel";

const serverURL = process.env.REACT_APP_SERVER_URL



export function UserPosts() {

    const dispatch = useDispatch()
    const storeAllPosts = useSelector(selectAllPosts)
    const { id } = useParams()
    let [loading, setloading] = useState(false);
    let [Userposts, setUserposts] = useState([]);

    const [modal, setModal] = useState(false);
    const [deleteWhatUsers, setdeleteWhatUsers] = useState('')
    const [pContent, setpContent] = useState()
    const toggle = () => setModal(!modal);
    const [deltedId, setDeletedId] = useState()




    useEffect(() => {
        let CurrentUserPosts = storeAllPosts.filter((post) => {
            return post.userId === id;
        });

        setUserposts(CurrentUserPosts);

    }, [storeAllPosts, id])

    console.log(Userposts);



    return (<>
        <div className={`p-2  text-light ${style.Sheading} `}>

            <h2 className={style.Heading}>
                User Posts
            </h2>
        </div>


        <div className="px-2" style={{width:"99%"}}>
            {Userposts && Userposts.length > 0 ?
                Userposts.map((pst, index) => {
                    return <div key={index} className={style.Content}>
                        <div className="row gap-2">
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
                                {pst.isApproved ? <span className="fw-bold fs-6 text-success">Approved</span> : <span className="fw-bold fs-6 text-warning">Pending</span>}
                            </div>
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
                                }} className={pst.isApproved ? style.buttonDisApprove : style.buttonApprove} > {pst.isApproved ? "Disapprove" : "Approve"} </button>

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
                })
                :
                <div className="d-flex my-2 fw-bold flex-wrap align-items-center justify-content-center">
                    <p>
                        No Posts Found
                    </p>
                </div>
            }

        </div>


       


        <DeleteModel modal={modal} setModal={setModal} toggle={toggle} pContent={pContent} deleteWhat={deleteWhatUsers} deltedId={deltedId} setDeletedId={setDeletedId} />

        <Loader loading={loading} />

    </>)
}
