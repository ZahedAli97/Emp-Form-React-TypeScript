import {
  LoginFormInterface,
  LoginFormSuccessInterface,
  LoginFormFailureInterface,
  formData
} from "../../Types";

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export interface login_user {
  type: typeof LOGIN_USER;
  payload: LoginFormInterface;
}

export interface login_user_success {
  type: typeof LOGIN_USER_SUCCESS;
  data: LoginFormSuccessInterface;
}

export interface login_user_failure {
  type: typeof LOGIN_USER_FAILURE;
  error: LoginFormFailureInterface;
}

export type Login_Types = login_user | login_user_success | login_user_failure;

export const GET_DATA = "GET_DATA";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILURE = "GET_DATA_FAILURE";

export interface get_data {
  type: typeof GET_DATA;
}

export interface get_data_success {
  type: typeof GET_DATA_SUCCESS;
  data: formData;
}

export interface get_data_failure {
  type: typeof GET_DATA_FAILURE;
  error: string;
}

export type Get_Data_Types = get_data | get_data_success | get_data_failure;

export const CHANGE_INPUT = "CHANGE_INPUT";
export interface change_input {
  type: typeof CHANGE_INPUT;
  fieldName: string;
  fieldValue: string | number | boolean;
}

export const SIGNUP_USER = "SIGNUP_USER";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAILURE = "SIGNUP_USER_FAILURE";

export interface signup_user {
  type: typeof SIGNUP_USER;
  payload: formData;
}
export interface signup_user_success {
  type: typeof SIGNUP_USER_SUCCESS;
  id: string;
}

export interface signup_user_failure {
  type: typeof SIGNUP_USER_FAILURE;
  error: string;
}

export type Signup_Types =
  | signup_user
  | signup_user_success
  | signup_user_failure;

export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const UPDATE_USER_DATA_SUCCESS = "UPDATE_USER_DATA_SUCCESS";
export const UPDATE_USER_DATA_FAILURE = "UPDATE_USER_DATA_FAILURE";

export interface update_user_data {
  type: typeof UPDATE_USER_DATA;
  payload: formData;
}

export interface update_user_data_success {
  type: typeof UPDATE_USER_DATA_SUCCESS;
  data: formData;
}

export interface update_user_data_failure {
  type: typeof UPDATE_USER_DATA_FAILURE;
  error: string;
}

export type Update_Types =
  | update_user_data
  | update_user_data_success
  | update_user_data_failure;

export type App_Actions =
  | Login_Types
  | Get_Data_Types
  | change_input
  | Signup_Types
  | Update_Types;
