import { formData } from "../Types";

export function HandleLogin(props: formData) {
  const storage = JSON.stringify(props);
  localStorage.setItem("userData", storage);
}
