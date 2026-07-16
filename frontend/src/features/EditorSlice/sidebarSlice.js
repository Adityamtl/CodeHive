import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: false,
};

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state, action) => {
            state.isSidebarOpen = action?.payload ?? !state.isSidebarOpen;
        },
    },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;