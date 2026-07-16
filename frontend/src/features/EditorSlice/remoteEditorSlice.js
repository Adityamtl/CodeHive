import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRemoteEditorOpen: false,
};

export const remoteEditorSlice = createSlice({
    name: "remoteEditor",
    initialState,
    reducers: {
        openRemoteEditor: (state) => {
            state.isRemoteEditorOpen = true;
        },
        closeRemoteEditor: (state) => {
            state.isRemoteEditorOpen = false;
        },
    },
})

export const { openRemoteEditor, closeRemoteEditor } = remoteEditorSlice.actions;

export default remoteEditorSlice.reducer;