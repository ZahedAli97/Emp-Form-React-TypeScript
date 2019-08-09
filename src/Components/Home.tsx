import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import { Route, Switch } from "react-router-dom";
import { StaticContext } from "react-router";
import Login from "./LoginForm/Login";
import Signup from "./SignupForm/Signup";
import EditForm from "./EditForm/EditForm";
import { AppState } from "./Store";
import { connect } from "react-redux";
// import EditForm from "./EditForm";

import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import ru from "react-intl/locale-data/ru";
import es from "react-intl/locale-data/es";
import fi from "react-intl/locale-data/fi";

import { IntlProvider } from "react-intl";
import { messages } from "./messages";

addLocaleData(en);
addLocaleData(ru);
addLocaleData(es);
addLocaleData(fi);

function Home(props: { isLoggedIn: boolean; lang: string }) {
  return (
    <>
      <IntlProvider locale={props.lang} messages={messages[props.lang]}>
        <Switch>
          {!props.isLoggedIn && (
            <>
              <Route path="/signup" exact component={Signup} />

              <Route path="/" exact render={() => <Login />} />
            </>
          )}
          {props.isLoggedIn && (
            <>
              <Route path="/" exact render={() => <Profile />} />
              <Route path="/editform" exact component={EditForm} />
            </>
          )}{" "}
        </Switch>
      </IntlProvider>
    </>
  );
}

const mapStateToProps = (
  state: AppState
): { isLoggedIn: boolean; lang: string } => {
  return {
    isLoggedIn: state.isLoggedIn,
    lang: state.lang
  };
};

export default connect(mapStateToProps)(Home);
