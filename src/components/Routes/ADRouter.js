import { UserDetailpage } from "../Pages/userDetailPage";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { Users } from "../Pages/users"
import { PrivateRouteAdmin } from "./PrivateRouteAdmin";
import { PinnedPost } from "../Pages/PinnedPosts";
import { Posts } from "../Pages/Posts";
import { UserPosts } from "../Pages/userPosts";
import { UserChats } from "../Pages/chats";
import { Chat } from "../Pages/chatPage";
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
      { path: "AdminDashboard/BumperPost", exact: true, element: <PrivateRouteAdmin element={<PinnedPost />} /> },
      { path: "AdminDashboard/Posts", exact: true, element: <PrivateRouteAdmin element={<Posts />} /> },
      { path: "AdminDashboard/UserDetails/:id", exact: true, element: <PrivateRouteAdmin element={<UserDetailpage />} /> },
      { path: "AdminDashboard/UserDetails/:id/Posts", exact: true, element: <PrivateRouteAdmin element={<UserPosts />} /> },
      { path: "AdminDashboard/UserDetails/:id/UserChats", exact: true, element: <PrivateRouteAdmin element={<UserChats />} /> },
      { path: "Admin/AdminDashboard/UserDetails/:id/UserChats/:ChatId/Chat", exact: true, element: <PrivateRouteAdmin element={<Chat />} /> },


    ],
  },
];


