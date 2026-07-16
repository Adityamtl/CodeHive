import Messages from './Messages'
import Participants from './Participants'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useSelector } from 'react-redux'

const EditorSidebar = ({socket}) => {
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen)

    return (
        <ResizablePanelGroup
            direction="vertical"
            className={` max-w-[340px] min-h-screen border absolute z-30  bg-black rounded-md ${isSidebarOpen ? "left-0" : "left-[-100%]"} transition-all duration-500 ease-in-out`}
        >
            <ResizablePanel defaultSize={40}>
                <Participants />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={60}>
                <Messages socket={socket} />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default EditorSidebar
