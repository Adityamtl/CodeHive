import { Dot } from "lucide-react";
import { MagicCard } from "../ui/magic-card";
import { languages } from "@/data/languages";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteRoom, joinRoom } from "@/api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setRooms } from "@/features/Profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";

const HistoryCard = ({ language, roomName, roomID, createdAt, adminId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user)

  const timeAgo = (timestamp) => {
    const diff = Math.floor((new Date() - new Date(timestamp)) / 1000);
    return diff < 3600
      ? `Created ${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`
      : `Created ${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`;
  };

  const handleJoin = async (e) => {
    e.preventDefault();

    if (!roomID) return;

    let toastId = toast.loading("Joining room...");

    const res = await joinRoom(roomID);

    if (!res?.success) {
      toast.update(toastId, {
        render: res.message,
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
      return;
    }

    toast.update(toastId, {
      render: "Room joined successfully",
      type: "success",
      isLoading: false,
      autoClose: 2000,
      position: "top-right"
    });

    navigate("/room", { state: { roomId: roomID } });
  }

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!roomID) return;

    const res = await deleteRoom(roomID);

    if (!res) {
      toast.error("Failed to delete room");
      return;
    }

    dispatch(setRooms(res?.rooms));
    toast.success("Room deleted successfully");
  }
  
  return (
    <div className="flex border-[1px] border-slate-500 rounded-md">
      <MagicCard
        className="py-2 px-4 bg-black/20 hover:bg-black/100  rounded-md cursor-pointer"
        gradientColor={"#262626"}
      >
        <div className="flex flex-row gap-x-4 items-center w-full">
          <div className="">
            <img
              src={languages.find((lang) => lang.name === language).logo}
              width={30}
              className="aspect-square object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-purple-300 text-lg">{roomName}</p>
            <p className="text-gray-400 flex text-[10px] sm:text-xs items-center">
              {roomID}
              <Dot size={28} className="inline-block" />
              {timeAgo(createdAt)}
            </p>
          </div>
          <div className="w-full block sm:hidden">
            <p className="text-purple-300">{roomName}</p>
            <p className="text-[10px] text-gray-400">
              {timeAgo(createdAt)}
            </p>
          </div>
        </div>
      </MagicCard>
      <div className="h-10 my-auto w-[1px] bg-slate-500"></div>
      <div className="w-16 ">
        <MagicCard
          className=" flex items-center  bg-black/20 hover:bg-black/100  rounded-md cursor-pointer"
          gradientColor={"#262626"}
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsVerticalIcon color="white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleJoin}>Join</DropdownMenuItem>
              {user._id === adminId && <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        </MagicCard>
      </div>
    </div>
  );
};

export default HistoryCard;