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
import Toast from 'react-bootstrap/Toast'



class ForgetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Success: false,
      Message: "",
      Show: false
    };
  }


  //this.props.ForgetPassModal

  forgotPasswordRequest = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/User/resetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ Success: data.success });
        this.setState({ Message: data.message });
        this.setState({ Show: true });
    });
  };



  handleToast = () => {
      this.setState({ Show: false});
  }

  handleChange = (event)=> {
    var test = event.target.value;
    this.setState({Email: test});
}


  render() {
    return (
      <Modal
        dialogClassName="ForgetPassModal-ForgetPass"
        size="lg"
        show={this.props.ForgetPassModal}
        onHide={this.props.CloseForgetPassModal}
      >
        <Modal.Header closeButton>
          <div className="ModalBodyContainer-ForgetPass">
            <div className="ForgetPassLeftContainer-ForgetPass">
              <img
                className="ForgetPassWallpaper-ForgetPass"
                src="/images/ForgetPassImage.jpg"
              />
            </div>

            <div className="ForgetPassRightContainer-ForgetPass">
              <h5 className="ForgetPassTitle-ForgetPass">
                Forgot your password?
              </h5>
              <form
                className="FormContainer-ForgetPass"
                onSubmit={this.forgotPasswordRequest}
              >
                <p className="Instruction-ForgetPass">
                  Enter your registered Email to receive intructions on
                  recoverying your account
                </p>
                <input
                  className="EmailInputField-ForgetPass"
                  placeholder="Email"
                  onChange={this.handleChange}
                ></input>
                  <Toast onClose={() => this.handleToast()} show={this.state.Show} delay={3000} autohide>
                    <Toast.Body>{this.state.Message}</Toast.Body>
                  </Toast>
                <input
                  className="SubmitBtn-ForgetPass"
                  type="submit"
                  value="Send me the instructions"
                />
              </form>
            </div>
          </div>
        </Modal.Header>
      </Modal>
    );
  }
}

export default ForgetPass