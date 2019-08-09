import React, { useEffect, SetStateAction } from "react";
import { formData } from "../Types";
import { Link } from "react-router-dom";
import Axios from "axios";
import { AppState } from "./Store";
import { Dispatch, bindActionCreators, AnyAction } from "redux";
import { get_data, change_input } from "./ActionCreators/ActionCreators";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ChooseLanguage from "./ChooseLanguage";

interface mapStateToProps extends formData {}
interface mapDispatchToProps {
  get_data: typeof get_data;
  change_input: typeof change_input;
}

type AppProps = mapStateToProps & mapDispatchToProps;

function Profile(props: AppProps) {
  useEffect(() => {
    props.get_data();
  });

  const handleLogout = () => {
    localStorage.setItem("LoginTS", "false");
    props.change_input(
      "isLoggedIn",
      "true" === localStorage.getItem("LoginTS")
    );
  };

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
              onClick={handleLogout}
            >
              <FormattedMessage id="home.logout" defaultMessage="Logout" />
            </button>
          </Link>
        </div>
      </div>
      <div className="row">
        {/* <h1>Profile</h1> <hr /> */}
        <div
          className="card shadow"
          style={{
            width: "14rem",
            height: "20rem",
            marginLeft: "10rem",
            marginTop: "6rem",
            border: "1px solid rgba(0,0,0,.125)",
            background: "transparent",
            borderRadius: "100rem",
            backgroundColor: "rgba(255, 255, 255, 0.4)"
          }}
        >
          <div
            className="shadow "
            style={{
              // border: "1px solid rgba(0,0,0,.125)",
              backgroundColor: "#54b9f85f",
              border: "1px solid lightskyblue",
              marginLeft: "1rem",
              marginTop: "1rem",
              borderRadius: "100rem",
              width: "12rem",
              height: "12rem",
              padding: "0.5rem"
            }}
          >
            <img
              src={(props.image && props.image.toString()) || undefined}
              alt="Profile Pic"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#54b9f85f",
                border: "1px solid rgba(0,0,0,.125)",
                borderRadius: "100rem",
                marginBottom: "5rem",
                marginRight: "5rem"
              }}
            />
          </div>
          <Link to="/editform">
            <div
              className="btn text-white myback"
              onMouseOver={(e: any) => {
                e.target.classList.add(
                  "shadow",
                  "btn-outline-light",
                  "text-info"
                );
              }}
              onMouseOut={(e: any) => {
                e.target.classList.remove(
                  "shadow",
                  "btn-outline-light",
                  "text-info"
                );
              }}
              style={{
                width: "10rem",
                marginTop: "1rem",
                marginLeft: "0.8rem",
                border: "1px solid rgba(0,0,0,.125)",
                borderRadius: "100rem"
              }}
            >
              <FormattedMessage
                id="home.editprofile"
                defaultMessage="Edit Profile"
              />
            </div>
          </Link>
        </div>
        <div
          className="card shadow"
          style={{
            width: "44rem",
            height: "28rem",
            marginLeft: "9rem",
            marginTop: "2.5rem",
            border: "1px solid rgba(0,0,0,.125)",
            background: "transparent",
            borderRadius: "100rem",
            backgroundColor: "rgba(255, 255, 255, 0.4)"
          }}
        >
          <div
            className="text-center"
            style={{
              background: "",
              paddingTop: "2rem",
              paddingBottom: "2rem",
              paddingLeft: "7rem"
            }}
          >
            <div className="row">
              <div className="card shadow text-white text-center mylabel">
                <label className="my-bottom-bar">
                  <FormattedMessage id="home.name" defaultMessage="Name:" />
                </label>
              </div>
              <div className="card shadow text-white text-center mylabelvalue">
                <p className="my-bottom-bar">{props.name}</p>
              </div>
            </div>
            <div className="row">
              <div className="card shadow text-white text-center mylabel">
                <label className="my-bottom-bar">
                  <FormattedMessage id="home.email" defaultMessage="Email:" />
                </label>
              </div>
              <div className="card shadow text-white text-center mylabelvalue">
                <p className="my-bottom-bar">{props.email}</p>
              </div>
            </div>{" "}
            <div className="row">
              <div className="card shadow text-white text-center mylabel">
                <label className="my-bottom-bar">
                  <FormattedMessage
                    id="home.mobile"
                    defaultMessage="Mobile Number:"
                  />
                </label>
              </div>
              <div className="card shadow text-white text-center mylabelvalue">
                <p className="my-bottom-bar">{props.mobile}</p>
              </div>
            </div>{" "}
            <div className="row">
              <div className="card shadow text-white text-center mylabel">
                <label className="my-bottom-bar">
                  <FormattedMessage
                    id="home.dob"
                    defaultMessage="Date Of Birth:"
                  />
                </label>
              </div>
              <div className="card shadow text-white text-center mylabelvalue">
                <p className="my-bottom-bar">{props.birthday}</p>
              </div>
            </div>{" "}
            <div className="row">
              <div className="card shadow text-white text-center mylabel">
                <label className="my-bottom-bar">
                  <FormattedMessage id="home.gender" defaultMessage="Gender:" />
                </label>
              </div>
              <div className="card shadow text-white text-center mylabelvalue">
                <p className="my-bottom-bar">{props.gender}</p>
              </div>
            </div>{" "}
            <div className="row">
              <div className="card shadow text-white text-center mylabel">
                <label className="my-bottom-bar">
                  <FormattedMessage id="home.skills" defaultMessage="Skills:" />
                </label>
              </div>
              <div className="card shadow text-white text-center mylabelvalue">
                <p className="my-bottom-bar">
                  {props.skills.slice(0, props.skills.length - 2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    image: state.image
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>
): mapDispatchToProps => ({
  ...bindActionCreators({ get_data, change_input }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
