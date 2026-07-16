import { useLocation, useNavigate } from "react-router-dom";
import Tooltip from "../ui/tooltip";

const SidebarContent = ({ children, to, text, className }) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const handleClick = () => {
    if (currentLocation.pathname !== to) {
      navigate(to);
    }
    return;
  };
  return (
    <div
      className={`flex justify-center cursor-pointer ${currentLocation.pathname === to ? "text-gray-200" : "text-gray-600"} ${className}`}
      onClick={handleClick}
    >
      <Tooltip text={text}>
        {children}
      </Tooltip>
    </div>
  );
};

export default SidebarContent;
