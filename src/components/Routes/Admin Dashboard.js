import { useRoutes } from "react-router-dom";
import { ThemeRoutes } from "./ADRouter";

export const AdminDashboard = () => {
  const routing = useRoutes(ThemeRoutes);

  return <div className="dark">{routing}</div>;
};

