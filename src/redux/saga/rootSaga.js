import { all } from "redux-saga/effects"
import { profileSaga } from "./watchers/profile"

export default function* rootSaga() {
    yield all([...profileSaga])
}
