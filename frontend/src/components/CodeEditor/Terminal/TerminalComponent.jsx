import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTerminal } from "@/features/EditorSlice/terminalSlice.js";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { compileCode } from "@/api/user";
import { toast } from "react-toastify";

const TerminalComponent = () => {
  const dispatch = useDispatch();
  const isTerminalOpen = useSelector((state) => state.terminal.isTerminalOpen);
  const userCode = useSelector((state) => state.code.userCode);
  const remoteUserCode = useSelector((state) => state.code.remoteUserCode);
  const terminalUser = useSelector((state) => state.terminal.terminalUser);
  const room = useSelector((state) => state.room.room.roomDetails);

  const [codeInput, setCodeInput] = useState("");
  const [compiling, setCompiling] = useState(false);

  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key={1}>{""}</TerminalOutput>,
  ]);

  const handleCodeRun = async (e) => {
    e.preventDefault();
    setCompiling(true);
    document.body.style.cursor = "wait";

    let normalized = codeInput.replace(/\s+/g, " "); // Replace all types of whitespace (spaces, tabs, etc.) with a single space
    // normalized = normalized.replace(/ /g, "\n"); // Replace spaces with '\n'
    normalized = normalized.replace(/\n+/g, "\n"); // Replace multiple '\n's with a single '\n'
    normalized = normalized.trim(); // Trim leading and trailing whitespace/newlines

    let language = room?.language;
    language = language?.split(" ")[0].toLowerCase();

    let code;
    if (terminalUser === null) {
      return;
    } else if (terminalUser === "user") {
      code = userCode;
    } else if (terminalUser === "remoteUser") {
      code = remoteUserCode;
    }

    const res = await compileCode({
      input: normalized,
      code: code,
      language: language,
    });
    console.log(res);
    if (!res) {
      toast.error("Failed to run code", { autoClose: 3000 });
      document.body.style.cursor = "default";
      setCompiling(false);
      return;
    }

    if (res === "Time Limit Exceeded") {
      setTerminalLineData(res);
    } else {
      const lines = res.split("\n");
      const terminalData = lines.map((line, index) => (
        <TerminalOutput key={index}>{line}</TerminalOutput>
      ));
      setTerminalLineData(terminalData);
    }

    setCompiling(false);
    document.body.style.cursor = "default";
  };

  return (
    <div
      className={`absolute ${
        isTerminalOpen ? " bottom-0" : " bottom-[-100%]"
      } transition-all duration-500 ease-in-out  w-full flex flex-col-reverse md:flex-row h-[250px] z-20 border-t border-t-slate-600`}
    >
      <div className="w-full md:w-[60%] h-full">
        <Terminal
          name="CodeHive-Terminal"
          height="165px"
          colorMode={ColorMode.Dark}
        >
          {terminalLineData}
        </Terminal>
      </div>

      <div className="w-full md:w-[40%] h-full bg-[#252a33] p-4 pt-1 border border-l-slate-700 ">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-mono font-medium text-gray-400">
            Input
          </div>
          <div className="flex gap-2">
            <Button disabled={compiling} onClick={handleCodeRun}>
              Run
            </Button>
            <Button
              onClick={() => dispatch(closeTerminal())}
              variant="destructive"
            >
              Close
            </Button>
          </div>
        </div>
        <textarea
          placeholder="Your program will run without input"
          className="w-full p-2 bg-transparent resize-none border border-slate-600 rounded-md h-[120px]"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
        ></textarea>
        <p className=" text-gray-400 text-xs">
          Type input by giving space separated values
        </p>
      </div>
    </div>
  );
};

export default TerminalComponent;
