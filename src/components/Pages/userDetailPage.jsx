import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./ui.module.css"
import { useSelector } from "react-redux";
import { selecteUsers, selectAllPosts } from '../../Store/authSlice';
import { Loader } from "../Loader/loader";

const serverURL = process.env.REACT_APP_SERVER_URL



export function UserDetailpage() {

    const storeUser = useSelector(selecteUsers)
    const storeAllPosts = useSelector(selectAllPosts)
    const { id } = useParams()
    let [loading, setloading] = useState(false);
    let [user, setUsers] = useState();
    let [Userposts, setUserposts] = useState([]);
   

    const [selectedOption, setSelectedOption] = useState(user ? user.status === true ? "Active" : "Suspended" : 'Select..');




    useEffect(() => {

        let CurrentUser = storeUser.find((userObject) => {
            return userObject._id === id;
        });

        setUsers(CurrentUser)


    }, [id, storeUser])

    useEffect(() => {
        let CurrentUserPosts = storeAllPosts.filter((post) => {
            return post.userId === id;
        });

        setUserposts(CurrentUserPosts);

    }, [storeAllPosts, id])

    console.log(Userposts);
    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;

        setSelectedOption(selectedValue);

    };

    


    const handelSubmitStatus= async(e)=>{
        e.preventDefault();
        
        if (selectedOption === 'Select..') {
            toast.info("Please select status option")
            return
        }


        try {

            setloading(true)
            const response = await axios.post(`${serverURL}/api/users/${id}/update_user_status`, {
                status: selectedOption
            })
            console.log(response.data.user);
            if (response && response.status === 200) {
                setloading(false)
                setUsers(response.data.user)
                toast.success(response.data.message)
            }
        } catch (error) {
            setloading(false)
            if (error.response.status === 401) {
                toast.error(error.response.message);
            } else if (error.response.status === 400) {
                toast.error(error.response.message);
            } else if (error.response.status === 500) {
                toast.error(error.response.message);

            } else {
                toast.error("Failed to Update user status")
            }

        }

        setSelectedOption('Select..')
    }
    return (<>
        <div className={`p-2  text-light ${style.Sheading} `}>

            <h2 className={style.Heading}>
                User Profile
            </h2>
        </div>

        {user && <div>
            <div className="p-3 ">
                <div className={`${style.ProfileDIv} col-span-2`}>
                    <div style={{ width: "100%" }} className="d-flex   gap-2 justify-content-between px-4">

                        <div >
                            <p>
                                <span className="fw-bold">Name</span> : <span>{user.username}</span>
                            </p>
                            <p>
                                <span className="fw-bold">UserId</span> : <span>{user._id}</span>
                            </p>
                            <p>
                                <span className="fw-bold">DOB</span> : <span>{user.DOB}</span>
                            </p>
                            <p>
                                <span className="fw-bold">primaryMarket </span> : <span>{user.primaryMarket}</span>
                            </p>


                            <p>
                                <span className="fw-bold">email</span> : <span>{user.email}</span>
                            </p>
                            <p>
                                <span className="fw-bold">Password</span> : <span>{user.password}</span> 
                            </p>
                            <p>
                                <span className="fw-bold" >Account</span> :  {user.isemailverified === true ? <span className="text-success fw-bolder">Verified</span> : <span className="text-danger fw-bolder ">Unverified</span>}

                            </p>
                            <p>
                                <span className="fw-bold">Status</span> :  {user.status === true ? <span className={style.active}>Active</span> : <span className={style.suspend}>Suspended</span>}

                            </p>
                            <div >
                                <span className="fw-bold">Change Status</span> :
                                <form onSubmit={handelSubmitStatus} className={style.dropdownSelect} >
                                    <select
                                        className={style.dropdown}
                                        id="userStatus"
                                        name="userStatus"
                                        value={selectedOption}

                                        onChange={handleDropdownChange}
                                    >

                                        <option value="Select..">Select..</option>
                                        <option value="Active">Active</option>
                                        <option value="Suspended">Suspended</option>
                                    </select>
                                    <button style={{ marginLeft: "10px" }} type="submit">
                                        Update
                                    </button>
                                </form>

                            </div>
                        </div>
                        <div  >
                            <img src={user.profileImageUrl} alt="profileImage" width={"120rem"} height={"120rem"} style={{ borderRadius: "1rem" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>}

        <div className="container">
            <div className="row gap-2  my-4 px-4 text-center">
                {/* <Link to={`/Admin/AdminDashboard/UserDetails/${id}/UserChats`} className={`col ${style.Box}`}>
                    <div>
                        Chats
                    </div>
                    <div>
                        <img src="/chats.png" alt="chatimg" width={"30rem"} height={"30rem"} />
                    </div>
                </Link> */}
                <Link to={`/Admin/AdminDashboard/UserDetails/${id}/Posts`} className={`col ${style.Box}`}>
                    <div>
                        Posts
                    </div>
                    <div>
                        <img src="/mpost.png" alt="chatimg" width={"30rem"} height={"30rem"} />
                    </div>
                </Link>
            </div>


           
         </div>
       



        <Loader loading={loading} />

    </>)
}
