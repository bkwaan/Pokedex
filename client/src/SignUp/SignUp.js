import React, {Component} from "react";
import "./SignUp.css";
import { Link, BrowserRouter, Redirect } from "react-router-dom";

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            User: {
                Username: "",
                Password: "",
                Email: "",
            },
            SignUpSuccess: "",
            Error: "",
            //redirectTOLogin: false
        }
        
    };
    render () {
        // if (this.state.redirectTOLogin) {
        //     return (
        //         <Redirect to="/Login"/>
        //     );
        // }
        return (
            <div className = "Container-SignUp">
                <div className = "BackgroundImageContainer-SignUp"></div>
                <div className = "FormContainer-SignUp">
                    <div className = "FormLeftContainer-SignUp">
                        <img className = "Image-SignUp" ></img>
                    </div>
                    <div className = "FormRightContainer-SignUp">
                        <div className = "LoginContainer-SignUp">
                            <label className = "AlreadySignUpLabel-SignUp">Already have an account? </label>
                           
                                <Link className = "LoginLink-SignUp" to={"/Login"}> LOGIN</Link>
                        </div>
                        <form className = "InfoContainer-SignUp" onSubmit="">
                            <h4 className = "SignUpTitle-SignUp">SIGN UP NOW</h4>
                            <p className = "SignUpText-SignUp">to share your thoughts &amp; creativities</p>
                            <div className = "UsernameContainer-SignUp">
                                <input className = "UsernameInput-SignUp" placeholder = "Username"></input>
                            </div>
                            <div className = "EmailContainer-SignUp">
                                <input className = "EmailInput-SignUp" placeholder = "Email"></input>
                            </div>
                            <div className = "PasswordContainer-SignUp">
                                <input className = "PasswordInput-SignUp" placeholder = "Password"></input>
                            </div>
                            <div className = "ConfirmPasswordContainer-SignUp">
                                <input className = "ConfirmPasswordInput-SignUp" placeholder = "Confirm Password"></input>
                            </div>
                            <div className = "TermsCheckboxContainer-SignUp">
                                <input className = "TermsCheckbox-SignUp" type="checkbox" name= "TermsCheckbox"></input>
                                <label className = "TermsCheckboxLabel-SignUp" for="TermsCheckbox">I fully understand the common sense &amp; manner</label>
                            </div>
                            <div className = "SignUpButtonContainer-SignUp">
                                <input className = "SignUpButton-SignUp" type="submit" value="Sign Up"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;