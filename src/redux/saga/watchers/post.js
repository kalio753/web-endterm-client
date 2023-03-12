import { call, fork, put, takeLatest } from "redux-saga/effects"
import {
    getAllPosts,
    getPostById,
    setAllPosts,
    setPostById,
} from "../../slices/postSlice"
import {} from "../../slices/profileSlice"
import { requestGetAllPosts, requestGetPostById } from "../requests/post"

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

function* handleGetPostById(action) {
    try {
        const response = yield call(requestGetPostById, action.payload)
        const { data } = response
        yield put(setPostById(data))
    } catch (error) {
        console.log("handleGetPostById", error)
    }
}

function* onHandleGetPostById() {
    yield takeLatest(getPostById.type, handleGetPostById)
}
export const postSaga = [fork(onHandleGetAllPosts), fork(onHandleGetPostById)]
