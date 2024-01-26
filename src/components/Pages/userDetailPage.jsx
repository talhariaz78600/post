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
    // const storeAllPosts = useSelector(selectAllPosts)
    const { id } = useParams()
    let [loading, setloading] = useState(false);

    let [user, setUsers] = useState();
    // let [Userposts, setUserposts] = useState([]);
    const [inputVisible, setinputVisible] = useState(false);
    let [newpassword, setnewpassword] = useState();

    const [selectedOption, setSelectedOption] = useState(user ? user.status === true ? "Active" : "Suspended" : 'Select..');




    useEffect(() => {

        let CurrentUser = storeUser.find((userObject) => {
            return userObject._id === id;
        });

        setUsers(CurrentUser)


    }, [id, storeUser])

    // useEffect(() => {
    //     let CurrentUserPosts = storeAllPosts.filter((post) => {
    //         return post.userId === id;
    //     });

    //     setUserposts(CurrentUserPosts);

    // }, [storeAllPosts, id])

    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;

        setSelectedOption(selectedValue);

    };

    const handlenewpassword = (e) => {
        const selectedValue = e.target.value;

        setnewpassword(selectedValue);

    };




    const handelSubmitStatus = async (e) => {
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
    

    const changedpassword= async()=>{

        if(newpassword){

            try {
    
                setloading(true)
                const response = await axios.post(`${serverURL}/api/users/${id}/update_user_password`, {
                    oldpassword:user.password,
                    newpassword :newpassword
                })
                console.log(response);
                if (response && response.status === 200) {
                    setloading(false)
                    setUsers(response.data.user)
                    toast.success(response.data.message)
                }
            } catch (error) {
                setloading(false)
                if (error.response.status === 401) {
                    toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                    toast.error(error.response.message);
                } else if (error.response.status === 500) {
                    toast.error(error.response.message);
    
                } else {
                    toast.error("Failed to Update user password")
                }
    
            }
        }else{
            toast.error("Please enter the new Password")
        }
        

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
                                    <button className="btn btn-danger mx-2" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal">Setting</button>
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

        {user &&  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
                <div className="row g-0">
                  <div className="col-10 pe-1">
                    <input
                      required
                      value={user.password}
                      
                      name="password"
                      type={inputVisible ? 'text' : 'password'}
                      id="form1Example23"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div onClick={() => { setinputVisible(!inputVisible) }} className="  col-2 ps-1 d-flex align-items-center justify-center">
                    {inputVisible ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className=" bi bi-eye-slash cursor-pointer" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-eye cursor-pointer" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    }
                  </div>
                </div>
                    </div>

                    <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example234">
                 New Password
                </label>
                <div className="row g-0">
                  <div className="col-10 pe-1">
                    <input
                      required
                      value={newpassword}
                      
                      name="newpassword"
                      type={inputVisible ? 'text' : 'password'}
                      id="form1Example234"
                      className="form-control form-control-lg"
                      onChange={handlenewpassword}
                    />
                  </div>
                  <div onClick={() => { setinputVisible(!inputVisible) }} className="  col-2 ps-1 d-flex align-items-center justify-center">
                    {inputVisible ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className=" bi bi-eye-slash cursor-pointer" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-eye cursor-pointer" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    }
                  </div>
                </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={changedpassword} >Save changes</button>
                    </div>
                </div>
            </div>
        </div>
}

        <Loader loading={loading} />

    </>)
}
