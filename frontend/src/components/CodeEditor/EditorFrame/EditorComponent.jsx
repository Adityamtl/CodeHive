import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import RemoteEditor from "./RemoteEditor";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUserCode } from "@/features/CodeSlice/codeSlice";
import { defaultCodeArr } from "@/data/defaultCode.js";

const EditorComponent = ({ socket }) => {
  const isRemoteEditorOpen = useSelector((state) => state.remoteEditor.isRemoteEditorOpen);
  const aboveTablet = window.innerWidth >= 768 ? true : false;

  const dispatch = useDispatch();
  const location = useLocation();
  const monaco = useMonaco();
  const roomId = location?.state?.roomId;

  const room = useSelector((state) => state.room.room.roomDetails);
  const userCode = useSelector((state) => state.code.userCode);
  const [language, setLanguage] = useState(null);
  const lastEmittedCode = useRef("");
  const userCodeRef = useRef(userCode);
  const languageRef = useRef(room?.language);

  useEffect(() => {

    if (room?.language) {
      const derivedLanguage = room.language.split(" ")[0].toLowerCase();
      languageRef.current = room?.language;
      setLanguage(derivedLanguage === "c++" ? "cpp" : derivedLanguage);
    }
  }, [room?.language]);

  useEffect(() => {
    lastEmittedCode.current = userCodeRef.current;
    const intervalId = setInterval(() => {
      if(socket && roomId && languageRef.current) {
        if(userCodeRef.current !== lastEmittedCode.current) {
          socket.emit("saveCode", { roomId, code: userCodeRef.current, language: languageRef.current });
          lastEmittedCode.current = userCodeRef.current;
        }
      }
    },1000);
    return () => {
      clearInterval(intervalId);
      dispatch(setUserCode(""));
    }
  },[dispatch, roomId, socket]);

  useEffect(() => {
    if(monaco) {
        monaco.editor.defineTheme('custom-theme', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: '', foreground: 'D4D4D4', background: '10151B' },
                { token: 'comment', foreground: '808080' }, 
                { token: 'keyword', foreground: 'FE4EDA' }, 
                { token: 'string', foreground: '32CD32' }, 
                { token: 'function', foreground: 'F1C40F' },
                { token: 'variable', foreground: '9CDCFE' },
                { token: 'constant', foreground: '4FC1FF' }, 
                { token: 'number', foreground: '56B6C2' }, 
                { token: 'delimiter', foreground: 'D4D4D4' },
                { token: 'error', foreground: 'F44747' }, 
            ],
            colors: {
                "editor.background": "#10151B", 
                'editorLineNumber.foreground': '#4B5263',
                'editor.selectionBackground': '#264F78', 
                'editorIndentGuide.background': '#2E2E3E', 
                "scrollbarSlider.background": "#4A5568", 
                "scrollbarSlider.hoverBackground": "#718096", 
                "scrollbarSlider.activeBackground": "#A0AEC0",
                "editor.lineHighlightBackground": "#1B2635",
            }
        });

        monaco.editor.setTheme('custom-theme');
    }

},[monaco])

  const handleCodeChange = (value) => {
    dispatch(setUserCode(value));
    userCodeRef.current = value;
  }

  return (
    <div className=" w-full h-[92%] sm:h-[90%] flex flex-col md:flex-row ">
      {language && socket && userCode !== null && (
        <>
          <Editor
            className={` ${isRemoteEditorOpen && "h-[50vh]"} md:h-full `}
            width={isRemoteEditorOpen && aboveTablet ? "50%" : "100%"}
            defaultLanguage={language}
            defaultValue={defaultCodeArr[language === "cpp" ? "c++" : language]}
            value={userCode}
            onChange={handleCodeChange}
            theme="custom-theme"
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              cursorBlinking: "expand",
              automaticLayout: true,
              scrollBeyondLastLine: true,
              highlightActiveLine: true,
              suggestOnTriggerCharacters: true,
              scrollbar: {
                vertical: "invisible", // Show vertical scrollbar always
                horizontal: "visible", // Show horizontal scrollbar always
                verticalScrollbarSize: 12, // Set vertical scrollbar size
                horizontalScrollbarSize: 12, // Set horizontal scrollbar size
                verticalSliderSize: 10, // Set size of the scrollbar slider (thumb)
                horizontalSliderSize: 10,
              },
            }}
          />

          {isRemoteEditorOpen && <RemoteEditor language={language} socket={socket} />}
        </>
      )}
    </div>
  );
};

export default EditorComponent;
