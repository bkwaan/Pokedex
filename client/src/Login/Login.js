import React, { Component } from "react";
import "./Login.css";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import {Modal} from "react-bootstrap";
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
      ForgetPassModal: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/api/User/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.input),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ LoginSucceed: data.success });
        this.setState({ Error: data.message });
        console.log(this.state);
      });
  };

  handleChange(event, inputName) {
        const {input} = this.state;
        input[inputName] = event.target.value;
        this.setState({input});
        console.log(this.state);
  }

  setRedirectToSignUp (status) {
        this.setState({RediretToSignUp: status});
  }

  setForgetPassModal (status) {
        this.setState({ForgetPassModal: status});
        
  }


  render() {
        if (this.state.RediretToSignUp) {
            return <Redirect to="/SignUp"/>
        }
        if (this.state.LoginSucceed) {
            var storage = window.localStorage;
            storage.setItem("login", "true");
            return <Redirect to="/"></Redirect>
        }
    return (
      <div className="Container-Login">
        <div className="BackgroundImageContainer-Login"></div>
    
        <form className="LoginFormContainer-Login" onSubmit={this.handleLogin}>
        <div className="PokedexTextContainer-Login">
            <h1 className="PokedexText-Login">LOGIN</h1>
          </div>
          <div className="UsernameContainer-Login">
              <i className = "fa fa-user icon"></i>
            <input
              className="UsernameInputField-Login"
              placeholder="Username"
              onChange={(event) => this.handleChange(event,"Username")}
            ></input>
          </div>

          <div className="PasswordContainer-Login">
            <input
              className="PasswordInputField-Login"
              type="password"
              placeholder="Password"
              onChange={(event) => this.handleChange(event,"Password")}
            ></input>
            <button className="ForgetPassBtn-Login" onClick={() => this.setForgetPassModal(true)}>forgot password?</button>
          </div>
          
            <ForgetPass ForgetPassModal={this.state.ForgetPassModal} CloseForgetPassModal={()=>this.setForgetPassModal(false)}/>

          <div className="LoginButtonContainer-Login">
            <input
              className="LoginButton-Login"
              value="Login"
              type="submit"
            ></input>
          </div>

          <div className="SignupButtonContainer-Login">
              <p className = "SignUpText-Login">Don't have an account?</p>
            <input
              className="SignupButton-Login"
              type="button"
              value="Sign up"
              onClick = {()=>this.setRedirectToSignUp(true)}
            ></input>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
