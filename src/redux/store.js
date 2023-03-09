import createSagaMiddleware from "@redux-saga/core"
import { configureStore } from "@reduxjs/toolkit"
import rootSaga from "./saga/rootSaga"
import postSlice from "./slices/postSlice"
import profileSlice from "./slices/profileSlice"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        profile: profileSlice.reducer,
        post: postSlice.reducer,
    },
    middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export default store
