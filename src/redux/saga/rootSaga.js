import { all } from "redux-saga/effects"
import { testSaga } from "./watchers/test"

export default function* rootSaga() {
    yield all([...testSaga])
}
