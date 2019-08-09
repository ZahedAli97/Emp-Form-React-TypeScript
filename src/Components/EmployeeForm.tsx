import React from "react";
import axios from "axios";
import { FormState, formData } from "../Types";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {}

export default class EmployeeForm extends React.Component<Props, FormState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      submitted: false,
      id: 2,
      //   id: Math.floor(Math.random() * 1000),
      full_name: "",
      email: "",
      password: "",
      mobile: 0,
      dateOfBirth: new Date(),
      gender: "Male",
      profilePic: ""
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: formData = {
      id: this.state.id,
      name: this.state.full_name,
      password: this.state.password,
      mobile: this.state.mobile,
      email: this.state.email,
      gender: this.state.gender,
      skills: "", // Add in form
      birthday: this.state.dateOfBirth,
      image: this.state.profilePic
    };
    console.log(">>", payload);
    axios
      .post("http://localhost:8080/employes/addemploye", payload)
      .then(res => {
        console.log(res.data);
        this.props.history.push("/");
      })
      .catch(err => alert(err));
    this.setState({ submitted: true });
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let name: string = e.target.value;
    let newState: any = this.state;
    newState[e.target.name] = name;
    this.setState(newState);
  };

  handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let data;
    let reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      reader.onload = (e: ProgressEvent) => {
        data = reader.result;
        this.setState({ profilePic: data });
      };
      let imgbase64 = reader.readAsDataURL(event.target.files[0]);
    }
  };

  render() {
    {
      console.log(this.state);
    }
    return (
      <>
        <h1>Employee Form</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" hidden />
          <label>Name: </label>
          <input
            type="text"
            name="full_name"
            onChange={this.handleChange}
            required
          />
          <br />
          <label>Email: </label>
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            required
          />
          <br />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            required
          />
          <br />
          <label>Mobile: </label>
          <input
            type="number"
            name="mobile"
            onChange={this.handleChange}
            required
          />
          <br />
          <label>Date Of Birth: </label>
          <input
            type="date"
            name="dateOfBirth"
            onChange={this.handleChange}
            required
          />
          <br />
          <label>Gender: </label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={this.handleChange}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={this.handleChange}
          />
          Female
          <input
            type="radio"
            name="gender"
            value="Other"
            onChange={this.handleChange}
          />
          Other
          <br />
          <input
            type="file"
            name="profilePic"
            onChange={this.handleImage}
            required
          />
          <br />
          <input type="submit" value="SUBMIT" />
        </form>
      </>
    );
  }
}
