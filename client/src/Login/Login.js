import React, { Component } from "react";
import "./Login.css";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ForgetPass from "../UserRecovery/ForgetPassword";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        Username: "",
        Password: "",
      },
      LoginSucceed: "",
      Message: "",
      RediretToSignUp: false,
      RedirectToHome: false,
      ForgetPassModal: false,
      RedirectToForgotPassword: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/User/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.input),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setRedirctToForgotPass({
            RedirectToForgotPassword: data.userInfo.tempPassword,
          });
          this.setState({ LoginSucceed: data.success });
          localStorage.setItem("SessionID", data.userInfo.id);
        }
        this.setState({ Error: data.message });
      });
  };

  handleChange(event, inputName) {
    const { input } = this.state;
    input[inputName] = event.target.value;
    this.setState({ input });
  }

  setRedirectToSignUp(status) {
    this.setState({ RediretToSignUp: status });
  }

  setRedirctToForgotPass(status) {
    this.setState({ RedirectToForgotPassword: status });
  }

  setRedirectToHome(status) {
    this.setState({ RedirectToHome: status });
  }

  setForgetPassModal(status) {
    this.setState({ ForgetPassModal: status });
  }

  render() {
    if (this.state.RediretToSignUp) {
      return <Redirect to="/SignUp" />;
    }
    if (this.state.LoginSucceed) {
      var storage = window.localStorage;
      storage.setItem("login", "true");
      return <Redirect to="/"></Redirect>;
    }
    if (this.state.RedirectToHome) {
      return <Redirect to="/"></Redirect>;
    }

    if (this.state.RedirectToForgotPassword) {
      return (
        <Redirect
          to={{
            pathname: "/ResetPassword",
            state: { username: this.state.input.Username },
          }}
        />
      );
    }

    return (
      <div className="Container-Login">
        <div className="BackgroundImageContainer-Login"></div>

        <div className="HomeIconContainer-Login">
          <img
            className="HomeIcon-Login"
            onClick={() => this.setRedirectToHome(true)}
          ></img>
        </div>

        <form className="LoginFormContainer-Login" onSubmit={this.handleLogin}>
          <div className="PokedexTextContainer-Login">
            <h1 className="PokedexText-Login">LOGIN</h1>
          </div>
          <div className="UsernameContainer-Login">
            <i className="fa fa-user icon"></i>
            <input
              className="UsernameInputField-Login"
              placeholder="Username"
              onChange={(event) => this.handleChange(event, "Username")}
            ></input>
          </div>

          <div className="PasswordContainer-Login">
            <input
              className="PasswordInputField-Login"
              type="password"
              placeholder="Password"
              onChange={(event) => this.handleChange(event, "Password")}
            ></input>
            <p
              className="ForgetPassBtn-Login"
              onClick={() => this.setForgetPassModal(true)}
            >
              forgot password?
            </p>
          </div>

        
          <div className="LoginButtonContainer-Login">
            <input
              className="LoginButton-Login"
              value="Login"
              type="submit"
            ></input>
          </div>

          <div className="SignupButtonContainer-Login">
            <p className="SignUpText-Login">Don't have an account?</p>
            <input
              className="SignupButton-Login"
              type="button"
              value="Sign up"
              onClick={() => this.setRedirectToSignUp(true)}
            ></input>
          </div>
        </form>
        <ForgetPass
            ForgetPassModal={this.state.ForgetPassModal}
            CloseForgetPassModal={() => this.setForgetPassModal(false)}
          />

      </div>
    );
  }
}

export default Login;
