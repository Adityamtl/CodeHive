import { HistoryIcon } from "lucide-react";
import HistoryCard from "./HistoryCard.jsx";
import { useSelector } from "react-redux";

const RoomHistory = () => {
  const user = useSelector((state) => state.profile.user);

  return (
    <div className="w-11/12 sm:w-full mx-auto relative z-10  min-w-fit max-w-[620px] h-[100px] min-h-fit px-2 sm:px-6 py-4 bg-white/5 backdrop-blur-lg shadow-lg border border-white/30 rounded-md text-gray-200">
      <div className="flex gap-x-2 items-center">
        <p>Your Rooms</p>
        <HistoryIcon size={18} color="gray" />
      </div>
      <div className="border-[1px] border-white w-[110px] mt-1 mb-6"></div>
      <div className="flex flex-col gap-y-3 max-h-[160px] overflow-auto">

        {
          user?.rooms?.map((room, i) => {
            return (
              <HistoryCard
                key={i}
                language={room.language}
                roomName={room.name}
                roomID={room._id}
                createdAt={room.createdAt}
                adminId={room.admin}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default RoomHistory;
