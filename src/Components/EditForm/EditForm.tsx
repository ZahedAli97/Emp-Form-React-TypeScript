import React, { useEffect } from "react";
import Form, { IChangeEvent } from "react-jsonschema-form";
import { schema, uiSchema } from "../SignupForm/SignupSchema";
import { formData } from "../../Types";
import Axios from "axios";
import { RouteComponentProps } from "react-router";
import { AppState } from "../Store";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { update_user_data, get_data } from "../ActionCreators/ActionCreators";
import { JSONSchema6 } from "json-schema";
import ChooseLanguage from "../ChooseLanguage";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Translator } from "../Translator";

interface props extends RouteComponentProps {}

interface mapStateToProps extends formData {
  lang: string;
}

interface mapDispatchToProps {
  update_user_data: typeof update_user_data;
  get_data: typeof get_data;
}

type AppProps = props & mapStateToProps & mapDispatchToProps;

function EditForm(props: AppProps) {
  useEffect(() => {
    if (props.image === "") {
      props.get_data();
    }
  });

  let myschema: JSONSchema6 | null = null;

  const myFormData: formData = {
    id: props.id,
    name: props.name,
    email: props.email,
    password: props.password,
    mobile: props.mobile,
    birthday: props.birthday,
    gender: props.gender,
    skills: props.skills,
    image: props.image
  };
  myFormData.mobile = parseInt(myFormData.mobile.toString());
  let mySkills: string | string[] = myFormData.skills.toString().split(", ");
  mySkills.pop();
  console.log(myFormData.skills);
  myFormData.skills = mySkills;
  console.log(myFormData.skills);

  const handleSubmit = (e: IChangeEvent<unknown>) => {
    const formData: formData = e.formData as formData;
    let skills = formData.skills;
    let sendSkills: string = "";
    for (let skill of skills) {
      sendSkills += `${skill}, `;
    }
    console.log(formData);
    formData.skills = sendSkills;
    props.update_user_data(formData);
    props.history.push("/");
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
      <div className="row">
        <ChooseLanguage />
        <div style={{ marginTop: "2%", marginLeft: "1%" }}>
          <Link to="/">
            <button
              className="btn btn-outline-light text-light"
              style={{
                background: "rgba(255, 255, 255, 0.4)"
              }}
              onMouseOver={(e: any) => {
                e.target.classList.add("shadow");
              }}
              onMouseOut={(e: any) => {
                e.target.classList.remove("shadow");
              }}
            >
              <FormattedMessage id="home" defaultMessage="Home" />
            </button>
          </Link>
        </div>
      </div>

      {props.image !== "" && (
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
              schema={myschema}
              uiSchema={uiSchema}
              formData={myFormData}
              onSubmit={handleSubmit}
              noHtml5Validate={true}
              showErrorList={false}
              transformErrors={transformErrors}
              FieldTemplate={CustomFieldTemplate}
            >
              <button
                className="btn btn-outline-light"
                onMouseOver={(e: any) => {
                  e.target.classList.add("shadow", "text-info");
                }}
                onMouseOut={(e: any) => {
                  e.target.classList.remove("shadow", "text-info");
                }}
              >
                <FormattedMessage id="update" defaultMessage="Update" />
              </button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state: AppState): mapStateToProps => {
  return {
    id: state.id,
    name: state.name,
    email: state.email,
    password: state.password,
    mobile: state.mobile,
    birthday: state.birthday,
    gender: state.gender,
    skills: state.skills,
    image: state.image,
    lang: state.lang
  };
};

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProps => ({
  ...bindActionCreators({ update_user_data, get_data }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm);
