import { Navigate } from "react-router-dom";
import { Login } from "../Login/Login";
import { E404 } from "../Pages/404";
import { FulllayoutMain } from "./Layout"
// import { PrivateRouteContact } from "./privateRouteContact";

export const ThemeRoutes = [

  {
    path: "/",
    element: <FulllayoutMain />,
    children: [
      { path: "/", element: <Navigate to="/Login" /> },
      { path: "/Login", element: <Login /> },
      { path: "*", element: <E404 /> },


    ],
  },
];

