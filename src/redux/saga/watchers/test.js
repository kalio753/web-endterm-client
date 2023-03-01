import { call, fork, put, takeLatest } from "redux-saga/effects"
import { getTest, setTest } from "../../slices/testSlice"
import { requestGetTest } from "../requests/test"

function* handleGetTest(action) {
    try {
        const response = yield call(requestGetTest, action.payload)
        const { data } = response
        yield put(setTest(data))
    } catch (error) {
        console.log(error)
    }
}

function* onHandleGetTest() {
    yield takeLatest(getTest.type, handleGetTest)
}

export const testSaga = [fork(onHandleGetTest)]
