import React, { useState, HtmlHTMLAttributes } from "react";
import { LoginFormInterface } from "../Types";
import axios from "axios";
import { HandleLogin } from "./HandleLogin";
import { Link } from "react-router-dom";

export default function LoginForm(props: { setLogin: Function }) {
  const [state, setState] = useState<LoginFormInterface>({
    email: "",
    password: ""
  });

  //   const [email, setEmail] = useState<string | null>("");  >> Keeping it as an Example.

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(">>", state);
    const payload: LoginFormInterface = state;
    axios
      .post("http://localhost:8080/employes/getemployelogin", payload)
      .then(res => {
        if (res.data.id !== 0) {
          console.log("Responde = ", res.data);
          localStorage.setItem("LoginTS", "true");
          localStorage.setItem("LoginIdTS", res.data.id);
          HandleLogin(res.data);
          props.setLogin(true);
        } else {
          alert("Email does not Exist.");
        }
      })
      .catch(err => alert(err));
    return;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentState: LoginFormInterface = state;
    const targetName = e.target.name;
    currentState[targetName] = e.target.value;
    setState(currentState);
  };

  return (
    <>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Email : </label>
        <input type="email" name="email" required onChange={handleChange} />
        <br />
        <label>Password : </label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="SUBMIT" />
      </form>
      <hr />
      <p>
        New user? - <Link to="/signup">Register Here</Link>
      </p>
    </>
  );
}
