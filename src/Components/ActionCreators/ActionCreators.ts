import {
  LOGIN_USER,
  App_Actions,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  CHANGE_INPUT,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILURE
} from "../ActionTypes/ActionTypes";
import {
  LoginFormInterface,
  LoginFormSuccessInterface,
  LoginFormFailureInterface,
  formData
} from "../../Types";

export function login_user(payload: LoginFormInterface): App_Actions {
  return { type: LOGIN_USER, payload };
}

export function login_user_success(
  data: LoginFormSuccessInterface
): App_Actions {
  return { type: LOGIN_USER_SUCCESS, data };
}

export function login_user_failure(
  error: LoginFormFailureInterface
): App_Actions {
  return { type: LOGIN_USER_FAILURE, error };
}

export function get_data(): App_Actions {
  return { type: GET_DATA };
}

export function get_data_success(data: formData): App_Actions {
  return { type: GET_DATA_SUCCESS, data };
}

export function get_data_failure(error: string): App_Actions {
  return { type: GET_DATA_FAILURE, error };
}

export function change_input(
  fieldName: string,
  fieldValue: string | number | boolean
): App_Actions {
  return { type: CHANGE_INPUT, fieldName, fieldValue };
}

export function signup_user(payload: formData): App_Actions {
  return { type: SIGNUP_USER, payload };
}

export function signup_user_success(id: string): App_Actions {
  return { type: SIGNUP_USER_SUCCESS, id };
}

export function signup_user_failure(error: string): App_Actions {
  return { type: SIGNUP_USER_FAILURE, error };
}

export function update_user_data(payload: formData): App_Actions {
  return { type: UPDATE_USER_DATA, payload };
}

export function update_user_data_success(data: formData): App_Actions {
  return { type: UPDATE_USER_DATA_SUCCESS, data };
}

export function update_user_data_failure(error: string): App_Actions {
  return { type: UPDATE_USER_DATA_FAILURE, error };
}
