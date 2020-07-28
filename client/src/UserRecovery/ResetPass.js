import React, { Component } from "react";
import "./ResetPass.css";

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        email: "",
        Password: "",
        ConfirmPassword: "",
      },
      success: false,
      Message: "",
    };
  }

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
    if (re.test(password) && password.length < 6) {
      return true;
    } else {
      this.setState({Message: P_ERROR})
      return false;
    }
  }

  handleReset = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/User/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        this.state.input)
    })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ success: data.success });
          this.setState({ message: data.message });
          console.log(this.state);
        })
  };

  handleChange = (event, inputName) => {
    const { input } = this.state;
    input[inputName] = event.target.value;
    this.setState({ input });
    console.log(this.state);
  };

  render() {
    return (
      <div className="Container-ResetPass">
        <div className="BackgroundImage-ResetPass"></div>
        <div className="ItemsContainer-ResetPass">
          <h5 className="PageTitle-ResetPass">Reset Your Password</h5>
          <form className="FormContainer-ResetPass" onSubmit={this.handleReset}>
            {/* <div className= "GreetingTextContainer-ResetPass"> */}
            <p className="GreetingText-ResetPass">
              Hi ________, please enter your new password
            </p>
            {/* </div> */}
            {/* <div className="PasswordInputContainer-ResetPass"> */}
            <input
              className="PasswordInput-ResetPass"
              type="password"
              placeholder="Password"
              onChange={(event) => this.handleChange(event, "Password")}
            />
            {/* </div> */}
            {/* <div className="ConfirmPassInputContainer-ResetPass"> */}
            <input
              className="ConfirmPassInput-ResetPass"
              type="password"
              placeholder="Confirm Password"
              onChange={(event) => this.handleChange(event, "ConfirmPassword")}
            />
            {/* </div> */}
            {/* <div className="SubmitBtnContainer-ResetPass"> */}
            <input
              className="SubmitBtn-ResetPass"
              type="submit"
              value="Reset Password"
            />
            {/* </div> */}
    <p className="Message-ResetPass">{this.state.Message}</p>
          </form>
        </div>
      </div>
    );
  }
}

export default ResetPass;
