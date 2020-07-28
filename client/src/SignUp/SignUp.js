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
        ConfirmPassword: "",
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

  ConfirmPasswordValidation () {
    const {input} = this.state;
    const p1 = input["Password"];
    const p2 = input["ConfirmPassword"];
    const CP_ERROR = "Make Sure password and confirm password are the same.";
     if (p1 == p2) {
       return true;
     } else {
       this.setState({Message: CP_ERROR});
       return false;
     }
  }
  PasswordInputValidation () {
    const re = /^[a-zA-Z0-9]+$/;
    const {input} = this.state;
    const password = input["Password"];
    const P_ERROR = "Password must a combination of length 6 letters, numbers or both.";
    if (re.test(password) && password.length > 5) {
      return true;
    } else {
      this.setState({Message: P_ERROR})
      return false;
    }
  }

  EmailInputValidation () {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {input} = this.state;
    const email = input["Email"];
    const E_ERROR = "Bruh, that's not an email address.";

    if(re.test(email)) {
      return true;
    } else {
      this.setState({Message: E_ERROR});
      return false;
    }
  }

  UsernameInputValidation () {
    const re = /^[a-zA-Z0-9]+$/;
    const {input} = this.state;
    const username = input["Username"];
    const U_ERROR = "Username must be combination of length 3 letters, numbers or both."
    
    if(re.test(username) && username.length > 2) {
      return true;
    } else {
      this.setState({Message: U_ERROR});
      return false;
    }
  }

  SignUpValidation = (event) => {
    event.preventDefault();
    console.log(this.setState.Message);

    if (this.UsernameInputValidation() && this.PasswordInputValidation() && 
        this.ConfirmPasswordValidation() && this.EmailInputValidation()) {
          this.handleSignUp(event);
        }
  }


  render() {
    if (this.state.SignUpSuccess) {
      return <Redirect to="/Login"/>;
    }
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
            <form className="InfoContainer-SignUp" onSubmit={this.SignUpValidation}>
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
                  onChange={(event)=>this.handleChange(event,"ConfirmPassword")}
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
                <p className="Message-SignUp">{this.state.Message}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
