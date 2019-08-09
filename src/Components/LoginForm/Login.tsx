import React, { useEffect } from "react";
import Form, { IChangeEvent } from "react-jsonschema-form";
import { LoginFormInterface } from "../../Types";
import Axios from "axios";
import { HandleLogin } from "../HandleLogin";
import { schema, uiSchema } from "./LoginSchema";
import { Link } from "react-router-dom";
import { AppState } from "../Store";
import {
  login_user,
  login_user_success,
  login_user_failure,
  change_input
} from "../ActionCreators/ActionCreators";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import ChooseLanguage from "../ChooseLanguage";
import { JSONSchema6 } from "json-schema";

interface stateProps {
  isSignupSuccess: boolean;
  lang: string;
}

interface dispatchProps {
  change_input: typeof change_input;
  login_user: typeof login_user;
  login_user_success: typeof login_user_success;
  login_user_failure: typeof login_user_failure;
}

type AppProps = stateProps & dispatchProps;

// export default function Login(props: { setLogin: Function }) {
function Login(props: AppProps) {
  useEffect(() => {
    if (props.isSignupSuccess === true) {
      props.change_input("isSignupSuccess", false);
    }
  });

  let myschema: JSONSchema6 | null = null;

  const handleSubmit = (e: IChangeEvent<unknown>) => {
    const formData: LoginFormInterface = e.formData as LoginFormInterface;
    props.login_user(formData);
  };

  myschema = schema(props.lang);

  return (
    <>
      <ChooseLanguage />

      <div
        className="card shadow"
        style={{
          width: "45%",
          height: "40%",
          margin: "5% 27%",
          paddingTop: "1%",
          border: "1px solid rgba(0,0,0,.125)",
          borderRadius: "100rem",
          background: "transparent",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          color: "white"
        }}
      >
        <div style={{ width: "80%", marginLeft: "10%" }}>
          <Form schema={myschema} uiSchema={uiSchema} onSubmit={handleSubmit}>
            <button
              className="btn btn-outline-light"
              onMouseOver={(e: any) => {
                e.target.classList.add("shadow", "text-info");
              }}
              onMouseOut={(e: any) => {
                e.target.classList.remove("shadow", "text-info");
              }}
            >
              <FormattedMessage id="login.button" defaultMessage="Login" />
            </button>
          </Form>
          <hr style={{ border: "0.5px solid white" }} />
          <p>
            <FormattedMessage id="login.ask" defaultMessage="New user?" />{" "}
            <Link to="/signup">
              <div className="shadow btn btn-outline-info text-white">
                <FormattedMessage
                  id="login.toRegister"
                  defaultMessage="Register Here"
                />
              </div>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: AppState): stateProps => {
  return {
    isSignupSuccess: state.isSignupSuccess,
    lang: state.lang
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): dispatchProps => ({
  ...bindActionCreators(
    { change_input, login_user, login_user_success, login_user_failure },
    dispatch
  )
});

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connectedComponent(Login);
