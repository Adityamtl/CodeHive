import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Tooltip from "../ui/tooltip";
import { logout } from "@/api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const LogoutBtn = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logout();

    if(!res){
      toast.error("An error occured", {autoClose: 3000});  
      console.log("Error in logout");
    }

    navigate("/");
    window.location.reload();
  }

  return (
    <Tooltip text={"LogOut"}>
      <AlertDialog>
        <AlertDialogTrigger>
          <LogOut className="size-6 sm:size-8" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of the application
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <div onClick={handleLogout}>
                Logout
              </div>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Tooltip>
  );
};

export default LogoutBtn;
