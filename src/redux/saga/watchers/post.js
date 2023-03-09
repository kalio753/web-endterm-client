import { call, fork, put, takeLatest } from "redux-saga/effects"
import { getAllPosts, setAllPosts } from "../../slices/postSlice"
import {} from "../../slices/profileSlice"
import { requestGetAllPosts } from "../requests/post"
import { requestGetProfileById } from "../requests/profile"

function* handleGetAllPosts(action) {
    try {
        const response = yield call(requestGetAllPosts, action.payload)
        const { data } = response
        yield put(setAllPosts(data))
    } catch (error) {
        console.log("handleGetAllPosts", error)
    }
}

function* onHandleGetAllPosts() {
    yield takeLatest(getAllPosts.type, handleGetAllPosts)
}

export const postSaga = [fork(onHandleGetAllPosts)]
