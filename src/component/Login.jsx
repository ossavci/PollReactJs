import React, { Component } from "react";
import QuestionsDataService from "../service/QuestionsDataService";
import { Formik, Field, Form } from "formik";
import Button from "react-bootstrap/Button";

class Login extends React.Component {
  // Using a class based component here because we're accessing DOM refs

  constructor(props) {
    super(props);
    this.state = {
      question: "",
      optionList: {},
    };
    this.loginClicked = this.loginClicked.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(e) {
    var user = { username: e.username, password: e.password };
    console.log(user);
    var response = this.loginClicked(user);
  }

  render() {
    let { username, password } = this.state;
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={this.handleSignIn}
      >
        {(props) => (
          <Form>
            <fieldset className="form-group">
              <label>Username</label>
              <Field className="form-control" type="text" name="username" />
              <label>Password</label>
              <Field className="form-control" type="password" name="password" />
            </fieldset>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    );
  }

  loginClicked(user) {
    QuestionsDataService.login(user).then((response) => {
      if(response === "fail"){
        alert("Login Failed");
        this.props.history.push("/Login");
        return;
      }
      console.log(response);
      if (response.data != null) {
        window.user = {
          userId: response.data.id,
          userType: response.data.userType,
        };
        alert("Welcome " + response.data.username);
        if (response.data.userType == "ADMIN_USER") {
          this.props.history.push("/Questions");
        } else if (response.data.userType == "END_USER") {
          this.props.history.push("/UserQuestions");
        }
      } else {
        alert("Login Failed");
        this.props.history.push("/Login");
      }

      return response;
    });
  }
}

export default Login;
