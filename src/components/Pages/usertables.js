import {  CardBody, Table, Button} from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import 'react-dropdown/style.css';
import style from "./ui.module.css"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selecteUsers } from "../../Store/authSlice";
import { DeleteModel } from "./DeleteModel";


const ProjectTables = () => {

  const storeUsers = useSelector(selecteUsers)
  // console.log(storeUsers);
  const [deltedId, setDeletedId] = useState()
  const [deleteWhatUsers, setdeleteWhatUsers] = useState('')
  const [pContent, setpContent] = useState()

  const [currentData, setcurrentData] = useState();
  const [selectedOption, setSelectedOption] = useState('Select..');
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);



 
  useEffect(() => {

    setcurrentData(storeUsers)
  }, [storeUsers])

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === 'Select..') {
      toast.info("Please Select Any Options")
      return
    }

    if (selectedValue === "Active") {
      let Result = storeUsers.filter((userObject) => {
        return userObject.status === true;
      });
      console.log(Result);
      setcurrentData(Result)
    } else if (selectedValue === "Suspended") {
      let Result = storeUsers.filter((userObject) => {
        return userObject.status === false;
      });

      console.log(Result);
      setcurrentData(Result)
    } else {
      setcurrentData(storeUsers)

    }
    setSelectedOption('Select..')

  };





  return (<div >

    {currentData && <div>
      <div className={`p-2  text-light ${style.Sheading} `}>

        <h2 className={style.Heading}>
          Users
        </h2>
      </div>

      <div>
        <CardBody>
          <div className="d-flex align-items-center justify-content-between  ">

            <div>
              <h2 tag="h5">  User Listing</h2>
              <p className="mb-2 text-muted" tag="h6">
                Overview of the All Users
              </p>
            </div>

            <div>
              <button onClick={() => {
                setModal(!modal);
                setpContent(" Are you sure you want to Delete All Unverified Users? This action cannot be undone.")
                setdeleteWhatUsers("UnverifiedUsers")
              }} className="bg-danger text-white p-2 fw-bold border-0 rounded ">
                Delete All Unverified Users
              </button>
            </div>
          </div>


          <div className={style.inputDivMain}>
            <div >
              <label style={{ fontWeight: "bold", marginRight: "10px" }} htmlFor="userStatus">Select User Status:</label>
              <select
                className={style.dropdown}
                id="userStatus"
                name="userStatus"
                value={selectedOption}

                onChange={handleDropdownChange}
              >
                <option value="Select..">Select..</option>
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {/* <form className={style.inputDiv}>
              <input ref={searchInputRef} value={searchvalue} onChange={handelSearchinput} placeholder="Search User" className={style.SearchInput} type="search" name="" id="" />

              <button type="submit" onClick={searchUsers} >

                <svg xmlns="http://www.w3.org/2000/svg" width={"23px"} height={"23px"} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </form> */}
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>primaryMarket</th>
                <th>Account</th>
                <th>Status</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {currentData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <Link to={`/Admin/AdminDashboard/UserDetails/${tdata._id}`} className={`${style.userProfile} d-flex align-items-center text-dark pointer p-2`}>
                      <img
                        src={tdata.profileImageUrl}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <h6 className="mb-0 mx-2">{tdata.username ? tdata.username : 'NaN'}</h6>

                    </Link>
                  </td>
                  <td>{tdata.email ? tdata.email : 'NaN'}</td>
                  <td>{tdata.DOB ? tdata.DOB : "NaN"}</td>
                  <td>{tdata.primaryMarket ? tdata.primaryMarket : 'NaN'}</td>
                  <td>
                    {tdata.isverified === true ? <span className="text-success fw-bolder">Verified</span> : <span className="text-danger fw-bolder ">Unverified</span>}
                  </td>
                  <td>
                    {tdata.status === true ? <button className={style.active}>Active</button> : <button className={style.suspend}>Suspended</button>}
                  </td>
                  <td>
                    <Button className="Reject"
                      onClick={() => {
                        setDeletedId(tdata._id)
                        setModal(!modal);
                        setdeleteWhatUsers("user")
                        setpContent(' Are you sure you want to Delete  your account? All of your data will be permanently removed. This action cannot be undone.')
                      }}
                    ><i className="bi bi-trash3"></i></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </CardBody>
      </div>
    </div>}



    <DeleteModel modal={modal} setModal={setModal} toggle={toggle} pContent={pContent} deleteWhat={deleteWhatUsers} deltedId={deltedId} />
  </div>);
};

export default ProjectTables;

