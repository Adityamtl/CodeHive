import { configureStore } from '@reduxjs/toolkit'
import profileSlice from '@/features/Profile/profileSlice'
import sidebarSlice  from '@/features/EditorSlice/sidebarSlice'
import terminalSlice  from '@/features/EditorSlice/terminalSlice'
import remoteEditorSlice  from '@/features/EditorSlice/remoteEditorSlice'
import roomSlice  from '@/features/RoomSlice/RoomSlice'
import codeSlice from '@/features/CodeSlice/codeSlice'


export const store = configureStore({
  reducer: {
    profile: profileSlice,
    sidebar: sidebarSlice,
    terminal: terminalSlice,
    remoteEditor: remoteEditorSlice,
    room: roomSlice,
    code: codeSlice
  },
})