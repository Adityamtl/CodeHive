import { languages } from "@/data/languages";
import Language from "./Language";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import JoinRoom from "./JoinRoom";
import { useState } from "react";
import { createRoom, joinRoom } from "@/api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SelectLanguage = () => {
  const [languageName, setLanguageName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMsgEnable, setIsMsgEnable] = useState(false);

  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    if (!languageName || !roomName) return;

    let toastId = toast.loading("Creating room...");

    const data = {
      roomName,
      language: languageName,
      isVisible,
      isMsgEnable
    }

    const res = await createRoom(data);

    if (!res) {
      toast.update(toastId, {
        render: "Failed to create room",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
      return;
    }

    const roomId = res.room._id;

    toast.update(toastId, {
      render: "Room created successfully",
      type: "success",
      isLoading: false,
      autoClose: 2000,
      position: "top-right"
    });

    navigate("/room", { state: { roomId } });
  }

  const handleJoinRoom = async (e) => {
    e.preventDefault();

    if (!roomId) return;

    let toastId = toast.loading("Joining room...");

    const res = await joinRoom(roomId);

    if (!res?.success) {
      toast.update(toastId, {
        render: res?.message,
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

    navigate("/room", { state: { roomId } });
  }

  return (
    <div className="relative rounded-md mx-auto w-11/12 sm:w-full flex justify-center items-center">
      {/* Circles positioned behind the SelectLanguage box */}
      <div className="absolute w-[10em] h-[10em] rounded-full shadow-[0_0_50px_#d84869] bg-gradient-to-bl from-[#d84869] to-[#f46641] animate-circle1 -left-[10%] -top-[15%] opacity-50 blur-xl z-0"></div>
      <div className="absolute w-[15em] h-[15em] rounded-full shadow-[0_0_50px_#5648d8] bg-gradient-to-bl from-[#5648d8] to-[#8641f4] animate-circle2 -right-[10%] -bottom-[20%] opacity-50 blur-xl z-0"></div>

      {/* Select Language box */}
      <div className="relative z-10  min-w-fit max-w-[620px] min-h-fit p-2 sm:p-6 bg-white/5 backdrop-blur-lg shadow-lg border border-white/30 rounded-md text-gray-200">
        <p className="text-lg text-center ">Select Language to a Create Room </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3 mt-4">
          {languages.map((language, index) => (
            <Dialog key={index}>
              <DialogTrigger onClick={() => setLanguageName(language.name)}>
                <Language
                  key={index}
                  logo={language.logo}
                  name={language.name.split(" ")[0]}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">Create Room</DialogTitle>
                  <DialogDescription className=" text-lg">
                    A room will be created for {language.name.split(" ")[0]} Language
                  </DialogDescription>
                </DialogHeader>
                <div className=" flex flex-col gap-2">
                  <div className="flex w-full items-center gap-x-2">
                    <p className="whitespace-nowrap text-base">Room Name</p>
                    <input
                      className="w-full p-2 my-2 bg-[#141414] rounded-lg"
                      type="text"
                      placeholder="my-first-room"
                      name="room-name"
                      id="room-name"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                  </div>

                  <div className=" flex items-center gap-2">
                    <Checkbox
                      id="screen-share"
                      name="screen-share"
                      checked={isVisible}
                      onCheckedChange={(checked) => setIsVisible(checked)}
                    />
                    <Label
                      htmlFor="screen-share"
                      className="text-base font-normal"
                    >
                      Everyone can see eachother's screen
                    </Label>
                  </div>

                  <div className=" flex items-center gap-2">
                    <Checkbox
                      id="room-msg"
                      name="room-msg"
                      checked={isMsgEnable}
                      onCheckedChange={(checked) => setIsMsgEnable(checked)}
                    />
                    <Label htmlFor="room-msg" className="text-base font-normal">
                      Enable room messages
                    </Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateRoom} type="submit">Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <p className=" text-xs text-gray-400 mt-2 mb-4">Note: Rooms will be valid for 3 hours</p>

        {/* Join Room box */}
        <Dialog>
          <DialogTrigger className="w-full">
            <JoinRoom />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Join Room</DialogTitle>
              <DialogDescription className=" text-lg">
                Join an existing room by RoomID
              </DialogDescription>
            </DialogHeader>
            <div className="">
              <div className="flex w-full items-center gap-x-2">
                <p className="whitespace-nowrap text-base">Room ID</p>
                <input
                  className="w-full p-2 my-2 bg-[#141414] rounded-lg"
                  type="text"
                  placeholder="Enter Room ID"
                  name="room-id"
                  id="room-id"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleJoinRoom} type="submit">Join</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SelectLanguage;
