import createSagaMiddleware from "@redux-saga/core"
import { configureStore } from "@reduxjs/toolkit"
import rootSaga from "./saga/rootSaga"
import testSlice from "./slices/testSlice"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        test: testSlice.reducer,
    },
    middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export default store
