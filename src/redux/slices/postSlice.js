import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: "post",
    initialState: {
        allPost: [],
    },
    reducers: {
        getAllPosts() {},
        setAllPosts(state, action) {
            state.allPost = action.payload
        },
    },
})

export const { getAllPosts, setAllPosts } = postSlice.actions
export default postSlice
