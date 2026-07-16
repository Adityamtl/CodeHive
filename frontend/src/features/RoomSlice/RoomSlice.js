import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    room: {
        participantsChange: false,
        newMesage: false,
        roomDetails: {},
    }
}

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        toogleparticipantsChange: (state) => {
            state.room.participantsChange = !state.room.participantsChange
        },
        toogleNewMessage: (state) => {
            state.room.newMesage = !state.room.newMesage
        },
        setRoomDetails: (state, action) => {
            state.room.roomDetails = action.payload
        },
    }
})

export const { toogleparticipantsChange, setRoomDetails, toogleNewMessage } = roomSlice.actions

export default roomSlice.reducer