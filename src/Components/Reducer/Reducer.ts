import { ReducerInterface } from "../../Types";
import {
  App_Actions,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  CHANGE_INPUT,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  UPDATE_USER_DATA_FAILURE,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA
} from "../ActionTypes/ActionTypes";

const initialState: ReducerInterface = {
  lang: localStorage.getItem("LangTS") || "en",
  isSignupSuccess: false,
  isLoggedIn: "true" === localStorage.getItem("LoginTS"),
  isLoading: false,
  id: 0,
  name: "",
  email: "",
  password: "",
  mobile: 0,
  birthday: "",
  gender: "",
  skills: "",
  image: ""
};

const reducer = (
  prevState = initialState,
  action: App_Actions
): ReducerInterface => {
  switch (action.type) {
    case LOGIN_USER:
      const { email, password } = action.payload;
      return {
        ...prevState,
        email: email,
        password: password,
        isLoading: true
      };
    case UPDATE_USER_DATA_SUCCESS:
    case GET_DATA_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...prevState,
        ...action.data,
        isLoggedIn: "true" === localStorage.getItem("LoginTS"),
        isLoading: false
      };
    case UPDATE_USER_DATA_FAILURE:
    case SIGNUP_USER_FAILURE:
    case GET_DATA_FAILURE:
    case LOGIN_USER_FAILURE:
      alert(action.error);
      return { ...prevState, isLoading: false };
    case UPDATE_USER_DATA:
    case GET_DATA:
      return { ...prevState, isLoading: true };
    case CHANGE_INPUT:
      return { ...prevState, [action.fieldName]: action.fieldValue };
    case SIGNUP_USER:
      return { ...prevState, isLoading: true };
    case SIGNUP_USER_SUCCESS:
      return { ...prevState, isLoading: false, isSignupSuccess: true };
    default:
      return { ...prevState };
  }
};

export { reducer };
