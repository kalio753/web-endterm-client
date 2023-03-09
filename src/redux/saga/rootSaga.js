import { all } from "redux-saga/effects"
import { postSaga } from "./watchers/post"
import { profileSaga } from "./watchers/profile"

export default function* rootSaga() {
    yield all([...profileSaga, ...postSaga])
}
