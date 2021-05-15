import React, { Component } from 'react';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import Web3 from "web3";
import "./contract.address"
import "./login.css"
class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: ""
      };
    }
    async componentDidMount() {
      if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum
        ethereum.autoRefreshOnNetworkChange = false
        try {
          const accounts = await ethereum.enable()
          const provider = window['ethereum']
          const web3 = new Web3(provider)
          const abi = require("./contract.abi.json")
          const address = global.contract.address
          window.myContract = new web3.eth.Contract(abi.abi,address)
          window.defaultAccount = accounts[0].toLowerCase()
          this.setState({address:window.defaultAccount})
          ethereum.on('accountsChanged', function () {
            window.location.reload()
          })
          console.log(this.state.address)
        } catch (e) {
        }
      } else {
        console.log('没有metamask')
      }
    }
    
      onUsernameChange = e => {
        this.setState({ username: e.target.value });
      };
    
      onPasswordChange = e => {
        this.setState({ password: e.target.value });
      };
    
      onSubmit=()=>{
        window.myContract.methods.studentLogin(
          this.state.username,
          this.state.password,
          ).call({from:this.state.address}).then(value =>{
            console.log(value)
            if (value) {
              alert("欢迎您，"+this.state.username)
              this.props.history.push("/apply");
            } else{
              alert("账户地址或者账号密码错误")
            }
          }
        )
      }  

    render() {
      return (
    <div className="wrapper">
      <div className="container_main">
      <div class="login1"></div>
      <div class="bg_fff">
      <Form style={{ width:200,height:200,position:"absolute",right:100,top:"25%"}}>  
      <div style={{color:"#ffffff"}}>当前账户地址为：{this.state.address}</div>  
          <div><h1 style={{color:"#ffffff"}}>认证申请登录</h1></div> 
        <Form.Item style={{width: 200}}
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input prefix={<UserOutlined/>} placeholder="用户名" onChange={this.onUsernameChange}/>
        </Form.Item>
        <Form.Item style={{width: 200}}
          name="passward"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input prefix={<LockOutlined/>} type="password" placeholder="密码" onChange={this.onPasswordChange}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.onSubmit} >
          登录
          </Button>
          
        </Form.Item>
      </Form>
      </div> 
      </div>
      </div>
      );
    }
  }

  export default App;