import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    about: "",
    imageUrl: "",
    googleId: "",
    createdAt: "",
    rooms: []
  }
}

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.user.firstName = action.payload
    },
    setLastName: (state, action) => {
      state.user.lastName = action.payload
    },
    setAbout: (state, action) => {
      state.user.about = action.payload
    },
    setImageUrl: (state, action) => {
      state.user.imageUrl = action.payload
    },
    setGoogleId: (state, action) => {
      state.user.googleId = action.payload
    },
    setCreatedAt: (state, action) => {
      state.user.createdAt = action.payload
    },
    setRooms: (state, action) => {
      state.user.rooms = action.payload
    },
    setUserObj: (state, action) => {
      
      state.user = {
        _id: action.payload._id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        about: action.payload.about,
        imageUrl: action.payload.imageUrl,
        googleId: action.payload.googleId,
        createdAt: action.payload.createdAt,
        rooms: action.payload.rooms,
      }
    }
  }
})

export const { setFirstName, setLastName, setEmail, setAbout, setImageUrl, setGoogleId, setRooms, setUserObj } = profileSlice.actions

export default profileSlice.reducer