import { legacy_createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storage from "redux-persist/lib/storage/session";
import rootReducer from "./root-reducer";

import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./rootSaga";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
export const store = legacy_createStore(
  // rootReducer,
  persistedReducer,
  compose(
    applyMiddleware(sagaMiddleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;


