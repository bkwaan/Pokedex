import React, { Component } from "react";
import "./Login.css";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        Username: "",
        Password: "",
      },
      LoginSucceed: "",
      Error: "",
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
      });
  };

  handleChange(event, inputName) {
      const {input} = this.state;
      input[inputName] = event.target.value;
      this.setState({input});
      console.log(this.state);
  }

  render() {
    return (
      <div className="Container-Login">
        <div className="BackgroundImageContainer-Login"></div>
        <form className="LoginFormContainer-Login" onSubmit={this.handleLogin}>
          <div className="PokedexTextContainer-Login">
            <h1 className="PokedexText-Login">Pokedex</h1>
          </div>
          <div className="UsernameContainer-Login">
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
          </div>

          <div className="LoginButtonContainer-Login">
            <input
              className="LoginButton-Login"
              value="Login"
              type="submit"
            ></input>
          </div>

          {/* <div className="SignupButtonContainer-Login">
            <input
              className="SignupButton-Login"
              type="button"
              value="Sign up"
            ></input> */}
          {/* </div> */}
        </form>
      </div>
    );
  }
}

export default Login;
