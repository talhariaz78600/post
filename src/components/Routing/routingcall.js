import {useRoutes} from "react-router-dom";
import { ThemeRoutes } from "./Routing";
export const RoutingCallR = () => {
    
  const routing = useRoutes(ThemeRoutes);

  return <div className="dark">{routing}</div>;
};

