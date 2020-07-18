import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./HomePage/Home.js"
import Login from "./Login/Login.js"
import SignUp from "./SignUp/SignUp.js"
import ForgetPass from "./UserRecovery/ForgetPassword.js"
import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

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
        </Switch>
      </BrowserRouter>
      //<SignUp/>
    )
  }
  
}
export default App;
