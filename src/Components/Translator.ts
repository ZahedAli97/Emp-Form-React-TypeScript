import { messages } from "./messages";

export function Translator(lang: string): Function {
  return (title: string) => {
    return messages[lang][title];
  };
}
