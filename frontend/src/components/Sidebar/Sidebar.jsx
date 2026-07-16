import { CircleUser, Home } from "lucide-react";
import SidebarContent from "./SidebarContent";
import SidebarGroup from "./SidebarGroup";
import SidebarHeader from "./SidebarHeader";
import logo from "@/assets/Auth/CodeHive Logo.png";
import { RiCustomerService2Line } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LogoutBtn from "./LogoutBtn";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";


const sidebarLinks = [
  { page: "/", text: "Dashboard", icon: <Home className="size-6 sm:size-8" /> },
  { page: "/profile", text: "Profile", icon: <CircleUser className="size-6 sm:size-8" /> },
  {
    page: "/contact",
    text: "Contact Us",
    icon: <RiCustomerService2Line className="size-6 sm:size-8" />,
  },
];

const Sidebar = () => {
  const user = useSelector((state) => state.profile.user);

  return (
    <div className="h-[100svh] w-14 sm:w-20 bg-[#101622] flex flex-col justify-between py-6 overflow-y-hidden overflow-x-hidden">
      <div className="flex flex-col justify-between items-center">
        <SidebarHeader className={"sm:mt-2 mb-10"}>
          <img src={logo} alt="CodeHive Logo" width={60} />
        </SidebarHeader>
        <SidebarGroup>
          {sidebarLinks.map((link, index) => {
            return (
              <SidebarContent key={index} to={link.page} text={link.text}>
                {link.icon}
              </SidebarContent>
            );
          })}
          <div className="flex justify-center cursor-pointer text-gray-600">
            <LogoutBtn />
          </div>
        </SidebarGroup>
      </div>

      <div className="flex justify-center cursor-pointer">
        <ProfileCard
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          imageUrl={user.imageUrl}
          createdAt={user.createdAt}
        >
          <Avatar className="rounded-md">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback className="rounded-md bg-emerald-600">
              {user.firstName.slice(0, 1)}{user.lastName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </ProfileCard>
      </div>
    </div>
  );
};

export default Sidebar;
