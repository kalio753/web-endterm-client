import createSagaMiddleware from "@redux-saga/core"
import { configureStore } from "@reduxjs/toolkit"
import rootSaga from "./saga/rootSaga"
import profileSlice from "./slices/profileSlice"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        profile: profileSlice.reducer,
    },
    middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export default store
