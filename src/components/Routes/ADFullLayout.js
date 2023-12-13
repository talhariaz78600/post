import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/ADSidebar";
import Header from "../Header/ADHeader";
import { Container } from "reactstrap";
import { useState, useEffect } from "react";
import { Loader } from "../Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { allusers, selecteUsers, selectAllPosts,  allPosts , selectAllPinnedPosts , allBumperPosts } from "../../Store/authSlice";
import style from "./routes.module.css"

const serverURL = process.env.REACT_APP_SERVER_URL;



const FullLayout = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const storeUsers = useSelector(selecteUsers)
  const storeAllposts = useSelector(selectAllPosts)
  const storeAllBumperPosts = useSelector(selectAllPinnedPosts)

  useEffect(() => {

    async function getuser() {
      try {

        setLoading(true)
        const response = await axios.get(`${serverURL}/api/users/get_all_users`)
        setLoading(false)
        if (response && response.status === 200) {
          console.log(response.data.users);
          dispatch(allusers(response.data.users))
          toast.success(response.data.message)
        }
      } catch (error) {
        setLoading(false)
        if (error.response.status === 401) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 500) {
          toast.error(error.response.data.message);

        } else {
          console.log("Failed to Load User Data");
        }

      }
    }
    if (!(storeUsers.length > 0)) {

      getuser()
    }


  }, [dispatch , storeUsers])

  useEffect(() => {

    async function getAllposts() {
      try {

        setLoading(true)
        const response = await axios.get(`${serverURL}/api/posts/get_all_posts`)
        setLoading(false)
        if (response && response.status === 200) {
          // console.log(response.data.posts);
          dispatch(allPosts(response.data.posts))
          toast.success(response.data.message)
        }
      } catch (error) {
        setLoading(false)
        if (error.response.status === 401) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 500) {
          toast.error(error.response.data.message);

        } else {
          console.log("Failed to Fetch Posts");
        }

      }
    }
    if (!(storeAllposts.length > 0)) {

      getAllposts()
    }


  }, [dispatch , storeAllposts])
  useEffect(() => {

    async function getAllBumperposts() {
      try {

        setLoading(true)
        const response = await axios.get(`${serverURL}/api/PinnedPosts/get_all_Pinned`)
        setLoading(false)
        if (response && response.status === 200) {
          // console.log(response.data.users);
          dispatch(allBumperPosts(response.data.posts))
          toast.success(response.data.message)
        }
      } catch (error) {
        setLoading(false)
        if (error.response.status === 401) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 500) {
          toast.error(error.response.data.message);

        } else {
          console.log("Failed to Fetch Pinned  Posts");
        }

      }
    }
    if (!(storeAllBumperPosts.length > 0)) {

      getAllBumperposts()
    }


  }, [dispatch , storeAllBumperPosts])



  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}

        <aside className="sidebarArea shadow" id="sidebarArea">
          {<Sidebar />}
        </aside>

        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header />
          {/********Middle Content**********/}
          <div className={style.containerScroll}>
            <Container style={{ padding: 0 }} className="wrapper" fluid>
              <Outlet />
            </Container>
          </div>
        </div>
      </div>
      <Loader loading={loading} />
    </main>

  );
};
export default FullLayout;
