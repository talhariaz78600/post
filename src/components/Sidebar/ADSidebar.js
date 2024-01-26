import { Button, Nav, NavItem } from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import style from "./sidebar.module.css"
import { useDispatch } from "react-redux";
import { logout } from "../../Store/authSlice";
import { toast } from "react-toastify";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (<div style={{ height: "100vh", zIndex: "14000" }} className={` position-relative ${style.SidebarContainer} `}>

    <div className={`d-flex shadow  text-light py-2 align-items-center ${style.sidebar} `}>
      <h2 className="px-2">Admin</h2>
      <Button
        close
        size="sm"
        color="light"
        className="ms-auto d-lg-none  text-light "
        onClick={() => showMobilemenu()}
      ></Button>
    </div>

    <div className={`${style.sideBarContainer} `}>
      <div className={`${style.heightScroll} pt-3 `}>

        <Nav vertical className="sidebarNav">
          <NavItem><strong> Home </strong> </NavItem>
          <NavItem className="sidenav-bg">
            <Link
              to={"/Admin/AdminDashboard/starter"}
              className={
                location.pathname === "/Admin/AdminDashboard/starter"
                  ? " text-primary bg-light fw-bold nav-link py-3 color"
                  : "nav-link text-secondary py-3"
              }
            >
              {/* <i className="bi bi-speedometer2"></i> */}
              <img src={"/dashboard.png"} width={"20px"} height={"20px"} alt="img" />

              <span className="ms-3 d-inline-block">Dashboard</span>
            </Link>
          </NavItem>

        
          

          <NavItem><strong> User </strong> </NavItem>
          <NavItem className="sidenav-bg">
            <Link
              to={"/Admin/AdminDashboard/Users"}
              className={
                location.pathname === "/Admin/AdminDashboard/Users"
                  ? " text-primary bg-light fw-bold nav-link py-3 color"
                  : "nav-link text-secondary py-3"
              }
            >
              <img src={"/users.png"} width={"20px"} height={"20px"} alt="img" />

              <span className="ms-3 d-inline-block">Users</span>
            </Link>
          </NavItem>
          <NavItem><strong> Posts </strong> </NavItem>
          <NavItem className="sidenav-bg">
            <Link
              to={"/Admin/AdminDashboard/Posts"}
              className={
                location.pathname === "/Admin/AdminDashboard/Posts"
                  ? " text-primary bg-light fw-bold nav-link py-3 color"
                  : "nav-link text-secondary py-3"
              }
            >
              <img src={"/posts.png"} width={"20px"} height={"20px"} alt="img" />

              <span className="ms-3 d-inline-block">Posts</span>
            </Link>
          </NavItem>

          {/* <NavItem><strong>  </strong> </NavItem> */}
          {/* <NavItem className="sidenav-bg">
            <Link
              to={"/Admin/AdminDashboard/Groups"}
              className={
                location.pathname === "/Admin/AdminDashboard/Groups"
                  ? " text-primary bg-light fw-bold nav-link py-3 color"
                  : "nav-link text-secondary py-3"
              }
            >
              <img src={"/groups2.jpeg"} width={"20px"} height={"20px"} alt="img" />

              <span className="ms-3 d-inline-block">Groups</span>
            </Link>
          </NavItem> */}

          
          <NavItem><strong> Ads </strong> </NavItem>
          <NavItem className="sidenav-bg">
            <Link
              to={"/Admin/AdminDashboard/Tasks"}
              className={
                location.pathname === "/Admin/AdminDashboard/Tasks"
                  ? " text-primary bg-light fw-bold nav-link py-3 color"
                  : "nav-link text-secondary py-3"
              }
            >
              <img src={"/login.png"} width={"20px"} height={"20px"} alt="img" />

              <span className="ms-3 d-inline-block">Add ads</span>
            </Link>
          </NavItem>


        

        </Nav>

      </div>
    </div>

    <div className={style.buttonLogoutDiv}>
      <button onClick={() => {
        dispatch(logout())
        localStorage.removeItem('OMB_ADMIN_DATA');
        toast.success("Log Out")
        navigate("/")

      }} className={`sidenav-bg  ${style.logoutButton}`}
      >

        <i className="bi bi-box-arrow-left"></i>
        <span className="ms-3 d-inline-block fw-bold">LogOut</span>
      </button>
    </div>

  </div>);
};

export default Sidebar;
