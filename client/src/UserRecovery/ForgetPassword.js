import React, {Component} from "react";
import {Modal,
        Container,
        Row,
        Col,
        Form,
        ListGroup,
    } from "react-bootstrap";
import { Model } from "mongoose";
import "./ForgetPassword.css"

class ForgetPass extends Component {
    constructor(props){
        super(props);
        this.state = {
            Email: ""
        }
    }

    //this.props.ForgetPassModal

    render() {
        return (
            <Modal dialogClassName="ForgetPassModal-ForgetPass" size="lg" show={this.props.ForgetPassModal} onHide={this.props.CloseForgetPassModal}>
                <Modal.Header closeButton>
                <div className="ModalBodyContainer-ForgetPass">
                    
                    <div className = "ForgetPassLeftContainer-ForgetPass">
                        <img className = "ForgetPassWallpaper-ForgetPass" src = "/images/ForgetPassImage.jpg"/>
                    </div>

                    <div className = "ForgetPassRightContainer-ForgetPass">
                        <h5 className = "ForgetPassTitle-ForgetPass">Forgot your password?</h5>
                        <form className="FormContainer-ForgetPass" onSubmit="">
                        <p className="Instruction-ForgetPass">
                            Enter your registered Email to receive intructions on recoverying your account
                        </p>
                        <input className="EmailInputField-ForgetPass" placeholder="Email"></input>
                        <input className="SubmitBtn-ForgetPass" type="submit" value="Send me the instructions"/>
                        </form>
                    </div>
                </div>
                </Modal.Header>
            </Modal>
        );
    }
}

export default ForgetPass