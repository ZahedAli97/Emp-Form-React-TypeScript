import { JSONSchema6 } from "json-schema";
import { Translator as SendTranslator } from "../Translator";

export const schema = (lang: string): JSONSchema6 => {
  let Translator: Function = SendTranslator(lang);
  return {
    title: Translator("SIGNUP"),
    type: "object",

    required: [
      "name",
      "email",
      "password",
      "mobile",
      "birthday",
      "gender",
      "skills",
      "image"
    ],
    properties: {
      name: { title: Translator("name"), type: "string", minLength: 2 },
      email: {
        title: Translator("email"),
        type: "string",
        pattern:
          "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
      },
      password: { title: Translator("password"), type: "string", minLength: 5 },
      mobile: {
        title: Translator("mobile"),
        type: "number",
        minimum: 100000,
        maximum: 9999999999
      },
      birthday: { title: Translator("dob"), type: "string", format: "date" },
      gender: {
        title: Translator("gender"),
        type: "string",
        enum: ["Male", "Female", "Other"]
      },
      skills: {
        title: Translator("skills"),
        type: "array",
        items: {
          type: "string",
          enum: ["Java", "Python", "C", "C++", "React", "JavaScript"]
        },
        uniqueItems: true
      },
      image: {
        title: Translator("profilePic"),
        type: "string",
        format: "data-url"
      }
    }
  };
};
export const uiSchema = {
  name: {
    classNames: "text-left my-field-of-login-email"
  },
  email: {
    "ui:widget": "email",
    classNames: "text-left my-field-of-login-email"
  },
  password: {
    "ui:widget": "password",
    classNames: "text-left my-field-of-login-email"
  },
  gender: {
    "ui:widget": "radio",
    classNames: "text-left my-field-of-login-email"
  },
  mobile: {
    classNames: "text-left my-field-of-login-email"
  },
  skills: {
    classNames: "text-left my-field-of-login-email"
  },
  birthday: {
    classNames: "text-left my-field-of-login-email"
  },
  image: {
    classNames: "text-left my-field-of-login-email"
  }
};
