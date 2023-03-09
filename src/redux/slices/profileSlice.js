import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileById: {},
        profileMe: {},
    },
    reducers: {
        getProfileById() {},
        setProfileById(state, action) {
            state.profileById = action.payload
        },
        getProfileMe() {},
        setProfileMe(state, action) {
            state.profileMe = action.payload
        },
    },
})

export const { getProfileById, setProfileById, getProfileMe, setProfileMe } =
    profileSlice.actions
export default profileSlice
