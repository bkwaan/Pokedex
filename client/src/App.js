import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./HomePage/Home.js"
import Login from "./Login/Login.js"
import SignUp from "./SignUp/SignUp.js"
import ForgetPass from "./UserRecovery/ForgetPassword.js"
import ResetPass from "./UserRecovery/ResetPass.js"
import './App.css';


class App extends Component {

  render() {
    return (
      //<Home/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/Login" component={Login}/>
          <Route path="/SignUp" component={SignUp}/>
          <Route path="ForgetPassword" component={ForgetPass}/>
          <Route path="/ResetPassword" component={ResetPass}/>
        </Switch>
      </BrowserRouter>
      //<SignUp/>
    )
  }
  
}
export default App;
