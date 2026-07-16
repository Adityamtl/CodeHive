import { Button } from '@/components/ui/button';
import { RiMenu2Fill } from "react-icons/ri";
import { TbCopy } from "react-icons/tb";
import { BsTerminal } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";
import { Sparkles } from "lucide-react";

import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/features/EditorSlice/sidebarSlice.js';
import { openTerminal, setTerminalUser } from '@/features/EditorSlice/terminalSlice.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TopBar = ({ onOpenReview }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const roomId = location?.state?.roomId;
    const roomData = useSelector((state) => state.room.room.roomDetails);
    const userCode = useSelector((state) => state.code.userCode);

    const handleCopyRoomId = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(roomId);

        toast.success("Room Id copied", {
            autoClose: 1000,
            position: "bottom-right",
        });
    }

    const handleSaveCode = (e) => {
        e.preventDefault();

        const language = roomData?.language?.split(" ")[0].toLowerCase();
        const roomName = roomData?.name;

        if (!userCode || !language) {
            toast.error("Code not found", { autoClose: 3000 });
            return;
        }

        const extensions = {
            c: "c",
            "c++": "cpp", // C++
            java: "java", // Java
            python: "py",
            javascript: "js",
            typescript: "ts", // TypeScript
            rust: "rs", // Rust
            go: "go", // Go
        };

        const fileExtension = extensions[language] || "txt"; // Default to .txt if language is unknown

        // Create a Blob object with the code content
        const fileBlob = new Blob([userCode], { type: "text/plain" });
        const url = URL.createObjectURL(fileBlob);

        // Create a temporary anchor element
        const a = document.createElement("a");
        a.href = url;
        a.download = `${roomName}.${fileExtension}`; // Set the file name and extension
        document.body.appendChild(a);

        // Programmatically click the anchor to trigger the download
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return (
        <div className=' w-full h-[8%] sm:h-[10%] py-2 px-2 sm:px-4 flex items-center justify-between bg-[#121212] border-b border-b-slate-700  '>
            <div className=' flex items-center gap-1 sm:gap-5'>
                <div onClick={() => dispatch(toggleSidebar())} className='cursor-pointer'><RiMenu2Fill size={28} /></div>
                <div className=' w-[120px] sm:w-[150px] flex justify-center text-lg sm:text-xl font-semibold '>
                    <span className=' flex gap-2'>
                        {roomData?.language?.split(" ")[0]}
                        <span className=' hidden sm:block'>{roomData?.language?.split(" ")[1]}</span>
                    </span>
                </div>
            </div>
            <div className=' flex items-center gap-2 sm:gap-5'>
                <Button onClick={handleCopyRoomId} className="bg-emerald-400 hidden sm:block">Copy Room ID</Button>
                <div onClick={handleCopyRoomId} className='p-2 bg-emerald-400 rounded-full cursor-pointer block sm:hidden '><TbCopy size={24} /></div>

                <span onClick={() => navigate("/")} className="material-symbols-outlined bg-red-600 p-2 rounded-full cursor-pointer">call_end</span>
            </div>
            <div className=' flex items-center gap-2 sm:gap-5'>
                <Button onClick={onOpenReview} className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"><Sparkles /><span className=' hidden sm:block'>AI Review</span></Button>
                <Button onClick={handleSaveCode} variant="outline"><MdSaveAlt /><span className=' hidden sm:block'>Save</span></Button>
                <Button onClick={() => { dispatch(openTerminal()); dispatch(setTerminalUser("user")) }}><BsTerminal /><span className=' hidden sm:block'>Terminal</span></Button>
            </div>
        </div>
    )
}

export default TopBar
