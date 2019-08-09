import { JSONSchema6 } from "json-schema";
import { Translator as SendTranslator } from "../Translator";

export function schema(lang: string): JSONSchema6 {
  let Translator: Function = SendTranslator(lang);
  return {
    title: Translator("login.title"),
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        title: Translator("email"),
        type: "string"
      },
      password: {
        title: Translator("password"),
        type: "string"
      }
    }
  };
}
export const uiSchema = {
  email: {
    "ui:widget": "email",
    classNames: "text-left my-field-of-login-email"
  },
  password: {
    "ui:widget": "password",
    classNames: "text-left"
  }
};
