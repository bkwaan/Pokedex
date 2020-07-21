import React, {Component} from "react"
import "./ResetPass.css"

class ResetPass extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="Container-ResetPass">
                <div className="BackgroundImage-ResetPass"></div>
                <div className="ItemsContainer-ResetPass">
                    <h5 className="PageTitle-ResetPass">Reset Your Password</h5>
                    <form className="FormContainer-ResetPass">
                        {/* <div className= "GreetingTextContainer-ResetPass"> */}
                            <p className="GreetingText-ResetPass">Hi ________, please enter your new password</p>
                        {/* </div> */}
                        {/* <div className="PasswordInputContainer-ResetPass"> */}
                            <input className="PasswordInput-ResetPass" type="password" placeholder="Password"/>
                        {/* </div> */}
                        {/* <div className="ConfirmPassInputContainer-ResetPass"> */}
                            <input className="ConfirmPassInput-ResetPass" type="password"placeholder="Confirm Password"/>
                        {/* </div> */}
                        {/* <div className="SubmitBtnContainer-ResetPass"> */}
                            <input className="SubmitBtn-ResetPass" type="submit" value="Reset Password"/>
                        {/* </div> */}
                    </form>

                </div>
            </div>
        )
    }
}

export default ResetPass;