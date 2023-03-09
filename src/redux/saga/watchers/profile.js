import { call, fork, put, takeLatest } from "redux-saga/effects"
import {
    getProfileById,
    getProfileMe,
    setProfileById,
    setProfileMe,
} from "../../slices/profileSlice"
import { requestGetProfileById, requestGetProfileMe } from "../requests/profile"

function* handleGetProfileById(action) {
    try {
        const response = yield call(requestGetProfileById, action.payload)
        const { data } = response
        yield put(setProfileById(data))
    } catch (error) {
        console.log("handleGetProfileById", error)
    }
}

function* onHandleGetProfileById() {
    yield takeLatest(getProfileById.type, handleGetProfileById)
}

function* handleGetProfileMe(action) {
    try {
        const response = yield call(requestGetProfileMe, action.payload)
        const { data } = response
        yield put(setProfileMe(data))
    } catch (error) {
        console.log("handleGetProfileMe", error)
    }
}

function* onHandleGetProfileMe() {
    yield takeLatest(getProfileMe.type, handleGetProfileMe)
}

export const profileSaga = [
    fork(onHandleGetProfileById),
    fork(onHandleGetProfileMe),
]
