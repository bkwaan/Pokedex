import React, { Component } from "react";
import "./SignUp.css";
import { Link, BrowserRouter, Redirect } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        Username: "",
        Password: "",
        Email: "",
      },
      SignUpSuccess: false,
      Message: "",
    };
  }

  handleChange(event, inputName) {
    const { input } = this.state;
    input[inputName] = event.target.value;
    this.setState({ input });
    console.log(this.state);
  }

  handleSignUp = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/User/Signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.input),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ SignUpSuccess: data.success });
        this.setState({ Message: data.message });
        console.log(this.state);
      });
  };

  render() {
    return (
      <div className="Container-SignUp">
        <div className="BackgroundImageContainer-SignUp"></div>
        <div className="FormContainer-SignUp">
          <div className="FormLeftContainer-SignUp">
            <img className="Image-SignUp"></img>
          </div>
          <div className="FormRightContainer-SignUp">
            <div className="LoginContainer-SignUp">
              <label className="AlreadySignUpLabel-SignUp">
                Already have an account?{" "}
              </label>
              <a className="LoginLink-SignUp" href="/Login">
                {" "}
                LOGIN
              </a>
            </div>
            <form className="InfoContainer-SignUp" onSubmit={this.handleSignUp}>
              <h4 className="SignUpTitle-SignUp">SIGN UP NOW</h4>
              <p className="SignUpText-SignUp">
                to share your thoughts &amp; creativities
              </p>
              <div className="UsernameContainer-SignUp">
                <input
                  className="UsernameInput-SignUp"
                  placeholder="Username"
                  onChange={(event)=>this.handleChange(event,"Username")}
                ></input>
              </div>
              <div className="EmailContainer-SignUp">
                <input
                  className="EmailInput-SignUp"
                  placeholder="Email"
                  onChange={(event)=>this.handleChange(event,"Email")}
                ></input>
              </div>
              <div className="PasswordContainer-SignUp">
                <input
                  className="PasswordInput-SignUp"
                  placeholder="Password"
                  onChange={(event)=>this.handleChange(event,"Password")}
                ></input>
              </div>
              <div className="ConfirmPasswordContainer-SignUp">
                <input
                  className="ConfirmPasswordInput-SignUp"
                  placeholder="Confirm Password"
                ></input>
              </div>
              <div className="TermsCheckboxContainer-SignUp">
                <input
                  className="TermsCheckbox-SignUp"
                  type="checkbox"
                  name="TermsCheckbox"
                ></input>
                <label
                  className="TermsCheckboxLabel-SignUp"
                  for="TermsCheckbox"
                >
                  I fully understand the common sense &amp; manner
                </label>
              </div>
              <div className="SignUpButtonContainer-SignUp">
                <input
                  className="SignUpButton-SignUp"
                  type="submit"
                  value="Sign Up"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
