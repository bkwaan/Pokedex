import React, { Component } from "react";
import "./ResetPass.css";
import { Redirect } from "react-router-dom";

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        email: this.props.location.state.username,
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
    if (re.test(password) && password.length > 5) {
      return true;
    } else {
      this.setState({Message: P_ERROR})
      return false;
    }
  }

  handleReset = (event) => {
    event.preventDefault();
    fetch("api/User/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.input.email,
        password: this.state.input.Password
      })
    })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ success: data.success });
          this.setState({ message: data.message });
        })
  };

  handleChange = (event, inputName) => {
    const { input } = this.state;
    input[inputName] = event.target.value;
    this.setState({ input });
  };

  ResetPassValidation = (event) => {
      event.preventDefault();
      if (
        this.PasswordInputValidation() && 
        this.ConfirmPasswordValidation()
        ) {
            this.handleReset(event);
        }
  }

  render() {

    if (this.state.success){
        return <Redirect to="/"/>;
    }
    return (
        <div className="Container-SignUp">
          <div className="BackgroundImageContainer-SignUp"></div>
  
          <div className="FormContainer-SignUp">
            <div className="FormLeftContainer-SignUp">
              <img className="Image-SignUp"></img>
            </div>
            <div className="FormRightContainer-SignUp">
              <div className="LogoContainer-ResetPass">
                <img className="Logo-ResetPass"></img>
              </div>
              <form className="FormContainer-ResetPass" onSubmit={this.ResetPassValidation}>
            <p className="GreetingText-ResetPass">
              Hi {this.state.input.email}, please enter your new password
            </p>
            <input
              className="PasswordInput-ResetPass"
              type="password"
              placeholder="Password"
              onChange={(event) => this.handleChange(event, "Password")}
            />
            <input
              className="ConfirmPassInput-ResetPass"
              type="password"
              placeholder="Confirm Password"
              onChange={(event) => this.handleChange(event, "ConfirmPassword")}
            />
            <input
              className="SubmitBtn-ResetPass"
              type="submit"
              value="Reset Password"
            />
    <p className="Message-ResetPass">{this.state.Message}</p>
          </form>
            </div>
          </div>
        </div>
      );

    // return (
    //   <div className="Container-ResetPass">
    //     <div className="BackgroundImage-ResetPass"></div>
    //     <div className="ItemsContainer-ResetPass">
    //       <h5 className="PageTitle-ResetPass">Reset Your Password</h5>
    //       <form className="FormContainer-ResetPass" onSubmit={this.handleReset}>
    //         <p className="GreetingText-ResetPass">
    //           Hi ________, please enter your new password
    //         </p>
    //         <input
    //           className="PasswordInput-ResetPass"
    //           type="password"
    //           placeholder="Password"
    //           onChange={(event) => this.handleChange(event, "Password")}
    //         />
    //         <input
    //           className="ConfirmPassInput-ResetPass"
    //           type="password"
    //           placeholder="Confirm Password"
    //           onChange={(event) => this.handleChange(event, "ConfirmPassword")}
    //         />
    //         <input
    //           className="SubmitBtn-ResetPass"
    //           type="submit"
    //           value="Reset Password"
    //         />
    // <p className="Message-ResetPass">{this.state.Message}</p>
    //       </form>
    //     </div>
    //   </div>
    // );
  }
}

export default ResetPass;
