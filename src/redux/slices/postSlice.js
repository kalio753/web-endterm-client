import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: "post",
    initialState: {
        allPost: [],
        postById: [],
    },
    reducers: {
        getAllPosts() {},
        setAllPosts(state, action) {
            state.allPost = action.payload
        },
        getPostById() {},
        setPostById(state, action) {
            state.postById = action.payload
        },
    },
})

export const { getAllPosts, setAllPosts, getPostById, setPostById } =
    postSlice.actions
export default postSlice
