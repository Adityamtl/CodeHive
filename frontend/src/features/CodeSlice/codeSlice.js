import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userCode: "",
    remoteUserCode: "",
    remoteUserId: null,
    remoteUserName: "",
}

const codeSlice = createSlice({
    name: "code",
    initialState,
    reducers: {
        setUserCode: (state, action) => {
            state.userCode = action.payload;
        },
        setRemoteUserCode: (state, action) => {
            state.remoteUserCode = action.payload;
        },
        setremoteUserId: (state, action) => {    
            state.remoteUserId = action.payload;
        },
        setRemoteUserName: (state, action) => {
            state.remoteUserName = action.payload;
        },
    },
});

export const { setUserCode, setRemoteUserCode, setremoteUserId, setRemoteUserName } = codeSlice.actions;

export default codeSlice.reducer;