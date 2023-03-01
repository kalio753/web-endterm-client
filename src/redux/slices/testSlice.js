import { createSlice } from "@reduxjs/toolkit"

const testSlice = createSlice({
    name: "test",
    initialState: {},
    reducers: {
        getTest() {},
        setTest(state, action) {
            return action.payload
        },
    },
})

export const { getTest, setTest } = testSlice.actions
export default testSlice
