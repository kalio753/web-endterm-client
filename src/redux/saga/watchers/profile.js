import { call, fork, put, takeLatest } from "redux-saga/effects"
import { getProfileById, setProfileById } from "../../slices/profileSlice"
import { requestGetProfileById } from "../requests/profile"

function* handleGetProfileById(action) {
    try {
        const response = yield call(requestGetProfileById, action.payload)
        const { data } = response
        console.log("o day ne", data)
        yield put(setProfileById(data))
    } catch (error) {
        console.log("handleGetProfileById", error)
    }
}

function* onHandleGetProfileById() {
    yield takeLatest(getProfileById.type, handleGetProfileById)
}

export const profileSaga = [fork(onHandleGetProfileById)]
