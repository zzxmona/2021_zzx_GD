import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router,Switch,Route,Redirect} from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from  './page/Login';
import Resign from "./page/Resign";
import Find from "./page/Find";
import Admin from "./page/Admin";
import AdminLogin from "./page/AdminLogin";
import Apply from "./page/Apply"
import Change from "./page/Change"

ReactDOM.render(<Router>
  <Switch>
    <Route path="/login" component={Login}></Route>
    <Route path="/resign" component={Resign}></Route>
    <Route path="/adminlogin" component={AdminLogin}></Route>
    <Route path="/admin" component={Admin}></Route>
    <Route path="/find" component={Find}></Route>
    <Route path="/apply" component={Apply}></Route>
    <Route path="/change" component={Change}></Route>
    <Redirect to="/find" from="/"></Redirect>
  </Switch>
</Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
