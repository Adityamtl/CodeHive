import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTerminalOpen: false,
    terminalUser: null,
};

export const terminalSlice = createSlice({
    name: "terminal",
    initialState,
    reducers: {
        openTerminal: (state) => {
            state.isTerminalOpen = true;
        },
        closeTerminal: (state) => {
            state.isTerminalOpen = false;
        },
        setTerminalUser: (state, action) => {
            state.terminalUser = action.payload;
        },
    },
});

export const { openTerminal, closeTerminal, setTerminalUser } = terminalSlice.actions;

export default terminalSlice.reducer;