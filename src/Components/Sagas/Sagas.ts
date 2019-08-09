import { put } from "redux-saga/effects";
import axios from "axios";
import {
  login_user_failure,
  login_user_success,
  get_data_failure,
  get_data_success,
  signup_user_failure,
  signup_user_success,
  update_user_data_failure,
  update_user_data_success
} from "../ActionCreators/ActionCreators";
import {
  login_user,
  get_data,
  signup_user,
  update_user_data
} from "../ActionTypes/ActionTypes";

export function* login_saga(action: login_user) {
  try {
    const response = yield axios.post(
      "http://localhost:8080/employes/getemployelogin",
      action.payload
    );
    if (response.data.name === null) {
      throw "Email Does not Exist!";
    }
    console.log("Responde = ", response.data);
    localStorage.setItem("LoginTS", "true");
    localStorage.setItem("LoginIdTS", response.data.id);
    yield put(login_user_success(response.data));
  } catch (err) {
    yield put(login_user_failure(err));
  }
}

export function* get_data_saga(action: get_data) {
  try {
    const response = yield axios.get(
      `http://localhost:8080/employes//getbyid/${localStorage.getItem(
        "LoginIdTS"
      )}`
    );
    yield put(get_data_success(response.data));
  } catch (err) {
    yield put(get_data_failure(err));
  }
}

export function* signup_saga(action: signup_user) {
  try {
    const response = yield axios.post(
      "http://localhost:8080/employes/addemploye",
      action.payload
    );
    yield put(signup_user_success(response.data));
  } catch (err) {
    yield put(signup_user_failure(err));
  }
}

export function* update_saga(action: update_user_data) {
  try {
    const response = yield axios.put(
      "http://localhost:8080/employes/updemploye",
      action.payload
    );

    yield put(update_user_data_success(response.data));
  } catch (err) {
    yield put(update_user_data_failure(err));
  }
}
