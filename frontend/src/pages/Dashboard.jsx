import Sidebar from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="flex max-h-screen overflow-y-hidden">
      <Sidebar />
      <div className="w-full overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
