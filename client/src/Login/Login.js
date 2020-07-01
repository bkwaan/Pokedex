import React, { Component } from 'react'
import "./Login.css"
import { Form, Button, FormGroup, FormLabel, InputGroup } from 'react-bootstrap'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            Username: "",
            Password: "",
            LoginSucceed: "",
            Error: "",
        }
    }

    render (){
        return (
            <div className="Container-Login">
                <div className="BackgroundImageContainer-Login"></div>
                <div className="LoginFormContainer-Login">
                    <div className="PokedexTextContainer-Login">
                        <h1 className="PokedexText-Login">Pokedex</h1>
                    </div>
                    <div className="UsernameContainer-Login">
                        <input className="UsernameInputField-Login" placeholder = "Username"></input>
                    </div>

                    <div className="PasswordContainer-Login">
                        <input className="PasswordInputField-Login" type="password" placeholder = "Password"></input>
                    </div>

                    <div className="LoginButtonContainer-Login">
                        <input className="LoginButton-Login" value="Login" type="button"></input>
                    </div>

                    <div className="SignupButtonContainer-Login">
                        <input className="SignupButton-Login" type="button" value="Sign up"></input>
                    </div>
                </div>

            </div>
        )
    
    }
}

export default Login