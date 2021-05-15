import React from "react";
import logo from './logo.svg';
import './App.css';
import { Button} from "antd";
import "antd/dist/antd.css"
import {Switch,Route,Redirect} from "react-router-dom"
import Login from  './page/Login';

function App() {
  return (
    <div className="App">
      <Button type="primary">按钮</Button>

    </div>
  );
}

export default App;
