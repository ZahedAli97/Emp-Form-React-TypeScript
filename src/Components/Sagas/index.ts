import { all, takeLatest } from "redux-saga/effects";
import { login_saga, get_data_saga, signup_saga, update_saga } from "./Sagas";
import {
  LOGIN_USER,
  GET_DATA,
  SIGNUP_USER,
  UPDATE_USER_DATA
} from "../ActionTypes/ActionTypes";

export function* saga_watcher() {
  yield all([
    takeLatest(LOGIN_USER, login_saga),
    takeLatest(GET_DATA, get_data_saga),
    takeLatest(SIGNUP_USER, signup_saga),
    takeLatest(UPDATE_USER_DATA, update_saga)
  ]);
}
