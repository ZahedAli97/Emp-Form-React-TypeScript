import React from "react";
import Form, { IChangeEvent, Field } from "react-jsonschema-form";
import { schema, uiSchema } from "./SignupSchema";
import { formData } from "../../Types";
import Axios from "axios";
import { RouteComponentProps, Redirect } from "react-router";
import { AppState } from "../Store";
import { Dispatch, bindActionCreators } from "redux";
import { signup_user } from "../ActionCreators/ActionCreators";
import { connect } from "react-redux";
import ChooseLanguage from "../ChooseLanguage";
import { JSONSchema6 } from "json-schema";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Translator } from "../Translator";

interface props extends RouteComponentProps {}
interface mapStateToProps {
  isSignupSuccess: boolean;
  lang: string;
}
interface mapDispatchToProps {
  signup_user: typeof signup_user;
}

type AppProps = props & mapStateToProps & mapDispatchToProps;

function Signup(props: AppProps) {
  let myschema: JSONSchema6 | null = null;

  const handleSubmit = (e: IChangeEvent<unknown>) => {
    const id = Math.floor(Math.random() * 1000);
    const formData: formData = e.formData as formData;
    formData.id = id;
    let skills = formData.skills;
    let sendSkills: string = "";
    for (let skill of skills) {
      sendSkills += `${skill}, `;
    }
    // console.log(formData);
    formData.skills = sendSkills;
    props.signup_user(formData);
  };

  function transformErrors(errors: any) {
    return errors.map((error: any) => {
      if (error.name === "pattern") {
        error.message = Translator(props.lang)("pattern");
      }
      if (error.name === "required") {
        error.message = Translator(props.lang)("required");
      }
      if (error.name === "format") {
        error.message = Translator(props.lang)("format");
      }
      if (error.name === "minimum") {
        error.message = Translator(props.lang)("pattern");
      }
      if (error.name === "minLength") {
        if (error.property == ".name") {
          error.message = Translator(props.lang)("minLength.name");
        }
        if (error.property == ".password") {
          error.message = Translator(props.lang)("minLength.password");
        }
      }
      return error;
    });
  }

  function CustomFieldTemplate(props: any) {
    const {
      id,
      classNames,
      label,
      help,
      required,
      description,
      errors,
      children
    } = props;
    return (
      <div className={classNames}>
        <div>
          {id !== "root" && (
            <label htmlFor={id}>
              {required ? (
                <label>
                  <span style={{ color: "red" }}>* </span>
                </label>
              ) : null}
              {label}
            </label>
          )}

          <div>
            {description}
            {children}
            {errors}
            {help}
          </div>
        </div>
      </div>
    );
  }

  myschema = schema(props.lang);
  return (
    <>
      {props.isSignupSuccess === true && <Redirect to="/" />}
      <div className="row">
        <ChooseLanguage />
        <div style={{ marginTop: "2%", marginLeft: "1%" }}>
          <Link to="/">
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
          </Link>
        </div>
      </div>
      <div
        className="my-card-for-schema-signup-edit card shadow "
        style={{
          width: "50%",
          height: "70%",
          marginLeft: "25%",
          paddingTop: "3%",
          paddingBottom: "3%",
          border: "1px solid rgba(0,0,0,.125)",
          borderRadius: "100rem",
          background: "transparent",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          color: "white"
        }}
      >
        <div style={{ width: "60%", marginLeft: "20%" }}>
          <Form
            noHtml5Validate={true}
            schema={myschema}
            uiSchema={uiSchema}
            onSubmit={handleSubmit}
            showErrorList={false}
            transformErrors={transformErrors}
            FieldTemplate={CustomFieldTemplate}
          >
            {" "}
            <button
              className="btn btn-outline-light"
              onMouseOver={(e: any) => {
                e.target.classList.add("shadow", "text-info");
              }}
              onMouseOut={(e: any) => {
                e.target.classList.remove("shadow", "text-info");
              }}
            >
              <FormattedMessage id="signup" defaultMessage="Signup" />
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: AppState): mapStateToProps => {
  return {
    isSignupSuccess: state.isSignupSuccess,
    lang: state.lang
  };
};

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProps => ({
  ...bindActionCreators(
    {
      signup_user
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
