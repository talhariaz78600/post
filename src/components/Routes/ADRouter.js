import { UserDetailpage } from "../Pages/userDetailPage";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { Users } from "../Pages/users"
import { PrivateRouteAdmin } from "./PrivateRouteAdmin";
import { PinnedPost } from "../Pages/PinnedPosts";
import { Posts } from "../Pages/Posts";
import { UserPosts } from "../Pages/userPosts";
// import { UserChats } from "../Pages/chats";
import Tasks from "../Pages/myTasks";
// import GroupdetailPage from "../Pages/GroupdetailPage";
import PostDetailPage from "../Pages/PostDetailPage";
const FullLayout = lazy(() => import("./ADFullLayout"));
const Starter = lazy(() => import("../Home/Starter"));
export const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="AdminDashboard/starter" /> },
      { path: "AdminDashboard/starter", exact: true, element: <PrivateRouteAdmin element={<Starter />} /> },
      { path: "AdminDashboard/Users", exact: true, element: <PrivateRouteAdmin element={<Users />} /> },
      { path: "AdminDashboard/Groups", exact: true, element: <PrivateRouteAdmin element={<PinnedPost />} /> },
      // { path: "AdminDashboard/Groups/:groupid", exact: true, element: <PrivateRouteAdmin element={<GroupdetailPage />} /> },
      { path: "AdminDashboard/Posts", exact: true, element: <PrivateRouteAdmin element={<Posts />} /> },
      { path: "AdminDashboard/Tasks", exact: true, element: <PrivateRouteAdmin element={<Tasks />} /> },
      { path: "AdminDashboard/UserDetails/:id", exact: true, element: <PrivateRouteAdmin element={<UserDetailpage />} /> },
      { path: "AdminDashboard/UserDetails/:id/Posts", exact: true, element: <PrivateRouteAdmin element={<UserPosts />} /> },
      // { path: "AdminDashboard/UserDetails/:id/UserChats", exact: true, element: <PrivateRouteAdmin element={<UserChats />} /> },
     
      { path: "AdminDashboard/UserDetails/:id/Posts/:postid/Postdetail", exact: true, element: <PrivateRouteAdmin element={<PostDetailPage/>} /> }

    ],
  },
];


