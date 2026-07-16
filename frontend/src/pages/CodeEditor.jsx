import { getCode, getRoomDetails, getAccessToken } from "@/api/user";
import AIReviewPanel from "@/components/CodeEditor/AIReviewPanel";
import EditorComponent from "@/components/CodeEditor/EditorFrame/EditorComponent";
import TopBar from "@/components/CodeEditor/EditorFrame/TopBar";
import EditorSidebar from "@/components/CodeEditor/EditorSidebar/EditorSidebar";
import Terminal from "@/components/CodeEditor/Terminal/TerminalComponent";
import { setRoomDetails } from "@/features/RoomSlice/RoomSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  toogleNewMessage,
  toogleparticipantsChange,
} from "@/features/RoomSlice/RoomSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { toggleSidebar } from "@/features/EditorSlice/sidebarSlice";
import { setRemoteUserCode, setUserCode } from "@/features/CodeSlice/codeSlice";
import { closeTerminal } from "@/features/EditorSlice/terminalSlice";
import { closeRemoteEditor } from "@/features/EditorSlice/remoteEditorSlice";

const CodeEditor = () => {
  const BACK_URL = import.meta.env.VITE_B_URL;
  console.log("back url: ", BACK_URL);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const roomId = location?.state?.roomId;
  const [socketInstance, setSocketInstance] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);


  const handleConnectionFail = useCallback(() => {
    toast.error("Connection failed", { autoClose: 4000 });
    navigate("/");
  }, [navigate]);

  const getRoomData = useCallback(async () => {
    const res = await getRoomDetails(roomId);

    if (!res) {
      return;
    }

    dispatch(setRoomDetails(res.room));
  }, [dispatch, roomId]);

  const getUserCode = useCallback(async () => {
    const res = await getCode(roomId);

    if (!res) {
      return;
    }
    console.log("get code:",res);

    dispatch(setUserCode(res?.code?.code));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (!roomId) {
      navigate("/");
      return;
    }

    const socket = io(`${BACK_URL}`, {
      // user try to connect with the socket server
      withCredentials: true,
      auth: { token: getAccessToken() }, // pass the in-memory access token
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    });

    if (socket) {
      setSocketInstance(socket);
      socket.on("connect_error", handleConnectionFail);
      socket.on("connect_failed", handleConnectionFail);
      
      socket.emit("join-room", roomId);
      console.log("Joining room");

      socket.on("userJoined", (socket) => {
        toast.info(`${socket.userName} joined the room`, {
          position: "bottom-right",
          autoClose: 2000,
        });

        dispatch(toogleparticipantsChange());
      });

      socket.on("receiveMessage", () => {
        dispatch(toogleNewMessage());
      });

      socket.on("userLeft", () => {
        dispatch(toogleparticipantsChange());
      });

    }

    getRoomData();
    getUserCode();

    return () => {
      if(socket) {
        socket.off("connect_error");
        socket.off("connect_failed");
        socket.off("userJoined");
        socket.off("receiveMessage");
        socket.off("userLeft");
        socket.disconnect();
        dispatch(closeTerminal());
        dispatch(closeRemoteEditor());
        dispatch(setUserCode(""));
        dispatch(setRemoteUserCode(''));
        dispatch(setRoomDetails({}));
        dispatch(toggleSidebar(false));
      }
    };
  }, [BACK_URL, dispatch, getRoomData, getUserCode, handleConnectionFail, navigate, roomId]);

  return (
    <>
      {socketInstance && (
        <div className="relative w-full h-screen overflow-y-hidden">
          <EditorSidebar socket={socketInstance} />
          <TopBar onOpenReview={() => setIsReviewOpen(true)} />
          <EditorComponent socket={socketInstance} />
          <Terminal />
          <AIReviewPanel
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default CodeEditor;
