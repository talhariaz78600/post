
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./ui.module.css"
import { Button } from 'reactstrap';
import { useSelector } from "react-redux";
import { selectAllPosts} from '../../Store/authSlice';
import { Loader } from "../Loader/loader";
import { DeleteModel } from "./DeleteModel";





export function UserPosts() {

    
    const storeAllPosts = useSelector(selectAllPosts)
    const { id } = useParams();
    console.log(id);
    let [loading, setloading] = useState(true);
    let [Userposts, setUserposts] = useState([]);

    const [modal, setModal] = useState(false);
    const [deleteWhatUsers, setdeleteWhatUsers] = useState('')
    const [pContent, setpContent] = useState()
    const toggle = () => setModal(!modal);
    const [deltedId, setDeletedId] = useState()




    useEffect(() => {
        console.log(storeAllPosts)
        let CurrentUserPosts = storeAllPosts.filter((post) => {
            return post.CreatorID === id;
        });
        if(CurrentUserPosts){
            setloading(false)
        }
        setUserposts(CurrentUserPosts);

    }, [storeAllPosts, id])

    console.log(Userposts);



    return (<>
        <div className={`p-2  text-light ${style.Sheading} `}>

            <h2 className={style.Heading}>
                User Posts
            </h2>
        </div>


        <div className="px-2" style={{ width: "99%" }}>
            {Userposts && Userposts.length > 0 ?
                Userposts.map((pst, index) => {
                    return <div key={index} className={style.Content}>
                        <div className="row gap-2">
                            
                            <div className="col">
                            {/* /AdminDashboard/UserDetails/:id/Posts/:postid/Postdetail */}
                                <Link to={`/Admin/AdminDashboard/UserDetails/${pst.CreatorID}/Posts/${pst._id}/Postdetail`}>
                                {
                                    pst.mediaTypes[0].includes("image") ?
                                        < div >
                                            <img src={pst.mediaUrls[0]} alt="PostMedia" style={{ borderRadius: "1rem" }} width={"120rem"} height={"120rem"} />

                                        </div>
                                        :
                                        <div>
                                            <video src={pst.mediaUrls[0]} controls ></video>
                                        </div>
                                }

                            </Link>
                            </div>

                            <div className="col  d-flex align-items-center justify-content-center">
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

        </div >





        <DeleteModel modal={modal} setModal={setModal} toggle={toggle} pContent={pContent} deleteWhat={deleteWhatUsers} deltedId={deltedId} setDeletedId={setDeletedId} />

        <Loader loading={loading} />

    </>)
}
