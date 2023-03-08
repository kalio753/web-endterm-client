import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileById: {},
    },
    reducers: {
        getProfileById() {},
        setProfileById(state, action) {
            state.profileById = action.payload
        },
    },
})

export const { getProfileById, setProfileById } = profileSlice.actions
export default profileSlice
