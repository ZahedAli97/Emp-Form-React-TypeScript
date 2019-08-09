import { createStore, applyMiddleware } from "redux";
import { reducer } from "../Reducer/Reducer";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { saga_watcher } from "../Sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(saga_watcher);

export type AppState = ReturnType<typeof reducer>;
export default store;
