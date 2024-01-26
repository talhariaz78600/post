import React from "react";
// import { Link ,useNavigate } from "react-router-dom";
// import { store } from "../../../Store/store";
import {  Navbar,  Button,} from "reactstrap";


const Header = () => {
  // let navigate = useNavigate();
  // const [isOpen, setIsOpen] = React.useState(false);
  // const [dropdownOpen, setDropdownOpen] = React.useState(false);


  // const toggle = () => setDropdownOpen((prevState) => !prevState);
  // const Handletoggle = () => {
  //   setIsOpen(!isOpen);
  // };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  // let currentUsers={
  //      name:"Ahmed",
  //      userImage:ProfilePic
  //       }

  // let user=localStorage.getItem("currentUser")
  // let currentUser=JSON.parse(user)
  // let currentUsers=JSON.parse(currentUser)

  return (
    <Navbar className="d-lg-none"  color="dark"  dark expand="md">
      <div className="d-flex align-items-center">
        
        <Button
          className="d-lg-none DHeader"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
    
    </Navbar>
  );
};

export default Header;

/* 
  {/* <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
             <h2 style={{color:"white"}}> Welcome {currentUsers.name} </h2>
          </NavItem>
          
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle >
            <img
             src={currentUsers.userImage}
              alt="profile"
              className="rounded-circle"
              width="40"
              />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
            onClick={
              ()=>{
                store.dispatch({
                    type:"USER_LOGGED_OUT"
                  })
                  navigate("/")
              }
            }
            >Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
    
      </Collapse> */
